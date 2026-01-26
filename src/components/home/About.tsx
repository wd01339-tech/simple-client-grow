import { motion } from "framer-motion";
import { User, Heart, Laptop, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import aboutImage from "@/assets/about-consultant.jpg";

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
              {/* Decorative circles */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl" />
              
              {/* Main image card */}
              <div className="relative bg-card rounded-3xl overflow-hidden shadow-2xl border border-border/50 h-full">
                <img
                  src={aboutImage}
                  alt="Digital consultant working remotely in a modern home office"
                  className="w-full h-full object-cover"
                />
                {/* Overlay with availability badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                  <h3 className="font-display text-lg font-bold mb-1">
                    Hi, I'm Your Digital Partner
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm text-muted-foreground">Available for new projects</span>
                  </div>
                </div>
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
                  href="https://wa.me/1234567890?text=Hi! I'd like to discuss my project."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Let's Chat
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
