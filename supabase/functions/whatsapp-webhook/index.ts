import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const WHATSAPP_PHONE_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID") || "";
const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_ACCESS_TOKEN") || "";
const VERIFY_TOKEN = Deno.env.get("WHATSAPP_VERIFY_TOKEN") || "";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// ── Auto-reply templates ──────────────────────────────────────────────

const WELCOME_MESSAGE = `Hello 👋
Thank you for contacting Freelance Digital Consultant.

I help businesses grow online with:

• Website Development
• Google My Business Optimization
• SEO & Digital Marketing
• Online Business Consulting

You can also explore services here:
https://freelancedigitalconsultant.great-site.net/

How can I help you today?

Please reply with a number:

1️⃣ Free Website & GMB Audit
2️⃣ Website Development
3️⃣ Google My Business Optimization
4️⃣ Digital Marketing Services
5️⃣ Pricing Information
6️⃣ Ask a Question`;

const MENU_RESPONSES: Record<string, { text: string; intent: string; menuState: string }> = {
  "1": {
    intent: "free-audit",
    menuState: "audit-details",
    text: `Great choice 👍

We offer a Free Website & Google My Business Audit.

Please send:

• Your website link
• Your business type
• Your business location

Our consultant will review and send helpful suggestions.`,
  },
  "2": {
    intent: "website-dev",
    menuState: "website-submenu",
    text: `We help businesses build professional websites that attract customers.

Our services include:

• Business websites
• Tourism and homestay websites
• Ecommerce websites
• Lead generation landing pages

Would you like:

1️⃣ Website consultation
2️⃣ Website pricing
3️⃣ Free website audit`,
  },
  "3": {
    intent: "gmb-help",
    menuState: "gmb-info",
    text: `We optimize Google Business Profiles so your business ranks higher in local searches.

Our GMB services include:

• Profile optimization
• Review management strategy
• Local SEO improvements
• Google Maps ranking

Would you like a Free GMB Audit?
Reply YES to get started.`,
  },
  "4": {
    intent: "digital-marketing",
    menuState: "marketing-info",
    text: `We offer comprehensive digital marketing services:

• SEO & Content Strategy
• Social Media Management
• Lead Generation Campaigns
• Analytics & Reporting

Would you like to discuss a marketing plan for your business?
Reply YES or tell us about your needs.`,
  },
  "5": {
    intent: "pricing",
    menuState: "pricing-info",
    text: `Our pricing depends on the type of service and business requirements.

You can request:

• Website package pricing
• SEO service pricing
• Custom consulting quote

Tell us which service you are interested in.

You can also view packages here:
https://freelancedigitalconsultant.great-site.net/pricing`,
  },
  "6": {
    intent: "general",
    menuState: "question",
    text: `Of course! I'm happy to help 😊

Please type your question and I'll do my best to assist.

If I can't answer, I'll connect you with a consultant.`,
  },
};

const HANDOVER_MESSAGE = `Thank you for your question.

A consultant will review your message and respond shortly.

In the meantime, you can explore our services:
https://freelancedigitalconsultant.great-site.net/`;

const WEBSITE_LINK_MESSAGE = `You can explore our services here:

https://freelancedigitalconsultant.great-site.net/

This website includes information about:

• consulting services
• business growth strategies
• website development solutions`;

// ── Send WhatsApp message via Meta Cloud API ──────────────────────────

