import { motion } from "framer-motion";
import { FileText, TrendingUp, MapPin, Smartphone, Search, MousePointerClick, Users, ChevronRight } from "lucide-react";
import { useState } from "react";

const auditSections = [
  {
    icon: Smartphone,
    title: "Mobile Responsiveness",
    score: 62,
    status: "Needs Improvement",
    statusColor: "text-amber-500",
    findings: [
      "Navigation menu overlaps content on iPhone SE",
      "Images not optimized for mobile — 3.2s load time",
      "CTA button too small for tap targets (< 44px)",
    ],
    recommendation: "Implement responsive breakpoints and compress hero images to WebP format.",
  },
  {
    icon: Search,
    title: "On-Page SEO",
    score: 45,
    status: "Poor",
    statusColor: "text-destructive",
    findings: [
      "Missing meta descriptions on 4 of 6 pages",
      "No H1 tag on homepage — using H3 instead",
      "Title tags exceed 60 characters on service pages",
    ],
    recommendation: "Add unique meta descriptions and restructure heading hierarchy across all pages.",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    score: 78,
    status: "Good",
    statusColor: "text-green-500",
    findings: [
      "Business hours not updated for holidays",
      "Only 3 photos uploaded — competitors average 15+",
      "Missing service area and category attributes",
    ],
    recommendation: "Upload 10+ high-quality photos and complete all GMB attributes for better local ranking.",
  },
  {
    icon: MousePointerClick,
    title: "Conversion Optimization",
    score: 38,
    status: "Critical",
    statusColor: "text-destructive",
    findings: [
      "No clear CTA above the fold",
      "Contact form requires 8 fields — high abandonment risk",
      "No social proof or testimonials on landing page",
    ],
    recommendation: "Add a prominent CTA with phone number, reduce form to 4 fields, and add testimonial carousel.",
  },
  {
    icon: Users,
    title: "Competitor Analysis",
    score: null,
    status: "3 Competitors Analyzed",
    statusColor: "text-primary",
    findings: [
      "Competitor A ranks #1 for 'plumber near me' — you're at #14",
      "Competitor B has 127 Google reviews vs. your 12",
      "Competitor C runs Google Ads for 8 local keywords you're missing",
    ],
    recommendation: "Focus on building Google reviews and target the 8 uncontested local keywords identified.",
  },
];

const SampleAuditPreview = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Sample Report</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            See What Your Audit Looks Like
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here's a preview of a real audit report for a local plumbing business. 
            Your personalized report will cover the same areas tailored to your industry.
          </p>
        </motion.div>

        {/* Audit Report Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Report Header */}
          <div className="bg-card rounded-t-2xl border border-border/50 p-6 sm:p-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sample Audit Report</p>
                <h3 className="font-display text-xl font-bold">ABC Plumbing Services</h3>
                <p className="text-sm text-muted-foreground">www.abc-plumbing-example.com</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Overall Score</p>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-primary">56</span>
                  <span className="text-sm text-muted-foreground mb-1">/100</span>
                </div>
              </div>
            </div>

            {/* Score Bar */}
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "56%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-destructive via-amber-500 to-primary"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Needs Work</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Audit Sections */}
          <div className="border-x border-border/50 divide-y divide-border/50">
            {auditSections.map((section, index) => {
              const Icon = section.icon;
              const isExpanded = expandedIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card"
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full flex items-center gap-4 p-4 sm:p-6 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base">{section.title}</h4>
                      <p className={`text-xs sm:text-sm font-medium ${section.statusColor}`}>
                        {section.status}
                        {section.score !== null && ` • ${section.score}/100`}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 sm:px-6 pb-5"
                    >
                      <div className="ml-14 space-y-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            Key Findings
                          </p>
                          <ul className="space-y-1.5">
                            {section.findings.map((finding, fi) => (
                              <li key={fi} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                {finding}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                          <p className="text-xs font-semibold text-primary mb-1">💡 Recommendation</p>
                          <p className="text-sm text-foreground">{section.recommendation}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Report Footer */}
          <div className="bg-card rounded-b-2xl border border-border/50 p-6 sm:p-8 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="font-semibold mb-1">Want this level of detail for your business?</p>
            <p className="text-sm text-muted-foreground mb-4">
              Scroll up and request your free personalized audit — no obligation.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm font-semibold text-primary hover:underline"
            >
              ↑ Request My Free Audit
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SampleAuditPreview;
