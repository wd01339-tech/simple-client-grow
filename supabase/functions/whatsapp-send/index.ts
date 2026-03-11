import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const WHATSAPP_PHONE_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID") || "";
const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_ACCESS_TOKEN") || "";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(
      authHeader.replace("Bearer ", "")
    );
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;

    // Check admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (!roles?.some((r: any) => r.role === "admin")) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { to, message } = await req.json();

    if (!to || !message) {
      return new Response(
        JSON.stringify({ error: "Missing 'to' and 'message' fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!WHATSAPP_PHONE_ID || !WHATSAPP_TOKEN) {
      return new Response(
        JSON.stringify({ error: "WhatsApp API not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send via Meta Cloud API
    const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_ID}/messages`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "WhatsApp API error", details: data }),
        { status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store outgoing message
    await supabase.from("whatsapp_messages").insert({
      message_id: data?.messages?.[0]?.id || null,
      customer_phone: to,
      message_text: message,
      direction: "outgoing",
      detected_intent: "manual",
      menu_state: "manual",
      conversation_status: "active",
    });

    return new Response(JSON.stringify({ status: "sent", data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Send error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