async function sendWhatsAppMessage(to: string, text: string) {
  if (!WHATSAPP_PHONE_ID || !WHATSAPP_TOKEN) {
    console.log("WhatsApp API not configured, skipping send. Message:", text.substring(0, 50));
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

  const data = await res.json();
  if (!res.ok) {
    console.error("WhatsApp send error:", JSON.stringify(data));
  }
  return data;
}

// ── Store message in DB ───────────────────────────────────────────────

async function storeMessage(
  messageId: string | null,
  phone: string,
  name: string | null,
  text: string,
  direction: "incoming" | "outgoing",
  intent: string | null,
  menuState: string | null,
  status: string = "active"
) {
  const { error } = await supabase.from("whatsapp_messages").insert({
    message_id: messageId,
    customer_phone: phone,
    customer_name: name,
    message_text: text,
    direction,
    detected_intent: intent,
    menu_state: menuState,
    conversation_status: status,
  });
  if (error) console.error("Store message error:", error);
}

// ── Get or create lead from WhatsApp contact ──────────────────────────

async function getOrCreateLead(phone: string, name: string | null) {
  // Check if lead exists by phone
  const { data: existing } = await supabase
    .from("leads")
    .select("id, lead_score")
    .eq("phone", phone)
    .limit(1);

  if (existing && existing.length > 0) {
    // Update score for returning visitor (+5)
    await supabase
      .from("leads")
      .update({ lead_score: existing[0].lead_score + 5 })
      .eq("id", existing[0].id);
    return existing[0].id;
  }

  // Create new lead
  const { data: newLead, error } = await supabase
    .from("leads")
    .insert({
      name: name || "WhatsApp User",
      email: `wa_${phone}@whatsapp.placeholder`,
      phone,
      source: "whatsapp-auto",
      lead_score: 5,
      inquiry_topic: "whatsapp-conversation",
    })
    .select("id")
    .single();

  if (error) {
    console.error("Lead creation error:", error);
    return null;
  }
  return newLead?.id;
}

// ── Get last conversation state for a phone number ────────────────────

async function getLastMenuState(phone: string): Promise<string | null> {
  const { data } = await supabase
    .from("whatsapp_messages")
    .select("menu_state, direction")
    .eq("customer_phone", phone)
    .eq("direction", "outgoing")
    .order("created_at", { ascending: false })
    .limit(1);

  return data?.[0]?.menu_state || null;
}

// ── Determine response based on message + state ───────────────────────

function getAutoReply(
  messageText: string,
  menuState: string | null
): { text: string; intent: string; menuState: string } {
  const trimmed = messageText.trim().toLowerCase();

  // Main menu selections
  if (MENU_RESPONSES[trimmed]) {
    return MENU_RESPONSES[trimmed];
  }

  // YES responses in various states
  if (["yes", "yeah", "sure", "ok", "okay", "yep"].includes(trimmed)) {
    if (menuState === "gmb-info" || menuState === "marketing-info") {
      return {
        intent: "consultation",
        menuState: "collecting-details",
        text: `Great! To get started, please share:\n\n• Your business name\n• Your website (if any)\n• Your business location\n\nOur consultant will reach out to you shortly.`,
      };
    }
  }

  // Website-related keywords
  if (trimmed.includes("website") || trimmed.includes("site") || trimmed.includes("web")) {
    return {
      intent: "website-dev",
      menuState: "website-submenu",
      text: MENU_RESPONSES["2"].text,
    };
  }

  // Pricing keywords
  if (trimmed.includes("price") || trimmed.includes("cost") || trimmed.includes("how much") || trimmed.includes("pricing")) {
    return {
      intent: "pricing",
      menuState: "pricing-info",
      text: MENU_RESPONSES["5"].text,
    };
  }

  // Audit keywords
  if (trimmed.includes("audit") || trimmed.includes("review") || trimmed.includes("check")) {
    return {
      intent: "free-audit",
      menuState: "audit-details",
      text: MENU_RESPONSES["1"].text,
    };
  }

  // SEO / Google keywords
  if (trimmed.includes("seo") || trimmed.includes("google") || trimmed.includes("gmb") || trimmed.includes("maps")) {
    return {
      intent: "gmb-help",
      menuState: "gmb-info",
      text: MENU_RESPONSES["3"].text,
    };
  }

  // Marketing keywords
  if (trimmed.includes("marketing") || trimmed.includes("social media") || trimmed.includes("ads")) {
    return {
      intent: "digital-marketing",
      menuState: "marketing-info",
      text: MENU_RESPONSES["4"].text,
    };
  }

  // Hello / greeting
  if (["hi", "hello", "hey", "hola", "good morning", "good afternoon", "good evening"].some(g => trimmed.startsWith(g))) {
    return { intent: "general", menuState: "main", text: WELCOME_MESSAGE };
  }

  // Fallback: handover to human
  return {
    intent: "handover",
    menuState: "handover",
    text: HANDOVER_MESSAGE,
  };
}

// ── Update lead score based on intent ─────────────────────────────────

async function updateLeadScore(phone: string, intent: string) {
  const scoreMap: Record<string, number> = {
    "free-audit": 20,
    "website-dev": 15,
    "gmb-help": 10,
    "digital-marketing": 10,
    "pricing": 15,
    "consultation": 30,
    "general": 5,
    "handover": 5,
  };

  const delta = scoreMap[intent] || 5;

  const { data: lead } = await supabase
    .from("leads")
    .select("id, lead_score")
    .eq("phone", phone)
    .limit(1);

  if (lead && lead.length > 0) {
    await supabase
      .from("leads")
      .update({
        lead_score: lead[0].lead_score + delta,
        inquiry_topic: intent,
      })
      .eq("id", lead[0].id);
  }
}

// ── Main handler ──────────────────────────────────────────────────────

Deno.serve(async (req) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);

  // ── GET: Webhook verification (Meta requires this) ──────────────
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified");
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  // ── POST: Incoming messages ─────────────────────────────────────
  if (req.method === "POST") {
    try {
      const body = await req.json();

      // Meta sends a specific structure
      const entry = body?.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      if (!value?.messages || value.messages.length === 0) {
        // Status update or other non-message event
        return new Response(JSON.stringify({ status: "ok" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      for (const message of value.messages) {
        const from = message.from; // sender phone
        const msgId = message.id;
        const msgText = message.text?.body || "";
        const contactName =
          value.contacts?.[0]?.profile?.name || null;

        console.log(`Incoming from ${from}: ${msgText}`);

        // 1. Store incoming message
        await storeMessage(msgId, from, contactName, msgText, "incoming", null, null);

        // 2. Get or create lead
        await getOrCreateLead(from, contactName);

        // 3. Get conversation state
        const lastMenuState = await getLastMenuState(from);

        // 4. Determine reply
        const reply = getAutoReply(msgText, lastMenuState);

        // 5. Update lead score
        await updateLeadScore(from, reply.intent);

        // 6. Send reply
        const sendResult = await sendWhatsAppMessage(from, reply.text);
        const outMsgId = sendResult?.messages?.[0]?.id || null;

        // 7. Store outgoing message
        await storeMessage(
          outMsgId,
          from,
          contactName,
          reply.text,
          "outgoing",
          reply.intent,
          reply.menuState
        );
      }

      return new Response(JSON.stringify({ status: "processed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  }

  return new Response("Method not allowed", { status: 405 });
});
