import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Check, Star, Shield, Users, Globe, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { packages, trustSignals } from "@/data/packages";
import { PaymentModal } from "@/components/pricing/PaymentModal";
import type { Package } from "@/data/packages";
import { Link } from "react-router-dom";

const trustIcons = [Shield, Users, Globe];

export const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const phoneNumber = "1234567890";

  const getWhatsAppUrl = (message: string) => {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handlePayment = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsPaymentModalOpen(true);
  };

  return (
    <section id="packages" className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Simple & Transparent Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Invest in Your{" "}
            <span className="gradient-text">Digital Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Affordable packages designed for homestays, tourism businesses, and e-commerce stores. 
            No hidden fees. Pay once or monthly—your choice.
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
                  onClick={() => handlePayment(pkg)}
                >
                  <CreditCard className="w-4 h-4" />
                  {pkg.ctaLabel}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full gap-2"
                  asChild
                >
                  <a
                    href={getWhatsAppUrl(pkg.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ask Before Buying
                  </a>
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  🔒 Secure payment · Invoice provided
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
              href={getWhatsAppUrl("Hi! I'd like help choosing the right package for my business. Can you guide me?")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp — I'll Help You Choose
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        pkg={selectedPackage}
      />
    </section>
  );
};
