import { motion } from "framer-motion";
import { Globe, TrendingUp, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import serviceWebsite from "@/assets/service-website.jpg";
import serviceMarketing from "@/assets/service-marketing.jpg";
import serviceLeads from "@/assets/service-leads.jpg";
import serviceGmb from "@/assets/service-gmb.jpg";

const services = [
  {
    icon: Globe,
    category: "02 — Web Development",
    title: "Website & Landing Page Support",
    description:
      "Clean, mobile-friendly websites that turn visitors into inquiries. Simple designs that work, without the complexity.",
    color: "primary",
    image: serviceWebsite,
    imageAlt: "Modern responsive website displayed on multiple devices",
  },
  {
    icon: TrendingUp,
    category: "03 — Growth Marketing",
    title: "Digital Marketing",
    description:
      "Improve online visibility without high budgets or jargon. Organic growth and simple ad strategies that actually work.",
    color: "secondary",
    image: serviceMarketing,
    imageAlt: "Digital marketing analytics dashboard showing growth metrics",
  },
  {
    icon: Users,
    category: "03 — Growth Marketing",
    title: "Lead Generation & Social Media",
    description:
      "Focus on messages, calls, and bookings — not vanity metrics. Real results for real businesses.",
    color: "accent",
    image: serviceLeads,
    imageAlt: "Smartphone showing social media engagement and notifications",
  },
  {
    icon: MapPin,
    category: "01 — Digital Strategy",
    title: "Google Business Profile Management",
    description:
      "Get found on Google Maps. Profile setup, keyword optimization, and review strategies for local visibility.",
    color: "primary",
    image: serviceGmb,
    imageAlt: "Google Business Profile with reviews on smartphone",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const Services = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider" id="digital-services">
            Digital Strategy + Web Development + Growth Marketing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Website Design, SEO & Marketing Solutions for{" "}
            <span className="gradient-text">Small Business Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Professional digital strategy, web development,, Google Business optimization, local SEO, and 
            digital marketing services that help small businesses get found online and attract more customers.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                {/* Icon overlay */}
                <div
                  className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center ${
                    service.color === "primary"
                      ? "bg-primary text-primary-foreground"
                      : service.color === "secondary"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  <service.icon className="w-6 h-6" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>

                {/* Link */}
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Learn more
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="gradient" size="lg" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
