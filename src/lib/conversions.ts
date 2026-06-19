import { supabase } from "@/integrations/supabase/client";
import { getUTMParams } from "@/hooks/useUTMTracking";

export type ConversionEventType =
  | "marquee_offer_click"
  | "chatbot_optin"
  | "whatsapp_click"
  | "consultation_booked"
  | "payment_completed"
  | "audit_request"
  | "contact_form"
  | "pricing_view"
  | "video_engagement";

interface RecordOpts {
  event_type: ConversionEventType;
  lead?: {
    id?: string;
    email?: string;
    name?: string;
    phone?: string;
    source?: string;
    inquiry_topic?: string;
    business_type?: string;
    message?: string;
  };
  metadata?: Record<string, unknown>;
  /** Extra attribution fields merged on top of UTM + page URL */
  attribution?: Record<string, unknown>;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem("crm_session_id");
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem("crm_session_id", id);
  }
  return id;
}

export async function recordConversion(opts: RecordOpts) {
  try {
    const utm = getUTMParams();
    const attribution = {
      ...utm,
      source_url: typeof window !== "undefined" ? window.location.href : null,
      referrer: typeof document !== "undefined" ? document.referrer : null,
      page: typeof window !== "undefined" ? window.location.pathname : null,
      ...(opts.attribution ?? {}),
    };
    await supabase.functions.invoke("record-conversion", {
      body: {
        event_type: opts.event_type,
        session_id: getSessionId(),
        lead: opts.lead,
        metadata: opts.metadata,
        attribution,
      },
    });
  } catch (e) {
    console.warn("recordConversion failed", e);
  }
}