import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  pageSEO, 
  defaultSEO, 
  businessInfo,
  generatePersonSchema,
  generateWebsiteSchema,
  generateLocalBusinessSchema,
  type PageSEO 
} from "@/lib/seo";

interface SEOHeadProps {
  page?: keyof typeof pageSEO;
  customSEO?: Partial<PageSEO>;
  schemas?: object[];
}

/**
 * SEO Head Component - Updates document head with page-specific SEO
 */
export const SEOHead = ({ page, customSEO, schemas = [] }: SEOHeadProps) => {
  const location = useLocation();
  
  // Determine SEO data
  const baseSEO = page ? pageSEO[page] : defaultSEO;
  const seo = { ...baseSEO, ...customSEO };
  
  // Build canonical URL
  const canonicalUrl = seo.canonicalUrl || `${businessInfo.url}${location.pathname}`;
  
  // Default schemas
  const defaultSchemas = [
    generateWebsiteSchema({
      name: businessInfo.name,
      url: businessInfo.url,
      description: businessInfo.description,
    }),
    generatePersonSchema({
      name: businessInfo.founder.name,
      jobTitle: businessInfo.founder.jobTitle,
      description: businessInfo.description,
      email: businessInfo.email,
      telephone: businessInfo.telephone,
      url: businessInfo.url,
      sameAs: businessInfo.socialLinks,
      knowsAbout: businessInfo.knowsAbout,
    }),
    generateLocalBusinessSchema({
      name: businessInfo.name,
      description: businessInfo.description,
      url: businessInfo.url,
      email: businessInfo.email,
      telephone: businessInfo.telephone,
      priceRange: "$$",
      sameAs: businessInfo.socialLinks,
    }),
  ];
  
  useEffect(() => {
    // Update document title
    document.title = seo.title;
    
    // Update meta tags
    updateMetaTag("description", seo.description);
    updateMetaTag("keywords", seo.keywords?.join(", ") || "");
    
    // Update Open Graph tags
    updateMetaTag("og:title", seo.title, "property");
    updateMetaTag("og:description", seo.description, "property");
    updateMetaTag("og:type", seo.ogType || "website", "property");
    updateMetaTag("og:url", canonicalUrl, "property");
    if (seo.ogImage) {
      updateMetaTag("og:image", seo.ogImage, "property");
    }
    
    // Update Twitter tags
    updateMetaTag("twitter:title", seo.title);
    updateMetaTag("twitter:description", seo.description);
    if (seo.ogImage) {
      updateMetaTag("twitter:image", seo.ogImage);
    }
    
    // Update canonical link
    updateCanonicalLink(canonicalUrl);
    
    // Update schema markup
    updateSchemaMarkup([...defaultSchemas, ...schemas]);
    
    // Cleanup on unmount
    return () => {
      // Remove custom schemas (keep only the base ones)
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach((script) => {
        if (script.getAttribute("data-page-specific") === "true") {
          script.remove();
        }
      });
    };
  }, [seo, canonicalUrl, schemas]);
  
  return null;
};

/**
 * Update or create a meta tag
 */
function updateMetaTag(name: string, content: string, attr: "name" | "property" = "name") {
  let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
}

/**
 * Update or create canonical link
 */
function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  
  link.href = url;
}

/**
 * Update schema markup in the document
 */
function updateSchemaMarkup(schemas: object[]) {
  // Remove existing schema scripts
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach((script) => script.remove());
  
  // Add new schema scripts
  schemas.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export default SEOHead;
