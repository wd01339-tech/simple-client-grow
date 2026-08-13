import { motion } from "framer-motion";
import { Check, Star, MessageCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Package } from "@/data/packages";
import { trackEvent, ConversionEvents } from "@/lib/analytics";
import { buildCalendlyUrl, trackCalendlyClick } from "@/lib/calendly";
import { Link } from "react-router-dom";

interface PackageCardProps {
  pkg: Package;
  index: number;
  onPayment: (pkg: Package, method: string) => void;
}

export const PackageCard = ({ pkg, index, onPayment }: PackageCardProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative bg-card rounded-2xl border ${
        pkg.popular 
          ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]" 
          : "border-border/50 shadow-lg"
      } overflow-hidden flex flex-col h-full`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-primary text-primary-foreground gap-1 px-3 py-1">
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
      <div className="px-6 py-5 border-y border-border/50 bg-muted/30">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-4xl font-bold">{pkg.priceDisplay}</span>
          {pkg.priceType === "monthly" && (
            <span className="text-muted-foreground text-lg">/month</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {pkg.priceType === "monthly" 
            ? "Billed monthly · Cancel anytime" 
            : "One-time payment · No recurring fees"}
        </p>
      </div>

      {/* Best For */}
      <div className="px-6 pt-4">
        <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Best For</p>
        <p className="text-sm text-muted-foreground">{pkg.bestFor}</p>
      </div>

      {/* Features */}
      <div className="p-6 flex-1">
        <p className="text-sm font-medium mb-3">What's included:</p>
        <ul className="space-y-2.5">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="p-6 pt-0 space-y-3">
        <Button 
          variant={pkg.popular ? "gradient" : "default"} 
          size="lg"
          className="w-full gap-2 font-semibold"
          asChild
        >
          <Link
            to={`/dummy-payment?package=${pkg.id}&method=stripe`}
            onClick={() => onPayment(pkg, "dummy-payment")}
          >
            <CreditCard className="w-4 h-4" />
            {pkg.ctaLabel}
          </Link>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full gap-2"
          asChild
        >
          <a
            href={buildCalendlyUrl({ source: "package_card", content: pkg.name })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCalendlyClick({ source: "package_card", content: pkg.name })}
          >
            <MessageCircle className="w-4 h-4" />
            Book Free Discovery Call
          </a>
        </Button>

        {/* Trust Microcopy */}
        <div className="text-center pt-2 space-y-1">
          <p className="text-xs text-muted-foreground">
            🔒 Secure payment via Stripe, PayPal, or Razorpay
          </p>
          <p className="text-xs text-muted-foreground">
            📄 Invoice provided after payment
          </p>
        </div>
      </div>
    </motion.div>
  );
};
