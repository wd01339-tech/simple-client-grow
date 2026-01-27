import caseStudy1Before from "@/assets/case-study-1-before.jpg";
import caseStudy1After from "@/assets/case-study-1-after.jpg";
import caseStudy2Before from "@/assets/case-study-2-before.jpg";
import caseStudy2After from "@/assets/case-study-2-after.jpg";
import caseStudy3Before from "@/assets/case-study-3-before.jpg";
import caseStudy3After from "@/assets/case-study-3-after.jpg";
import caseStudy4Before from "@/assets/case-study-4-before.jpg";
import caseStudy4After from "@/assets/case-study-4-after.jpg";
import caseStudy5Before from "@/assets/case-study-5-before.jpg";
import caseStudy5After from "@/assets/case-study-5-after.jpg";
import caseStudy6Before from "@/assets/case-study-6-before.jpg";
import caseStudy6After from "@/assets/case-study-6-after.jpg";
import caseStudy7Before from "@/assets/case-study-7-before.jpg";
import caseStudy7After from "@/assets/case-study-7-after.jpg";
import caseStudy8Before from "@/assets/case-study-8-before.jpg";
import caseStudy8After from "@/assets/case-study-8-after.jpg";
import caseStudy9Before from "@/assets/case-study-9-before.jpg";
import caseStudy9After from "@/assets/case-study-9-after.jpg";
import caseStudy10Before from "@/assets/case-study-10-before.jpg";
import caseStudy10After from "@/assets/case-study-10-after.jpg";

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
  {
    id: 4,
    slug: "family-restaurant-digital-transformation",
    title: "Family Restaurant Digital Transformation",
    category: "Website & Online Ordering",
    shortDescription:
      "Modernized a traditional restaurant's online presence with integrated ordering, boosting takeout orders by 240%.",
    fullDescription:
      "A beloved family-owned restaurant had been serving the community for 20 years but was losing customers to competitors with modern online ordering systems. Their outdated website made it difficult for customers to view menus or place orders.",
    challenge:
      "The restaurant relied heavily on phone orders and walk-ins, but younger customers expected online ordering. Their old website had a PDF menu that was hard to read on mobile, no online ordering capability, and outdated design that didn't reflect their warm, family atmosphere. They were losing market share to chain restaurants with slick apps.",
    solution:
      "We built a modern, appetizing website with high-quality food photography, an easy-to-navigate digital menu, and integrated online ordering with real-time order tracking. The design captured their family heritage while feeling contemporary. We also optimized their Google Business Profile with updated photos and menu items.",
    results:
      "Takeout orders increased by 240% within 2 months. The average order value went up 35% thanks to better menu presentation and upselling prompts. Customer reviews specifically mentioned the ease of online ordering, and the restaurant saw a significant increase in new customer acquisition.",
    beforeImage: caseStudy4Before,
    afterImage: caseStudy4After,
    stats: [
      { label: "Takeout Orders", value: "+240%" },
      { label: "Order Value", value: "+35%" },
      { label: "New Customers", value: "+150%" },
    ],
    testimonial: {
      quote: "We were skeptical about going digital, but the results speak for themselves. Our online orders now match our dine-in revenue!",
      author: "Roberto Gallo",
      role: "Restaurant Owner",
    },
  },
  {
    id: 5,
    slug: "adventure-tours-booking-system",
    title: "Adventure Tours Booking System",
    category: "Website & SEO",
    shortDescription:
      "Built an immersive tour booking platform that doubled direct bookings and reduced dependency on OTAs.",
    fullDescription:
      "An adventure tour operator was paying hefty commissions to online travel agencies (OTAs) while their own website sat neglected. They needed a stunning online presence that could compete with the big booking platforms.",
    challenge:
      "Over 80% of their bookings came through third-party OTAs, costing them 15-25% in commissions per booking. Their website was basic with no booking functionality, poor destination imagery, and zero SEO optimization. Potential customers searching for local tours found competitors or OTA listings instead.",
    solution:
      "We created an immersive website showcasing their adventures with stunning imagery, detailed itineraries, and a seamless booking system. Implemented strong local SEO targeting adventure keywords, integrated customer reviews and testimonials, and added interactive elements like availability calendars and group booking options.",
    results:
      "Direct bookings doubled within 4 months, significantly reducing OTA dependency. Commission savings totaled over $15,000 in the first quarter. Organic search traffic increased by 280%, and the company now ranks first for several high-value adventure tour keywords in their region.",
    beforeImage: caseStudy5Before,
    afterImage: caseStudy5After,
    stats: [
      { label: "Direct Bookings", value: "2x" },
      { label: "Commission Saved", value: "$15K+" },
      { label: "Organic Traffic", value: "+280%" },
    ],
    testimonial: {
      quote: "We finally have a website that matches the quality of our tours. The booking system pays for itself every month in saved commissions.",
      author: "James Rivera",
      role: "Tour Company Owner",
    },
  },
  {
    id: 6,
    slug: "artisan-ecommerce-optimization",
    title: "Artisan E-commerce Optimization",
    category: "E-commerce & Conversion",
    shortDescription:
      "Transformed an underperforming online store into a conversion machine with 185% increase in sales.",
    fullDescription:
      "A local artisan selling handcrafted products had an online store that wasn't converting. Despite quality products and competitive pricing, visitors weren't completing purchases and cart abandonment was sky-high.",
    challenge:
      "The e-commerce site had a cluttered design, confusing navigation, poor product photography, and a checkout process that required too many steps. Cart abandonment rate was at 78%, and the few sales they got often came with customer complaints about the purchasing experience. Mobile conversion was nearly zero.",
    solution:
      "We redesigned the entire shopping experience with clean product layouts, professional photography showing craftsmanship details, trust signals throughout, and a streamlined 3-step checkout. Added features like saved carts, guest checkout, multiple payment options, and excellent product filtering. Implemented email recovery for abandoned carts.",
    results:
      "Sales increased by 185% within 3 months. Cart abandonment dropped from 78% to 45%. Mobile conversions went from nearly zero to representing 40% of all sales. The abandoned cart email sequence recovers an additional 15% of potential lost sales each month.",
    beforeImage: caseStudy6Before,
    afterImage: caseStudy6After,
    stats: [
      { label: "Sales Increase", value: "+185%" },
      { label: "Cart Abandonment", value: "-43%" },
      { label: "Mobile Sales", value: "40%" },
    ],
    testimonial: {
      quote: "I was ready to give up on online sales. Now it's my primary revenue stream and I can focus on creating instead of worrying about tech.",
      author: "Lisa Nakamura",
      role: "Artisan & Founder",
    },
  },
  {
    id: 7,
    slug: "luxury-spa-local-presence",
    title: "Luxury Spa Local Presence",
    category: "Local SEO & Lead Gen",
    shortDescription:
      "Established dominant local visibility for a day spa, driving 200% more appointment requests.",
    fullDescription:
      "A luxury day spa and massage center was struggling to fill appointment slots despite offering premium services. Their online presence didn't match their in-person experience, and they were invisible in local searches.",
    challenge:
      "The spa's website looked outdated and didn't convey luxury. Their Google Business Profile was incomplete with poor photos. They had no strategy for generating or managing reviews, and competitors dominated the local search results for spa and massage keywords. Many treatment rooms sat empty during weekdays.",
    solution:
      "We created a serene, luxurious website that matched their in-spa experience, complete with easy online booking. Optimized their GMB with professional ambiance photography and implemented a systematic approach to generating and responding to reviews. Built out local SEO targeting treatment-specific keywords.",
    results:
      "Appointment requests increased by 200%. They achieved top 3 local rankings for key treatment terms. Their Google review count tripled in 4 months with an average of 4.9 stars. Weekday appointments increased significantly, reducing previously unused capacity.",
    beforeImage: caseStudy7Before,
    afterImage: caseStudy7After,
    stats: [
      { label: "Appointments", value: "+200%" },
      { label: "Google Rating", value: "4.9★" },
      { label: "Local Ranking", value: "Top 3" },
    ],
    testimonial: {
      quote: "Our treatment rooms are now fully booked most days. The online presence finally reflects the quality experience we provide in person.",
      author: "Amanda Foster",
      role: "Spa Director",
    },
  },
  {
    id: 8,
    slug: "personal-trainer-brand-building",
    title: "Personal Trainer Brand Building",
    category: "Social Media & Website",
    shortDescription:
      "Transformed a solo trainer into a recognized fitness brand with consistent client pipeline.",
    fullDescription:
      "A certified personal trainer was struggling to build a client base beyond word-of-mouth referrals. Despite excellent results with existing clients, they had no online presence and no system for generating leads.",
    challenge:
      "The trainer had no website, inconsistent social media presence, and relied entirely on gym referrals which were unpredictable. They lacked testimonials and transformation photos despite many success stories. Potential clients couldn't find them online and had no way to learn about their services or book consultations.",
    solution:
      "We built a personal brand website showcasing transformation results, training philosophy, and service packages. Created a cohesive social media strategy with workout content, nutrition tips, and client spotlights. Implemented a lead magnet (free fitness assessment) and automated follow-up sequence to nurture prospects.",
    results:
      "Monthly consultation requests went from 2-3 to 15-20. Social media following grew by 400% with strong engagement. The trainer now has a 3-month waiting list for new clients and has been able to increase rates by 40% due to demand.",
    beforeImage: caseStudy8Before,
    afterImage: caseStudy8After,
    stats: [
      { label: "Consultations", value: "6x" },
      { label: "Social Growth", value: "+400%" },
      { label: "Rate Increase", value: "+40%" },
    ],
    testimonial: {
      quote: "I went from hustling for every client to having a waiting list. My online presence now works for me 24/7, even when I'm training.",
      author: "Marcus Thompson",
      role: "Personal Trainer",
    },
  },
  {
    id: 9,
    slug: "charming-homestay-visibility",
    title: "Charming Homestay Visibility",
    category: "Website & GMB Optimization",
    shortDescription:
      "Boosted a homestay's direct bookings by 175% with stunning visuals and optimized local presence.",
    fullDescription:
      "A beautiful countryside homestay was struggling to attract guests despite rave reviews from those who found them. They were heavily dependent on Airbnb and Booking.com, paying significant commissions on each reservation.",
    challenge:
      "The homestay had no website and relied entirely on OTA platforms for visibility. Their property photos were amateur shots that didn't capture the charm of the space. They had no Google Business Profile, meaning guests searching for accommodation in the area never found them directly.",
    solution:
      "We created a charming website with professional property photography, virtual tour elements, and direct booking capability. Set up and optimized their Google Business Profile with seasonal updates. Implemented a guest review strategy and local SEO targeting accommodation keywords for their area.",
    results:
      "Direct bookings increased by 175%, saving thousands in OTA commissions. They now appear in top 5 for local accommodation searches. Guest reviews on Google help build trust, and many guests now book return visits directly through the website.",
    beforeImage: caseStudy9Before,
    afterImage: caseStudy9After,
    stats: [
      { label: "Direct Bookings", value: "+175%" },
      { label: "Commission Saved", value: "$8K/yr" },
      { label: "Google Reviews", value: "75+" },
    ],
    testimonial: {
      quote: "Guests now find us directly and we keep more of what we earn. The website captures our homestay's character perfectly.",
      author: "Catherine & Paul Wright",
      role: "Homestay Owners",
    },
  },
  {
    id: 10,
    slug: "boutique-retail-omnichannel",
    title: "Boutique Retail Omnichannel",
    category: "Website & Local Marketing",
    shortDescription:
      "Created a seamless online-offline experience for a boutique, increasing total revenue by 160%.",
    fullDescription:
      "A charming boutique retail shop was losing customers to online competitors. They needed to bridge the gap between their physical store experience and the digital world where customers increasingly shop.",
    challenge:
      "The shop had no e-commerce presence and their physical store was struggling as foot traffic declined. Their Google Business Profile was basic with no photos of their curated product selection. They had no way to reach customers who preferred to browse or buy online, and no system for promoting in-store events or new arrivals.",
    solution:
      "We built an omnichannel solution including a shoppable website with click-and-collect, a fully optimized Google Business Profile with product inventory, and an email marketing system for new arrivals and events. Created social media content strategy showcasing products and the in-store experience.",
    results:
      "Total revenue increased by 160% combining online and in-store sales. Click-and-collect became popular, driving 45% of online customers to visit the physical store. Email marketing generates consistent repeat purchases, and the shop has become a local destination with a strong community following.",
    beforeImage: caseStudy10Before,
    afterImage: caseStudy10After,
    stats: [
      { label: "Total Revenue", value: "+160%" },
      { label: "Store Visits", value: "+45%" },
      { label: "Email List", value: "2,500+" },
    ],
    testimonial: {
      quote: "We thought online would hurt our shop, but it's done the opposite. Customers discover us online and become loyal in-store shoppers.",
      author: "Emma Richardson",
      role: "Boutique Owner",
    },
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find((study) => study.slug === slug);
};
