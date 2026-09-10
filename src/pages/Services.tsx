import { motion } from "framer-motion";
import { Globe, TrendingUp, Users, MapPin, CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";

const services = [
  {
    icon: Globe,
    title: "Website & Landing Page Support",
    tagline: "Get a website that actually works for your business",
    description:
      "Clean, mobile-friendly websites that turn visitors into inquiries. No complicated systems — just simple designs that look professional and load fast.",
    benefits: [
      "Mobile-responsive design that works everywhere",
      "Fast loading for better user experience",
      "Clear calls-to-action that drive inquiries",
      "Easy to update content yourself",
      "SEO-friendly structure",
    ],
    idealFor: "Perfect for homestays, cafés, tour guides, and local service providers",
    color: "primary",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing (Organic + Simple Ads)",
    tagline: "Improve your online visibility without breaking the bank",
    description:
      "Get found by more potential customers through smart, budget-friendly marketing. I focus on what actually works for small businesses — not expensive agencies or complicated strategies.",
    benefits: [
      "Social media content that engages",
      "Simple ad campaigns that convert",
      "Email marketing setup & support",
      "Content strategy guidance",
      "Analytics & performance tracking",
    ],
    idealFor: "Great for businesses ready to grow their online presence step by step",
    color: "secondary",
  },
  {
    icon: Users,
    title: "Lead Generation & Social Media Support",
    tagline: "Focus on real results — inquiries, calls, and bookings",
    description:
      "Forget vanity metrics like likes and followers. I help you build systems that generate actual leads — phone calls, WhatsApp messages, and booking inquiries that turn into paying customers.",
    benefits: [
      "WhatsApp & chat integration",
      "Lead capture forms & funnels",
      "Social media profile optimization",
      "Engagement strategies that work",
      "Direct response messaging",
    ],
    idealFor: "Ideal for businesses that want more customer inquiries, not just followers",
    color: "accent",
  },
  {
    icon: MapPin,
    title: "Google Business Profile Management & Optimization",
    tagline: "Get found on Google Maps when customers search for you",
    description:
      "Your Google Business Profile is often the first thing potential customers see. I'll optimize it to help you appear in local searches, attract more reviews, and stand out from competitors.",
    benefits: [
      "Complete profile setup or cleanup",
      "Keyword-optimized business description",
      "Category & service optimization",
      "Google Maps visibility improvement",
      "Review strategy for trust & ranking",
      "Regular updates & maintenance",
    ],
    idealFor: "Essential for homestays, cafés, tourism services, and all local businesses",
    color: "primary",
  },
];

const ServicesPage = () => {
  return (
    <Layout whatsappIntent="website-help">
      <SEOHead page="services" />
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Services
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6">
              Affordable Website Design, SEO & Digital Marketing for{" "}
              <span className="gradient-text">Small Businesses</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Expert digital strategy, web development,, Google Business optimization, local SEO, and lead generation services. 
              Affordable, practical digital support that helps homestays, cafés, and local businesses get found online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                      service.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : service.color === "secondary"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    <service.icon className="w-7 h-7" />
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                    {service.title}
                  </h2>
                  <p className="text-primary font-medium mb-4">{service.tagline}</p>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  <p className="text-sm text-muted-foreground italic mb-6">
                    {service.idealFor}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="default" size="lg" asChild>
                      <Link to="/free-audit">
                        Request a Free Review
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <WhatsAppLink intent="website-help" size="lg">
                      Talk on WhatsApp
                    </WhatsAppLink>
                  </div>
                </div>

                {/* Benefits Card */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                    <h4 className="font-semibold mb-4">What You Get:</h4>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Let's have a quick chat. I'll listen to your needs and suggest the best approach 
              for your business — no pressure, no obligation.
            </p>
            <Button
              size="xl"
              className="bg-white text-foreground hover:bg-white/90"
              asChild
            >
              <Link to="/contact">
                Let's Talk
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
