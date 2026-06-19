import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import introVideo from "@/assets/consultant-intro.mp4.asset.json";

const VIDEO_TITLE = "Meet Your Freelance Digital Consultant";
const VIDEO_DESC =
  "Learn how I help homestays, tourism businesses, ecommerce stores, and local service providers improve their online visibility, generate more inquiries, and grow their business through affordable website and digital marketing support.";

export const IntroVideoCard = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  };

  // Pause when scrolled off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (!entry.isIntersecting && !v.paused) v.pause();
      },
      { threshold: 0.25 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Freelance Digital Consultant Introduction",
    description:
      "Introduction video presenting freelance website development, local SEO, Google Business Profile optimization, digital marketing support, and online growth services for small businesses worldwide.",
    contentUrl: introVideo.url,
    uploadDate: introVideo.created_at,
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-[560px] mx-auto"
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 text-center lg:text-left">
        {VIDEO_TITLE}
      </h3>
      <div className="relative group rounded-2xl p-[1.5px] bg-gradient-to-br from-primary/60 via-secondary/40 to-accent/60 shadow-[0_15px_40px_-15px_hsl(var(--primary)/0.4)] transition-shadow duration-300 hover:shadow-[0_20px_55px_-15px_hsl(var(--primary)/0.55)]">
        <div className="relative aspect-video rounded-[14px] overflow-hidden bg-background">
          <video
            ref={videoRef}
            src={introVideo.url}
            preload="none"
            playsInline
            controls={playing}
            className="w-full h-full object-cover"
            onEnded={() => setPlaying(false)}
            onPause={() => {
              /* keep controls visible after first play */
            }}
          />
          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play introduction video"
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-background/30 to-accent/20 backdrop-blur-[2px] transition-all duration-300 hover:from-primary/25 hover:to-accent/25"
            >
              <span className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-background/90 shadow-xl ring-1 ring-white/40 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 text-primary fill-primary ml-1" />
              </span>
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs sm:text-sm text-muted-foreground text-center lg:text-left leading-relaxed">
        {VIDEO_DESC}
      </p>
    </motion.div>
  );
};

export default IntroVideoCard;