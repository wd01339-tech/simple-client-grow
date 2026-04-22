 import { motion } from "framer-motion";
 import { MessageCircle, Mail, MapPin, Clock, Shield, Heart, Facebook, Instagram, Linkedin } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Layout } from "@/components/layout/Layout";
 import { useState } from "react";
 import { supabase } from "@/integrations/supabase/client";
 import { toast } from "sonner";
 import { SEOHead } from "@/components/seo/SEOHead";
 import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
 import { useUTMTracking } from "@/hooks/useUTMTracking";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
   const utmParams = useUTMTracking();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
       const { error } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        source: "contact",
         utm_source: utmParams.utm_source,
         utm_medium: utmParams.utm_medium,
         utm_campaign: utmParams.utm_campaign,
         utm_term: utmParams.utm_term,
         utm_content: utmParams.utm_content,
      });

      if (error) throw error;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || "Contact Form Inquiry",
          message: formData.message.trim(),
          source: "Contact Page",
        },
      });

      if (emailError) {
        console.error("Email notification failed:", emailError);
        // Don't block success - lead is saved
      }

      toast.success("Message sent! I'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout whatsappIntent="contact">
      <SEOHead page="contact" />
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Contact
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6">
              Contact Your Freelance Digital Consultant —{" "}
              <span className="gradient-text">Free Consultation</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Need affordable website design, Google Business optimization, or digital marketing help? 
              Get a free consultation via WhatsApp, email, or the contact form below. I respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
                Get Free Digital Marketing Advice
              </h2>

              {/* WhatsApp Primary */}
              <div className="bg-[#25D366]/10 rounded-2xl p-8 border border-[#25D366]/20 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">WhatsApp (Fastest)</h3>
                    <p className="text-muted-foreground mb-2">
                      The quickest way to reach me. I typically respond within a few hours.
                    </p>
                    <a 
                      href="tel:+918335870240" 
                      className="text-foreground font-semibold hover:text-primary transition-colors block mb-4"
                    >
                      📞 +91-8335870240
                    </a>
                    <WhatsAppLink intent="contact" size="lg">
                      Message on WhatsApp
                    </WhatsAppLink>
                  </div>
                </div>
              </div>

              {/* Other Contact Methods */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:consultantb84@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      consultantb84@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-muted-foreground">
                      Remote • Working with clients worldwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Response Time</h4>
                    <p className="text-muted-foreground">
                      Usually within 24 hours (often much faster)
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Connect */}
              <div className="bg-muted/50 rounded-2xl p-6 mt-6">
                <p className="font-semibold mb-3">Stay connected on social media</p>
                <div className="flex items-center gap-3">
                  {[
                    { name: "Facebook", href: "https://www.facebook.com/share/189bAHVJS1/", icon: Facebook, bg: "bg-[#1877F2]", title: "Follow us on Facebook" },
                    { name: "Instagram", href: "https://www.instagram.com/freelancedigitalconsultant", icon: Instagram, bg: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]", title: "Follow us on Instagram" },
                    { name: "LinkedIn", href: "https://www.linkedin.com/in/freelancedigitalconsultant", icon: Linkedin, bg: "bg-[#0A66C2]", title: "Connect on LinkedIn" },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className={`w-11 h-11 rounded-full ${s.bg} flex items-center justify-center hover:scale-110 hover:opacity-85 transition-all duration-300 shadow-md`}
                      aria-label={s.name}
                      title={s.title}
                    >
                      <s.icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Follow our Facebook page for client results, marketing tips & latest offers
                </p>
              </div>

              {/* Trust Microcopy */}
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                <p className="text-sm text-muted-foreground text-center">
                  ✨ Direct freelancer communication · Response within 24 hours · No agencies, no middlemen
                </p>
              </div>

              {/* Trust Signals */}
              <div className="bg-muted/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-semibold">What to Expect</span>
                </div>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-accent" />
                    Friendly, no-pressure conversation
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-accent" />
                    Clear, jargon-free communication
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-accent" />
                    Honest advice (even if I'm not the right fit)
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-accent" />
                    No hidden costs or surprise upsells
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-xl border border-border/50">
                <h3 className="font-display text-2xl font-bold mb-2">Send a Message</h3>
                <p className="text-muted-foreground mb-6">
                  Prefer email? Fill out the form below and I'll get back to you soon.
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
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      maxLength={200}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="What can I help you with?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Message</label>
                    <textarea
                      rows={5}
                      required
                      maxLength={1000}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Tell me about your project or question..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button 
                    variant="gradient" 
                    size="xl" 
                    className="w-full" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    I'll respond within 24 hours
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
