import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import introVideo from "@/assets/consultant-intro.mp4.asset.json";
import introPoster from "@/assets/intro-video-poster.png.asset.json";
import { recordConversion } from "@/lib/conversions";

const VIDEO_TITLE = "Meet Your Freelance Digital Consultant";
const VIDEO_DESC =
  "Learn how I help homestays, tourism businesses, ecommerce stores, and local service providers improve their online visibility, generate more inquiries, and grow their business through affordable website and digital marketing support.";

const TRANSCRIPT =
  "Hi, I'm a freelance digital consultant helping small businesses, homestays, tourism brands, ecommerce stores, and local service providers grow online. I build affordable, fast websites, optimise your Google Business Profile, run local SEO, and set up practical digital marketing — without agency prices or jargon. If you want more inquiries, better visibility, and a clear plan tailored to your business, book a free 15-minute discovery call or request a free website and GMB audit. Let's grow your business, simply and effectively.";

const MILESTONES = [25, 50, 75, 100] as const;

export const IntroVideoCard = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // Engagement tracking refs
  const watchedRef = useRef(0); // seconds actually watched
  const lastTickRef = useRef<number | null>(null);
  const firedMilestonesRef = useRef<Set<number>>(new Set());
  const hasPlayedRef = useRef(false);

  const track = (
    action: "play" | "pause" | "milestone" | "ended",
    extra: Record<string, unknown> = {}
  ) => {
    const v = videoRef.current;
    recordConversion({
      event_type: "video_engagement",
      metadata: {
        action,
        video: "hero_intro",
        watched_seconds: Math.round(watchedRef.current),
        duration: v?.duration ?? null,
        current_time: v?.currentTime ?? null,
        ...extra,
      },
    });
  };

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  };

  // Reliable pause when scrolled off-screen via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.intersectionRatio < 0.1 && !v.paused) {
          v.pause();
        }
      },
      { threshold: [0, 0.1, 0.5] }
    );
    obs.observe(el);

    const onVisibility = () => {
      const v = videoRef.current;
      if (document.hidden && v && !v.paused) v.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Watch-time accumulator + milestone tracking
  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const now = performance.now();
    if (lastTickRef.current != null) {
      const delta = (now - lastTickRef.current) / 1000;
      if (delta < 2) watchedRef.current += delta; // ignore seeks/jumps
    }
    lastTickRef.current = now;

    if (v.duration && isFinite(v.duration)) {
      const pct = (v.currentTime / v.duration) * 100;
      for (const m of MILESTONES) {
        if (pct >= m && !firedMilestonesRef.current.has(m)) {
          firedMilestonesRef.current.add(m);
          track("milestone", { percent: m });
        }
      }
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Freelance Digital Consultant Introduction",
    description:
      "Introduction video presenting freelance website development, local SEO, Google Business Profile optimization, digital marketing support, and online growth services for small businesses worldwide.",
    thumbnailUrl: typeof window !== "undefined" ? window.location.origin + introPoster.url : introPoster.url,
    contentUrl: introVideo.url,
    uploadDate: introVideo.created_at,
    transcript: TRANSCRIPT,
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
        <div className="relative aspect-[16/9] rounded-[14px] overflow-hidden bg-background">
          <video
            ref={videoRef}
            src={introVideo.url}
            poster={introPoster.url}
            preload="none"
            playsInline
            controls={playing}
            className="w-full h-full object-contain"
            onPlay={() => {
              lastTickRef.current = performance.now();
              if (!hasPlayedRef.current) {
                hasPlayedRef.current = true;
                track("play");
              }
            }}
            onPause={() => {
              lastTickRef.current = null;
              const v = videoRef.current;
              if (v && !v.ended) track("pause");
            }}
            onTimeUpdate={onTimeUpdate}
            onEnded={() => {
              setPlaying(false);
              track("ended");
            }}
          />
          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play introduction video"
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 backdrop-blur-[1px] transition-all duration-300 hover:from-primary/40 hover:to-accent/40"
            >
              <span className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-br from-primary via-secondary to-accent shadow-[0_10px_30px_-5px_hsl(var(--primary)/0.6)] group-hover:scale-110 transition-transform duration-300">
                <span className="flex items-center justify-center w-full h-full rounded-full bg-background/95">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 text-primary fill-primary ml-1" />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs sm:text-sm text-muted-foreground text-center lg:text-left leading-relaxed">
        {VIDEO_DESC}
      </p>

      {/* Accessibility + SEO transcript */}
      <div className="mt-2">
        <button
          type="button"
          onClick={() => setShowTranscript((s) => !s)}
          aria-expanded={showTranscript}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          {showTranscript ? "Hide transcript" : "Read transcript"}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${showTranscript ? "rotate-180" : ""}`}
          />
        </button>
        <p
          className={`text-xs text-muted-foreground leading-relaxed mt-2 ${
            showTranscript ? "" : "sr-only"
          }`}
        >
          {TRANSCRIPT}
        </p>
      </div>
    </motion.div>
  );
};

export default IntroVideoCard;