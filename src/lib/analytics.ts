/**
 * Google Analytics 4 + Custom Event Tracking
 *
 * Set VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) to enable real GA4 delivery.
 * To get one: https://analytics.google.com → Admin → Data Streams → Web
 *
 * Every tracked event is ALSO pushed to window.dataLayer regardless of whether
 * GA4 is configured, so events stay observable in DebugView / automated tests.
 */

const GA_MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || "G-XXXXXXXXXX";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** Always-on event mirror so tests/DebugView can observe events pre-config. */
function pushToDataLayer(args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Initialize Google Analytics (call once on app load)
 */
export function initGA() {
  if (initialized || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
      console.info("[Analytics] GA not configured — set GA_MEASUREMENT_ID in src/lib/analytics.ts");
    }
    return;
  }

  // Load gtag.js script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false, // We send manually per route
  });

  initialized = true;
}

/**
 * Track a page view
 */
export function trackPageView(path: string, title?: string) {
  const params = { page_path: path, page_title: title || document.title };
  if (!initialized) return pushToDataLayer(["event", "page_view", params]);
  window.gtag("event", "page_view", params);
}

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (!initialized) return pushToDataLayer(["event", eventName, params]);
  window.gtag("event", eventName, params);
}

/**
 * Track a conversion (e.g. form submission)
 */
export function trackConversion(conversionLabel: string, value?: number) {
  const params = {
    send_to: `${GA_MEASUREMENT_ID}/${conversionLabel}`,
    value: value || 1,
    currency: "INR",
  };
  if (!initialized) return pushToDataLayer(["event", "conversion", params]);
  window.gtag("event", "conversion", params);
}

// Pre-defined conversion events
export const ConversionEvents = {
  AUDIT_FORM_SUBMIT: "audit_form_submit",
  AUDIT_FORM_VIEW: "audit_form_view",
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  WHATSAPP_CLICK: "whatsapp_click",
  SAMPLE_AUDIT_VIEW: "sample_audit_view",
  CTA_CLICK: "cta_click",
  CALL_CTA_CLICK: "call_cta_click",
  AB_TEST_CLICK: "ab_test_click",
  CALENDLY_CTA_CLICK: "calendly_cta_click",
  GENERATE_LEAD: "generate_lead",
} as const;
