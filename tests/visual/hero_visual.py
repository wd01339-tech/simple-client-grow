#!/usr/bin/env python3
"""Hero visual-regression + live GA4/a11y verification.

Usage:
  python3 tests/visual/hero_visual.py            # compare against baselines
  python3 tests/visual/hero_visual.py --update   # (re)create baselines

Checks per viewport (desktop / tablet / mobile):
  1. exactly one "Book Free Call" booking CTA inside the hero
  2. its href is the expected Calendly URL with the expected UTM params
  3. pixel diff of the hero section against the stored baseline
  4. keyboard reachability + accessible name of the booking CTA
  5. GA4 conversion events (calendly_cta_click / generate_lead) fire once on click
"""
import asyncio
import re
import sys
from pathlib import Path
from urllib.parse import urlparse, parse_qs

from PIL import Image, ImageChops
from playwright.async_api import async_playwright

BASE_URL = "http://localhost:8080/"
ROOT = Path(__file__).parent
BASELINE = ROOT / "baseline"
CURRENT = ROOT / "current"
DIFF = ROOT / "diff"

CALENDLY_PATH = "/consultantb84/30min"
EXPECTED_UTM = {
    "utm_source": "website",
    "utm_medium": "cta_button",
    "utm_campaign": "discovery_call",
    "utm_term": "hero",
}
BOOKING_RE = re.compile(r"book\b.*\bfree\b.*\bcall\b", re.I)

VIEWPORTS = [
    ("desktop", 1440, 1000),
    ("tablet", 834, 1200),
    ("mobile", 390, 900),
]

# Fraction of differing pixels tolerated (anti-aliasing / gradient noise).
DIFF_TOLERANCE = 0.005

UPDATE = "--update" in sys.argv
failures: list[str] = []


def check(ok: bool, label: str) -> None:
    print(("  PASS  " if ok else "  FAIL  ") + label)
    if not ok:
        failures.append(label)


def compare(name: str) -> None:
    base, cur = BASELINE / f"hero-{name}.png", CURRENT / f"hero-{name}.png"
    if UPDATE or not base.exists():
        base.parent.mkdir(parents=True, exist_ok=True)
        base.write_bytes(cur.read_bytes())
        print(f"  BASE  hero-{name}.png written")
        return
    a, b = Image.open(base).convert("RGB"), Image.open(cur).convert("RGB")
    if a.size != b.size:
        check(False, f"[{name}] hero size changed {a.size} -> {b.size}")
        return
    diff = ImageChops.difference(a, b)
    changed = sum(1 for px in diff.getdata() if px != (0, 0, 0))
    ratio = changed / (a.size[0] * a.size[1])
    if ratio > DIFF_TOLERANCE:
        DIFF.mkdir(parents=True, exist_ok=True)
        diff.save(DIFF / f"hero-{name}.png")
        check(False, f"[{name}] hero visual diff {ratio:.4%} > {DIFF_TOLERANCE:.2%}")
    else:
        check(True, f"[{name}] hero visual diff {ratio:.4%} within tolerance")


