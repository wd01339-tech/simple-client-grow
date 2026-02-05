 /**
  * Smart WhatsApp Click-to-Chat System
  * Context-aware pre-filled messages with friendly, human tone
  * Designed for tourism & SEA markets - no pressure, trust-building
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
   },
   "free-audit": {
     greeting: "Hi 👋",
     context: "I'd like a free website and GMB audit please.",
     question: "Can you take a look at my online presence and share some suggestions?",
   },
   consultation: {
     greeting: "Hi 👋",
     context: "I'd like to book a quick discovery call to discuss my business.",
     question: "When would be a good time for you?",
   },
   pricing: {
     greeting: "Hi 👋",
     context: "I was looking at your pricing packages.",
     question: "Could you help me understand which one would work best for my needs?",
   },
   "website-help": {
     greeting: "Hi 👋",
     context: "I need some help with my website — it's not bringing in enough customers right now.",
     question: "Would you be able to take a quick look and share your thoughts?",
   },
   "tourism-marketing": {
     greeting: "Hi 👋",
     context: "I run a homestay/tourism business and need help with online visibility.",
     question: "How can you help me get more bookings?",
   },
   "gmb-help": {
     greeting: "Hi 👋",
     context: "I'd like help optimizing my Google Business Profile.",
     question: "Can you help me show up better in local searches?",
   },
   contact: {
     greeting: "Hi 👋",
     context: "I'm reaching out from your website.",
     question: "I'd love to discuss how you can help my business 😊",
   },
   "package-inquiry": {
     greeting: "Hi 👋",
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
