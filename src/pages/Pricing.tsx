import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PackageCard } from "@/components/pricing/PackageCard";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PaymentModal } from "@/components/pricing/PaymentModal";
import { packages, trustSignals } from "@/data/packages";
import type { Package } from "@/data/packages";
import { Shield, Users, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustIcons = [Shield, Users, Globe];

const Pricing = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePayment = (pkg: Package, method: string) => {
    setSelectedPackage(pkg);
    setIsPaymentModalOpen(true);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Simple & Transparent Pricing
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6">
              Invest in Your{" "}
              <span className="gradient-text">Digital Growth</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Affordable packages designed for homestays, tourism businesses, and e-commerce stores. 
              No hidden fees. Pay once or monthly—your choice.
            </p>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-10"
          >
            {trustSignals.map((signal, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">{signal}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <PackageCard 
                key={pkg.id} 
                pkg={pkg} 
                index={index}
                onPayment={handlePayment}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Compare All Packages
            </h2>
            <p className="text-muted-foreground">
              See exactly what's included in each package
            </p>
          </motion.div>
          
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-lg">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Perfect For Your Business
            </h2>
            <p className="text-muted-foreground">
              Whether you're just starting or scaling up
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🏨", title: "Homestays & Hotels", desc: "Get found on Google Maps and attract more direct bookings" },
              { emoji: "🌴", title: "Tourism Services", desc: "Stand out to travelers with a professional online presence" },
              { emoji: "🛒", title: "E-commerce Stores", desc: "Convert more visitors into paying customers" },
              { emoji: "💼", title: "Solo Entrepreneurs", desc: "Build credibility and generate leads while you sleep" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border/50 text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PricingFAQ />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              Not sure which package is right for you? Let's chat! I'll help you choose the perfect fit for your business.
            </p>
            <Button variant="whatsapp" size="xl" asChild>
              <a
                href="https://wa.me/1234567890?text=Hi! I'm looking at your packages and have some questions. Can you help me choose?"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp — Free Consultation
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        pkg={selectedPackage}
      />
    </Layout>
  );
};

export default Pricing;
