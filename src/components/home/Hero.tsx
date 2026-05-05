import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroConsultant from "@/assets/hero-consultant-enhanced.png";
import { HeroOfferWidget } from "@/components/marketing/HeroOfferWidget";

const benefits = [
  "Remote & Affordable",
  "Personal One-to-One Support", 
  "Results-Focused Solutions",
];

const IMAGE_ALT = "Freelance digital consultant helping small businesses, tourism brands, and local services grow online";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" aria-label="Freelance Digital Consultant for Small Business Growth">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <HeroOfferWidget />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Mobile: Photo First (4:5 ratio) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:hidden flex justify-center"
          >
            <div className="relative w-full max-w-[320px]">
              {/* Extended background gradient for width illusion */}
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-2xl" />
              
              {/* Image container with 4:5 ratio for mobile */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.25)]">
                <img
                  src={heroConsultant}
                  alt={IMAGE_ALT}
                  className="w-full h-full object-cover object-top"
                  width={320}
                  height={400}
                  loading="eager"
                />
                {/* Subtle bottom gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Soft border glow */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
            </div>
          </motion.div>

          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-bg-subtle border border-primary/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">
              Freelance Digital Consultant — Remote & Affordable
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            >
              Affordable Website Design & Digital Marketing for Small Businesses —{" "}
              <span className="gradient-text">Grow Online</span>{" "}
              Simply & Effectively
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8"
            >
              Remote freelance digital consultant specializing in affordable website design, Google Business Profile optimization, 
              local SEO, and practical digital marketing for homestays, tourism businesses, ecommerce stores, 
              and local services — without agency prices or complexity.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/free-audit">
                  Get a Free Website & GMB Audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="animated-gradient" size="xl" asChild>
                <Link to="/contact">
                  <Calendar className="w-5 h-5" />
                  Book a Free Discovery Call
                </Link>
              </Button>
            </motion.div>

            {/* Trust Signal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              ✨ Free website audit & Google Business Profile review — actionable SEO recommendations included
            </motion.p>
          </div>

          {/* Right: Hero Image - Desktop (16:9 wider container) */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Extended gradient background for width illusion */}
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15 rounded-3xl blur-3xl" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
            
            {/* Wide container with 16:9 aspect ratio */}
            <div className="relative w-full max-w-[560px]">
              {/* Outer glow ring for extended width feel */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 rounded-2xl blur-xl opacity-70" />
              
              {/* Main image container - 16:9 ratio */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.3)]">
                {/* Gradient background to extend visual width */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                
                {/* Image positioned center with object-contain for full visibility */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={heroConsultant}
                    alt={IMAGE_ALT}
                    className="h-full w-auto max-w-none object-cover object-top"
                    width={560}
                    height={315}
                    loading="eager"
                  />
                </div>
                
                {/* Soft gradient overlays for blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/15 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/10 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background/10 to-transparent pointer-events-none" />
              </div>
              
              {/* Decorative subtle border */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 left-4 px-4 py-2 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Available for Projects</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
