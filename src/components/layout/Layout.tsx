import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmartWhatsAppButton } from "@/components/whatsapp/SmartWhatsAppButton";
import { AIChatWidget } from "@/components/chat/AIChatWidget";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { MobileStickyCalendlyCTA } from "@/components/marketing/MobileStickyCalendlyCTA";
import { type WhatsAppIntent } from "@/lib/whatsapp";

interface LayoutProps {
  children: ReactNode;
  whatsappIntent?: WhatsAppIntent;
}

export const Layout = ({ children, whatsappIntent = "general" }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <SmartWhatsAppButton defaultIntent={whatsappIntent} />
      <AIChatWidget />
      <MobileStickyCalendlyCTA />
    </div>
  );
};
