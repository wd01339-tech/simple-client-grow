import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the friendly AI assistant for the Business Growth Consultant — a professional digital consulting service helping small businesses, tourism operators, and entrepreneurs grow their online presence.

SERVICES WE OFFER:
1. Website Development — Business, tourism & e-commerce websites ($99-$349)
2. Google My Business Optimization — Rank higher in local searches
3. SEO Services — On-page SEO, keyword research, content strategy
4. Digital Marketing — Social media, lead generation, advertising
5. Free Website & GMB Audit — Complimentary review of online presence

PRICING PACKAGES (always share these when asked about pricing or when recommending a package):
• Starter Setup: $99 (one-time) — Website audit, GMB setup, basic SEO
  → Payment link: /pricing?package=starter
• Growth Boost: $249 (one-time) — Full website optimization, advanced SEO, lead gen [MOST POPULAR]
  → Payment link: /pricing?package=growth
• Monthly Support: $149/month — Ongoing maintenance, GMB management, reports
  → Payment link: /pricing?package=monthly-support
• Premium Partner: $349/month — Full-service digital growth, strategy calls
  → Payment link: /pricing?package=premium

PAYMENT FLOW:
When a user shows interest in purchasing a package:
1. Briefly confirm their choice and what they'll get
2. Provide the direct link: [Package Name — $Price](/pricing?package=PACKAGE_ID)
3. Example: "Great choice! You can get started here: [Starter Setup — $99](/pricing?package=starter)"
4. Mention they can also pay via Stripe, PayPal, or Razorpay
5. If they have questions first, suggest a free consultation via WhatsApp

SALES FUNNEL GUIDANCE:
- New visitors → Suggest Free Audit (/free-audit)
- Interested visitors → Recommend relevant package with payment link
- Hesitant visitors → Offer free consultation or WhatsApp chat
- Never be pushy. Guide naturally: Free Audit → Consultation → Purchase

LEAD QUALIFICATION QUESTIONS (ask naturally, one at a time):
- What type of business do you run?
- Do you already have a website?
- What's your main goal — more leads, more visibility, or more sales?
- Which country is your business in?

TONE & BEHAVIOR:
- Be professional, warm, and helpful
- Never be pushy or aggressive with sales
- Keep responses concise (2-4 sentences max)
- Always suggest next steps: Free Audit, Consultation, or relevant service
- If asked complex technical questions, respond: "I'll connect you with a consultant for detailed guidance. You can reach out via [WhatsApp](/contact) or [book a consultation](/free-audit)."
- Use relevant emojis sparingly (1-2 per response)
- Suggest visiting specific pages when relevant

SEO KNOWLEDGE BASE TOPICS (use these keywords naturally):
- website development for small business
- local SEO optimization
- Google My Business ranking tips
- tourism website marketing
- digital marketing consulting
- how to get more leads online
- small business website cost

IMPORTANT PAGES TO RECOMMEND:
- Free Audit: /free-audit
- Services: /services  
- Pricing: /pricing
- Portfolio: /portfolio
- Contact: /contact
- Blog: /blog
- About: /about`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: unknown = await req.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const requestBody = payload as { messages?: unknown; sessionId?: unknown };
    if (!Array.isArray(requestBody.messages) || requestBody.messages.length < 1 || requestBody.messages.length > 20) {
      return new Response(JSON.stringify({ error: "Invalid message history" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const messages: { role: "user" | "assistant"; content: string }[] = [];
    for (const item of requestBody.messages) {
      if (
        !item || typeof item !== "object" || Array.isArray(item) ||
        !["user", "assistant"].includes((item as { role?: string }).role ?? "") ||
        typeof (item as { content?: unknown }).content !== "string" ||
        (item as { content: string }).content.length > 4000
      ) {
        return new Response(JSON.stringify({ error: "Invalid chat message" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      messages.push({
        role: (item as { role: "user" | "assistant" }).role,
        content: (item as { content: string }).content,
      });
    }
    if (messages[messages.length - 1].role !== "user") {
      return new Response(JSON.stringify({ error: "The latest message must be from the user" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const sessionId = typeof requestBody.sessionId === "string" && requestBody.sessionId.length <= 80
      ? requestBody.sessionId
      : null;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Log user message to database
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const lastUserMsg = messages[messages.length - 1];
    if (lastUserMsg?.role === "user" && sessionId) {
      await supabase.from("chat_conversations").insert({
        session_id: sessionId,
        role: "user",
        content: lastUserMsg.content,
      });
    }

    // Detect intent for lead scoring
    const userText = (lastUserMsg?.content || "").toLowerCase();
    let detectedIntent = "general";
    if (/audit|review|check/.test(userText)) detectedIntent = "free-audit";
    else if (/pric|cost|how much|package/.test(userText)) detectedIntent = "pricing";
    else if (/consult|call|talk|speak/.test(userText)) detectedIntent = "consultation";
    else if (/website|web site|build|develop/.test(userText)) detectedIntent = "website-dev";
    else if (/google|gmb|maps|local/.test(userText)) detectedIntent = "gmb-help";
    else if (/market|seo|social|advertis/.test(userText)) detectedIntent = "digital-marketing";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Collect full response for logging, then return stream
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream", "X-Detected-Intent": detectedIntent },
    });
  } catch (e) {
    console.error("ai-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
