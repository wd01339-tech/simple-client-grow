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
    const body = (await req.json()) as Payload;
    if (!body?.event_type) {
      return new Response(JSON.stringify({ error: "event_type required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Load settings
    const { data: settings } = await supabase
      .from("crm_settings")
      .select("scoring_weights, stage_thresholds, priority_thresholds")
      .eq("id", "global")
      .maybeSingle();

    const weights: Record<string, number> = settings?.scoring_weights ?? {};
    const thresholds = settings?.stage_thresholds ?? {};
    const priThresholds = settings?.priority_thresholds ?? {};
    const scoreDelta = Number(weights[body.event_type] ?? 0);

    // Resolve / upsert lead
    let leadId = body.lead?.id ?? null;
    let lead: any = null;

    if (!leadId && body.lead?.email) {
      const { data: existing } = await supabase
        .from("leads")
        .select("*")
        .eq("email", body.lead.email)
        .maybeSingle();
      if (existing) {
        leadId = existing.id;
        lead = existing;
      }
    }

    if (!leadId && body.lead?.email && body.lead?.name) {
      const { data: inserted } = await supabase
        .from("leads")
        .insert({
          name: body.lead.name,
          email: body.lead.email,
          phone: body.lead.phone ?? null,
          source: body.lead.source ?? body.event_type,
          inquiry_topic: body.lead.inquiry_topic ?? null,
          business_type: body.lead.business_type ?? null,
          message: body.lead.message ?? null,
          attribution: body.attribution ?? null,
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
      const newScore = Math.max(0, (lead.lead_score ?? 0) + scoreDelta);
      const newStage = stageFor(newScore, thresholds, lead.lifecycle_stage ?? "lead", body.event_type);
      const newPriority = priorityFor(newScore, priThresholds);
      await supabase
        .from("leads")
        .update({
          lead_score: newScore,
          lifecycle_stage: newStage,
          lead_priority: newPriority,
          attribution: body.attribution ?? lead.attribution,
        })
        .eq("id", lead.id);
    }

    // Always log event
    await supabase.from("conversion_events").insert({
      event_type: body.event_type,
      lead_id: leadId,
      session_id: body.session_id ?? null,
      score_delta: scoreDelta,
      metadata: { ...(body.metadata ?? {}), attribution: body.attribution ?? null },
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