async def run() -> None:
    CURRENT.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for name, w, h in VIEWPORTS:
            print(f"\n== {name} ({w}x{h}) ==")
            ctx = await browser.new_context(viewport={"width": w, "height": h})
            page = await ctx.new_page()
            # Capture GA4 payloads and stop the browser from leaving the page.
            await page.add_init_script(
                "window.__ga4=[];window.dataLayer=[];"
                "const push=window.dataLayer.push.bind(window.dataLayer);"
                "window.dataLayer.push=(...items)=>{for(const it of items){"
                "const a=Array.isArray(it)?it:Array.from(it||[]);"
                "if(a[0]==='event')window.__ga4.push({name:a[1],params:a[2]||{}});}return push(...items);};"
                "window.gtag=(...a)=>window.dataLayer.push(a);"
                "document.addEventListener('click',e=>{const t=e.target;"
                "const a=t&&t.closest&&t.closest('a[href*=\"calendly.com\"]');"
                "if(a)e.preventDefault();},true);"
            )
            await page.goto(BASE_URL, wait_until="domcontentloaded")
            hero = page.locator('section[aria-label*="Freelance Digital Consultant"]').first
            await hero.wait_for(state="visible")
            # Freeze animation-driven pixels so the diff only reflects real layout/UI change.
            await page.add_style_tag(
                content=(
                    "*,*::before,*::after{animation:none!important;"
                    "transition:none!important;caret-color:transparent!important}"
                )
            )
            await page.wait_for_timeout(1500)  # settle entry animations

            # 1. exactly one booking CTA in the hero
            links = hero.get_by_role("link")
            booking = []
            for i in range(await links.count()):
                el = links.nth(i)
                text = (await el.inner_text() or "") + " " + (await el.get_attribute("aria-label") or "")
                if BOOKING_RE.search(text):
                    booking.append(el)
            check(len(booking) == 1, f"[{name}] exactly one hero booking CTA (found {len(booking)})")
            if not booking:
                await ctx.close()
                continue
            cta = booking[0]

            # 2. Calendly URL + UTM params
            href = await cta.get_attribute("href") or ""
            u = urlparse(href)
            q = {k: v[0] for k, v in parse_qs(u.query).items()}
            check(u.netloc == "calendly.com" and u.path == CALENDLY_PATH, f"[{name}] booking href -> Calendly ({href})")
            for k, v in EXPECTED_UTM.items():
                check(q.get(k) == v, f"[{name}] {k}={v} (got {q.get(k)!r})")
            check(bool(q.get("utm_content")), f"[{name}] utm_content present (got {q.get('utm_content')!r})")

            # 3. visual regression of the hero section.
            # The smart-offer panel rotates copy and runs a live countdown, so it is
            # masked out — layout shifts elsewhere in the hero still get flagged.
            masks = [
                page.locator('section[aria-label*="Freelance Digital Consultant"] [data-testid="smart-offer-banner"]')
            ]
            await hero.screenshot(path=str(CURRENT / f"hero-{name}.png"), mask=masks)
            compare(name)

            # 4. accessibility: accessible name, focusability, keyboard activation
            label = await cta.get_attribute("aria-label")
            check(bool(label and BOOKING_RE.search(label)), f"[{name}] accessible name: {label!r}")
            check(await cta.get_attribute("tabindex") is None, f"[{name}] no tabindex override (natural focus order)")
            await cta.focus()
            focused = await page.evaluate(
                "el => document.activeElement === el && getComputedStyle(el).outlineStyle !== undefined",
                await cta.element_handle(),
            )
            check(bool(focused), f"[{name}] CTA is keyboard-focusable")
            await page.keyboard.press("Enter")
            await page.wait_for_timeout(400)
            events = await page.evaluate("window.__ga4.map(e => e.name)")
            check("calendly_cta_click" in events, f"[{name}] keyboard activation fires calendly_cta_click")

            # 5. GA4 conversion payload + single-fire on double tap
            await page.evaluate("window.__ga4 = []")
            await page.wait_for_timeout(3100)  # clear the client-side dedup window
            await cta.click()
            await cta.click()  # double-tap must not double-count
            await page.wait_for_timeout(400)
            fired = await page.evaluate("window.__ga4")
            leads = [e for e in fired if e["name"] == "generate_lead"]
            check(len(leads) == 1, f"[{name}] generate_lead fired exactly once (got {len(leads)})")
            if leads:
                pr = leads[0]["params"]
                check(
                    pr.get("method") == "calendly"
                    and pr.get("source") == "hero"
                    and pr.get("campaign") == "discovery_call"
                    and pr.get("currency") == "INR",
                    f"[{name}] generate_lead params: {pr}",
                )
            clicks = [e for e in fired if e["name"] == "calendly_cta_click"]
            check(len(clicks) == 1, f"[{name}] calendly_cta_click fired exactly once (got {len(clicks)})")
            if clicks:
                check(clicks[0]["params"].get("source") == "hero", f"[{name}] click source=hero")

            await ctx.close()
        await browser.close()


asyncio.run(run())
print("\n" + ("ALL CHECKS PASSED" if not failures else f"{len(failures)} FAILED:\n- " + "\n- ".join(failures)))
sys.exit(1 if failures else 0)