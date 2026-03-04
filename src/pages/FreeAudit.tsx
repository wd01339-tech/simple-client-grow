import { motion } from "framer-motion";
import { CheckCircle, Sparkles, ArrowRight, Clock, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SEOHead } from "@/components/seo/SEOHead";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { useUTMTracking } from "@/hooks/useUTMTracking";

const auditItems = [
  {
    title: "Website Usability Review",
    description: "Is your website easy to navigate? Does it clearly explain what you offer?",
  },
  {
    title: "Mobile Responsiveness Check",
    description: "How does your site look and work on phones and tablets?",
  },
  {
    title: "Google Business Profile Audit",
    description: "Is your business appearing in local searches? Is your profile optimized?",
  },
  {
    title: "Local SEO Quick Analysis",
    description: "Are you using the right keywords for your area and services?",
  },
  {
    title: "Call-to-Action Review",
    description: "Can visitors easily contact you or make a booking?",
  },
  {
    title: "Competitor Comparison",
    description: "Quick look at what competitors are doing better online.",
  },
  {
    title: "Personalized Action Plan",
    description: "Simple, prioritized recommendations you can act on right away.",
  },
];

const quickActions = [
  "Schedule my audit now",
  "View sample audit",
  "Talk to a consultant",
];

const FreeAuditPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const utmParams = useUTMTracking();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    website: "",
    challenges: "",
    preferred_followup_time: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        website: formData.website.trim() || null,
        company: formData.company.trim() || null,
        business_type: formData.company.trim() || null,
        message: formData.challenges.trim() || null,
        preferred_followup_time: formData.preferred_followup_time.trim() || null,
        source: "free-audit",
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
      });

      if (error) throw error;

      // Send notification email to consultant
      try {
        await supabase.functions.invoke("send-audit-notification", {
          body: {
            name: formData.name.trim(),
            company: formData.company.trim(),
            email: formData.email.trim(),
            website: formData.website.trim(),
            challenges: formData.challenges.trim(),
            preferred_followup_time: formData.preferred_followup_time.trim(),
          },
        });
      } catch (emailErr) {
        console.error("Email notification failed (lead still saved):", emailErr);
      }

      setIsSubmitted(true);
      toast.success("Audit request submitted! We'll be in touch within 24–48 hours.");
      setFormData({ name: "", company: "", email: "", website: "", challenges: "", preferred_followup_time: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout whatsappIntent="free-audit">
      <SEOHead page="free-audit" />
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">100% Free • No Obligation</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Get a Free Website & GMB Audit —{" "}
              <span className="gradient-text">Instant Insights for Growth</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Complete the form below and receive a comprehensive audit report. 
              A dedicated consultant will follow up via email to discuss actionable next steps.
            </p>
          </motion.div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm">Delivered in 24–48 hours</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm">Actionable recommendations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
                What's Included in Your Free Audit:
              </h2>
              <div className="space-y-4">
                {auditItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Action Phrases */}
              <div className="mt-8">
                <p className="text-sm font-medium text-muted-foreground mb-3">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <WhatsAppLink
                      key={action}
                      intent="free-audit"
                      size="sm"
                      variant="outline"
                      customDetails={{ businessType: action }}
                    >
                      {action}
                    </WhatsAppLink>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form / Success */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-xl border border-border/50 sticky top-24">
                {isSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold">Thank You!</h3>
                    <p className="text-muted-foreground">
                      Your Free Website & GMB Audit is being prepared. A confirmation email has been sent 
                      with next steps. If you don't see it within 5 minutes, please check your spam/junk folder.
                    </p>
                    <div className="pt-4 space-y-3">
                      <p className="text-sm font-medium">What happens next:</p>
                      <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-sm mx-auto">
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">1.</span>
                          An audit report will be emailed to you within 24–48 hours.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">2.</span>
                          Our senior consultant will reach out to schedule a 20–30 minute follow-up call.
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4">
                      <WhatsAppLink intent="free-audit" size="lg" className="w-full">
                        Expedite — Message on WhatsApp
                      </WhatsAppLink>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-sm text-muted-foreground underline hover:text-foreground transition-colors"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-2xl font-bold mb-2">Request Your Free Audit</h3>
                    <p className="text-muted-foreground mb-6">
                      Fill in your details and receive a comprehensive audit report within 24–48 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <input
                          type="text"
                          required
                          maxLength={100}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <input
                          type="text"
                          maxLength={100}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          placeholder="Your Company Name"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          maxLength={255}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Website URL</label>
                        <input
                          type="url"
                          maxLength={500}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          placeholder="https://yourwebsite.com"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Challenges</label>
                        <textarea
                          rows={3}
                          maxLength={1000}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                          placeholder="What challenges are you facing with your online presence?"
                          value={formData.challenges}
                          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Follow-up Time</label>
                        <input
                          type="text"
                          maxLength={100}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          placeholder="e.g. Weekday mornings, After 3 PM IST"
                          value={formData.preferred_followup_time}
                          onChange={(e) => setFormData({ ...formData, preferred_followup_time: e.target.value })}
                        />
                      </div>

                      <Button 
                        variant="hero" 
                        size="xl" 
                        className="w-full" 
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Get My Free Audit"}
                        <ArrowRight className="w-5 h-5" />
                      </Button>

                      <p className="text-center text-sm text-muted-foreground">
                        Or prefer to chat directly?
                      </p>

                      <WhatsAppLink 
                        intent="free-audit" 
                        size="lg" 
                        className="w-full"
                        customDetails={{ businessType: formData.company || undefined }}
                      >
                        Message on WhatsApp
                      </WhatsAppLink>

                      <p className="text-xs text-muted-foreground text-center mt-4">
                        By submitting, you consent to receive follow-up communications regarding your audit. 
                        You can opt out at any time by replying "stop".
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FreeAuditPage;
