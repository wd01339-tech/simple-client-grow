import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { recordConversion } from "@/lib/conversions";

const MONTHLY_OFFERS = [
  "🔥 January Special: Free Website & GMB Audit – This Week Only!",
  "💼 February Boost: Affordable Website Setup + Free Consultation!",
  "🚀 March Growth: Special First Week Offer for New Clients!",
  "📈 April SEO: Free Google Visibility Check – Limited Slots!",
  "🎯 May Momentum: Free Website & GMB Audit – Claim Now!",
  "☀️ June Surge: Boost Your Business – First Week Special!",
  "💡 July Spark: Affordable Website Setup + Free Strategy Call!",
  "🌟 August Advantage: Free SEO Check – This Week Only!",
  "🍂 September Scale: Free Website & GMB Audit – First Week!",
  "🎃 October Offer: Boost Your Local Rankings – Free Audit!",
  "🦃 November Deal: Affordable Website + Free Consultation!",
  "🎁 December Finale: Free SEO + GMB Audit – Year-End Special!",
];

const WHATSAPP_URL =
  "https://wa.me/918335870240?text=" +
  encodeURIComponent("Hi! I want to claim this week's special offer 🎯");

export const MarqueeOfferBanner = () => {
  const [visible, setVisible] = useState(false);
  const [offer, setOffer] = useState("");

  useEffect(() => {
    const today = new Date();
    if (today.getDate() <= 7) {
      setOffer(MONTHLY_OFFERS[today.getMonth() % MONTHLY_OFFERS.length]);
      setVisible(true);
      trackEvent("marquee_offer_view", { month: today.getMonth() + 1 });
    }
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    trackEvent("marquee_offer_click", {});
    recordConversion({
      event_type: "marquee_offer_click",
      attribution: { offer_text: offer, cta: "marquee_banner" },
      metadata: { offer_text: offer },
    });
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Claim this week's special offer on WhatsApp"
      className="w-full overflow-hidden whitespace-nowrap text-white text-center sticky top-0 z-[60] cursor-pointer hover:brightness-110 transition"
      style={{
        background:
          "linear-gradient(90deg, hsl(225 73% 57%), hsl(280 80% 40%), hsl(330 90% 56%))",
      }}
    >
      <div
        className="inline-block py-2 text-sm font-medium tracking-wide"
        style={{ animation: "marquee 18s linear infinite" }}
      >
        {offer}  &nbsp;•&nbsp;  Tap to claim on WhatsApp 👉
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};