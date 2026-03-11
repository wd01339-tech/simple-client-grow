import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const WHATSAPP_PHONE_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID") || "";
const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_ACCESS_TOKEN") || "";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const FOLLOWUP_24H = `Hello 👋
Just checking if you still need help with your website or online business growth.

Feel free to reply anytime.

You can also explore our services:
https://freelancedigitalconsultant.great-site.net/`;

const FOLLOWUP_48H = `We're always happy to help with:

• website development
• SEO and Google visibility
• digital marketing consulting

Let us know if you'd like a Free Website & GMB Audit.

Visit: https://freelancedigitalconsultant.great-site.net/free-audit`;

const FOLLOWUP_72H = `Just a friendly reminder 😊

We offer a completely free Website & Google My Business Audit.

If you'd like one, just reply "AUDIT" and we'll get started.

Wishing you success with your business!`;

async function sendWhatsAppMessage(to: string, text: string) {
  if (!WHATSAPP_PHONE_ID || !WHATSAPP_TOKEN) {
    console.log("WhatsApp API not configured, skipping followup to:", to);
    return null;
  }

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
      text: { body: text },
    }),
  });

  return await res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const now = new Date();
    const h24 = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const h48 = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();
    const h72 = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString();
    const h96 = new Date(now.getTime() - 96 * 60 * 60 * 1000).toISOString();

    // Get distinct phone numbers with their last message timestamps
    // Find conversations where the last message was outgoing (we sent, they didn't reply)
    const { data: conversations } = await supabase
      .from("whatsapp_messages")
      .select("customer_phone, created_at, direction, conversation_status")
      .in("conversation_status", ["active", "waiting"])
      .order("created_at", { ascending: false });

    if (!conversations || conversations.length === 0) {
      return new Response(
        JSON.stringify({ status: "no conversations to follow up" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Group by phone, get last message per phone
    const phoneMap = new Map<string, { lastMsg: string; lastDirection: string; status: string }>();
    for (const msg of conversations) {
      if (!phoneMap.has(msg.customer_phone)) {
        phoneMap.set(msg.customer_phone, {
          lastMsg: msg.created_at,
          lastDirection: msg.direction,
          status: msg.conversation_status,
        });
      }
    }

    let followupsSent = 0;

    for (const [phone, info] of phoneMap) {
      // Only follow up if last message was outgoing (we sent, they haven't replied)
      if (info.lastDirection !== "outgoing") continue;
      // Don't follow up closed or handover conversations
      if (info.status === "closed" || info.status === "handover") continue;

      const lastTime = new Date(info.lastMsg).getTime();
      let followupText: string | null = null;

      // Check how many follow-ups already sent
      const { count } = await supabase
        .from("whatsapp_messages")
        .select("*", { count: "exact", head: true })
        .eq("customer_phone", phone)
        .eq("direction", "outgoing")
        .eq("detected_intent", "followup");

      const followupCount = count || 0;

      if (followupCount === 0 && lastTime < new Date(h24).getTime() && lastTime > new Date(h48).getTime()) {
        followupText = FOLLOWUP_24H;
      } else if (followupCount === 1 && lastTime < new Date(h48).getTime() && lastTime > new Date(h72).getTime()) {
        followupText = FOLLOWUP_48H;
      } else if (followupCount === 2 && lastTime < new Date(h72).getTime() && lastTime > new Date(h96).getTime()) {
        followupText = FOLLOWUP_72H;
      }

      if (followupText) {
        await sendWhatsAppMessage(phone, followupText);

        // Store follow-up message
        await supabase.from("whatsapp_messages").insert({
          customer_phone: phone,
          message_text: followupText,
          direction: "outgoing",
          detected_intent: "followup",
          menu_state: "followup",
          conversation_status: "waiting",
        });

        // Update conversation status
        await supabase
          .from("whatsapp_messages")
          .update({ conversation_status: "waiting" })
          .eq("customer_phone", phone)
          .eq("conversation_status", "active");

        followupsSent++;
      }
    }

    return new Response(
      JSON.stringify({ status: "ok", followups_sent: followupsSent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Followup error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
