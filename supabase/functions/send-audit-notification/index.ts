import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AuditNotificationRequest {
  name: string;
  company: string;
  email: string;
  website: string;
  challenges: string;
  preferred_followup_time: string;
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[char]!);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const body = await req.json() as AuditNotificationRequest;
    const { name, company, email, website, challenges, preferred_followup_time } = body;

    if (typeof name !== "string" || !name.trim() || name.length > 200 || typeof email !== "string" ||
        email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return new Response(JSON.stringify({ error: "A valid name and email are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const text = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
    const safeName = escapeHtml(text(name, 200));
    const safeCompany = escapeHtml(text(company, 200)) || "Not provided";
    const safeWebsite = text(website, 2048);
    const safeChallenges = escapeHtml(text(challenges, 5000)) || "Not provided";
    const safeFollowup = escapeHtml(text(preferred_followup_time, 200)) || "Not specified";
    const validWebsite = (() => {
      try {
        const parsed = new URL(safeWebsite);
        return parsed.protocol === "https:" || parsed.protocol === "http:";
      } catch {
        return false;
      }
    })();
    const websiteHtml = safeWebsite
      ? validWebsite
        ? `<a href="${escapeHtml(safeWebsite)}">${escapeHtml(safeWebsite)}</a>`
        : escapeHtml(safeWebsite)
      : "Not provided";
    const safeEmail = email.trim();
    const emailHtml = escapeHtml(safeEmail);
    const subjectName = text(name, 200).replace(/[\r\n]+/g, " ");

    // 1. Send notification to consultant
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Audit System <onboarding@resend.dev>",
        to: ["consultantb84@gmail.com"],
        subject: `New Free Website & GMB Audit Request from ${subjectName}`,
        reply_to: safeEmail,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #6366f1;">New Free Website & GMB Audit Request</h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 8px 0;"><strong>Name:</strong> ${safeName}</p>
              <p style="margin: 8px 0;"><strong>Company:</strong> ${safeCompany}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${emailHtml}">${emailHtml}</a></p>
              <p style="margin: 8px 0;"><strong>Website:</strong> ${websiteHtml}</p>
              <p style="margin: 8px 0;"><strong>Challenges:</strong> ${safeChallenges}</p>
              <p style="margin: 8px 0;"><strong>Preferred follow-up:</strong> ${safeFollowup}</p>
            </div>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #6366f1;">Next Steps:</h3>
              <ol style="padding-left: 20px;">
                <li style="margin: 8px 0;">Review the audit request and gather any needed access or login details.</li>
                <li style="margin: 8px 0;">Prepare a tailored audit report (website performance, on-page SEO, local GMB optimization, quick wins).</li>
                <li style="margin: 8px 0;">Reach out to the lead to schedule a 20–30 minute discovery call.</li>
                <li style="margin: 8px 0;">Send the audit report to <a href="mailto:${emailHtml}">${emailHtml}</a> within 24–48 hours.</li>
              </ol>
            </div>
            
            <p style="color: #64748b; font-size: 12px;">
              If you need to adjust the follow-up cadence, reply to this email with your preferred timing.
            </p>
          </div>
        `,
      }),
    });

    // 2. Send confirmation auto-reply to the user
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Website Consultant <onboarding@resend.dev>",
        to: [safeEmail],
        subject: "Your Free Website & GMB Audit is Confirmed",
        reply_to: "consultantb84@gmail.com",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #6366f1;">Your Free Website & GMB Audit is Confirmed ✅</h2>
            
            <p>Hello ${safeName} 👋</p>
            
            <p>Thank you for requesting your <strong>Free Website & GMB Audit</strong>. We've received your details and will prepare a comprehensive report tailored to your business.</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #6366f1;">What happens next:</h3>
              <ol style="padding-left: 20px;">
                <li style="margin: 8px 0;">An audit report will be emailed to you at <strong>${emailHtml}</strong> within 24–48 hours.</li>
                <li style="margin: 8px 0;">Our senior consultant will reach out to schedule a 20–30 minute follow-up call to review findings and recommended actions.</li>
              </ol>
            </div>
            
            <p>If you'd like to expedite, you can reply with <strong>"Schedule Now"</strong> and your preferred times, and we'll prioritize your request.</p>
            
            <p style="margin: 20px 0;">
              <a href="https://calendly.com/consultantb84/30min" 
                 style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                📅 Book Your Free 30-Minute Discovery Call
              </a>
            </p>
            
            <p>Looking forward to helping your business grow online! 😊</p>
            
            <p style="margin-top: 30px; color: #666;">
              Best regards,<br/>
              <strong>Your Freelance Web Consultant</strong><br/>
              <a href="https://simple-client-grow.lovable.app" style="color: #6366f1;">simple-client-grow.lovable.app</a>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #94a3b8; font-size: 11px;">
              You're receiving this because you requested a free audit. Reply "stop" to unsubscribe from follow-up emails.
            </p>
          </div>
        `,
      }),
    });

    console.log("Audit notification sent");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-audit-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
