import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import caseStudy1Before from "@/assets/case-study-1-before.jpg";
import caseStudy1After from "@/assets/case-study-1-after.jpg";
import caseStudy2Before from "@/assets/case-study-2-before.jpg";
import caseStudy2After from "@/assets/case-study-2-after.jpg";
import caseStudy3Before from "@/assets/case-study-3-before.jpg";
import caseStudy3After from "@/assets/case-study-3-after.jpg";

const caseStudies = [
  {
    id: 1,
    title: "Boutique Hotel Website Redesign",
    category: "Website Design",
    description:
      "Transformed an outdated website into a modern, booking-friendly experience that increased inquiries by 180%.",
    beforeImage: caseStudy1Before,
    afterImage: caseStudy1After,
    stats: [
      { label: "More Inquiries", value: "+180%" },
      { label: "Bounce Rate", value: "-45%" },
      { label: "Mobile Traffic", value: "+90%" },
    ],
  },
  {
    id: 2,
    title: "Local Café GMB Optimization",
    category: "Google Business Profile",
    description:
      "Complete profile overhaul with keyword optimization and review strategy, resulting in top 3 local rankings.",
    beforeImage: caseStudy2Before,
    afterImage: caseStudy2After,
    stats: [
      { label: "Google Ranking", value: "Top 3" },
      { label: "Monthly Views", value: "+320%" },
      { label: "New Reviews", value: "50+" },
    ],
  },
  {
    id: 3,
    title: "Wellness Brand Social Media",
    category: "Social Media & Lead Gen",
    description:
      "Built a cohesive brand presence and engagement strategy that tripled follower growth and monthly leads.",
    beforeImage: caseStudy3Before,
    afterImage: caseStudy3After,
    stats: [
      { label: "Follower Growth", value: "3x" },
      { label: "Engagement Rate", value: "+250%" },
      { label: "Monthly Leads", value: "+180%" },
    ],
  },
];

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage, title }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <div
      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={`${title} - After`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${title} - Before`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <div className="flex items-center gap-0.5">
            <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-foreground/70" />
            <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-foreground/70" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium">
        Before
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
        After
      </div>
    </div>
  );
};

export const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStudy = caseStudies[activeIndex];

  return (
    <section className="py-24 bg-muted/30" aria-label="Portfolio Case Studies and Before After Results">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Portfolio & Case Studies
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Website Redesign & SEO Results for{" "}
            <span className="gradient-text">Small Businesses</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See real before-and-after transformations from website redesign, Google Business optimization, 
            and digital marketing projects for homestays, cafés, and local service businesses.
          </p>
        </motion.div>

        {/* Case Study Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              onClick={() => setActiveIndex(index)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                activeIndex === index
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              {study.category}
            </button>
          ))}
        </div>

        {/* Active Case Study */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStudy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* Before/After Slider */}
            <div>
              <BeforeAfterSlider
                beforeImage={activeStudy.beforeImage}
                afterImage={activeStudy.afterImage}
                title={activeStudy.title}
              />
              <p className="text-center text-sm text-muted-foreground mt-3">
                👆 Drag the slider to compare
              </p>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {activeStudy.category}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {activeStudy.title}
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                {activeStudy.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {activeStudy.stats.map((stat, index) => (
                  <div
                    key={index}
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
                <Link to="/free-audit">
                  Get Similar Results
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
