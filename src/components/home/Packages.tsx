import { motion } from "framer-motion";
import { MessageCircle, Check, Star, Shield, Users, Globe, Sparkles, ShoppingCart, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const packages = [
  {
    id: "starter",
    name: "Starter Visibility Package",
    icon: Zap,
    bestFor: "Homestays, small shops, cafés, new e-commerce stores, and solo entrepreneurs",
    features: [
      "One-page website or landing page setup/improvement",
      "Mobile responsiveness check",
      "Basic SEO setup (titles, descriptions)",
      "Google My Business setup or cleanup",
      "WhatsApp click-to-chat integration",
    ],
    priceINR: "₹4,999",
    priceUSD: "$79",
    priceType: "one-time",
    ctaLabel: "Choose Starter Package",
    whatsappMessage: "Hi! I'm interested in the Starter Visibility Package (₹4,999). Can you tell me more?",
    popular: false,
    color: "primary",
  },
  {
    id: "growth",
    name: "Growth Package",
    icon: Sparkles,
    bestFor: "Growing homestays, tourism services, and local e-commerce brands needing leads",
    features: [
      "Website improvement (up to 5 sections/pages)",
      "Google My Business optimization (local SEO keywords)",
      "Lead generation setup (forms + WhatsApp)",
      "Basic e-commerce readiness (product pages / CTA flow)",
      "Social media visibility guidance",
      "Conversion-focused content tweaks",
    ],
    priceINR: "₹11,999",
    priceUSD: "$179",
    priceType: "one-time",
    ctaLabel: "Select Growth Package",
    whatsappMessage: "Hi! I'm interested in the Growth Package (₹11,999). I'd like to discuss my business needs.",
    popular: true,
    color: "secondary",
  },
  {
    id: "authority",
    name: "Local Authority Package",
    icon: MapPin,
    bestFor: "Homestays, hotels, cafés, tourism operators, service-area businesses",
    features: [
      "Google My Business management (30 days)",
      "Google Maps ranking optimization",
      "Review strategy & response guidance",
      "Website trust & conversion improvements",
      "Monthly visibility summary",
      "Priority WhatsApp support",
    ],
    priceINR: "₹5,999",
    priceUSD: "$89",
    priceType: "month",
    ctaLabel: "Start Monthly Package",
    whatsappMessage: "Hi! I'm interested in the Local Authority Package (₹5,999/month). Can we discuss my local business?",
    popular: false,
    color: "accent",
  },
  {
    id: "ecommerce",
    name: "Ecommerce Launch & Growth Add-On",
    icon: ShoppingCart,
    bestFor: "Small e-commerce brands, D2C sellers, and local product businesses",
    features: [
      "Ecommerce homepage & product page optimization",
      "Payment flow & checkout UX review",
      "WhatsApp order & inquiry integration",
      "Basic SEO for products",
      "Trust & conversion improvements",
    ],
    priceINR: "₹14,999",
    priceUSD: "$229",
    priceType: "one-time",
    ctaLabel: "Add Ecommerce Package",
    whatsappMessage: "Hi! I'm interested in the Ecommerce Launch Package (₹14,999). I have an online store I'd like to optimize.",
    popular: false,
    color: "primary",
  },
];

const trustSignals = [
  { icon: Shield, text: "100% Secure Payment Processing" },
  { icon: Users, text: "Freelancer-led, one-to-one support" },
  { icon: Globe, text: "Remote service · Global clients welcome" },
];

export const Packages = () => {
  const phoneNumber = "1234567890";

  const getWhatsAppUrl = (message: string) => {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
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
            Transparent Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Simple & Affordable{" "}
            <span className="gradient-text">Digital Support Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose a package that fits your business needs—no long-term contracts, no hidden costs. 
            Not sure which is right? Just ask on WhatsApp!
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
              <signal.icon className="w-4 h-4 text-primary" />
              <span className="text-sm">{signal.text}</span>
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
                <h3 className="font-display text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.bestFor}</p>
              </div>

              {/* Pricing */}
              <div className="px-6 py-4 border-y border-border/50 bg-muted/30">
                <div className="flex items-baseline gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">🇮🇳</span>
                    <span className="font-display text-2xl font-bold">{pkg.priceINR}</span>
                  </div>
                  <span className="text-muted-foreground">/</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">🌍</span>
                    <span className="font-display text-lg font-semibold text-muted-foreground">{pkg.priceUSD}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {pkg.priceType === "month" ? "per month" : "one-time payment"}
                </p>
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
                  className="w-full"
                  asChild
                >
                  <a
                    href={getWhatsAppUrl(pkg.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pkg.ctaLabel}
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  asChild
                >
                  <a
                    href={getWhatsAppUrl(`Hi! I have questions about the ${pkg.name}. Can you help me decide?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {pkg.priceType === "month" ? "Free WhatsApp Consultation" : "Ask Before Buying"}
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Niche CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Homestays & Tourism */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <h4 className="font-display text-xl font-bold mb-3">🏨 For Homestays & Tourism</h4>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>✓ More Google Maps visibility</li>
              <li>✓ Better booking inquiries</li>
              <li>✓ Stronger trust for travelers</li>
              <li>✓ Local keyword targeting (near me searches)</li>
              <li>✓ WhatsApp booking convenience</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" size="sm" asChild>
                <a
                  href={getWhatsAppUrl("Hi! I run a homestay/tourism business and want to improve my online visibility. Can you help?")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Improve My Homestay Visibility
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={getWhatsAppUrl("Hi! I want to get more direct bookings for my property. What do you suggest?")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get More Direct Bookings
                </a>
              </Button>
            </div>
          </div>

          {/* Ecommerce */}
          <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl p-8 border border-accent/10">
            <h4 className="font-display text-xl font-bold mb-3">🛒 For E-commerce Stores</h4>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>✓ Faster buying decisions</li>
              <li>✓ Clear CTAs & trust signals</li>
              <li>✓ WhatsApp order support</li>
              <li>✓ Simple checkout experience</li>
              <li>✓ Conversion-focused layout</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" size="sm" asChild>
                <a
                  href={getWhatsAppUrl("Hi! I have an e-commerce store and want to optimize it for more sales. Can we discuss?")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Optimize My Store for Sales
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={getWhatsAppUrl("Hi! I need help improving my checkout flow and reducing cart abandonment.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Improve My Checkout Flow
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Refund Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-xl p-6 border border-border/50">
            <h4 className="font-semibold mb-2 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Fair & Honest Refund Policy
            </h4>
            <p className="text-sm text-muted-foreground">
              If you feel the service is not aligned with what was promised, contact me within{" "}
              <strong>3 days of purchase</strong>. I'll review the issue personally and offer a{" "}
              <strong>fair resolution or partial refund</strong>, depending on the work completed.
            </p>
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
              After payment, you'll receive clear next steps via WhatsApp or email within 24 hours.
            </p>
          </div>
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
    </section>
  );
};
