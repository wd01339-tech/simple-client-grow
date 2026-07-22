/**
 * Centralized helpers for Calendly CTA links.
 * - Appends UTM parameters so each booking can be attributed to the
 *   originating page + button placement.
 * - Exposes a click handler that fires GA + CRM conversion events.
 */
import { trackEvent, ConversionEvents } from "@/lib/analytics";
import { recordConversion } from "@/lib/conversions";

const CALENDLY_BASE = "https://calendly.com/consultantb84/30min";

export interface CalendlyCTAOptions {
  /** Placement identifier, e.g. "hero", "header_desktop", "footer". */
  source: string;
  /** Optional campaign override; defaults to "discovery_call". */
  campaign?: string;
  /** Optional content/variant label (e.g. A/B test variant). */
  content?: string;
}

/**
 * Build a Calendly URL with UTM parameters based on the current page and CTA placement.
 */
export function buildCalendlyUrl(opts: CalendlyCTAOptions): string {
  const { source, campaign = "discovery_call", content } = opts;
  const page =
    typeof window !== "undefined" && window.location?.pathname
      ? window.location.pathname.replace(/^\//, "") || "home"
      : "home";

  const params = new URLSearchParams({
    utm_source: "website",
    utm_medium: "cta_button",
    utm_campaign: campaign,
    utm_term: source,
    utm_content: content ?? page,
  });

  return `${CALENDLY_BASE}?${params.toString()}`;
}

/**
 * Fire GA + CRM conversion events for a Calendly CTA click.
 * Safe to call inside an anchor onClick — non-blocking.
 */
export function trackCalendlyClick(opts: CalendlyCTAOptions): void {
  const { source, campaign = "discovery_call", content } = opts;
  const page =
    typeof window !== "undefined" && window.location?.pathname
      ? window.location.pathname
      : "/";

  // GA / custom analytics
  trackEvent("calendly_cta_click", {
    source,
    campaign,
    content: content ?? page,
    page,
  });
  trackEvent(ConversionEvents.CTA_CLICK, {
    cta: "calendly",
    source,
    page,
  });
  // GA4 recommended conversion event for booked-call intent.
  // Mark as a conversion in GA4 → Admin → Events for reporting.
  trackEvent(ConversionEvents.GENERATE_LEAD, {
    method: "calendly",
    source,
    campaign,
    content: content ?? page,
    page,
    value: 1,
    currency: "INR",
  });

  // CRM / Supabase conversion pipeline
  void recordConversion({
    event_type: "consultation_booked",
    metadata: {
      stage: "calendly_click",
      source,
      campaign,
      content: content ?? page,
    },
    attribution: {
      calendly_source: source,
      calendly_campaign: campaign,
    },
  });
}