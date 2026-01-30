import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroConsultant from "@/assets/hero-consultant-enhanced.png";

const benefits = [
  "Remote & Affordable",
  "Personal One-to-One Support",
  "Results-Focused Solutions",
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Mobile: Photo First (visible on mobile only) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:hidden flex justify-center"
          >
            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl" />
              
              <div className="relative">
                <img
                  src={heroConsultant}
                  alt="Digital consultant helping small businesses grow online - Remote freelance professional with laptop showing business analytics"
                  className="w-64 h-auto rounded-2xl shadow-2xl object-cover"
                  loading="eager"
                />
                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20" />
              </div>
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
                Freelance Digital Consultant
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            >
              Helping Small Businesses{" "}
              <span className="gradient-text">Grow Online</span>{" "}
              — Simply & Affordably
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8"
            >
              Simple websites, Google Business optimization, and practical digital marketing 
              for homestays, cafés, local services, and solo entrepreneurs — delivered remotely 
              with personal one-to-one support.
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
              <Button variant="whatsapp" size="xl" asChild>
                <a
                  href="https://wa.me/1234567890?text=Hi! I'd like to discuss my digital needs."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message Me on WhatsApp
                </a>
              </Button>
            </motion.div>

            {/* Trust Signal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              ✨ Free audit includes website & Google Business Profile review
            </motion.p>
          </div>

          {/* Right: Hero Image (visible on desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Decorative background elements */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary/15 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
            
            {/* Photo container with effects */}
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-3xl blur-xl opacity-60" />
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroConsultant}
                  alt="Digital consultant helping small businesses grow online - Remote freelance professional with laptop showing business analytics"
                  className="w-full max-w-md h-auto object-cover"
                  loading="eager"
                />
                
                {/* Subtle overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
              </div>
              
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-background/95 backdrop-blur-sm rounded-xl shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
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
