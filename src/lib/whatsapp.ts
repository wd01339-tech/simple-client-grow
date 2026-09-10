/**
 * Smart WhatsApp Click-to-Chat System
 * Context-aware pre-filled messages with friendly, human tone
 * Designed for tourism & SEA markets - no pressure, trust-building
 * 
 * FUTURE: These templates map to WhatsApp Business API template names
 * for automated chatbot integration (Twilio/Meta Cloud API)
 */

const WHATSAPP_NUMBER = "918335870240";

export type WhatsAppIntent =
  | "general"
  | "free-audit"
  | "consultation"
  | "pricing"
  | "website-help"
  | "website-dev"
  | "tourism-marketing"
  | "gmb-help"
  | "growth-marketing"
  | "contact"
  | "package-inquiry"
  | "talk-to-consultant";

interface WhatsAppMessageConfig {
  greeting: string;
  context: string;
  question?: string;
  /** WhatsApp Business API template name (for future integration) */
  apiTemplateName?: string;
}

/**
 * Friendly, human-tone message templates
 * - No pressure, builds trust
 * - Short messages with clear value
 * - Easy reply path
 */
const messageTemplates: Record<WhatsAppIntent, WhatsAppMessageConfig> = {
  general: {
    greeting: "Hi 👋",
    context: "I found your website and I'm interested in learning how you can help my business grow online.",
    question: "Would love to have a quick chat when you're free 😊",
    apiTemplateName: "welcome_message",
  },
  "free-audit": {
    greeting: "Hi 👋",
    context: "I'd like a free website and GMB audit please.",
    question: "Can you take a look at my online presence and share some suggestions?",
    apiTemplateName: "audit_request",
  },
  consultation: {
    greeting: "Hi 👋",
    context: "I'd like to book a quick discovery call to discuss my business.",
    question: "When would be a good time for you?",
    apiTemplateName: "consultation_invite",
  },
  pricing: {
    greeting: "Hi 👋",
    context: "I was looking at your pricing packages.",
    question: "Could you help me understand which one would work best for my needs?",
    apiTemplateName: "pricing_inquiry",
  },
  "website-help": {
    greeting: "Hi 👋",
    context: "I need some help with my website — it's not bringing in enough customers right now.",
    question: "Would you be able to take a quick look and share your thoughts?",
    apiTemplateName: "website_help",
  },
  "website-dev": {
    greeting: "Hi 👋",
    context: "I'm looking to get a professional website built for my business.",
    question: "Can you tell me about your website development services and timelines?",
    apiTemplateName: "website_development",
  },
  "tourism-marketing": {
    greeting: "Hi 👋",
    context: "I run a homestay/tourism business and need help with online visibility.",
    question: "How can you help me get more bookings?",
    apiTemplateName: "tourism_marketing",
  },
  "gmb-help": {
    greeting: "Hi 👋",
    context: "I'd like help optimizing my Google Business Profile so I can rank better in local searches.",
    question: "Can you help me show up better on Google Maps?",
    apiTemplateName: "gmb_optimization",
  },
  "growth-marketing": {
    greeting: "Hi 👋",
    context: "I'm interested in digital marketing services to grow my business online.",
    question: "What marketing strategies would you recommend for my industry?",
    apiTemplateName: "digital_marketing",
  },
  contact: {
    greeting: "Hi 👋",
    context: "I'm reaching out from your website.",
    question: "I'd love to discuss how you can help my business 😊",
    apiTemplateName: "welcome_message",
  },
  "package-inquiry": {
    greeting: "Hi 👋",
    context: "I'm interested in one of your service packages.",
    question: "Can we discuss the details and next steps?",
    apiTemplateName: "pricing_inquiry",
  },
  "talk-to-consultant": {
    greeting: "Hi 👋",
    context: "I'd like to speak directly with a consultant about my business needs.",
    question: "Are you available for a quick call or chat?",
    apiTemplateName: "consultation_invite",
  },
};

/**
 * Build the WhatsApp message based on intent
 */
export function buildWhatsAppMessage(
  intent: WhatsAppIntent,
  customDetails?: {
    businessType?: string;
    packageName?: string;
    websiteUrl?: string;
    userName?: string;
    country?: string;
  }
): string {
  const template = messageTemplates[intent];
  let message = `${template.greeting}\n\n${template.context}`;

  // Add custom details if provided
  if (customDetails) {
    const details: string[] = [];

    if (customDetails.userName) {
      details.push(`My name is ${customDetails.userName}`);
    }
    if (customDetails.businessType) {
      details.push(`Business type: ${customDetails.businessType}`);
    }
    if (customDetails.packageName) {
      details.push(`Package I'm interested in: ${customDetails.packageName}`);
    }
    if (customDetails.websiteUrl) {
      details.push(`My website: ${customDetails.websiteUrl}`);
    }
    if (customDetails.country) {
      details.push(`Location: ${customDetails.country}`);
    }

    if (details.length > 0) {
      message += `\n\n📋 ${details.join("\n")}`;
    }
  }

  if (template.question) {
    message += `\n\n${template.question}`;
  }

  return message;
}

/**
 * Generate WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(
  intent: WhatsAppIntent = "general",
  customDetails?: {
    businessType?: string;
    packageName?: string;
    websiteUrl?: string;
    userName?: string;
    country?: string;
  }
): string {
  // WhatsApp chatbot routes to a WhatsApp conversation (no scheduling redirect).
  const message = buildWhatsAppMessage(intent, customDetails);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Main menu options for the WhatsApp chatbot widget
 * Maps to the 7-option conversion menu
 */
