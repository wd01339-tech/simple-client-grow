import { motion } from "framer-motion";
import { User, Heart, Laptop, Globe, Target, Calendar, ArrowRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";

import heroConsultant from "@/assets/hero-consultant-enhanced.png";

const IMAGE_ALT = "Digital strategy, web development, and growth marketing expert providing remote website and marketing support for small businesses";

const values = [
  {
    icon: User,
    title: "Direct Communication",
    description: "Work directly with me — no account managers, no handoffs, no lost messages.",
  },
  {
    icon: Heart,
    title: "Tourism & Small Business Focus",
    description: "I specialize in helping homestays, cafés, and local services get found online.",
  },
  {
    icon: Laptop,
    title: "100% Remote",
    description: "Work with clients worldwide. Timezone-friendly communication and flexible scheduling.",
  },
  {
    icon: Target,
    title: "Simple & Affordable",
    description: "Practical solutions that actually work, without complicated systems or high costs.",
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

const AboutPage = () => {
  return (
    <Layout whatsappIntent="consultation">
      <SEOHead page="about" />
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-bg-subtle border border-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-foreground">About Me</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
                Digital Strategy + Web Development + Growth Marketing —{" "}
                <span className="gradient-text">Affordable Website & Marketing Help</span>
              </h1>
              
              <p className="text-muted-foreground text-lg mb-6">
                I started this practice because too many small business owners — especially in tourism, 
                hospitality, and local services — struggle to find <strong>affordable website design</strong> and 
                <strong>dedicated digital strategy, web development, and growth marketing support</strong> without paying agency prices.
              </p>
              
              <p className="text-muted-foreground mb-6">
                Big agencies often charge high prices for complicated solutions. I wanted to offer 
                something different: <strong>simple websites, Google Business optimization, and practical 
                marketing support</strong> — delivered remotely with one-to-one communication.
              </p>
              
              <p className="text-muted-foreground mb-8">
                Whether you run a homestay in the mountains, a café by the beach, or a local service 
                business, I'm here to help you get found by more customers — without the jargon or 
                the high costs.
              </p>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Currently accepting new clients</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/free-audit">
                    Get a Free Audit
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    <Calendar className="w-5 h-5" />
                    Book a Discovery Call
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Visual - Same enhanced image as Hero */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative hidden lg:block"
            >
              <div className="max-w-md mx-auto relative">
                {/* Decorative glow */}
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-3xl blur-xl opacity-60" />
                
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={heroConsultant}
                    alt="Digital strategy, web development, and growth marketing expert helping small businesses"
                    className="w-full h-auto object-cover aspect-[4/5]"
                    width={400}
                    height={500}
                    loading="lazy"
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
                  
                  {/* Decorative border */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                </div>
                
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
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
              Why Digital Strategy + Web Development + Growth Marketing?
            </h2>
            <p className="text-muted-foreground text-lg">
              Digital marketing agencies charge high fees for impersonal service. 
              A dedicated digital partner delivers affordable, direct, and results-focused website and SEO support.
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
                Ideal Clients: Homestays, Cafés, Tourism & Local Services
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                I specialize in helping small business owners who need affordable website design, Google Business optimization, 
                and local SEO — without the complexity and high costs of traditional marketing agencies.
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
              Ready to Grow Your Business Online?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Let's have a friendly chat about your goals. No pressure, no jargon — just honest advice.
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
              <Button 
                size="xl" 
                variant="outline"
                className="border-white/30 text-primary-foreground hover:bg-white/10"
                asChild
              >
                <Link to="/contact">
                  <Calendar className="w-5 h-5" />
                  Book a Discovery Call
                </Link>
              </Button>
            </div>
            <p className="text-primary-foreground/70 text-sm mt-6">
              No agencies, no middlemen — direct expert support.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
