import { MessageCircle, Clock, Send } from "lucide-react";

export const WhatsAppFAQBanner = () => {
  return (
    <section className="bg-[#25D366]/5 border-b border-[#25D366]/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
          <div className="flex items-center gap-2 text-foreground/80">
            <Send className="w-4 h-4 text-[#25D366]" />
            <span>
              First message? Just say <strong>"Hi, I need help"</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-foreground/80">
            <Clock className="w-4 h-4 text-[#25D366]" />
            <span>
              Avg. reply: <strong>under 5 minutes</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-foreground/80">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>
              Available <strong>24/7</strong> via WhatsApp
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};