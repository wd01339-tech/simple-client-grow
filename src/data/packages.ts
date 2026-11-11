import { Zap, Sparkles, TrendingUp, Crown } from "lucide-react";

export interface Package {
  id: string;
  name: string;
  tagline: string;
  icon: typeof Zap;
  bestFor: string;
  features: string[];
  price: number;
  priceDisplay: string;
  priceType: "one-time" | "monthly";
  ctaLabel: string;
  whatsappMessage: string;
  popular: boolean;
  color: "primary" | "secondary" | "accent";
}

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter Setup",
    tagline: "Quick wins for new businesses",
    icon: Zap,
    bestFor: "First-time clients, new websites, solo entrepreneurs",
    features: [
      "Complete website audit & report",
      "Google My Business setup or cleanup",
      "Basic SEO optimization (titles, meta descriptions)",
      "Mobile responsiveness check & fixes",
      "WhatsApp click-to-chat integration",
      "One revision round included",
    ],
    price: 99,
    priceDisplay: "$99",
    priceType: "one-time",
    ctaLabel: "Discuss Starter Setup",
    whatsappMessage: "Hi! I'm interested in the Starter Setup package ($99). Can you tell me more?",
    popular: false,
    color: "primary",
  },
  {
    id: "growth",
    name: "Growth Boost",
    tagline: "Complete optimization for growing businesses",
    icon: Sparkles,
    bestFor: "Homestays, tourism services, small e-commerce stores",
    features: [
      "Everything in Starter Setup",
      "Full website optimization (up to 10 pages)",
      "Advanced SEO with keyword research",
      "Google My Business optimization",
      "Lead generation forms + CTA optimization",
      "Social media profile setup & linking",
      "Conversion-focused content improvements",
      "Two revision rounds included",
    ],
    price: 249,
    priceDisplay: "$249",
    priceType: "one-time",
    ctaLabel: "Discuss Growth Boost",
    whatsappMessage: "Hi! I'm interested in the Growth Boost package ($249). I'd like to discuss my business needs.",
    popular: true,
    color: "secondary",
  },
  {
    id: "monthly-support",
    name: "Monthly Support",
    tagline: "Ongoing optimization & peace of mind",
    icon: TrendingUp,
    bestFor: "Businesses needing regular updates and support",
    features: [
      "Monthly website maintenance & updates",
      "Google My Business management",
      "Review monitoring & response guidance",
      "Monthly performance report",
      "Priority email & WhatsApp support",
      "1 content update per month",
      "Technical issue resolution",
      "Cancel anytime – no lock-in",
    ],
    price: 149,
    priceDisplay: "$149",
    priceType: "monthly",
    ctaLabel: "Discuss Monthly Support",
    whatsappMessage: "Hi! I'm interested in the Monthly Support package ($149/month). Can we discuss my ongoing needs?",
    popular: false,
    color: "accent",
  },
  {
    id: "premium",
    name: "Premium Partner",
    tagline: "Full-service digital growth partner",
    icon: Crown,
    bestFor: "Growing tourism brands, established e-commerce stores",
    features: [
      "Everything in Monthly Support",
      "Dedicated priority support",
      "Weekly performance monitoring",
      "Advanced SEO & content strategy",
      "Up to 4 content updates per month",
      "Competitor analysis & insights",
      "Conversion rate optimization",
      "Monthly strategy call (30 min)",
      "Cancel anytime – no lock-in",
    ],
    price: 349,
    priceDisplay: "$349",
    priceType: "monthly",
    ctaLabel: "Discuss Premium Partner",
    whatsappMessage: "Hi! I'm interested in the Premium Partner package ($349/month). Let's discuss how we can grow together.",
    popular: false,
    color: "primary",
  },
];

export const trustSignals = [
  "Prices shown in USD",
  "Free 30-minute discovery call",
  "No payment taken online",
];

export const faqItems = [
  {
    question: "How do I get started?",
    answer: "Choose a package and book a free 30-minute discovery call. We'll confirm the scope and payment steps together before any work begins. No payment is taken on this site.",
  },
  {
    question: "What happens after the call?",
    answer: "We'll confirm whether the package fits your needs, agree on the scope and payment steps, and decide together whether to proceed.",
  },
  {
    question: "Can I cancel my monthly subscription?",
    answer: "Absolutely! There are no long-term contracts. Cancel anytime before your next billing date – no questions asked.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes. If you're not satisfied within the first 7 days, contact me and I'll work with you on a fair resolution or partial refund based on work completed.",
  },
  {
    question: "What's not included?",
    answer: "Hosting fees, domain registration, third-party tool subscriptions, and paid advertising budgets are not included. Everything I deliver is clearly outlined before we start.",
  },
  {
    question: "How long does delivery take?",
    answer: "Starter Setup: 3-5 business days. Growth Boost: 7-10 business days. Monthly packages start immediately after payment.",
  },
  {
    question: "Can I upgrade later?",
    answer: "Yes! Start with any package and upgrade anytime. I'll credit a portion of your previous payment toward the upgrade.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely. I work remotely with clients worldwide. All prices are in USD, and communication happens via WhatsApp, email, or video calls.",
  },
];
