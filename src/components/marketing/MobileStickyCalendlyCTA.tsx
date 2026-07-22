import { Calendar } from "lucide-react";
import { buildCalendlyUrl, trackCalendlyClick } from "@/lib/calendly";

/**
 * Mobile-only sticky Calendly discovery-call CTA.
 * Mirrors the desktop header CTA (animated gradient + Calendar icon + copy).
 * Positioned bottom-left so it does not collide with the floating WhatsApp / AI FABs at bottom-right.
 */
export const MobileStickyCalendlyCTA = () => {
  return (
    <div
      className="md:hidden fixed bottom-4 left-4 right-24 z-40 pointer-events-none"
      aria-hidden={false}
    >
      <a
        href={buildCalendlyUrl({ source: "mobile_sticky" })}
        rel="noopener"
        onClick={() => trackCalendlyClick({ source: "mobile_sticky" })}
        aria-label="Book a free 30-minute discovery call"
        title="Book a free 30-minute discovery call"
        className="pointer-events-auto flex items-center justify-center gap-2 w-full h-12 px-4 rounded-full font-semibold text-sm text-primary-foreground shadow-lg shadow-primary/30 bg-[length:200%_200%] bg-[linear-gradient(135deg,hsl(var(--primary))_0%,hsl(var(--accent))_50%,hsl(var(--primary))_100%)] animate-[gradient-shift_6s_ease_infinite] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] transition-transform"
      >
        <Calendar className="w-4 h-4" aria-hidden="true" />
        <span>Book Free Discovery Call</span>
        <span className="sr-only">— opens Calendly scheduling</span>
      </a>
    </div>
  );
};

export default MobileStickyCalendlyCTA;