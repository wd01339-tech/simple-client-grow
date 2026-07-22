// Calendly webhook receiver.
// Handles `invitee.created` and `invitee.canceled` events. Creates a lead
// tagged with the UTM params Calendly echoes back from the booking URL so
// each booking can be attributed to the exact CTA that produced it.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SIGNING_KEY = Deno.env.get("CALENDLY_WEBHOOK_SIGNING_KEY"); // optional

async function verifySignature(rawBody: string, header: string | null): Promise<boolean> {
  if (!SIGNING_KEY) return true; // signature enforcement optional
  if (!header) return false;
  // Calendly format: "t=<ts>,v1=<hmac_sha256_hex>"
  const parts = Object.fromEntries(
    header.split(",").map((p) => p.trim().split("=") as [string, string]),
  );
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SIGNING_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`${t}.${rawBody}`));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex === v1;
}

function pickTracking(tracking: Record<string, unknown> | undefined) {
  if (!tracking) return {};
  const s = (k: string) => (typeof tracking[k] === "string" ? (tracking[k] as string) : null);
  return {
    utm_source: s("utm_source"),
    utm_medium: s("utm_medium"),
    utm_campaign: s("utm_campaign"),
    utm_term: s("utm_term"),
    utm_content: s("utm_content"),
    salesforce_uuid: s("salesforce_uuid"),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const rawBody = await req.text();
  const sigHeader = req.headers.get("Calendly-Webhook-Signature");
  if (!(await verifySignature(rawBody, sigHeader))) {
    return new Response(JSON.stringify({ error: "invalid_signature" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const eventType: string = payload?.event ?? "";
  const p = payload?.payload ?? {};
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (eventType === "invitee.created") {
    const name: string = (p.name ?? "").toString().slice(0, 255) || "Calendly Booking";
    const email: string = (p.email ?? "").toString().slice(0, 320).toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "missing_email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const tracking = pickTracking(p.tracking);
    const scheduled = p.scheduled_event ?? {};
    const questions = Array.isArray(p.questions_and_answers) ? p.questions_and_answers : [];

    // Idempotency: skip if a lead from this Calendly invitee URI already exists.
    const inviteeUri: string = p.uri ?? "";
    if (inviteeUri) {
      const { data: existing } = await supabase
        .from("leads")
        .select("id")
        .eq("email", email)
        .eq("source", "calendly_booking")
        .contains("attribution", { calendly_invitee_uri: inviteeUri })
        .maybeSingle();
      if (existing) {
        return new Response(JSON.stringify({ ok: true, deduped: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const { data: lead, error: leadErr } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        source: "calendly_booking",
        status: "new",
        lifecycle_stage: "sql", // booked a call → sales-qualified
        lead_score: 50,
        utm_source: tracking.utm_source,
        utm_medium: tracking.utm_medium,
        utm_campaign: tracking.utm_campaign,
        utm_term: tracking.utm_term, // CTA location (hero/footer/floating/…)
        utm_content: tracking.utm_content,
        notes: `Booked: ${scheduled.name ?? "30-min call"} @ ${scheduled.start_time ?? ""}`,
        attribution: {
          calendly_invitee_uri: inviteeUri,
          calendly_event_uri: scheduled.uri ?? null,
          calendly_start_time: scheduled.start_time ?? null,
          calendly_end_time: scheduled.end_time ?? null,
          calendly_source: tracking.utm_term, // convenience for admin UI
          calendly_campaign: tracking.utm_campaign,
          questions_and_answers: questions,
          ...tracking,
        },
      })
      .select("id")
      .single();

    if (leadErr) {
      console.error("[calendly-webhook] lead insert failed", leadErr);
      return new Response(
        JSON.stringify({ error: "lead_insert_failed", details: leadErr.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    await supabase.from("conversion_events").insert({
      event_type: "calendly_booking",
      lead_id: lead.id,
      score_delta: 50,
      metadata: {
        source: tracking.utm_term,
        campaign: tracking.utm_campaign,
        utm_source: tracking.utm_source,
        utm_medium: tracking.utm_medium,
        utm_content: tracking.utm_content,
        start_time: scheduled.start_time,
        invitee_uri: inviteeUri,
      },
    });

    return new Response(JSON.stringify({ ok: true, lead_id: lead.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (eventType === "invitee.canceled") {
    const email: string = (p.email ?? "").toString().toLowerCase();
    const inviteeUri: string = p.uri ?? "";
    if (email && inviteeUri) {
      await supabase
        .from("leads")
        .update({ status: "canceled", notes: `Calendly booking canceled` })
        .eq("email", email)
        .contains("attribution", { calendly_invitee_uri: inviteeUri });
    }
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, ignored: eventType }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});