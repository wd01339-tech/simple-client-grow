/**
 * Google Analytics 4 + Custom Event Tracking
 * 
 * Replace GA_MEASUREMENT_ID with your actual GA4 ID (e.g. G-XXXXXXXXXX)
 * To get one: https://analytics.google.com → Admin → Data Streams → Web
 */

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: Replace with your actual GA4 Measurement ID

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

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
  if (!initialized) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title || document.title,
  });
}

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (!initialized) return;
  window.gtag("event", eventName, params);
}

/**
 * Track a conversion (e.g. form submission)
 */
export function trackConversion(conversionLabel: string, value?: number) {
  if (!initialized) return;
  window.gtag("event", "conversion", {
    send_to: `${GA_MEASUREMENT_ID}/${conversionLabel}`,
    value: value || 1,
    currency: "INR",
  });
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
} as const;
