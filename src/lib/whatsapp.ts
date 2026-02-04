/**
 * Smart WhatsApp Click-to-Chat System
 * Context-aware pre-filled messages based on trigger point
 */

const WHATSAPP_NUMBER = "918335870240";

export type WhatsAppIntent = 
  | "general"
  | "free-audit"
  | "consultation"
  | "pricing"
  | "website-help"
  | "tourism-marketing"
  | "gmb-help"
  | "contact"
  | "package-inquiry";

interface WhatsAppMessageConfig {
  greeting: string;
  context: string;
  question?: string;
}

const messageTemplates: Record<WhatsAppIntent, WhatsAppMessageConfig> = {
  general: {
    greeting: "Hello! 👋",
    context: "I found your website and I'm interested in your freelance services.",
    question: "Could you tell me more about how you can help my business grow online?",
  },
  "free-audit": {
    greeting: "Hi! 👋",
    context: "I'm interested in getting a free website and Google Business audit.",
    question: "Could you review my online presence and suggest improvements?",
  },
  consultation: {
    greeting: "Hello! 👋",
    context: "I'd like to book a free 15-minute discovery call to discuss my business.",
    question: "When would be a good time for a quick chat?",
  },
  pricing: {
    greeting: "Hi! 👋",
    context: "I was looking at your pricing packages and have some questions.",
    question: "Could you help me choose the right package for my business?",
  },
  "website-help": {
    greeting: "Hello! 👋",
    context: "I need help with my website - it's not bringing in enough customers.",
    question: "Can you take a look and suggest what could be improved?",
  },
  "tourism-marketing": {
    greeting: "Hi! 👋",
    context: "I run a tourism/hospitality business and need help with online marketing.",
    question: "How can you help me get more bookings and visibility?",
  },
  "gmb-help": {
    greeting: "Hello! 👋",
    context: "I need help optimizing my Google Business Profile.",
    question: "Can you help me appear higher in local search results?",
  },
  contact: {
    greeting: "Hi! 👋",
    context: "I'm reaching out from your contact page.",
    question: "I'd like to discuss how you can help my business.",
  },
  "package-inquiry": {
    greeting: "Hello! 👋",
    context: "I'm interested in one of your service packages.",
    question: "Can we discuss the details and next steps?",
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
  }
): string {
  const message = buildWhatsAppMessage(intent, customDetails);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * WhatsApp conversation flow options
 */
export const whatsAppFlowOptions = [
  { id: "1", label: "Free Website & GMB Audit", intent: "free-audit" as WhatsAppIntent },
  { id: "2", label: "Website / Online Store Help", intent: "website-help" as WhatsAppIntent },
  { id: "3", label: "Tourism / Homestay Marketing", intent: "tourism-marketing" as WhatsAppIntent },
  { id: "4", label: "Pricing & Packages", intent: "pricing" as WhatsAppIntent },
  { id: "5", label: "Something Else", intent: "general" as WhatsAppIntent },
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
