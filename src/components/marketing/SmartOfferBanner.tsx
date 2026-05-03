import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Clock } from "lucide-react";
import { trackEvent, ConversionEvents } from "@/lib/analytics";

type UserType = "new" | "returning" | "highIntent";
type Region = "IN" | "SEA" | "GLOBAL";

interface Offer {
  text: string;
  cta: string;
  waMessage: string;
}

const OFFERS: Record<Region, Record<UserType, Offer>> = {
  IN: {
    new: {
      text: "🔥 Low-cost website setup + FREE consultation for Indian businesses",
      cta: "Claim Offer",
      waMessage: "Hi! I'm in India and want the low-cost website setup + free consultation offer.",
    },
    returning: {
      text: "⏳ Welcome back! Flat 20% OFF this week on all India packages",
      cta: "Get 20% OFF",
      waMessage: "Hi! I'm a returning visitor — please share the 20% OFF India offer.",
    },
    highIntent: {
      text: "🚀 Ready to grow? Book your FREE strategy call today",
      cta: "Book Free Call",
      waMessage: "Hi! I'd like to book my free strategy call now.",
    },
  },
  SEA: {
    new: {
      text: "🏝 Get more bookings for your homestay, hotel or tour business",
      cta: "Free Audit",
      waMessage: "Hi! I run a tourism/hospitality business and want a free audit.",
    },
    returning: {
      text: "⏳ You're back! Special hospitality growth deal — this week only",
      cta: "Claim Deal",
      waMessage: "Hi! Please share the special hospitality deal for this week.",
    },
    highIntent: {
      text: "🚀 Let's fill your bookings — free 15-min consultation",
      cta: "Book Now",
      waMessage: "Hi! I want to book the free 15-min consultation for my hospitality business.",
    },
  },
  GLOBAL: {
    new: {
      text: "🌐 Scale globally with remote digital consulting — Free Website Audit",
      cta: "Get Free Audit",
      waMessage: "Hi! I'd like the free website audit for my business.",
    },
    returning: {
      text: "⏳ Welcome back! Limited-time consulting offer this week",
      cta: "See Offer",
      waMessage: "Hi! I'm a returning visitor — please share this week's consulting offer.",
    },
    highIntent: {
      text: "🚀 Ready to grow? Book your free consultation now",
      cta: "Book Consultation",
      waMessage: "Hi! I'd like to book my free consultation now.",
    },
  },
};

const AB_VARIATIONS = [
  "🔥 Free Audit + Special Discount this month",
  "🚀 Grow faster — book a free 15-min strategy call",
  "💼 Affordable website setup starting this week",
];

const INDIA_TZ = ["Asia/Kolkata", "Asia/Calcutta"];
const SEA_TZ = [
  "Asia/Bangkok",
  "Asia/Jakarta",
  "Asia/Singapore",
  "Asia/Kuala_Lumpur",
  "Asia/Manila",
  "Asia/Ho_Chi_Minh",
  "Asia/Phnom_Penh",
  "Asia/Vientiane",
  "Asia/Yangon",
];

function detectRegion(): Region {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (INDIA_TZ.includes(tz)) return "IN";
    if (SEA_TZ.includes(tz)) return "SEA";
  } catch {
    /* noop */
  }
  return "GLOBAL";
}

function detectUserType(): UserType {
  if (typeof window === "undefined") return "new";
  if (sessionStorage.getItem("clickedCTA") === "1") return "highIntent";
  if (localStorage.getItem("visited") === "1") return "returning";
  return "new";
}

function getMonthlyEndTimestamp(): number {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  return end.getTime();
}

function formatTimeLeft(ms: number) {
  if (ms <= 0) return "Ends soon";
  const totalMin = Math.floor(ms / 60000);
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin % (60 * 24)) / 60);
  const mins = totalMin % 60;
  if (days > 0) return `${days}d ${hours}h ${mins}m`;
  const secs = Math.floor((ms % 60000) / 1000);
  return `${hours}h ${mins}m ${secs}s`;
}

export const SmartOfferBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const [userType, setUserType] = useState<UserType>("new");
  const [region, setRegion] = useState<Region>("GLOBAL");
  const [now, setNow] = useState(Date.now());
  const [abVariant] = useState(() => Math.floor(Math.random() * AB_VARIATIONS.length));

  // Init: detect region, user type, dismiss state
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("offer_banner_dismissed") === "1") {
      setDismissed(true);
    }
    setRegion(detectRegion());
    setUserType(detectUserType());
    localStorage.setItem("visited", "1");

    // Behavior: pricing visit → high intent
    if (window.location.pathname.includes("/pricing")) {
      sessionStorage.setItem("clickedCTA", "1");
      setUserType("highIntent");
    }

    // Behavior: stay > 30s on page → high intent
    const timer = window.setTimeout(() => {
      if (sessionStorage.getItem("clickedCTA") !== "1") {
        sessionStorage.setItem("clickedCTA", "1");
        setUserType("highIntent");
      }
    }, 30000);

    trackEvent("smart_offer_view", {
      region: detectRegion(),
      user_type: detectUserType(),
      ab_variant: abVariant,
    });

    return () => window.clearTimeout(timer);
  }, [abVariant]);

  // Countdown tick
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const offer = useMemo(() => OFFERS[region][userType], [region, userType]);
  const headline = userType === "new" ? AB_VARIATIONS[abVariant] : offer.text;
  const endTs = useMemo(() => getMonthlyEndTimestamp(), []);
  const timeLeft = formatTimeLeft(endTs - now);

  const waUrl = `https://wa.me/918335870240?text=${encodeURIComponent(offer.waMessage)}`;

  const handleClick = () => {
    sessionStorage.setItem("clickedCTA", "1");
    trackEvent(ConversionEvents.WHATSAPP_CLICK, {
      source: "smart_offer_banner",
      region,
      user_type: userType,
      ab_variant: abVariant,
    });
    trackEvent("smart_offer_click", {
      region,
      user_type: userType,
      ab_variant: abVariant,
    });
  };

  const handleDismiss = () => {
    sessionStorage.setItem("offer_banner_dismissed", "1");
    setDismissed(true);
    trackEvent("smart_offer_dismiss", { region, user_type: userType });
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-[60] w-full text-white shadow-lg"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
        }}
        role="region"
        aria-label="Special offer"
      >
        <div className="container mx-auto px-3 sm:px-6 py-2 flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 shrink-0 hidden sm:block" />
          <p className="flex-1 truncate sm:whitespace-normal font-medium">
            <span>{headline}</span>
            <span className="hidden md:inline-flex items-center gap-1 ml-3 opacity-90">
              <Clock className="w-3.5 h-3.5" />
              {timeLeft}
            </span>
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="shrink-0 inline-flex items-center gap-1 rounded-md bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-1 font-semibold transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            {offer.cta}
          </a>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss offer"
            className="shrink-0 p-1 rounded hover:bg-white/15 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SmartOfferBanner;