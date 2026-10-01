import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroConsultant from "@/assets/hero-consultant-enhanced.png";
import { SmartOfferBanner } from "@/components/marketing/SmartOfferBanner";
import { IntroVideoCard } from "@/components/home/IntroVideoCard";
import { buildCalendlyUrl, trackCalendlyClick } from "@/lib/calendly";

const benefits = [
  "Remote & Affordable",
  "Personal One-to-One Support", 
  "Results-Focused Solutions",
];

const IMAGE_ALT = "Digital strategy, web development, and growth marketing expert helping small businesses, tourism brands, and local services grow online";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 sm:pt-20 overflow-hidden" aria-label="Digital Strategy, Web Development, and Growth Marketing for Small Business Growth">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      {/* Offers panel — desktop/tablet only to keep mobile CTAs above the fold */}
      <div className="absolute top-24 right-4 sm:right-6 z-30 sm:w-[340px] lg:w-[340px] hidden md:flex flex-col gap-2 [&_.sticky]:!static [&>*]:rounded-xl [&>*]:overflow-hidden [&>*]:shadow-2xl">
        <SmartOfferBanner />
      </div>

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
                  alt="Digital strategy, web development, and growth marketing expert helping small businesses"
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

          {/* Mobile/Tablet: Intro video below photo, before text */}
          <div className="lg:hidden w-full">
            <IntroVideoCard />
          </div>

          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-bg-subtle border border-primary/20 mt-4 sm:mt-0 mb-4 sm:mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">
              AI-Powered Digital Business Growth Strategy Consultant
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-4 sm:mb-6 text-balance"
            >
              Digital Strategy Consultant —{" "}
              <span className="gradient-text">Web Development, Marketing &amp; Growth</span>{" "}
              for Scaling Businesses
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-5 sm:mb-8"
            >
              Practical digital strategy, professional web solutions, and growth-focused marketing designed to help
              small businesses, startups, B2B and professional service teams strengthen their online presence,
              generate opportunities, and scale with confidence.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-10"
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
              <Button variant="animated-gradient" size="xl" asChild>
                <a
                  href={buildCalendlyUrl({ source: "hero" })}
                  aria-label="Book a free 30-minute discovery call"
                  rel="noopener"
                  onClick={() => trackCalendlyClick({ source: "hero" })}
                >
                  <Calendar className="w-5 h-5" />
                  Book My Free Discovery Call
                </a>
              </Button>
              <Button variant="hero" size="xl" asChild>
                <Link to="/free-audit">
                  Get a Free Website & GMB Audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust Signal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-5 sm:mt-8 text-sm text-muted-foreground"
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
                    alt="Digital strategy, web development, and growth marketing expert helping small businesses"
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

          {/* Desktop: Intro video below the hero image, spans right column */}
          <div className="hidden lg:block lg:col-start-2">
            <IntroVideoCard />
          </div>
        </div>
      </div>
    </section>
  );
};
