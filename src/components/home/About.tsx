import { motion } from "framer-motion";
import { User, Heart, Laptop, MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import heroConsultant from "@/assets/hero-consultant-enhanced.png";
import serviceWebsite from "@/assets/service-website.jpg";
import serviceMarketing from "@/assets/service-marketing.jpg";

const IMAGE_ALT = "Freelance digital consultant providing remote website and marketing support for small businesses";
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
    href: "https://facebook.com/yourpage",
    icon: Facebook,
    bgColor: "bg-[#1877F2]",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/yourprofile",
    icon: Instagram,
    bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourprofile",
    icon: Linkedin,
    bgColor: "bg-[#0A66C2]",
  },
];

export const About = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto lg:mx-0 relative">
              {/* Decorative circles - matching Hero section */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/15 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-secondary/15 rounded-full blur-2xl" />
              <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-accent/10 rounded-full blur-xl" />
              
              {/* Main image card with glow effect */}
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/25 via-secondary/15 to-accent/25 rounded-3xl blur-xl opacity-60" />
                
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={heroConsultant}
                    alt={IMAGE_ALT}
                    className="w-full h-full object-cover aspect-square lg:aspect-[4/5]"
                    width={400}
                    height={500}
                    loading="lazy"
                  />
                  
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
                </div>
                
                {/* Decorative border */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                
                {/* Overlay with availability badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-xl p-4 border border-border/50 shadow-lg"
                >
                  <h3 className="font-display text-lg font-bold mb-1">
                    Hi, I'm Your Digital Partner
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">Available for new projects</span>
                    </div>
                    {/* Social icons in overlay */}
                    <div className="flex items-center gap-2">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-7 h-7 rounded-full ${social.bgColor} flex items-center justify-center hover:scale-110 transition-transform`}
                          aria-label={social.name}
                        >
                          <social.icon className="w-3.5 h-3.5 text-white" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating service images */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -right-6 top-8 w-24 h-24 rounded-xl overflow-hidden shadow-xl border-2 border-background hidden lg:block"
              >
                <img
                  src={serviceWebsite}
                  alt="Website design service"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -left-6 bottom-24 w-20 h-20 rounded-xl overflow-hidden shadow-xl border-2 border-background hidden lg:block"
              >
                <img
                  src={serviceMarketing}
                  alt="Digital marketing service"
                  className="w-full h-full object-cover"
                />
              </motion.div>
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
              About Me
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4 mb-6">
              Personal Digital Support for{" "}
              <span className="gradient-text">Growing Businesses</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              I'm a remote freelance digital consultant who works one-to-one with small business 
              owners, homestay operators, and solo entrepreneurs. No complicated systems or expensive 
              packages — just practical solutions that fit your budget and actually work.
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
              <Button variant="whatsapp" size="lg" asChild>
                <a
                  href="https://wa.me/918335870240?text=Hello, I'm interested in your freelance services."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Let's Chat
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
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full ${social.bgColor} flex items-center justify-center hover:scale-110 transition-transform shadow-md`}
                    aria-label={`Follow on ${social.name}`}
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
