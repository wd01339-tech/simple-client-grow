/**
 * SEO Utilities and Schema Markup Generator
 */

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  email: string;
  telephone: string;
  image?: string;
  priceRange?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  sameAs?: string[];
}

export interface PersonSchema {
  name: string;
  jobTitle: string;
  description: string;
  email: string;
  telephone: string;
  url: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

export interface ServiceSchema {
  name: string;
  description: string;
  provider: string;
  serviceType: string;
  areaServed?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export interface FAQSchema {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export interface BreadcrumbSchema {
  items: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * Generate LocalBusiness schema markup
 */
export function generateLocalBusinessSchema(data: LocalBusinessSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: data.name,
    description: data.description,
    url: data.url,
    email: data.email,
    telephone: data.telephone,
    image: data.image,
    priceRange: data.priceRange || "$$",
    address: data.address ? {
      "@type": "PostalAddress",
      ...data.address,
    } : undefined,
    geo: data.geo ? {
      "@type": "GeoCoordinates",
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    } : undefined,
    openingHoursSpecification: data.openingHours ? {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    } : undefined,
    sameAs: data.sameAs,
  };
}

/**
 * Generate Person schema markup
 */
export function generatePersonSchema(data: PersonSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.jobTitle,
    description: data.description,
    email: data.email,
    telephone: data.telephone,
    url: data.url,
    image: data.image,
    sameAs: data.sameAs,
    knowsAbout: data.knowsAbout,
  };
}

/**
 * Generate Service schema markup
 */
export function generateServiceSchema(data: ServiceSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    provider: {
      "@type": "Person",
      name: data.provider,
    },
    serviceType: data.serviceType,
    areaServed: data.areaServed || "Worldwide",
    offers: data.offers ? {
      "@type": "Offer",
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency,
    } : undefined,
  };
}

/**
 * Generate FAQ schema markup
 */
export function generateFAQSchema(data: FAQSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate Breadcrumb schema markup
 */
export function generateBreadcrumbSchema(data: BreadcrumbSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebSite schema markup
 */
export function generateWebsiteSchema(data: {
  name: string;
  url: string;
  description: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.name,
    url: data.url,
    description: data.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${data.url}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Default SEO data for the site
 */
export const defaultSEO: PageSEO = {
  title: "Digital Strategy + Web Development + Growth Marketing | Affordable Web & Growth for Small Businesses",
  description: "Expert digital strategy, web development, and growth marketing for affordable website design, Google Business optimization, local SEO, and digital marketing. Personal support for homestays, cafés, tourism businesses, and local services worldwide.",
  keywords: [
    "digital strategist",
    "remote freelancer for small business",
    "affordable website design",
    "digital marketing for local businesses",
    "Google My Business optimization services",
    "freelance website developer",
    "tourism website marketing",
    "homestay website design",
    "ecommerce website support",
    "local SEO services",
    "online business growth consultant",
    "hire freelance web designer",
    "small business SEO expert",
    "Google Business Profile management",
    "affordable growth marketing expert",
    "remote website developer for small business",
    "freelance SEO consultant",
    "best freelancer for local business website",
  ],
  ogType: "website",
};

/**
 * Page-specific SEO configurations
 */
export const pageSEO: Record<string, PageSEO> = {
  home: {
    ...defaultSEO,
  },
  services: {
    title: "Digital Strategy, Web Development & Growth Marketing Services",
    description: "Professional digital strategy, web development, and growth marketing services: custom website design, Google Business Profile optimization, local SEO, lead generation, and digital marketing for small businesses, homestays, and tourism brands worldwide.",
    keywords: [
      "web development services",
      "Google Business optimization",
      "local SEO services",
      "growth marketing expert",
      "small business website design",
      "remote digital consultant",
      "affordable website development",
      "SEO and growth services",
      "Google Maps optimization",
      "tourism business marketing",
    ],
    ogType: "website",
  },
  pricing: {
    title: "Affordable Website Design & SEO Pricing | Freelance Digital Packages | Digital Growth Strategy",
    description: "Transparent, affordable pricing for freelance website design, local SEO, Google Business optimization, and digital marketing. Starter, Growth, Premium, or Custom packages for small businesses.",
    keywords: [
      "website design pricing",
      "affordable SEO packages",
      "digital marketing costs",
      "freelancer pricing",
      "small business web design cost",
      "cheap website design packages",
      "freelance digital marketing rates",
      "affordable Google Business optimization",
    ],
    ogType: "website",
  },
  about: {
    title: "About | Hire a Remote Digital Growth Strategist & Developer for Small Businesses | Digital Growth Strategy",
    description: "Meet your remote digital strategist specializing in affordable website design, Google Business optimization, and local SEO for homestays, cafés, tour guides, and small businesses worldwide.",
    keywords: [
      "digital strategist",
      "remote web developer",
      "about digital freelancer",
      "hire freelance marketer",
      "affordable website designer",
      "freelancer for tourism business",
      "small business digital expert",
    ],
    ogType: "website",
  },
  contact: {
    title: "Contact Digital Growth Strategist & Developer | Free Consultation | Digital Growth Strategy",
    description: "Contact your digital strategist for a free website and SEO consultation. Reach out via WhatsApp, email, or contact form. Response within 24 hours. Affordable digital support for small businesses.",
    keywords: [
      "contact freelance developer",
      "hire digital consultant",
      "free consultation",
      "get website help",
      "free SEO consultation",
      "WhatsApp digital consultant",
      "hire freelancer for website",
    ],
    ogType: "website",
  },
  portfolio: {
    title: "Portfolio | Website Redesign & SEO Case Studies | Digital Growth Strategy",
    description: "Browse real before-and-after case studies showing website redesign, Google Business optimization, and SEO results for homestays, cafés, and small businesses. See how freelance digital consulting drives growth.",
    keywords: [
      "web design portfolio",
      "digital marketing case studies",
      "freelancer portfolio",
      "website redesign examples",
      "SEO case studies",
      "Google Business success stories",
      "small business website results",
    ],
    ogType: "website",
  },
  blog: {
    title: "Digital Marketing Blog | SEO Tips, Website Guides & Google Business Advice | Digital Growth Strategy",
    description: "Expert blog with practical SEO tips, website optimization guides, Google Business Profile strategies, and digital marketing advice for small businesses, homestays, and local services.",
    keywords: [
      "digital marketing blog",
      "SEO tips for small business",
      "Google Business tips",
      "website optimization guide",
      "local SEO blog",
      "growth marketing advice",
      "how to rank on Google",
    ],
    ogType: "website",
  },
  "free-audit": {
    title: "Free Website & Google Business Audit | SEO Analysis | Digital Growth Strategy",
    description: "Get a free 7-point SEO audit of your website and Google Business Profile. Discover search ranking issues, mobile responsiveness problems, and get actionable recommendations to improve your local visibility.",
    keywords: [
      "free website audit",
      "free SEO audit",
      "Google Business review",
      "website analysis",
      "free digital marketing consultation",
      "free local SEO check",
      "Google Business Profile audit",
      "website performance analysis",
    ],
    ogType: "website",
  },
};

/**
 * Business info for schema markup
 */
export const businessInfo = {
  name: "Digital Growth Strategy",
  legalName: "Digital Growth Strategy",
  description: "Remote digital strategist helping small businesses grow online through websites, SEO, and digital marketing.",
  url: "https://simple-client-grow.lovable.app",
  email: "consultantb84@gmail.com",
  telephone: "+918335870240",
  founder: {
    name: "Digital Consultant",
    jobTitle: "Digital Growth Strategist & Developer",
  },
  socialLinks: [
    "https://facebook.com/yourpage",
    "https://instagram.com/yourprofile",
    "https://linkedin.com/in/yourprofile",
  ],
  knowsAbout: [
    "Web Development",
    "Website Design",
    "Search Engine Optimization",
    "Google My Business",
    "Digital Marketing",
    "Local SEO",
    "E-commerce",
    "Tourism Marketing",
    "Lead Generation",
  ],
};
