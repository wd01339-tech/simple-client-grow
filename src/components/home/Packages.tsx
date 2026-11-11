import { motion } from "framer-motion";
import { CalendarDays, MessageCircle, Check, Star, Shield, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { packages, trustSignals } from "@/data/packages";
import { Link } from "react-router-dom";
import { buildCalendlyUrl, trackCalendlyClick } from "@/lib/calendly";

const trustIcons = [Shield, Users, Globe];

export const Packages = () => {
  return (
    <section id="packages" className="py-24 bg-gradient-to-b from-background via-muted/30 to-background" aria-label="Affordable Digital Service Packages and Pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Affordable Website & Marketing Packages
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Affordable Website Design & SEO Packages for{" "}
            <span className="gradient-text">Small Business Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Transparent pricing for website design, Google Business optimization, local SEO, and digital marketing. 
            Packages designed for homestays, tourism businesses, cafés, and e-commerce stores. No hidden fees.
          </p>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12"
        >
          {trustSignals.map((signal, index) => (
            <div key={index} className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">{signal}</span>
            </div>
          ))}
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-card rounded-2xl border ${
                pkg.popular 
                  ? "border-primary shadow-xl shadow-primary/10" 
                  : "border-border/50 shadow-lg"
              } overflow-hidden flex flex-col`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="p-6 pb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  pkg.color === "primary" 
                    ? "bg-primary/10 text-primary" 
                    : pkg.color === "secondary"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-accent/10 text-accent"
                }`}>
                  <pkg.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold mb-1">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.tagline}</p>
              </div>

              {/* Pricing */}
              <div className="px-6 py-4 border-y border-border/50 bg-muted/30">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold">{pkg.priceDisplay}</span>
                  {pkg.priceType === "monthly" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {pkg.priceType === "monthly" ? "Cancel anytime" : "One-time payment"}
                </p>
              </div>

              {/* Features */}
              <div className="p-6 flex-1">
                <p className="text-xs text-primary font-medium uppercase tracking-wide mb-2">Best for: {pkg.bestFor}</p>
                <ul className="space-y-2.5 mt-4">
                  {pkg.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                  {pkg.features.length > 5 && (
                    <li className="text-sm text-primary font-medium">
                      +{pkg.features.length - 5} more included
                    </li>
                  )}
                </ul>
              </div>

              {/* CTAs */}
              <div className="p-6 pt-0 space-y-3">
                <Button
                  variant={pkg.popular ? "gradient" : "default"} 
                  className="w-full gap-2"
                  asChild
                >
                  <a
                    href={buildCalendlyUrl({ source: "home_package_card", content: pkg.name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCalendlyClick({ source: "home_package_card", content: pkg.name })}
                  >
                    <CalendarDays className="w-4 h-4" />
                    Discuss {pkg.name}
                  </a>
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Free 30-minute call · No payment taken online
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/pricing">
            <Button variant="outline" size="lg">
              View Full Package Comparison →
            </Button>
          </Link>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Not sure which package is right for you?
          </p>
          <Button variant="whatsapp" size="xl" asChild>
            <a
              href={buildCalendlyUrl({ source: "packages_section" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCalendlyClick({ source: "packages_section" })}
            >
              <MessageCircle className="w-5 h-5" />
              Book Your Free 30-Minute Discovery Call
            </a>
          </Button>
        </motion.div>
      </div>

    </section>
  );
};
