import { motion } from "framer-motion";
import { CheckCircle, Sparkles, MessageCircle, ArrowRight, Clock, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

const FreeAuditPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    business: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        website: formData.website.trim() || null,
        business_type: formData.business.trim(),
        message: formData.message.trim() || null,
        source: "free-audit",
      });

      if (error) throw error;

      toast.success("Audit request submitted! I'll be in touch within 24-48 hours.");
      setFormData({ name: "", email: "", website: "", business: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
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
              Free 7-Point Website &{" "}
              <span className="gradient-text">GMB Audit</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Get a personalized review of your online presence. Discover what's working, 
              what's not, and simple fixes to improve your visibility and attract more customers.
            </p>
          </motion.div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm">Delivered in 24-48 hours</span>
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
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-xl border border-border/50 sticky top-24">
                <h3 className="font-display text-2xl font-bold mb-2">Request Your Free Audit</h3>
                <p className="text-muted-foreground mb-6">
                  Fill in your details and I'll get back to you within 24-48 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
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
                    <label className="block text-sm font-medium mb-2">Email Address</label>
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
                    <label className="block text-sm font-medium mb-2">Website URL (if you have one)</label>
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
                    <label className="block text-sm font-medium mb-2">Business Type</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Homestay, Café, Tour Guide, etc."
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">What would you like help with?</label>
                    <textarea
                      rows={3}
                      maxLength={1000}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Tell me a bit about your business and what you're hoping to achieve..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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

                  <Button variant="whatsapp" size="lg" className="w-full" asChild>
                    <a
                      href="https://wa.me/918335870240?text=Hello, I'm interested in a free audit for my business."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Message on WhatsApp
                    </a>
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FreeAuditPage;
