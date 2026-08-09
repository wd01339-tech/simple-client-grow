import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Hero } from "../Hero";

// Isolate the hero from backend + media side effects.
vi.mock("@/lib/conversions", () => ({ recordConversion: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { functions: { invoke: vi.fn() }, from: vi.fn() },
}));

const CALENDLY_BASE = "https://calendly.com/consultantb84/30min";
const BOOKING_LABEL = /book (my )?free (discovery )?call/i;

/** Emulate a breakpoint. Tailwind classes don't apply in jsdom, so this asserts
 *  markup-level invariants that must hold at every width. */
const BREAKPOINTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
] as const;

function setViewport(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: width });
  Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: height });
  window.dispatchEvent(new Event("resize"));
}

function renderHero() {
  return render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  );
}

function heroSection(): HTMLElement {
  const section = document.querySelector("section");
  if (!section) throw new Error("hero section not rendered");
  return section as HTMLElement;
}

describe("Hero booking CTA", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    window.dataLayer = [];
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  for (const bp of BREAKPOINTS) {
    it(`renders exactly one booking CTA in the hero at ${bp.name}`, () => {
      setViewport(bp.width, bp.height);
      renderHero();

      const links = within(heroSection())
        .getAllByRole("link")
        .filter((el) => BOOKING_LABEL.test(el.textContent ?? "") || BOOKING_LABEL.test(el.getAttribute("aria-label") ?? ""));

      expect(links).toHaveLength(1);
    });

    it(`booking CTA points at Calendly with UTM attribution at ${bp.name}`, () => {
      setViewport(bp.width, bp.height);
      renderHero();

      const cta = within(heroSection()).getByRole("link", { name: BOOKING_LABEL });
      const href = cta.getAttribute("href") ?? "";
      expect(href.startsWith(`${CALENDLY_BASE}?`)).toBe(true);

      const params = new URL(href).searchParams;
      expect(params.get("utm_source")).toBe("website");
      expect(params.get("utm_medium")).toBe("cta_button");
      expect(params.get("utm_campaign")).toBe("discovery_call");
      expect(params.get("utm_term")).toBe("hero");
      expect(params.get("utm_content")).toBeTruthy();
    });
  }

  it("exposes an accessible name and keyboard focus (WCAG 2.1 AA)", async () => {
    const user = userEvent.setup();
    renderHero();

    const cta = within(heroSection()).getByRole("link", { name: BOOKING_LABEL });

    // Screen-reader label
    expect(cta.getAttribute("aria-label")).toMatch(/book a free .*call/i);
    // Real anchor => natively focusable and Enter-activatable, no tabindex hacks
    expect(cta.tagName).toBe("A");
    expect(cta).toHaveAttribute("href");
    expect(cta).not.toHaveAttribute("tabindex");
    expect(cta.getAttribute("aria-hidden")).toBeNull();

    // Focus order: reachable by keyboard, and focus is visible via focus-visible ring
    cta.focus();
    expect(document.activeElement).toBe(cta);
    await user.keyboard("{Enter}");
    expect(document.activeElement).toBe(cta);
  });

  it("fires the GA4 conversion event with UTM parameters on click", async () => {
    const user = userEvent.setup();
    renderHero();

    const cta = within(heroSection()).getByRole("link", { name: BOOKING_LABEL });
    await user.click(cta);

    const calls = (window.gtag as unknown as ReturnType<typeof vi.fn>).mock.calls;
    const events = calls.filter((c) => c[0] === "event");
    const names = events.map((c) => c[1]);

    expect(names).toContain("calendly_cta_click");
    expect(names).toContain("generate_lead");

    const lead = events.find((c) => c[1] === "generate_lead")?.[2] as Record<string, unknown>;
    expect(lead).toMatchObject({
      method: "calendly",
      source: "hero",
      campaign: "discovery_call",
      currency: "INR",
      value: 1,
    });

    // Fires exactly once per event name even on a double-tap (dedup window)
    await user.click(cta);
    const after = (window.gtag as unknown as ReturnType<typeof vi.fn>).mock.calls
      .filter((c) => c[0] === "event" && c[1] === "generate_lead");
    expect(after).toHaveLength(1);
  });
});