import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmartWhatsAppButton } from "@/components/whatsapp/SmartWhatsAppButton";
import { AIChatWidget } from "@/components/chat/AIChatWidget";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { type WhatsAppIntent } from "@/lib/whatsapp";

interface LayoutProps {
  children: ReactNode;
  whatsappIntent?: WhatsAppIntent;
}

export const Layout = ({ children, whatsappIntent = "general" }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <SmartWhatsAppButton defaultIntent={whatsappIntent} />
      <AIChatWidget />
    </div>
  );
};
