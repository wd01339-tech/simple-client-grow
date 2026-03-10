import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { getWhatsAppUrl, type WhatsAppIntent } from "@/lib/whatsapp";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent, ConversionEvents } from "@/lib/analytics";
import { useUTMTracking } from "@/hooks/useUTMTracking";

type Step = "business-type" | "website" | "country" | "name-email" | "complete";

const businessTypes = [
  "Hotel / Homestay",
  "Restaurant / Café",
  "Retail / E-commerce",
  "Professional Services",
  "Healthcare / Clinic",
  "Education / Coaching",
  "Real Estate",
  "Other",
];

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "UAE / Middle East",
  "Southeast Asia",
  "Other",
];

interface LeadQualificationChatProps {
  intent: WhatsAppIntent;
  onClose: () => void;
}

export const LeadQualificationChat = ({ intent, onClose }: LeadQualificationChatProps) => {
  const [step, setStep] = useState<Step>("business-type");
  const [data, setData] = useState({ businessType: "", websiteUrl: "", country: "", name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const utmParams = useUTMTracking();

  const handleBusinessType = (type: string) => {
    setData((d) => ({ ...d, businessType: type }));
    setStep("website");
  };

  const handleWebsite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("country");
  };

  const handleCountry = (country: string) => {
    setData((d) => ({ ...d, country }));
    setStep("name-email");
  };

  const handleFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      await supabase.from("leads").insert({
        name: data.name.trim(),
        email: data.email.trim(),
        website: data.websiteUrl.trim() || null,
        business_type: data.businessType,
        country: data.country,
        inquiry_topic: intent,
        source: `whatsapp-${intent}`,
        lead_score: intent === "free-audit" ? 20 : intent === "website-dev" ? 15 : intent === "gmb-help" ? 15 : 10,
        notes: `Country: ${data.country}`,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
      });

      trackEvent(ConversionEvents.AUDIT_FORM_SUBMIT, {
        source: `whatsapp-qualification-${intent}`,
        businessType: data.businessType,
        country: data.country,
      });
    } catch (err) {
      console.error("Lead save failed:", err);
    }

    setSaving(false);
    setStep("complete");
  };

  const openWhatsApp = () => {
    const url = getWhatsAppUrl(intent, {
      businessType: data.businessType,
      websiteUrl: data.websiteUrl,
      country: data.country,
      userName: data.name,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      className="space-y-3"
    >
      {/* Progress */}
      <div className="flex gap-1 px-1">
        {["business-type", "website", "country", "name-email"].map((s, i) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              ["business-type", "website", "country", "name-email"].indexOf(step) >= i
                ? "bg-[#25D366]"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "business-type" && (
          <StepWrapper key="bt">
            <p className="text-sm font-medium text-foreground mb-2">What type of business do you have?</p>
            <div className="grid grid-cols-2 gap-1.5">
              {businessTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleBusinessType(type)}
                  className="text-xs px-3 py-2 rounded-lg bg-muted/50 hover:bg-[#25D366]/10 border border-transparent hover:border-[#25D366]/30 transition-all text-left text-foreground"
                >
                  {type}
                </button>
              ))}
            </div>
          </StepWrapper>
        )}

        {step === "website" && (
          <StepWrapper key="ws">
            <p className="text-sm font-medium text-foreground mb-2">What's your website URL? <span className="text-muted-foreground font-normal">(optional)</span></p>
            <form onSubmit={handleWebsite} className="space-y-2">
              <input
                type="url"
                maxLength={500}
                placeholder="https://yourwebsite.com"
                value={data.websiteUrl}
                onChange={(e) => setData((d) => ({ ...d, websiteUrl: e.target.value }))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 outline-none transition-all"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#20BD5C] transition-colors"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </StepWrapper>
        )}

        {step === "country" && (
          <StepWrapper key="co">
            <p className="text-sm font-medium text-foreground mb-2">Where is your business located?</p>
            <div className="grid grid-cols-2 gap-1.5">
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCountry(c)}
                  className="text-xs px-3 py-2 rounded-lg bg-muted/50 hover:bg-[#25D366]/10 border border-transparent hover:border-[#25D366]/30 transition-all text-left text-foreground"
                >
                  {c}
                </button>
              ))}
            </div>
          </StepWrapper>
        )}

        {step === "name-email" && (
          <StepWrapper key="ne">
            <p className="text-sm font-medium text-foreground mb-2">Almost done! How can we reach you?</p>
            <form onSubmit={handleFinish} className="space-y-2">
              <input
                type="text"
                required
                maxLength={100}
                placeholder="Your name"
                value={data.name}
                onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 outline-none transition-all"
              />
              <input
                type="email"
                required
                maxLength={255}
                placeholder="your@email.com"
                value={data.email}
                onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#20BD5C] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <>Save & Continue <ArrowRight className="w-3.5 h-3.5" /></>}
              </button>
            </form>
          </StepWrapper>
        )}

        {step === "complete" && (
          <StepWrapper key="done">
            <div className="text-center space-y-3 py-2">
              <CheckCircle className="w-8 h-8 text-[#25D366] mx-auto" />
              <div>
                <p className="text-sm font-medium text-foreground">Details saved!</p>
                <p className="text-xs text-muted-foreground mt-1">Click below to continue on WhatsApp with your details pre-filled.</p>
              </div>
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#20BD5C] transition-colors"
              >
                💬 Continue on WhatsApp
              </button>
            </div>
          </StepWrapper>
        )}
      </AnimatePresence>

      {step !== "complete" && (
        <button
          onClick={() => {
            const url = getWhatsAppUrl(intent);
            window.open(url, "_blank", "noopener,noreferrer");
            onClose();
          }}
          className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
        >
          Skip → Message directly on WhatsApp
        </button>
      )}
    </motion.div>
  );
};

const StepWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);
