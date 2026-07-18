import { motion } from "framer-motion";
import { User, Heart, Laptop, MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import heroConsultant from "@/assets/hero-consultant-enhanced.png";

const IMAGE_ALT = "Freelance digital consultant helping small businesses, tourism brands, and local services grow online";

const highlights = [
  {
    icon: User,
    title: "Freelancer, Not Agency",
    description: "Work directly with me — no middlemen, no handoffs.",
  },
  {
    icon: Laptop,
    title: "100% Remote",
    description: "I work with clients worldwide, wherever you are.",
  },
  {
    icon: Heart,
    title: "Small Business Focus",
    description: "I understand your budget constraints and real needs.",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/189bAHVJS1/",
    icon: Facebook,
    bgColor: "bg-[#1877F2]",
    title: "Follow us on Facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/freelancedigitalconsultant",
    icon: Instagram,
    bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    title: "Follow us on Instagram",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/freelancedigitalconsultant",
    icon: Linkedin,
    bgColor: "bg-[#0A66C2]",
    title: "Connect on LinkedIn",
  },
];

export const About = () => {
  return (
    <section className="py-24" aria-label="About the Freelance Digital Consultant">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image with 4:3 desktop, 4:5 mobile ratios */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Extended background gradient for visual width */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 via-secondary/8 to-accent/10 rounded-3xl blur-2xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/12 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-secondary/12 rounded-full blur-2xl" />
              
              {/* Image container - 4:5 mobile, 4:3 desktop */}
              <div className="relative">
                {/* Outer glow for extended width feel */}
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-secondary/12 to-accent/20 rounded-2xl blur-xl opacity-60" />
                
                {/* Main image with responsive aspect ratios */}
                <div className="relative aspect-[4/5] lg:aspect-[4/3] rounded-xl overflow-hidden shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.25)]">
                  {/* Background gradient for width extension */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                  
                  <img
                    src={heroConsultant}
                    alt={IMAGE_ALT}
                    className="w-full h-full object-cover object-top"
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                  
                  {/* Soft gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/15 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background/8 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background/8 to-transparent pointer-events-none" />
                </div>
                
                {/* Decorative border */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
                
                {/* Overlay card with availability + social */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -bottom-5 left-3 right-3 bg-background/95 backdrop-blur-sm rounded-lg p-4 border border-border/50 shadow-lg"
                >
                  <h3 className="font-display text-base font-bold mb-1">
                    Hi, I'm Your Digital Partner
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs text-muted-foreground">Available for new projects</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className={`w-6 h-6 rounded-full ${social.bgColor} flex items-center justify-center hover:scale-110 hover:opacity-85 transition-all duration-300`}
                          aria-label={social.name}
                          title={social.title}
                        >
                          <social.icon className="w-3 h-3 text-white" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              About Your Freelance Digital Consultant
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4 mb-6">
              Remote Freelance Website & Marketing Support for{" "}
              <span className="gradient-text">Small Business Owners</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              I'm a remote freelance digital consultant specializing in affordable website design, 
              Google Business optimization, and local SEO for small business owners, homestay operators, 
              cafés, and solo entrepreneurs. No agency overhead — just practical, budget-friendly solutions that deliver real results.
            </p>

            {/* Highlights */}
            <div className="space-y-6 mb-8">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg" asChild>
                <Link to="/about">Learn More About Me</Link>
              </Button>
              <Button variant="animated-gradient" size="lg" asChild>
                <a
                  href="https://calendly.com/consultantb84/30min?utm_source=website&utm_medium=cta_button&utm_campaign=discovery_call&utm_term=about_section"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book Free Discovery Call
                </a>
              </Button>
            </div>

            {/* Social Follow Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Follow me on social media:</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className={`w-11 h-11 rounded-full ${social.bgColor} flex items-center justify-center hover:scale-110 hover:opacity-85 transition-all duration-300 shadow-md`}
                    aria-label={`Follow on ${social.name}`}
                    title={social.title}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
