import { motion } from "framer-motion";
import { User, Heart, Laptop, Globe, Target, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const values = [
  {
    icon: User,
    title: "Personal Touch",
    description: "Work directly with me — no account managers, no handoffs, no lost messages.",
  },
  {
    icon: Heart,
    title: "Small Business Focus",
    description: "I understand budget constraints and prioritize what matters most for your growth.",
  },
  {
    icon: Laptop,
    title: "100% Remote",
    description: "Work with clients worldwide. Timezone-friendly communication and flexible scheduling.",
  },
  {
    icon: Target,
    title: "Results Over Complexity",
    description: "Simple solutions that actually work, not complicated systems you don't need.",
  },
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                About Me
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
                Hi, I'm Your{" "}
                <span className="gradient-text">Digital Partner</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                I'm a freelance digital consultant who helps small business owners, homestay 
                operators, and solo entrepreneurs build their online presence — simply and affordably.
              </p>
              <p className="text-muted-foreground mb-6">
                Unlike big agencies with complicated packages and high prices, I offer 
                personal one-to-one support. You'll always know who you're working with, 
                and I'll always be just a message away.
              </p>
              <p className="text-muted-foreground mb-8">
                My mission is simple: help small businesses get found online without 
                overwhelming them with technical jargon or unnecessary complexity.
              </p>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Currently accepting new clients</span>
              </div>

              <Button variant="whatsapp" size="lg" asChild>
                <a
                  href="https://wa.me/1234567890?text=Hi! I'd like to work with you."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Let's Connect
                </a>
              </Button>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl" />
                
                <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border/50 h-full flex flex-col justify-center">
                  <div className="w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center mb-6">
                    <span className="text-primary-foreground font-display font-bold text-4xl">D</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">
                    DigitalFreelancer
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Freelance Digital Consultant
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Web Design</span>
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm">Marketing</span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">SEO</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Why Work With a Freelancer?
            </h2>
            <p className="text-muted-foreground text-lg">
              Big agencies often mean big prices and impersonal service. 
              Here's what makes working with me different.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border/50"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who I Help */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
                Who I Love Working With
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                My ideal clients are small business owners who need practical digital support 
                without the complexity and high costs of traditional agencies.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {["Homestays", "Cafés & Restaurants", "Tour Guides", "Local Services", "Solo Entrepreneurs", "Tourism Businesses", "Small Shops", "Service Providers"].map((item, i) => (
                  <div key={i} className="px-4 py-3 rounded-xl bg-muted text-center">
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">
                  "Helping small businesses grow online through simple websites, Google Business 
                  optimization, and practical digital marketing — delivered remotely with a personal touch."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Let's have a friendly chat about your business and how I can help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                className="bg-white text-foreground hover:bg-white/90"
                asChild
              >
                <Link to="/free-audit">
                  Get a Free Audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="whatsapp" size="xl" asChild>
                <a
                  href="https://wa.me/1234567890?text=Hi! I'd like to work with you."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
