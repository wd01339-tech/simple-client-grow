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
 
 interface FollowupRequest {
   leadId?: string;
   processAll?: boolean;
 }
 
 /**
  * Email templates for follow-up sequence
  * Friendly, human tone - no pressure, trust-building
  */
 const followupTemplates = {
   1: {
     subject: "Quick follow-up on your website audit request",
     html: (name: string) => `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
         <p>Hi ${name} 👋</p>
         
         <p>Thanks for requesting a <strong>Free Website & GMB Audit</strong>.</p>
         
         <p>I've received your details and will review your website shortly.</p>
         
         <p>If you'd like quicker help, you can reply to this email or message me on WhatsApp:</p>
         
         <p style="margin: 20px 0;">
           <a href="https://wa.me/918335870240?text=Hi%20%F0%9F%91%8B%20I%20requested%20a%20free%20audit" 
              style="background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
             💬 Message on WhatsApp
           </a>
         </p>
         
         <p><em>What's the main issue you're facing right now?</em></p>
         
         <p>Looking forward to helping you! 😊</p>
         
         <p style="margin-top: 30px; color: #666;">
           Best,<br/>
           <strong>Your Freelance Web Consultant</strong><br/>
           <a href="https://simple-client-grow.lovable.app" style="color: #6366f1;">simple-client-grow.lovable.app</a>
         </p>
       </div>
     `,
   },
   2: {
     subject: "Checking in on your website review",
     html: (name: string) => `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
         <p>Hi ${name} 👋</p>
         
         <p>Just checking in regarding your <strong>free website & Google visibility audit</strong>.</p>
         
         <p>I'm happy to share a few quick suggestions that can help improve inquiries and visibility.</p>
         
         <p><strong>Would you like me to proceed? 😊</strong></p>
         
         <p>Simply reply to this email or tap below:</p>
         
         <p style="margin: 20px 0;">
           <a href="https://wa.me/918335870240?text=Hi%20%F0%9F%91%8B%20Yes%20please%20proceed%20with%20my%20audit" 
              style="background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
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
     subject: "Final check-in — here when you're ready",
     html: (name: string) => `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
         <p>Hi ${name} 👋</p>
         
         <p>I wanted to make sure you didn't miss my earlier messages.</p>
         
         <p>Even small website improvements can help bring more guests and customers online.</p>
         
         <p>I'll pause follow-ups for now, but I'm always here if you need help with your website or online visibility.</p>
         
         <p><strong>You can message me anytime when you're ready 😊</strong></p>
         
         <p style="margin: 20px 0;">
           <a href="https://wa.me/918335870240?text=Hi%20%F0%9F%91%8B%20I%27m%20ready%20to%20discuss%20my%20website" 
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
 
     const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
     const { leadId, processAll }: FollowupRequest = await req.json();
 
     let leadsToProcess: any[] = [];
 
     if (leadId) {
       // Process specific lead
       const { data, error } = await supabase
         .from("leads")
         .select("*")
         .eq("id", leadId)
         .single();
 
       if (error) throw error;
       if (data) leadsToProcess = [data];
     } else if (processAll) {
       // Process all leads that need follow-up
       // Get leads where:
       // - status is 'new' (not qualified or converted)
       // - followup_count < 3 (max 3 follow-ups)
       // - last_followup_at is null OR more than 24h ago
       const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
       const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
 
       const { data, error } = await supabase
         .from("leads")
         .select("*")
         .eq("status", "new")
         .lt("followup_count", 3)
         .or(`last_followup_at.is.null,last_followup_at.lt.${twentyFourHoursAgo}`);
 
       if (error) throw error;
       leadsToProcess = data || [];
     }
 
     console.log(`Processing ${leadsToProcess.length} leads for follow-up`);
 
     const results: { leadId: string; success: boolean; error?: string }[] = [];
 
     for (const lead of leadsToProcess) {
       const followupNumber = (lead.followup_count || 0) + 1;
 
       // Check if enough time has passed based on followup number
       const createdAt = new Date(lead.created_at).getTime();
       const now = Date.now();
       const hoursSinceCreated = (now - createdAt) / (1000 * 60 * 60);
 
       // Follow-up timing: 24h, 48h, 72h
       const requiredHours = followupNumber * 24;
       if (hoursSinceCreated < requiredHours) {
         console.log(`Lead ${lead.id}: Not yet time for followup ${followupNumber} (${hoursSinceCreated.toFixed(1)}h < ${requiredHours}h)`);
         continue;
       }
 
       const template = followupTemplates[followupNumber as 1 | 2 | 3];
       if (!template) {
         console.log(`Lead ${lead.id}: No template for followup ${followupNumber}`);
         continue;
       }
 
       try {
         // Send email via Resend
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
             html: template.html(lead.name || "there"),
           }),
         });
 
         if (!res.ok) {
           const errorText = await res.text();
           throw new Error(`Resend API error: ${res.status} - ${errorText}`);
         }
 
         // Update lead with followup info
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
       JSON.stringify({ 
         success: true, 
         processed: results.length,
         results 
       }),
       {
         status: 200,
         headers: { "Content-Type": "application/json", ...corsHeaders },
       }
     );
   } catch (error: any) {
     console.error("Error in send-lead-followup function:", error);
     return new Response(
       JSON.stringify({ error: error.message }),
       {
         status: 500,
         headers: { "Content-Type": "application/json", ...corsHeaders },
       }
     );
   }
 };
 
 serve(handler);