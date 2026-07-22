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
        className="animated-gradient-btn pointer-events-auto flex items-center justify-center gap-2 w-full min-h-11 h-12 px-4 rounded-full font-semibold text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] transition-transform"
      >
        <Calendar className="w-4 h-4" aria-hidden="true" />
        <span>Book Free Discovery Call</span>
        <span className="sr-only">— opens Calendly scheduling</span>
      </a>
    </div>
  );
};

export default MobileStickyCalendlyCTA;