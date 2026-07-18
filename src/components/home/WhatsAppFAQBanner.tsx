import { Calendar, Clock, ShieldCheck } from "lucide-react";

export const WhatsAppFAQBanner = () => {
  return (
    <section className="bg-primary/5 border-b border-primary/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
          <div className="flex items-center gap-2 text-foreground/80">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              Book a <strong>Free 30-Minute Discovery Call</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-foreground/80">
            <Clock className="w-4 h-4 text-primary" />
            <span>
              Same-week slots · <strong>no obligation</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-foreground/80">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>
              Personalized <strong>action plan</strong> included
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};