import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, TrendingUp, Quote } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/components/portfolio/BeforeAfterSlider";
import { getCaseStudyBySlug, caseStudies } from "@/data/caseStudies";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!caseStudy) {
    return <Navigate to="/portfolio" replace />;
  }

  // Find next and previous case studies
  const currentIndex = caseStudies.findIndex((s) => s.slug === slug);
  const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextStudy =
    currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>

            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {caseStudy.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {caseStudy.title}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl">
              {caseStudy.fullDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-2xl font-bold text-center mb-8">
              The Transformation
            </h2>
            <BeforeAfterSlider
              beforeImage={caseStudy.beforeImage}
              afterImage={caseStudy.afterImage}
              title={caseStudy.title}
              className="shadow-xl"
            />
            <p className="text-center text-sm text-muted-foreground mt-4">
              👆 Drag the slider to compare before and after
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl font-bold">Key Results</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {caseStudy.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 text-center border border-border/50 shadow-sm"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span className="font-display text-3xl font-bold text-primary">
                    {stat.value}
                  </span>
                </div>
                <span className="text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge, Solution, Results */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-lg font-bold">
                  1
                </span>
                The Challenge
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed pl-13">
                {caseStudy.challenge}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold">
                  2
                </span>
                Our Solution
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed pl-13">
                {caseStudy.solution}
              </p>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-accent/50 text-accent-foreground flex items-center justify-center text-lg font-bold">
                  3
                </span>
                The Results
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed pl-13">
                {caseStudy.results}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
              <blockquote className="font-display text-2xl sm:text-3xl font-medium mb-6 italic">
                "{caseStudy.testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-foreground">
                  {caseStudy.testimonial.author}
                </p>
                <p className="text-muted-foreground">
                  {caseStudy.testimonial.role}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {prevStudy ? (
              <Link
                to={`/portfolio/${prevStudy.slug}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <span className="text-sm">Previous</span>
                  <p className="font-medium text-foreground">{prevStudy.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextStudy ? (
              <Link
                to={`/portfolio/${nextStudy.slug}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="text-right">
                  <span className="text-sm">Next</span>
                  <p className="font-medium text-foreground">{nextStudy.title}</p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              Want Similar Results?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss how we can help your business achieve the same
              level of success with a tailored digital strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/free-audit">
                  Get Your Free Audit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://wa.me/918335870240?text=Hello, I saw your case study and I'd like to discuss my project."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyDetail;
