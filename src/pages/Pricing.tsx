import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PackageCard } from "@/components/pricing/PackageCard";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { packages, trustSignals } from "@/data/packages";
import { Shield, Users, Globe, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";
import { generateFAQSchema } from "@/lib/seo";

const trustIcons = [Shield, Users, Globe];

const Pricing = () => {
  const handlePayment = () => undefined;

  // FAQ schema for SEO
  const faqSchema = generateFAQSchema({
    questions: [
      { question: "What payment methods do you accept?", answer: "We accept PayPal, Stripe, and Razorpay for secure payment processing." },
      { question: "Do you offer refunds?", answer: "Yes, we offer a 3-day partial refund policy if you're not satisfied." },
      { question: "How long does it take to complete a project?", answer: "Most projects are completed within 1-4 weeks depending on the package." },
      { question: "Can I upgrade my package later?", answer: "Absolutely! You can upgrade to a higher package at any time." },
    ],
  });

  return (
    <Layout whatsappIntent="pricing">
      <SEOHead page="pricing" schemas={[faqSchema]} />
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background matching Hero style */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-bg-subtle border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Simple & Transparent Pricing
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6">
              Affordable Packages for{" "}
              <span className="gradient-text">Real Growth</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed for homestays, tourism businesses, and local services. 
              No hidden fees, no agency complexity — just honest pricing.
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-90" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-primary-foreground">
              Not Sure Which Package Fits?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Let's have a quick, friendly chat. I'll help you choose the right fit for your business — no pressure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="bg-white text-foreground hover:bg-white/90" asChild>
                <Link to="/free-audit">
                  Get a Free Audit First
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="xl" 
                variant="animated-gradient"
                asChild
              >
                <Link to="/contact">
                  <Calendar className="w-5 h-5" />
                  Book a Free Discovery Call
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
