import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const auditIncludes = [
  "Website usability & clarity review",
  "Mobile responsiveness check",
  "Google Business Profile visibility audit",
  "Local SEO quick analysis",
  "Simple, actionable improvement tips",
  "Personalized recommendations",
  "No obligation, 100% free",
];

export const LeadMagnet = () => {
  return (
    <section className="py-24 relative overflow-hidden" aria-label="Free Website and Google Business Audit">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Card */}
          <div className="bg-card rounded-3xl p-8 sm:p-12 shadow-2xl border border-border/50 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Free Lead Magnet</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Content */}
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                    Free 7-Point Website & Google Business Profile Audit
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    Get a personalized SEO review of your website and Google Business Profile — 
                    discover what's working, what's holding back your search rankings, and get simple, actionable 
                    fixes to improve your local SEO visibility and attract more customers.
                  </p>

                  <Button variant="hero" size="xl" className="w-full sm:w-auto" asChild>
                    <Link to="/free-audit">
                      Get Your Free Audit
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>

                  <p className="mt-4 text-sm text-muted-foreground">
                    Takes 2 minutes • No credit card required • No spam • 100% free
                  </p>
                </div>

                {/* Right: Checklist */}
                <div>
                  <h4 className="font-semibold mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {auditIncludes.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
