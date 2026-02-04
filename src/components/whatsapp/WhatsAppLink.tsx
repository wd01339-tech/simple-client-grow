import { ReactNode } from "react";
import { getWhatsAppUrl, type WhatsAppIntent } from "@/lib/whatsapp";
import { Button, type ButtonProps } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppLinkProps extends Omit<ButtonProps, "asChild"> {
  intent?: WhatsAppIntent;
  customDetails?: {
    businessType?: string;
    packageName?: string;
    websiteUrl?: string;
    userName?: string;
  };
  children?: ReactNode;
  showIcon?: boolean;
}

/**
 * Smart WhatsApp Link Component
 * Uses context-aware pre-filled messages
 */
export const WhatsAppLink = ({
  intent = "general",
  customDetails,
  children,
  showIcon = true,
  variant = "whatsapp",
  ...buttonProps
}: WhatsAppLinkProps) => {
  const url = getWhatsAppUrl(intent, customDetails);

  return (
    <Button variant={variant} {...buttonProps} asChild>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {showIcon && <MessageCircle className="w-5 h-5" />}
        {children || "Message on WhatsApp"}
      </a>
    </Button>
  );
};

export default WhatsAppLink;
