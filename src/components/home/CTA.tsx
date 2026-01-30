import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Grow Your Business Online?
          </h2>
          <p className="text-primary-foreground/80 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Let's have a quick chat about your digital needs. No pressure, no jargon — 
            just a friendly conversation about how I can help.
          </p>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Quick Response</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Shield className="w-5 h-5" />
              <span className="text-sm">No Obligation</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Friendly Chat</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="xl"
              className="bg-white text-foreground hover:bg-white/90 shadow-xl"
              asChild
            >
              <Link to="/free-audit">
                Get Your Free Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="whatsapp"
              size="xl"
              asChild
            >
              <a
                href="https://wa.me/918335870240?text=Hello, I'm interested in your freelance services."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
          
          {/* WhatsApp CTA Microcopy */}
          <p className="text-primary-foreground/70 text-sm mt-6">
            Prefer WhatsApp? Message me directly at +91-8335870240
          </p>
        </motion.div>
      </div>
    </section>
  );
};
