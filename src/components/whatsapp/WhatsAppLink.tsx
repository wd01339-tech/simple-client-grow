import { ReactNode } from "react";
import { getWhatsAppUrl, type WhatsAppIntent } from "@/lib/whatsapp";
import { Button, type ButtonProps } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { trackEvent, ConversionEvents } from "@/lib/analytics";
import { recordConversion } from "@/lib/conversions";

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

  const handleClick = () => {
    trackEvent(ConversionEvents.WHATSAPP_CLICK, { intent, source: "whatsapp_link" });
    recordConversion({
      event_type: "whatsapp_click",
      attribution: { intent, package_name: customDetails?.packageName },
      metadata: { intent, ...customDetails },
    });
  };

  return (
    <Button variant={variant} {...buttonProps} asChild>
      <a href={url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        {showIcon && <MessageCircle className="w-5 h-5" />}
        {children || "Message on WhatsApp"}
      </a>
    </Button>
  );
};

export default WhatsAppLink;
