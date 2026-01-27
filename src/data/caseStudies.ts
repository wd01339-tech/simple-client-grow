import caseStudy1Before from "@/assets/case-study-1-before.jpg";
import caseStudy1After from "@/assets/case-study-1-after.jpg";
import caseStudy2Before from "@/assets/case-study-2-before.jpg";
import caseStudy2After from "@/assets/case-study-2-after.jpg";
import caseStudy3Before from "@/assets/case-study-3-before.jpg";
import caseStudy3After from "@/assets/case-study-3-after.jpg";

export interface CaseStudyStat {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: string;
  beforeImage: string;
  afterImage: string;
  stats: CaseStudyStat[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "boutique-hotel-website-redesign",
    title: "Boutique Hotel Website Redesign",
    category: "Website Design",
    shortDescription:
      "Transformed an outdated website into a modern, booking-friendly experience that increased inquiries by 180%.",
    fullDescription:
      "A charming boutique hotel in the heart of the city was struggling with an outdated website that failed to capture their unique atmosphere and drove potential guests away. The old site was slow, not mobile-friendly, and lacked an intuitive booking flow.",
    challenge:
      "The hotel's previous website was built over 8 years ago and hadn't been updated since. It was slow to load, not responsive on mobile devices (where 70% of their traffic came from), and the booking process required users to call or email. This resulted in high bounce rates and lost bookings to competitors with modern online reservation systems.",
    solution:
      "We designed a completely new website with a mobile-first approach, stunning imagery showcasing the hotel's unique character, and an integrated booking system. The new design emphasized the boutique experience with elegant typography, smooth animations, and a streamlined user journey from landing to booking.",
    results:
      "Within 3 months of launch, the hotel saw a 180% increase in direct inquiries, a 45% reduction in bounce rate, and a 90% increase in mobile traffic engagement. The new booking system reduced staff time spent on manual reservations by 60%.",
    beforeImage: caseStudy1Before,
    afterImage: caseStudy1After,
    stats: [
      { label: "More Inquiries", value: "+180%" },
      { label: "Bounce Rate", value: "-45%" },
      { label: "Mobile Traffic", value: "+90%" },
    ],
    testimonial: {
      quote: "The new website has completely transformed how guests discover and book with us. We're seeing more direct bookings than ever before!",
      author: "Maria Santos",
      role: "Hotel Manager",
    },
  },
  {
    id: 2,
    slug: "local-cafe-gmb-optimization",
    title: "Local Café GMB Optimization",
    category: "Google Business Profile",
    shortDescription:
      "Complete profile overhaul with keyword optimization and review strategy, resulting in top 3 local rankings.",
    fullDescription:
      "A beloved local café was virtually invisible on Google despite having loyal customers and great reviews on other platforms. Their Google Business Profile was incomplete and they were missing out on significant foot traffic from 'coffee near me' searches.",
    challenge:
      "The café had a basic GMB listing with minimal information, no photos, and only a handful of reviews. They were ranking on page 2 of local search results, meaning potential customers searching for coffee shops in the area never found them. Competitors with optimized profiles were capturing all the local search traffic.",
    solution:
      "We performed a complete GMB optimization including keyword-rich descriptions, professional photography, consistent NAP information, category optimization, and implemented a review generation strategy. We also set up Google Posts for weekly updates and special offers.",
    results:
      "The café achieved top 3 local rankings within 6 weeks. Monthly profile views increased by 320%, and they received 50+ new reviews in the first quarter. Walk-in traffic increased significantly, with many new customers mentioning they found the café through Google.",
    beforeImage: caseStudy2Before,
    afterImage: caseStudy2After,
    stats: [
      { label: "Google Ranking", value: "Top 3" },
      { label: "Monthly Views", value: "+320%" },
      { label: "New Reviews", value: "50+" },
    ],
    testimonial: {
      quote: "We went from being invisible to being the first café people see when they search. The increase in new customers has been incredible.",
      author: "David Chen",
      role: "Café Owner",
    },
  },
  {
    id: 3,
    slug: "wellness-brand-social-media",
    title: "Wellness Brand Social Media",
    category: "Social Media & Lead Gen",
    shortDescription:
      "Built a cohesive brand presence and engagement strategy that tripled follower growth and monthly leads.",
    fullDescription:
      "A wellness and holistic health brand was struggling to build an online presence. Despite offering excellent services, their social media felt disjointed and wasn't generating any meaningful engagement or leads.",
    challenge:
      "The brand's social media presence was inconsistent with sporadic posting, no visual identity, and minimal engagement. Content wasn't resonating with their target audience, and they had no strategy for converting followers into paying clients. Their follower count had stagnated for months.",
    solution:
      "We developed a comprehensive social media strategy including brand visual guidelines, content pillars, posting schedule, and engagement tactics. We created a lead magnet (free wellness guide) and set up automated nurture sequences. The content focused on educational value while showcasing the brand's expertise.",
    results:
      "Follower growth tripled within 4 months. Engagement rate jumped by 250%, and monthly leads increased by 180%. The lead magnet generated a growing email list of qualified prospects, and the brand became recognized as a thought leader in their niche.",
    beforeImage: caseStudy3Before,
    afterImage: caseStudy3After,
    stats: [
      { label: "Follower Growth", value: "3x" },
      { label: "Engagement Rate", value: "+250%" },
      { label: "Monthly Leads", value: "+180%" },
    ],
    testimonial: {
      quote: "Our social media finally feels like us, and the leads coming in are exactly the type of clients we want to work with. Game changer!",
      author: "Sarah Mitchell",
      role: "Wellness Coach",
    },
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find((study) => study.slug === slug);
};
