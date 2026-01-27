import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/components/portfolio/BeforeAfterSlider";
import { caseStudies } from "@/data/caseStudies";

const Portfolio = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Work
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6">
              Case Studies &{" "}
              <span className="gradient-text">Success Stories</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Discover how we've helped local businesses transform their digital
              presence and achieve measurable growth through strategic marketing
              solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image - alternating sides */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <BeforeAfterSlider
                    beforeImage={study.beforeImage}
                    afterImage={study.afterImage}
                    title={study.title}
                  />
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    👆 Drag the slider to compare
                  </p>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    {study.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                    {study.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    {study.shortDescription}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {study.stats.map((stat, statIndex) => (
                      <div
                        key={statIndex}
                        className="bg-card rounded-xl p-4 text-center border border-border/50"
                      >
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="font-display text-xl font-bold text-primary">
                            {stat.value}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button variant="default" size="lg" asChild>
                    <Link to={`/portfolio/${study.slug}`}>
                      View Full Case Study
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              Ready to Be Our Next{" "}
              <span className="gradient-text">Success Story?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get a free, no-obligation audit of your website and online
              presence. We'll show you exactly what's holding you back and how
              to fix it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/free-audit">
                  Get Your Free Audit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
