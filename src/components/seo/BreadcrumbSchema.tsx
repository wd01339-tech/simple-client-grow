import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { businessInfo } from "@/lib/seo";

const LABELS: Record<string, string> = {
  "": "Home",
  services: "Services",
  pricing: "Pricing",
  about: "About",
  contact: "Contact",
  portfolio: "Portfolio",
  blog: "Blog",
  "free-audit": "Free Audit",
  privacy: "Privacy",
  terms: "Terms",
};

const humanize = (slug: string) =>
  LABELS[slug] ??
  slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Injects BreadcrumbList JSON-LD for the current route so search engines
 * can render breadcrumb rich results. Home renders a single-item list.
 */
export const BreadcrumbSchema = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const base = businessInfo.url.replace(/\/$/, "");
    const segments = pathname.split("/").filter(Boolean);
    const items = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${base}/`,
      },
      ...segments.map((seg, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: humanize(decodeURIComponent(seg)),
        item: `${base}/${segments.slice(0, i + 1).join("/")}`,
      })),
    ];

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-breadcrumb-schema", "true");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [pathname]);

  return null;
};

export default BreadcrumbSchema;