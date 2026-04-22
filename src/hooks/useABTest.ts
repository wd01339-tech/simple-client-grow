/**
 * Simple A/B test hook with localStorage persistence
 * Tracks variant assignment and click events via GA4
 */
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Variant = "A" | "B";

export function useABTest(testName: string): {
  variant: Variant;
  trackClick: () => void;
} {
  const [variant] = useState<Variant>(() => {
    const key = `ab_test_${testName}`;
    const stored = localStorage.getItem(key);
    if (stored === "A" || stored === "B") return stored;
    const picked: Variant = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem(key, picked);
    return picked;
  });

  const trackClick = () => {
    trackEvent("ab_test_click", {
      test_name: testName,
      variant,
    });
  };

  return { variant, trackClick };
}