import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, X } from "lucide-react";
import { trackEvent, ConversionEvents } from "@/lib/analytics";
import { recordConversion } from "@/lib/conversions";

type UserType = "new" | "returning" | "engaged";

const OFFERS: Record<UserType, { text: string; cta: string; wa: string }> = {
  new: {
    text: "🔥 Free Website & GMB Audit — Start Today!",
    cta: "Claim Free Audit",
    wa: "Hello, I want to claim the Free Website & GMB Audit offer.",
  },
  returning: {
    text: "⏳ Welcome Back! Special Offer This Week!",
    cta: "Claim Offer",
    wa: "Hello, I'm back — please share this week's special offer.",
  },
  engaged: {
    text: "🚀 Ready to Grow? Book a Free Consultation!",
    cta: "Book Free Call",
    wa: "Hello, I'd like to book the free consultation now.",
  },
};

const COUNTDOWN_KEY = "hero_offer_deadline_v1";
const DISMISS_KEY = "hero_offer_dismissed_v1";
const COUNTDOWN_MS = 30 * 60 * 1000; // 30 minutes

function getDeadline() {
  const raw = localStorage.getItem(COUNTDOWN_KEY);
  const now = Date.now();
  if (raw) {
    const ts = Number(raw);
    if (ts > now) return ts;
  }
  const next = now + COUNTDOWN_MS;
  localStorage.setItem(COUNTDOWN_KEY, String(next));
  return next;
}

function classify(): UserType {
  if (typeof window === "undefined") return "new";
  if (sessionStorage.getItem("clickedCTA") === "1") return "engaged";
  if (localStorage.getItem("visited") === "1") return "returning";
  return "new";
}

export const HeroOfferWidget = () => {
  const [userType, setUserType] = useState<UserType>("new");
  const [now, setNow] = useState(Date.now());
  const [deadline, setDeadline] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // First-week rule
    if (new Date().getDate() > 7) {
      setVisible(false);
      return;
    }
    if (sessionStorage.getItem(DISMISS_KEY) === "1") {
      setDismissed(true);
      return;
    }
    setUserType(classify());
    setDeadline(getDeadline());
    localStorage.setItem("visited", "1");
    trackEvent("hero_offer_view", { user_type: classify() });
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [visible, dismissed]);

  const offer = OFFERS[userType];
  const remaining = Math.max(0, deadline - now);
  const m = Math.floor(remaining / 60000);
  const s = Math.floor((remaining % 60000) / 1000);

  const waUrl = useMemo(() => {
    const campaignId = `hero_offer_${new Date().toISOString().slice(0, 7)}_${userType}`;
    const utm = new URLSearchParams({
      utm_source: "website",
      utm_medium: "hero_offer_widget",
      utm_campaign: campaignId,
      utm_content: userType,
    }).toString();
    return `https://calendly.com/consultantb84/30min?${utm}`;
  }, [offer.wa, userType]);

  const handleClick = () => {
    sessionStorage.setItem("clickedCTA", "1");
    trackEvent(ConversionEvents.WHATSAPP_CLICK, {
      source: "hero_offer_widget",
      user_type: userType,
    });
    trackEvent("hero_offer_click", { user_type: userType });
    recordConversion({
      event_type: "whatsapp_click",
      attribution: { source: "hero_offer_widget", user_type: userType, offer_text: offer.text },
      metadata: { offer_text: offer.text, user_type: userType },
    });
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
    trackEvent("hero_offer_dismiss", { user_type: userType });
  };

  if (!visible || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full rounded-xl border border-white/10 shadow-2xl backdrop-blur-md"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary) / 0.92), hsl(var(--secondary) / 0.92))",
          color: "hsl(var(--primary-foreground))",
        }}
        role="region"
        aria-label="Limited time offer"
      >
        <div className="p-3 sm:p-4">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] sm:text-sm font-semibold leading-snug">
                {offer.text}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[11px] opacity-90">
                <Clock className="w-3 h-3" />
                <span>
                  Ends in {String(m).padStart(2, "0")}m {String(s).padStart(2, "0")}s
                </span>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss offer"
              className="p-1 -mr-1 -mt-1 rounded hover:bg-white/15 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] hover:bg-[#1ebe5a] text-white px-3 py-2 text-[13px] font-semibold transition shadow-lg shadow-black/20"
          >
            {offer.cta} on WhatsApp
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HeroOfferWidget;
