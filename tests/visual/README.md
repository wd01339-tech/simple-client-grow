# Hero E2E + visual regression

Two layers guard the hero "Book Free Call" CTA:

- `src/components/home/__tests__/Hero.test.tsx` (Vitest + jsdom) — asserts exactly one
  booking CTA per breakpoint, the Calendly URL + UTM params, accessible name / focus
  order / keyboard activation, and that GA4 `calendly_cta_click` + `generate_lead`
  fire once per click. Run with `npm test`.
- `tests/visual/hero_visual.py` (Playwright + Chromium) — runs the same assertions
  against the live app plus pixel-diff screenshots of the hero at desktop / tablet /
  mobile.

```bash
python3 tests/visual/hero_visual.py            # verify (fails on regressions)
python3 tests/visual/hero_visual.py --update    # accept new baselines after an intended change
```

Baselines live in `baseline/`, the latest captures in `current/`, and pixel diffs of
failures in `diff/`. Animations are disabled during capture; the sticky header, the
smart offer banner and fixed floating buttons are masked because their copy/countdown
rotates. Tolerance: 1% of pixels.

GA4 note: events are mirrored to `window.dataLayer` even when `VITE_GA_MEASUREMENT_ID`
is unset, so DebugView-style verification works in any environment.
