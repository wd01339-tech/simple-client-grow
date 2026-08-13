import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Payload {
  event_type: string;
  session_id?: string;
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
  attribution?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

const STAGE_ORDER = ["lead", "engaged", "qualified", "proposal_sent", "client", "lost"];

const ALLOWED_EVENT_TYPES = new Set([
  "marquee_offer_click",
  "chatbot_optin",
  "whatsapp_click",
  "consultation_booked",
  "payment_completed",
  "audit_request",
  "contact_form",
  "pricing_view",
  "video_engagement",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Guardrails for unauthenticated (public site visitor) callers. */
const ANON_MAX_DELTA = 25; // per-event score increment ceiling
const ANON_MAX_SCORE = 60; // cannot push a lead into the top tiers
const ANON_MAX_STAGE = "qualified"; // cannot self-promote to proposal_sent/client

async function isAdminRequest(
  supabase: ReturnType<typeof createClient>,
  req: Request,
): Promise<boolean> {
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return false;
  const { data: userData } = await supabase.auth.getUser(token);
  const uid = userData?.user?.id;
  if (!uid) return false;
  const { data: roleRow } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", uid)
    .eq("role", "admin")
    .maybeSingle();
  return Boolean(roleRow);
}

function clampStr(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

function sanitizeJson(v: unknown, maxBytes = 4000): Record<string, unknown> | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  try {
    const s = JSON.stringify(v);
    if (s.length > maxBytes) return null;
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function rankStage(s: string) {
  const i = STAGE_ORDER.indexOf(s);
  return i === -1 ? 0 : i;
}

function priorityFor(score: number, t: any) {
  if (score >= (t?.ready ?? 70)) return "ready";
  if (score >= (t?.hot ?? 41)) return "hot";
  if (score >= (t?.warm ?? 21)) return "warm";
  return "cold";
}

function stageFor(score: number, t: any, currentStage: string, eventType: string) {
  // Hard transitions for explicit milestones
  if (eventType === "payment_completed") return "client";
  if (eventType === "consultation_booked") {
    return rankStage(currentStage) < rankStage("proposal_sent") ? "proposal_sent" : currentStage;
  }
  // Score-based progression (never regress)
  let target = "lead";
  if (score >= (t?.client ?? 100)) target = "client";
  else if (score >= (t?.proposal_sent ?? 60)) target = "proposal_sent";
  else if (score >= (t?.qualified ?? 30)) target = "qualified";
  else if (score >= (t?.engaged ?? 10)) target = "engaged";
  return rankStage(target) > rankStage(currentStage) ? target : currentStage;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "invalid json" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const body = (raw ?? {}) as Payload;

    // Strict event_type allowlist — prevents forging arbitrary scoring events.
    if (!body?.event_type || !ALLOWED_EVENT_TYPES.has(body.event_type)) {
      return new Response(JSON.stringify({ error: "invalid event_type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate & clamp lead fields
    const leadInput = (body.lead && typeof body.lead === "object") ? body.lead : {};
    const safeLead = {
      id: clampStr(leadInput.id, 64),
      email: clampStr(leadInput.email, 254),
      name: clampStr(leadInput.name, 120),
      phone: clampStr(leadInput.phone, 40),
      source: clampStr(leadInput.source, 80),
      inquiry_topic: clampStr(leadInput.inquiry_topic, 200),
      business_type: clampStr(leadInput.business_type, 80),
      message: clampStr(leadInput.message, 2000),
    };
    if (safeLead.email && !EMAIL_RE.test(safeLead.email)) {
      return new Response(JSON.stringify({ error: "invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const safeAttribution = sanitizeJson(body.attribution) ?? {};
    const safeMetadata = sanitizeJson(body.metadata) ?? {};
    const safeSessionId = clampStr(body.session_id, 80);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Only admins may target an arbitrary lead by id or drive unbounded score /
    // lifecycle changes. Anonymous visitors are limited to their own email and
    // to capped, non-regressing increments so CRM data cannot be manipulated.
    const isAdmin = await isAdminRequest(supabase, req);
    if (!isAdmin) safeLead.id = null;

    // Load settings
    const { data: settings } = await supabase
      .from("crm_settings")
      .select("scoring_weights, stage_thresholds, priority_thresholds")
      .eq("id", "global")
      .maybeSingle();

    const weights: Record<string, number> = settings?.scoring_weights ?? {};
    const thresholds = settings?.stage_thresholds ?? {};
    const priThresholds = settings?.priority_thresholds ?? {};
    let scoreDelta = Number(weights[body.event_type] ?? 0);
    if (!Number.isFinite(scoreDelta)) scoreDelta = 0;
    if (!isAdmin) scoreDelta = Math.min(Math.max(scoreDelta, 0), ANON_MAX_DELTA);

    // Resolve / upsert lead
    let leadId = safeLead.id ?? null;
    let lead: any = null;

    if (!leadId && safeLead.email) {
      const { data: existing } = await supabase
        .from("leads")
        .select("*")
        .eq("email", safeLead.email)
        .maybeSingle();
      if (existing) {
        leadId = existing.id;
        lead = existing;
      }
    }

    if (!leadId && safeLead.email && safeLead.name) {
      const { data: inserted } = await supabase
        .from("leads")
        .insert({
          name: safeLead.name,
          email: safeLead.email,
          phone: safeLead.phone,
          source: safeLead.source ?? body.event_type,
          inquiry_topic: safeLead.inquiry_topic,
          business_type: safeLead.business_type,
          message: safeLead.message,
          attribution: safeAttribution,
          lead_score: 0,
        })
        .select()
        .single();
      lead = inserted;
      leadId = inserted?.id ?? null;
    } else if (leadId) {
      const { data } = await supabase.from("leads").select("*").eq("id", leadId).maybeSingle();
      lead = data;
    }

    // Update lead score & stage
    if (lead) {
      const currentScore = lead.lead_score ?? 0;
      let newScore = Math.max(0, currentScore + scoreDelta);
      if (!isAdmin) newScore = Math.min(newScore, Math.max(currentScore, ANON_MAX_SCORE));
      const currentStage = lead.lifecycle_stage ?? "lead";
      let newStage = stageFor(newScore, thresholds, currentStage, body.event_type);
      if (!isAdmin && rankStage(newStage) > rankStage(ANON_MAX_STAGE)) {
        newStage = rankStage(currentStage) > rankStage(ANON_MAX_STAGE) ? currentStage : ANON_MAX_STAGE;
      }
      const newPriority = priorityFor(newScore, priThresholds);
      await supabase
        .from("leads")
        .update({
          lead_score: newScore,
          lifecycle_stage: newStage,
          lead_priority: newPriority,
          // Never let an anonymous caller wipe stored attribution.
          attribution: Object.keys(safeAttribution).length > 0
            ? { ...(lead.attribution ?? {}), ...safeAttribution }
            : lead.attribution,
        })
        .eq("id", lead.id);
    }

    // Always log event
    await supabase.from("conversion_events").insert({
      event_type: body.event_type,
      lead_id: leadId,
      session_id: safeSessionId,
      score_delta: scoreDelta,
      metadata: { ...safeMetadata, attribution: safeAttribution },
    });

    return new Response(JSON.stringify({ ok: true, lead_id: leadId, score_delta: scoreDelta }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("record-conversion error", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});