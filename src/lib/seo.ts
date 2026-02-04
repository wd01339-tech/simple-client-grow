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
  title: "Freelance Digital Consultant | Affordable Website & Marketing for Small Businesses",
  description: "Remote freelance digital consultant helping small businesses, homestays, cafés, and local services grow online. Affordable websites, Google Business optimization, and practical digital marketing with personal support.",
  keywords: [
    "freelance digital consultant",
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
    title: "Digital Services | Website Design, SEO & Marketing | DigitalFreelancer",
    description: "Professional freelance digital services: custom website design, Google Business optimization, local SEO, and digital marketing strategies for small businesses worldwide.",
    keywords: [
      "freelance web design services",
      "Google Business optimization",
      "local SEO services",
      "digital marketing freelancer",
      "small business website design",
      "remote digital consultant",
    ],
    ogType: "website",
  },
  pricing: {
    title: "Pricing & Packages | Affordable Digital Services | DigitalFreelancer",
    description: "Transparent, affordable pricing for website design, SEO, and digital marketing services. Choose from Starter, Growth, Premium, or Custom packages tailored to your business needs.",
    keywords: [
      "website design pricing",
      "affordable SEO packages",
      "digital marketing costs",
      "freelancer pricing",
      "small business web design cost",
    ],
    ogType: "website",
  },
  about: {
    title: "About Me | Remote Freelance Digital Consultant | DigitalFreelancer",
    description: "Meet your dedicated freelance digital consultant. I help small businesses, homestays, and local services succeed online with personal, one-on-one support and honest advice.",
    keywords: [
      "freelance digital consultant",
      "remote web developer",
      "about digital freelancer",
      "hire freelance marketer",
    ],
    ogType: "website",
  },
  contact: {
    title: "Contact | Get in Touch | DigitalFreelancer",
    description: "Ready to grow your business online? Contact me for a free consultation. WhatsApp, email, or fill out the form. I respond within 24 hours.",
    keywords: [
      "contact freelance developer",
      "hire digital consultant",
      "free consultation",
      "get website help",
    ],
    ogType: "website",
  },
  portfolio: {
    title: "Portfolio | Case Studies & Success Stories | DigitalFreelancer",
    description: "See real results from real clients. Browse before/after case studies showing how I've helped businesses improve their online presence and grow their customer base.",
    keywords: [
      "web design portfolio",
      "digital marketing case studies",
      "freelancer portfolio",
      "website redesign examples",
    ],
    ogType: "website",
  },
  blog: {
    title: "Blog | Digital Marketing Tips & Insights | DigitalFreelancer",
    description: "Practical tips on website optimization, SEO, Google Business, and digital marketing for small businesses. Learn how to grow your online presence.",
    keywords: [
      "digital marketing blog",
      "SEO tips for small business",
      "Google Business tips",
      "website optimization guide",
    ],
    ogType: "website",
  },
  "free-audit": {
    title: "Free Website & GMB Audit | DigitalFreelancer",
    description: "Get a free 7-point audit of your website and Google Business Profile. Discover what's working, what's not, and get actionable recommendations to improve.",
    keywords: [
      "free website audit",
      "free SEO audit",
      "Google Business review",
      "website analysis",
      "free digital marketing consultation",
    ],
    ogType: "website",
  },
};

/**
 * Business info for schema markup
 */
export const businessInfo = {
  name: "DigitalFreelancer",
  legalName: "DigitalFreelancer",
  description: "Remote freelance digital consultant helping small businesses grow online through websites, SEO, and digital marketing.",
  url: "https://simple-client-grow.lovable.app",
  email: "consultantb84@gmail.com",
  telephone: "+918335870240",
  founder: {
    name: "Digital Consultant",
    jobTitle: "Freelance Digital Consultant",
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
