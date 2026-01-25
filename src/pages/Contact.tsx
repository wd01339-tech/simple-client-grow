import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Clock, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hi! I have a question.%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0ASubject: ${formData.subject}%0A%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/1234567890?text=${whatsappMessage}`, "_blank");
  };

  return (
    <Layout>
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
              Let's Start a{" "}
              <span className="gradient-text">Conversation</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Have a project in mind? Need help with your online presence? 
              I'm just a message away. Let's chat!
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
                Get in Touch
              </h2>

              {/* WhatsApp Primary */}
              <div className="bg-[#25D366]/10 rounded-2xl p-8 border border-[#25D366]/20 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">WhatsApp (Fastest)</h3>
                    <p className="text-muted-foreground mb-4">
                      The quickest way to reach me. I typically respond within a few hours.
                    </p>
                    <Button variant="whatsapp" size="lg" asChild>
                      <a
                        href="https://wa.me/1234567890?text=Hi! I'd like to discuss my project."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Message on WhatsApp
                      </a>
                    </Button>
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
                      href="mailto:hello@digitalfreelancer.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      hello@digitalfreelancer.com
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
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Tell me about your project or question..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button variant="gradient" size="xl" className="w-full" type="submit">
                    Send Message
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
