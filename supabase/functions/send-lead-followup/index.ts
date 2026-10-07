import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]!);
}

interface FollowupRequest {
  leadId?: string;
  processAll?: boolean;
}

/**
 * 5-step nurture sequence:
 * Day 1 (24h): Quick wins they can act on immediately
 * Day 2 (48h): Gentle check-in
 * Day 3 (72h): Audit preview teaser
 * Day 5 (120h): Discovery call CTA
 * Day 7 (168h): Final friendly close
 */
const followupTemplates: Record<number, { subject: string; html: (name: string) => string; delayHours: number }> = {
  1: {
    delayHours: 24,
    subject: "3 Quick Wins to Improve Your Website Today",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <p>Hi ${name} 👋</p>
        
        <p>Thanks for requesting your <strong>Free Website & GMB Audit</strong>. While I prepare your full report, here are <strong>3 quick wins</strong> you can act on right now:</p>
        
        <div style="background: #f8f9fa; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0 0 12px 0;"><strong>1. Check your Google Business Profile</strong><br/>
          Make sure your hours, phone number, and photos are up to date. Incomplete profiles lose 70% of potential customers.</p>
          
          <p style="margin: 0 0 12px 0;"><strong>2. Add a clear Call-to-Action above the fold</strong><br/>
          Visitors should see a "Call Now" or "Get a Quote" button within 3 seconds of landing on your site.</p>
          
          <p style="margin: 0;"><strong>3. Test your site on mobile</strong><br/>
          Open your website on your phone. If it's hard to navigate or slow, you're losing over 60% of visitors.</p>
        </div>
        
        <p>Your full audit report is on the way — I'll have it ready within 24–48 hours.</p>
        
        <p>Questions? Just reply to this email or tap below:</p>
        
        <p style="margin: 20px 0;">
          <a href="https://calendly.com/consultantb84/30min" 
             style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
            📅 Book Free Call
          </a>
        </p>
        
        <p style="margin-top: 30px; color: #666;">
          Best,<br/>
          <strong>Your Freelance Web Consultant</strong><br/>
          <a href="https://simple-client-grow.lovable.app" style="color: #6366f1;">simple-client-grow.lovable.app</a>
        </p>
      </div>
    `,
  },
  2: {
    delayHours: 48,
    subject: "Checking in on your website review",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <p>Hi ${name} 👋</p>
        
        <p>Just checking in regarding your <strong>free website & Google visibility audit</strong>.</p>
        
        <p>I'm happy to share a few quick suggestions that can help improve inquiries and visibility.</p>
        
        <p><strong>Would you like me to proceed? 😊</strong></p>
        
        <p>Simply reply to this email or tap below:</p>
        
        <p style="margin: 20px 0;">
          <a href="https://calendly.com/consultantb84/30min" 
             style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
            ✅ Yes, proceed with my audit
          </a>
        </p>
        
        <p style="margin-top: 30px; color: #666;">
          Best,<br/>
          <strong>Your Freelance Web Consultant</strong>
        </p>
      </div>
    `,
  },
  3: {
    delayHours: 72,
    subject: "Here's a sneak peek of your audit report",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <p>Hi ${name} 👋</p>
        
        <p>I wanted to give you a <strong>preview</strong> of what your audit report covers:</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="margin: 0 0 16px 0; color: #6366f1;">📊 Your Audit Report Includes:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0;">📱 Mobile Responsiveness</td>
              <td style="padding: 8px 0; text-align: right; color: #6366f1;">Scored & analyzed</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0;">🔍 On-Page SEO</td>
              <td style="padding: 8px 0; text-align: right; color: #6366f1;">Keywords & meta tags</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0;">📍 Google Business Profile</td>
              <td style="padding: 8px 0; text-align: right; color: #6366f1;">Completeness check</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0;">🎯 Conversion Optimization</td>
              <td style="padding: 8px 0; text-align: right; color: #6366f1;">CTA & UX review</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">🏆 Competitor Analysis</td>
              <td style="padding: 8px 0; text-align: right; color: #6366f1;">Market positioning</td>
            </tr>
          </table>
        </div>
        
        <p>Want me to walk you through your results? I offer a <strong>free 20-minute call</strong> to discuss the findings.</p>
        
        <p style="margin: 20px 0;">
          <a href="https://calendly.com/consultantb84/30min" 
             style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
            📊 View My Full Audit
          </a>
        </p>
        
        <p style="margin-top: 30px; color: #666;">
          Best,<br/>
          <strong>Your Freelance Web Consultant</strong>
        </p>
      </div>
    `,
  },
  4: {
    delayHours: 120,
    subject: "Let's hop on a quick call — free, no obligation",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <p>Hi ${name} 👋</p>
        
        <p>I've been reviewing websites like yours and I've spotted some opportunities that could make a real difference for your business.</p>
        
        <p>I'd love to offer you a <strong>free 20-minute discovery call</strong> where we can:</p>
        
        <ul style="line-height: 1.8;">
          <li>Walk through your audit findings together</li>
          <li>Identify the #1 thing holding your website back</li>
          <li>Create a simple action plan you can start on immediately</li>
        </ul>
        
        <p><strong>No sales pitch, no pressure</strong> — just practical advice from someone who's helped dozens of businesses improve their online presence.</p>
        
        <p style="margin: 20px 0;">
          <a href="https://calendly.com/consultantb84/30min" 
             style="background: #6366f1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-size: 16px;">
            📞 Schedule My Free Call
          </a>
        </p>
        
        <p style="font-size: 14px; color: #666;">Or simply reply to this email with a time that works for you.</p>
        
        <p style="margin-top: 30px; color: #666;">
          Looking forward to chatting!<br/>
          <strong>Your Freelance Web Consultant</strong>
        </p>
      </div>
    `,
  },
  5: {
    delayHours: 168,
    subject: "Final check-in — here when you're ready",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <p>Hi ${name} 👋</p>
        
        <p>I wanted to make sure you didn't miss my earlier messages.</p>
        
        <p>Even small website improvements can help bring more guests and customers online.</p>
        
        <p>I'll pause follow-ups for now, but I'm always here if you need help with your website or online visibility.</p>
        
        <p><strong>You can message me anytime when you're ready 😊</strong></p>
        
        <p style="margin: 20px 0;">
          <a href="https://calendly.com/consultantb84/30min" 
             style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
            💬 Get in touch
          </a>
        </p>
        
        <p>Wishing you great success!</p>
        
        <p style="margin-top: 30px; color: #666;">
          Warm regards,<br/>
          <strong>Your Freelance Web Consultant</strong>
        </p>
      </div>
    `,
  },
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Authorization: require shared CRON secret for ANY invocation.
    // This function processes leads in bulk and sends emails — must never be public.
    const CRON_SECRET = Deno.env.get("CRON_SECRET");
    const provided = req.headers.get("x-cron-secret");
    if (!CRON_SECRET || provided !== CRON_SECRET) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { leadId, processAll }: FollowupRequest = await req.json();

    let leadsToProcess: any[] = [];

    if (leadId) {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("id", leadId)
        .single();

      if (error) throw error;
      if (data) leadsToProcess = [data];
    } else if (processAll) {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("status", "new")
        .lt("followup_count", 5)
        .or(`last_followup_at.is.null,last_followup_at.lt.${twentyFourHoursAgo}`);

      if (error) throw error;
      leadsToProcess = data || [];
    }

    console.log(`Processing ${leadsToProcess.length} leads for follow-up`);

    const results: { leadId: string; success: boolean; error?: string }[] = [];

    for (const lead of leadsToProcess) {
      const followupNumber = (lead.followup_count || 0) + 1;
      const template = followupTemplates[followupNumber];
      if (!template) {
        console.log(`Lead ${lead.id}: No template for followup ${followupNumber}`);
        continue;
      }

      // Check timing based on template delay
      const createdAt = new Date(lead.created_at).getTime();
      const hoursSinceCreated = (Date.now() - createdAt) / (1000 * 60 * 60);

      if (hoursSinceCreated < template.delayHours) {
        console.log(`Lead ${lead.id}: Not yet time for followup ${followupNumber} (${hoursSinceCreated.toFixed(1)}h < ${template.delayHours}h)`);
        continue;
      }

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Website Consultant <onboarding@resend.dev>",
            to: [lead.email],
            subject: template.subject,
            reply_to: "consultantb84@gmail.com",
            html: template.html(escapeHtml(lead.name || "there")),
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Resend API error: ${res.status} - ${errorText}`);
        }

        await supabase
          .from("leads")
          .update({
            followup_count: followupNumber,
            last_followup_at: new Date().toISOString(),
          })
          .eq("id", lead.id);

        console.log(`Lead ${lead.id}: Sent followup ${followupNumber} to ${lead.email}`);
        results.push({ leadId: lead.id, success: true });
      } catch (emailError: any) {
        console.error(`Lead ${lead.id}: Failed to send followup - ${emailError.message}`);
        results.push({ leadId: lead.id, success: false, error: emailError.message });
      }
    }

    return new Response(
      JSON.stringify({ success: true, processed: results.length, results }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-lead-followup function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