export const whatsAppFlowOptions = [
  { id: "1", label: "Free Website & GMB Audit", intent: "free-audit" as WhatsAppIntent, icon: "search" as const, description: "Get a free review of your online presence" },
  { id: "2", label: "Website Development", intent: "website-dev" as WhatsAppIntent, icon: "globe" as const, description: "Build a professional website" },
  { id: "3", label: "Google Business Optimization", intent: "gmb-help" as WhatsAppIntent, icon: "map-pin" as const, description: "Rank higher in local searches" },
  { id: "4", label: "Digital Marketing", intent: "growth-marketing" as WhatsAppIntent, icon: "trending-up" as const, description: "Grow your online presence" },
  { id: "5", label: "Pricing & Packages", intent: "pricing" as WhatsAppIntent, icon: "tag" as const, description: "View our service packages" },
  { id: "6", label: "Ask a Question", intent: "general" as WhatsAppIntent, icon: "help-circle" as const, description: "We're happy to help" },
  { id: "7", label: "Talk to Expert", intent: "talk-to-consultant" as WhatsAppIntent, icon: "phone" as const, description: "Speak directly with an expert" },
];

/**
 * WhatsApp Business API template registry
 * Ready for future Twilio/Meta Cloud API integration
 */
export const whatsAppApiTemplates = {
  welcome_message: {
    name: "welcome_message",
    category: "MARKETING",
    language: "en",
    components: [
      {
        type: "BODY",
        text: "Hello 👋\nWelcome to Digital Strategy + Web Development + Growth Marketing.\n\nI'm here to help you explore our services and find the best solution for your business.\n\nPlease choose one option below:\n\n1️⃣ Free Website & GMB Audit\n2️⃣ Website Development\n3️⃣ Google My Business Optimization\n4️⃣ Growth Marketing Services\n5️⃣ Pricing & Packages\n6️⃣ Ask a Question\n7️⃣ Talk to Expert",
      },
    ],
  },
  audit_request: {
    name: "audit_request",
    category: "UTILITY",
    language: "en",
    components: [
      {
        type: "BODY",
        text: "Thank you for requesting a *Free Website & GMB Audit*.\n\nPlease share the following details:\n\n• Website URL\n• Business Type\n• Location / Country\n\nOur expert will review your website and send helpful insights.",
      },
    ],
  },
  consultation_invite: {
    name: "consultation_invite",
    category: "UTILITY",
    language: "en",
    components: [
      {
        type: "BODY",
        text: "Would you like to discuss your business goals with our consultant?\n\nYou can request a quick consultation and receive guidance on:\n\n• Website improvements\n• SEO visibility\n• Lead generation strategies",
      },
    ],
  },
  follow_up_reminder: {
    name: "follow_up_reminder",
    category: "MARKETING",
    language: "en",
    components: [
      {
        type: "BODY",
        text: "Hello 👋\n\nJust checking in to see if you still need help with your website or online visibility.\n\nWe're happy to assist whenever you're ready.",
      },
    ],
  },
} as const;

/**
 * AI chatbot training intents for future NLP integration
 */
export const chatbotTrainingIntents = [
  {
    intent: "website_help",
    examples: [
      "I need a website for my business",
      "Can you build my website?",
      "I want a professional website",
      "Website development services",
      "How much for a website?",
    ],
    response: "We can definitely help with website development.\n\nOur services include:\n• Business websites\n• Tourism & homestay websites\n• Ecommerce websites\n\nWould you like a *free website audit* or *pricing information*?",
    suggestedIntent: "website-dev" as WhatsAppIntent,
  },
  {
    intent: "google_business",
    examples: [
      "My business is not showing on Google",
      "How to rank on Google Maps?",
      "GMB optimization help",
      "Google Business Profile",
      "Local SEO help",
    ],
    response: "Optimizing your *Google My Business profile* can improve local visibility.\n\nWe help with:\n• Profile optimization\n• Local ranking strategies\n• Review management\n\nWould you like a *Free GMB Audit*?",
    suggestedIntent: "gmb-help" as WhatsAppIntent,
  },
  {
    intent: "pricing",
    examples: [
      "What are your prices?",
      "Service cost",
      "How much for a website?",
      "Package details",
      "Affordable services",
    ],
    response: "Our service pricing depends on your business needs.\n\nYou can choose:\n• Standard packages\n• Custom solutions\n\nWould you like *pricing details* or a *custom quote*?",
    suggestedIntent: "pricing" as WhatsAppIntent,
  },
  {
    intent: "digital_marketing",
    examples: [
      "I need help with marketing",
      "Social media marketing",
      "SEO services",
      "Online advertising",
      "How to get more customers online",
    ],
    response: "We offer comprehensive digital marketing services:\n\n• SEO & content strategy\n• Social media management\n• Lead generation campaigns\n• Analytics & reporting\n\nWould you like to discuss a *marketing plan* for your business?",
    suggestedIntent: "growth-marketing" as WhatsAppIntent,
  },
];

/**
 * Get the WhatsApp number formatted for display
 */
export function getFormattedPhoneNumber(): string {
  return "+91-8335-870-240";
}

/**
 * Get raw WhatsApp number
 */
export function getWhatsAppNumber(): string {
  return WHATSAPP_NUMBER;
}

/**
 * Get API template by name (for future WhatsApp Business API)
 */
export function getApiTemplate(templateName: string) {
  return whatsAppApiTemplates[templateName as keyof typeof whatsAppApiTemplates] ?? null;
}
