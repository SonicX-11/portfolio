"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// --- SVG SOCIAL & SYSTEM ICONS ---

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.5 0 9 1.582 9 4.615V8z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
  </svg>
);

// --- ANIMATION & COUNTER HELPERS ---

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, y = 20, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

function CountUp({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1400;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// --- DATA ---

const softwareStack = [
  { name: "Premiere Pro", tag: "Cutting & Timeline Mastery", icon: "Pr" },
  { name: "After Effects", tag: "Motion & Graphic Typography", icon: "Ae" },
  { name: "DaVinci Resolve", tag: "Color Science & Mastering", icon: "Da" },
  { name: "Photoshop", tag: "High-CTR Architectural Covers", icon: "Ps" },
];

const processSteps = [
  {
    num: "01",
    title: "Creative Brief & Rhythm Conception",
    arabic: "الاتفاق وفهم فكرة الفيديو",
    desc: "Dissecting audience psychology, platform kinetics, pacing tempo, and sonic vision before touching the timeline.",
  },
  {
    num: "02",
    title: "Footage Intake & Media Assembly",
    arabic: "رفع الماتريال والفرز السريع",
    desc: "Ingesting native source files via cloud storage, cataloging selects, and structuring narrative rough cuts.",
  },
  {
    num: "03",
    title: "Editorial Cut & Layered Sound Design",
    arabic: "المونتاج، التقطيع والمؤثرات",
    desc: "Applying dynamic match cuts, typographic kinetic cues, visual hooks, multi-layer Foley, and balance passes.",
  },
  {
    num: "04",
    title: "Iterative Feedback & Micro-Tuning",
    arabic: "المراجعة والتعديلات السريعة",
    desc: "Refining frame-accurate subtitle timing, pacing transitions, and narrative rhythm against your direct notes.",
  },
  {
    num: "05",
    title: "4K Master Delivery & Platform Staging",
    arabic: "التسليم النهائي بأعلى جودة",
    desc: "Delivering crisp, native 4K/1080p high-bitrate master files tailored precisely for Reels, TikTok, and YouTube.",
  },
];

const videosData = [
  {
    id: "man-u",
    title: "Manchester United Highlight Cut",
    category: "Sports Dynamics",
    tab: "commercial",
    src: "/video/Man-U.mp4",
    description: "Fast-paced football edit focused on rhythm, impact, typography and music synchronization.",
    orientation: "portrait",
  },
  {
    id: "the-odyssey",
    title: "The Odyssey Cinematic Master",
    category: "Cinematic Narrative",
    tab: "cinematic",
    src: "/video/The-Odyssey.mp4",
    description: "Cinematic storytelling edit combining pacing, atmosphere, sound design and visual continuity.",
    orientation: "portrait",
  },
  {
    id: "mb22",
    title: "Commercial Showcase (mb22)",
    category: "Brand Campaign",
    tab: "commercial",
    src: "/video/Mb22.mp4",
    description: "Commercial showcase built around product presentation, dynamic cuts and visual impact.",
    orientation: "portrait",
  },
  {
    id: "color",
    title: "Color Grading Reel",
    category: "Color Correction",
    tab: "commercial",
    src: "/video/Color.mp4",
    description: "Color grading showcase demonstrating contrast, skin tones, mood and cinematic look development.",
    orientation: "portrait",
  },
  {
    id: "reel-1",
    title: "High-Retention Commercial Reel #1",
    category: "TikTok / Reels",
    tab: "reels",
    src: "/video/1.mp4",
    description: "Short-form edit designed around strong hooks, rapid pacing and audience retention.",
    orientation: "portrait",
  },
  {
    id: "reel-2",
    title: "Business Growth Reel #2",
    category: "Pop-Up Subtitles",
    tab: "reels",
    src: "/video/2.mp4",
    description: "Business-focused short-form edit using animated subtitles, visual emphasis and sound effects.",
    orientation: "portrait",
  },
  {
    id: "reel-3",
    title: "Dynamic Hook Cut #3",
    category: "Fast Paced",
    tab: "reels",
    src: "/video/3.mp4",
    description: "High-energy social edit focused on hooks, fast transitions and visual storytelling.",
    orientation: "portrait",
  },
  {
    id: "reel-4",
    title: "Viral Engagement Reel #4",
    category: "Fast Paced Cuts",
    tab: "reels",
    src: "/video/4.mp4",
    description: "Engagement-first edit with rhythmic cuts, zooms, subtitles and layered sound design.",
    orientation: "portrait",
  },
  {
    id: "reel-5",
    title: "Brand Storytelling #5",
    category: "Commercial Cut",
    tab: "reels",
    src: "/video/5.mp4",
    description: "Brand storytelling reel combining clean editing, narrative structure and visual consistency.",
    orientation: "portrait",
  },
  {
    id: "reel-12",
    title: "Social Media Hook #12",
    category: "Short-Form Reel",
    tab: "reels",
    src: "/video/12.mp4",
    description: "Short-form social media edit built to grab attention immediately and maintain momentum.",
    orientation: "portrait",
  },
  {
    id: "habib-ayamy",
    title: "Habib Ayamy",
    category: "Cinematic Sound Design",
    tab: "cinematic",
    src: "/video/Habib-Ayamy.mp4",
    description: "Emotional cinematic edit with music synchronization, atmosphere and detailed sound design.",
    orientation: "portrait",
  },
];

const marqueeItems = [
  {
    title: "Bruno Fernandes - The King",
    category: "Sports Graphic",
    image: "/images/thumbnails/thumb-1.png",
    video: null,
  },
  {
    title: "Business Budgeting Strategy",
    category: "Reels / TikTok",
    image: "/images/thumbnails/thumb-2.png",
    video: "/video/1.mp4",
  },
  {
    title: "EdTech Agency Growth",
    category: "Educational Showcase",
    image: "/images/thumbnails/thumb-3.png",
    video: "/video/2.mp4",
  },
  {
    title: "US Company Setup Case Study",
    category: "Business Content",
    image: "/images/thumbnails/thumb-4.png",
    video: "/video/3.mp4",
  },
  {
    title: "Gigabyte B840M Eagle",
    category: "Hardware Commercial",
    image: "/images/thumbnails/thumb-5.png",
    video: "/video/Mb22.mp4",
  },
  {
    title: "Manchester United | Bruno Cut",
    category: "Sports Poster",
    image: "/images/thumbnails/thumb-6.png",
    video: "/video/Man-U.mp4",
  },
];

const thumbnailsData = [
  {
    title: "Bruno Fernandes - The King",
    category: "Sports Graphic",
    src: "/images/thumbnails/thumb-1.png",
  },
  {
    title: "Business Budgeting Strategy",
    category: "Reels / TikTok",
    src: "/images/thumbnails/thumb-2.png",
  },
  {
    title: "EdTech Agency Growth",
    category: "Educational Showcase",
    src: "/images/thumbnails/thumb-3.png",
  },
  {
    title: "US Company Setup Case Study",
    category: "Business Content",
    src: "/images/thumbnails/thumb-4.png",
  },
  {
    title: "Gigabyte B840M Eagle",
    category: "Hardware Commercial",
    src: "/images/thumbnails/thumb-5.png",
  },
  {
    title: "Manchester United | Bruno Cut",
    category: "Sports Poster",
    src: "/images/thumbnails/thumb-6.png",
  },
];

const packagesData = [
  {
    id: "01",
    name: "The Spark Pack",
    arabicName: "Clean & Fast-Paced Cut",
    priceUSD: "$10",
    priceEGP: "500 EGP",
    featured: false,
    revisions: "1 Revision pass per deliverable",
    driveLink: "https://drive.google.com/file/d/1Y97S6qk9JqmONHOk-BQcj1XO1piaa0KT/view?usp=drive_link",
    features: [
      "Dynamic cutting eliminating dead spaces to ensure fluid rhythm",
      "Clean, readable, color-coded subtitles matching vocal tempo",
      "Essential Color Correction paired with balanced background music",
    ],
  },
  {
    id: "02",
    name: "The Viral Growth",
    arabicName: "High Retention & Engaging",
    priceUSD: "$17",
    priceEGP: "850 EGP",
    featured: true,
    revisions: "Up to 2 Iterative revision rounds",
    driveLink: "https://drive.google.com/file/d/1WtLRXTR_r5RQPndULSfyAwIqst8j7YYX/view?usp=drive_link",
    features: [
      "Retention-first pacing engineered to maximize completion rates",
      "Dynamic kinetic subtitles reacting rhythmically to vocal emphasis",
      "Visual zooms, sound design impacts, risers, and Foley FX",
      "Curated B-roll and contextual stock media integration",
    ],
  },
  {
    id: "03",
    name: "Cinematic Prime",
    arabicName: "Commercial & Brand Showcase",
    priceUSD: "$24",
    priceEGP: "1,200 EGP",
    featured: false,
    revisions: "Up to 3 Comprehensive revisions",
    driveLink: "https://drive.google.com/file/d/19usAUA3dCWM4rYtLkX557m793uyGFLnW/view?usp=drive_link",
    features: [
      "Bespoke cinematic pacing tailored for corporate brands and creators",
      "Full brand identity adaptation (typography, vectors, palette)",
      "Dynamic visual framing and pacing elevating core message impact",
      "Deep cinematic Color Grading + immersive multi-layer sound mastering",
    ],
  },
];

const generalTerms = [
  {
    title: "Milestone Agreement & Deposit",
    desc: "A 25% commitment deposit initiates the timeline. The remaining 75% balance is settled upon final approval prior to unwatermarked master exports.",
  },
  {
    title: "Video Duration Parameters",
    desc: "Standard tier rates apply to short-form reels, TikToks, and Shorts with a total runtime under 60 seconds.",
  },
  {
    title: "Batch Delivery Schedule",
    desc: "Projects are batched and scheduled with fixed milestone dates to preserve technical precision and narrative quality.",
  },
  {
    title: "Revision Policy",
    desc: "Revisions within scope are respected per tier. Structural script overhauls beyond the brief are accommodated at pre-agreed rates.",
  },
  {
    title: "Native Raw Footage Delivery",
    desc: "Source footage is received via structured Google Drive, Dropbox, or WeTransfer folders in maximum camera resolution.",
  },
];

const clientReviews = [
  {
    quote: "Lil transformed our raw footage into high-retention commercial reels. The pacing, audio sync, and pop-up subtitles significantly boosted our engagement.",
    client: "Ahmed Abdelkareem",
    role: "Content Creator & Entrepreneur",
  },
  {
    quote: "Exceptional turnaround and aesthetic sense. He understands video storytelling deeply, delivering flawless color grading and slick pacing without endless revisions.",
    client: "Sameh Othman",
    role: "Business Consultant",
  },
  {
    quote: "The retention on our educational campaigns jumped noticeably after hiring Lil. The edits are razor sharp and the communication is clear and professional.",
    client: "Rania",
    role: "E-Learning Academy Lead",
  },
  {
    quote: "Reliable, creative, and fast. His sound design and B-roll selection gave our commercial launches a truly cinematic presence.",
    client: "Maryam",
    role: "Commercial Brand Manager",
  },
];

const servicesList = [
  {
    num: "01",
    name: "Video Post-Production & Craft",
    desc: "High-retention social reels, commercial campaigns, and narrative cuts with frame-accurate timing, match cuts, and visual rhythm.",
  },
  {
    num: "02",
    name: "Color Grading & Cinematic Look Dev",
    desc: "Color science, scene-matching, and palette balance in DaVinci Resolve to establish emotional mood and commercial polish.",
  },
  {
    num: "03",
    name: "Graphic Art & High-CTR Covers",
    desc: "Architectural, eye-catching thumbnail and poster compositions built to command attention across competitive feeds.",
  },
  {
    num: "04",
    name: "Immersive Foley & Sound Design",
    desc: "Multi-track sound architecture, tactile foley, spatial risers, and vocal balancing that pulls the audience directly into the scene.",
  },
];

// --- MAIN ATELIER COMPONENT ---

export default function AtelierHome() {
  const [currencyMode, setCurrencyMode] = useState<"ALL" | "USD" | "EGP">("ALL");
  const [selectedVideoTab, setSelectedVideoTab] = useState<"all" | "reels" | "commercial" | "cinematic">("all");
  const [activeModalVideo, setActiveModalVideo] = useState<(typeof videosData)[0] | null>(null);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalMuted, setIsModalMuted] = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modal Video controls
  const closeModal = useCallback(() => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setActiveModalVideo(null);
  }, []);

  const openModal = useCallback((video: (typeof videosData)[0]) => {
    setActiveModalVideo(video);
    setIsPlaying(true);
  }, []);

  const currentVideoIndex = activeModalVideo
    ? videosData.findIndex((v) => v.id === activeModalVideo.id)
    : -1;

  const goNext = useCallback(() => {
    if (currentVideoIndex === -1) return;
    setActiveModalVideo(videosData[(currentVideoIndex + 1) % videosData.length]);
    setIsPlaying(true);
  }, [currentVideoIndex]);

  const goPrevious = useCallback(() => {
    if (currentVideoIndex === -1) return;
    setActiveModalVideo(videosData[(currentVideoIndex - 1 + videosData.length) % videosData.length]);
    setIsPlaying(true);
  }, [currentVideoIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalVideo) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrevious();
      if (e.key === " ") {
        e.preventDefault();
        if (!modalVideoRef.current) return;
        if (modalVideoRef.current.paused) {
          modalVideoRef.current.play().catch(() => {});
          setIsPlaying(true);
        } else {
          modalVideoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalVideo, closeModal, goNext, goPrevious]);

  useEffect(() => {
    if (activeModalVideo && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play().catch(() => {
        if (modalVideoRef.current) {
          modalVideoRef.current.muted = true;
          setIsModalMuted(true);
          modalVideoRef.current.play().catch(() => {});
        }
      });
    }
  }, [activeModalVideo]);

  const filteredVideos = useMemo(() => {
    if (selectedVideoTab === "all") return videosData;
    return videosData.filter((v) => v.tab === selectedVideoTab);
  }, [selectedVideoTab]);

  return (
    <div className="bg-[#130e09] text-white selection:bg-white selection:text-[#130e09] font-sans antialiased min-h-screen relative overflow-x-hidden">
      
      {/* BACKGROUND EDITORIAL GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 flex opacity-30" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1 border-r border-white/[0.035] h-full" />
        ))}
      </div>

      {/* --- HERO SECTION (ATELIER STRUCTURE) --- */}
      <section className="relative w-full h-[100dvh] min-h-[640px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0d0905] via-[#0d0a05] to-[#130e09] border-b border-white/[0.08] z-10 px-6 sm:px-12 pt-6 pb-8">
        
        {/* BACKGROUND AMBIENT VIDEO WITH SOFT MASKS */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-45 flex items-center justify-center">
          <div className="w-full h-full max-w-6xl aspect-video relative [mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,black_20%,transparent_90%)]">
            <video
              src="/video/The-Odyssey.mp4"
              muted
              loop
              autoPlay
              playsInline
              className="w-full h-full object-cover grayscale contrast-125 brightness-75"
            />
          </div>
        </div>

        {/* TOP BAR / NAVIGATION */}
        <header className="relative z-20 flex flex-wrap items-start justify-between gap-6 text-[11px] sm:text-[12px] uppercase tracking-[-0.03em] text-white/80">
          {/* LOGO */}
          <a href="#" className="flex items-center gap-2.5 group">
            <svg viewBox="0 0 142.6 30.0" className="w-24 sm:w-28 h-auto fill-white group-hover:opacity-75 transition-opacity">
              <rect x="0.00" y="0.00" width="8.2" height="8.2" />
              <rect x="19.20" y="0.00" width="8.2" height="8.2" />
              <rect x="76.80" y="0.00" width="8.2" height="8.2" />
              <rect x="115.20" y="0.00" width="8.2" height="8.2" />
              <rect x="57.60" y="10.90" width="8.2" height="8.2" />
              <rect x="134.40" y="10.90" width="8.2" height="8.2" />
              <rect x="0.00" y="21.80" width="8.2" height="8.2" />
            </svg>
            <span className="font-bold tracking-widest text-[10px] text-white/40 border-l border-white/20 pl-2">LIL UNIT</span>
          </a>

          {/* TAGLINE */}
          <div className="hidden md:block leading-snug text-white/60">
            <span>Craftwork & Editorial Systems.</span>
            <br />
            <span>Shaped by culture. Built with pacing & technology.</span>
          </div>

          {/* CONTACT INFO */}
          <div className="hidden lg:block leading-snug">
            <a href="mailto:ebrahimfadel8903@gmail.com" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4">
              ebrahimfadel8903@gmail.com
            </a>
            <div className="text-white/40">Cairo / Global, EST 2026</div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWorkflowOpen(true)}
              className="px-3.5 py-1.5 bg-[#fcfcfc] text-[#141414] font-semibold text-[11px] tracking-tight hover:bg-white transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Workflow</span>
              <span className="text-[9px]">↗</span>
            </button>
            <a
              href="https://wa.me/201211871199"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-white/20 hover:border-white/50 text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </header>

        {/* MID-LINE: SERVICE TICKER WITH HAIRLINE RULE */}
        <div className="relative z-20 my-auto">
          <div className="flex justify-between items-center text-[11px] sm:text-[13px] tracking-[-0.04em] text-white/90 pb-3">
            <span>[01] Post-Production & Cutting</span>
            <span className="hidden sm:inline">[02] Kinetic Typography & Hooks</span>
            <span>[03] DaVinci Color & Sound Foley</span>
          </div>
          <div className="w-full h-px bg-white/[0.12] shadow-[0_1px_0_rgba(255,255,255,0.03)]" />
        </div>

        {/* BIG ARCHITECTURAL HEADLINE */}
        <div className="relative z-20 flex flex-col justify-end pt-8">
          <div className="text-[10px] sm:text-[12px] uppercase font-mono tracking-[0.25em] text-white/50 mb-2">
            Senior Video Editor & Narrative Director
          </div>
          <h1 className="text-[12.5vw] sm:text-[13vw] font-black tracking-[-0.06em] leading-[0.88] uppercase text-white select-none">
            CRAFTWORK
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 pt-4 border-t border-white/[0.08] gap-4">
            <p className="max-w-md text-xs sm:text-sm text-white/60 leading-relaxed">
              Bridging high-retention social media pacing, commercial polish, and surgically calibrated sound design for creators & brands.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#videos"
                className="text-xs uppercase tracking-wider text-white border-b border-white hover:text-white/70 transition-colors pb-0.5"
              >
                Explore Archive (11) ↓
              </a>
              <span className="text-white/20">/</span>
              <a
                href="#pricing"
                className="text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors"
              >
                Rates & Milestones
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- NUMERICAL STATS TICKER --- */}
      <section className="border-b border-white/[0.08] bg-[#0d0905]/80 backdrop-blur-md py-8 px-6 sm:px-12 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              <CountUp target={4} suffix="+" />
            </div>
            <div className="text-[11px] uppercase tracking-wider text-white/40 mt-1">Years Operating</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              <CountUp target={350} suffix="+" />
            </div>
            <div className="text-[11px] uppercase tracking-wider text-white/40 mt-1">Masters Delivered</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              <CountUp target={20} suffix="+" />
            </div>
            <div className="text-[11px] uppercase tracking-wider text-white/40 mt-1">Brands & Creators</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              <CountUp target={45} suffix="%" />
            </div>
            <div className="text-[11px] uppercase tracking-wider text-white/40 mt-1">Avg. Retention Lift</div>
          </div>
        </div>
      </section>

      {/* --- MARQUEE HIGHLIGHT CAROUSEL --- */}
      <section className="py-16 border-b border-white/[0.08] overflow-hidden relative z-10 bg-[#130e09]">
        <div className="px-6 sm:px-12 max-w-7xl mx-auto mb-8 flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40">Visual Catalogue</span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mt-1">Selected Highlights & Covers</h2>
          </div>
          <div className="text-xs text-white/40 hidden sm:block">Horizontal Scan Reel</div>
        </div>

        <div className="flex gap-5 px-6 sm:px-12 overflow-x-auto no-scrollbar pb-4">
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              className="w-[240px] sm:w-[280px] shrink-0 border border-white/[0.08] bg-[#0d0905] overflow-hidden group relative flex flex-col justify-between"
            >
              <div className="aspect-[4/5] w-full overflow-hidden relative bg-black">
                {item.video ? (
                  <video
                    src={item.video}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                )}
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md text-[9px] uppercase tracking-wider font-mono text-white/70">
                  {item.category}
                </div>
              </div>
              <div className="p-3.5 border-t border-white/[0.08]">
                <h4 className="text-xs font-semibold uppercase tracking-tight text-white truncate">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ABOUT & SOFTWARE SUITE --- */}
      <section id="about" className="py-24 px-6 sm:px-12 border-b border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4">
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40 block mb-2">[Overview]</span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-none">
              Behind The Timeline
            </h2>
            <div className="mt-8 pt-8 border-t border-white/[0.08] space-y-4">
              <div className="text-xs font-mono uppercase text-white/40">Collaborated with</div>
              <div className="flex flex-wrap gap-2">
                {["Ahmed Abdelkareem", "Sameh Othman", "Maryam", "Sawsan", "Yasmine", "Rania", "Mai"].map((client, i) => (
                  <span key={i} className="text-xs border border-white/[0.1] px-2.5 py-1 text-white/80">
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed font-light">
              Specialized in engineering visual assets that respect attention spans while delivering undeniable retention metrics. Leveraging surgical audio design and high-velocity timeline workflows across Adobe Premiere Pro, After Effects, and DaVinci Resolve to translate raw footage into memorable brand stories.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/[0.08]">
              {softwareStack.map((soft, i) => (
                <div key={i} className="p-4 border border-white/[0.08] bg-[#0d0905]/60 flex items-start gap-4">
                  <span className="text-xs font-mono font-bold px-2 py-1 bg-white/[0.06] border border-white/[0.1] text-white">
                    {soft.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold uppercase text-white">{soft.name}</h4>
                    <p className="text-xs text-white/50 mt-0.5">{soft.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- FEATURED VIDEO ARCHIVE (INTERACTIVE) --- */}
      <section id="videos" className="py-24 px-6 sm:px-12 border-b border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40">[Archive]</span>
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">
                Selected Video Cuts
              </h2>
            </div>

            {/* TAB FILTER */}
            <div className="flex flex-wrap gap-1 border border-white/[0.1] p-1 bg-[#0d0905]">
              {[
                { id: "all", label: "All (11)" },
                { id: "reels", label: "Reels & Hooks (6)" },
                { id: "commercial", label: "Commercial & Sports (3)" },
                { id: "cinematic", label: "Cinematic (2)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedVideoTab(tab.id as "all" | "reels" | "commercial" | "cinematic")}
                  className={`px-3 py-1.5 text-xs uppercase tracking-tight transition-colors ${
                    selectedVideoTab === tab.id
                      ? "bg-white text-[#130e09] font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* VIDEO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVideos.map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 0.05}>
                <div
                  onClick={() => openModal(item)}
                  className="border border-white/[0.09] bg-[#0d0905] overflow-hidden group cursor-pointer flex flex-col justify-between hover:border-white/30 transition-colors"
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/[0.1] text-[9px] font-mono uppercase tracking-wider text-white">
                      {item.tab}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/80 text-[10px] uppercase font-mono tracking-wider text-white/70 group-hover:text-white">
                      Inspect Cut ↗
                    </div>
                  </div>

                  <div className="p-5 border-t border-white/[0.08]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold uppercase tracking-tight text-white group-hover:text-white/90">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/50 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* --- RATES & MILESTONES (PRICING) --- */}
      <section id="pricing" className="py-24 px-6 sm:px-12 border-b border-white/[0.08] relative z-10 bg-[#0d0905]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-16">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40">[Production Rates]</span>
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">
                Packages & Milestones
              </h2>
            </div>

            {/* CURRENCY TOGGLE */}
            <div className="flex items-center gap-1 border border-white/[0.12] p-1 bg-[#130e09]">
              <button
                onClick={() => setCurrencyMode("ALL")}
                className={`px-3 py-1 text-xs uppercase ${currencyMode === "ALL" ? "bg-white text-[#130e09] font-bold" : "text-white/60 hover:text-white"}`}
              >
                USD & EGP
              </button>
              <button
                onClick={() => setCurrencyMode("USD")}
                className={`px-3 py-1 text-xs uppercase ${currencyMode === "USD" ? "bg-white text-[#130e09] font-bold" : "text-white/60 hover:text-white"}`}
              >
                USD (\$)
              </button>
              <button
                onClick={() => setCurrencyMode("EGP")}
                className={`px-3 py-1 text-xs uppercase ${currencyMode === "EGP" ? "bg-white text-[#130e09] font-bold" : "text-white/60 hover:text-white"}`}
              >
                EGP (ج.م)
              </button>
            </div>
          </div>

          {/* PACKAGES TIERS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packagesData.map((pkg) => {
              const priceDisplay =
                currencyMode === "USD"
                  ? pkg.priceUSD
                  : currencyMode === "EGP"
                  ? pkg.priceEGP
                  : `${pkg.priceUSD} / ${pkg.priceEGP}`;

              const waMessage = `https://wa.me/201211871199?text=${encodeURIComponent(
                `Hey Lil! I want to book the "${pkg.name}" tier (${priceDisplay} per cut). Let's review the timeline.`
              )}`;

              return (
                <div
                  key={pkg.id}
                  className={`border p-8 flex flex-col justify-between ${
                    pkg.featured
                      ? "border-white bg-[#130e09] relative shadow-2xl"
                      : "border-white/[0.1] bg-[#0d0905]"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-xs font-mono text-white/40">TIER {pkg.id}</span>
                      {pkg.featured && (
                        <span className="text-[10px] uppercase font-mono bg-white text-[#130e09] px-2 py-0.5 font-bold">
                          Featured Tier
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white">{pkg.name}</h3>
                    <p className="text-xs text-white/50 mt-1">{pkg.arabicName}</p>

                    <div className="my-8 pb-6 border-b border-white/[0.08]">
                      <div className="text-3xl sm:text-4xl font-mono font-bold text-white">{priceDisplay}</div>
                      <div className="text-xs text-white/40 mt-1 uppercase">Per Video Master</div>
                    </div>

                    <ul className="space-y-3 mb-8 text-xs text-white/70">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-white/30 font-mono mt-0.5">—</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/[0.08] space-y-3">
                    <div className="text-[11px] font-mono text-white/40 text-center">{pkg.revisions}</div>
                    <a
                      href={pkg.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-2 text-xs uppercase tracking-wider border border-white/[0.15] text-white/80 hover:text-white hover:border-white transition-colors"
                    >
                      Drive Reference Cut ↗
                    </a>
                    <a
                      href={waMessage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center py-2.5 text-xs uppercase tracking-wider font-bold transition-colors ${
                        pkg.featured
                          ? "bg-white text-[#130e09] hover:bg-white/90"
                          : "border border-white/20 hover:border-white text-white"
                      }`}
                    >
                      Book on WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* GENERAL TERMS OF OPERATION */}
          <div className="mt-16 p-8 border border-white/[0.08] bg-[#130e09]/50">
            <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-6">
              Terms & Operational Flow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-white/60">
              {generalTerms.map((term, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-white font-semibold uppercase">{i + 1}. {term.title}</div>
                  <p className="leading-relaxed">{term.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- CLIENT REVIEWS & DISPATCHES --- */}
      <section className="py-24 px-6 sm:px-12 border-b border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40 block mb-2">[Dispatches]</span>
          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-16">
            Client Messages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clientReviews.map((rev, i) => (
              <div key={i} className="p-8 border border-white/[0.08] bg-[#0d0905] flex flex-col justify-between">
                <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-8">
                  &ldquo;{rev.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-white/[0.08] flex justify-between items-end text-xs">
                  <div>
                    <h4 className="font-semibold text-white uppercase">{rev.client}</h4>
                    <p className="text-white/40 mt-0.5">{rev.role}</p>
                  </div>
                  <span className="font-mono text-white/30 text-[11px]">VERIFIED REVIEW</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THUMBNAILS & GRAPHICS --- */}
      <section id="thumbnails" className="py-24 px-6 sm:px-12 border-b border-white/[0.08] relative z-10 bg-[#0d0905]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40">[Artwork]</span>
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">
                Posters & High-CTR Covers
              </h2>
            </div>
            <span className="text-xs text-white/40 hidden sm:block">Full Graphic Suite</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {thumbnailsData.map((thumb, i) => (
              <div key={i} className="border border-white/[0.08] bg-[#130e09] overflow-hidden group">
                <div className="aspect-[4/5] w-full overflow-hidden bg-black">
                  <img
                    src={thumb.src}
                    alt={thumb.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                </div>
                <div className="p-4 border-t border-white/[0.08]">
                  <span className="text-[10px] font-mono uppercase text-white/40">{thumb.category}</span>
                  <h3 className="text-sm font-semibold uppercase text-white mt-0.5">{thumb.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES (ATELIER MINIMAL LIST) --- */}
      <section id="services" className="py-24 px-6 sm:px-12 border-b border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40 block mb-2">[Capabilities]</span>
          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-16">
            Core Disciplines
          </h2>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {servicesList.map((srv) => (
              <div key={srv.num} className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-white/30">{srv.num}</span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-white/80 transition-colors">
                    {srv.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/50 max-w-xl leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & FOOTER --- */}
      <footer id="contact" className="py-24 px-6 sm:px-12 relative z-10 bg-[#0d0905]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40 mb-3">Initiate Collaboration</span>
          <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-white mb-6">
            Let&apos;s Create.
          </h2>
          <p className="text-sm sm:text-base text-white/60 max-w-lg mb-10 font-light">
            Available for recurring brand campaigns, retainers, and high-retention post-production.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
            <a
              href="https://wa.me/201211871199?text=Hey%20Lil!%20I%20want%20to%20start%20a%20video%20editing%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-[#130e09] font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-colors"
            >
              Start Project via WhatsApp →
            </a>
            <a
              href="mailto:ebrahimfadel8903@gmail.com"
              className="px-6 py-3 border border-white/20 text-white font-medium text-xs uppercase tracking-wider hover:border-white transition-colors"
            >
              Email Direct
            </a>
          </div>

          <div className="flex items-center gap-6 pt-8 border-t border-white/[0.08] w-full justify-between flex-wrap text-xs text-white/40">
            <div>© 2026 Lil Unit. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/ebrahimfadel_8/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/EbrahimFadel8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://wa.me/201211871199" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href="mailto:ebrahimfadel8903@gmail.com" className="hover:text-white transition-colors" aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- THEATER MODE VIDEO MODAL --- */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none text-xs">
              <span className="font-mono text-white/60 pointer-events-auto">
                [{currentVideoIndex + 1} / {videosData.length}] — {activeModalVideo.title}
              </span>
              <div className="flex items-center gap-3 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!modalVideoRef.current) return;
                    modalVideoRef.current.muted = !modalVideoRef.current.muted;
                    setIsModalMuted(modalVideoRef.current.muted);
                  }}
                  className="px-3 py-1 border border-white/20 text-white text-[11px] uppercase hover:bg-white hover:text-black transition-colors"
                >
                  {isModalMuted ? "Unmute" : "Mute"}
                </button>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 border border-white/20 text-white flex items-center justify-center text-sm hover:bg-white hover:text-black transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); goPrevious(); }}
              className="absolute left-4 sm:left-8 w-10 h-10 border border-white/20 text-white flex items-center justify-center text-sm hover:bg-white hover:text-black transition-colors z-10"
            >
              ←
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 sm:right-8 w-10 h-10 border border-white/20 text-white flex items-center justify-center text-sm hover:bg-white hover:text-black transition-colors z-10"
            >
              →
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full h-[85vh] aspect-[9/16] bg-black border border-white/20 overflow-hidden shadow-2xl"
            >
              <video
                ref={modalVideoRef}
                src={activeModalVideo.src}
                controls
                autoPlay
                playsInline
                loop
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PRODUCTION WORKFLOW MODAL --- */}
      <AnimatePresence>
        {isWorkflowOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWorkflowOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#130e09] border border-white/20 p-6 sm:p-10 shadow-2xl custom-scrollbar"
            >
              <div className="flex justify-between items-start pb-6 border-b border-white/[0.08] mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
                    System Architecture
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                    Production Pipeline
                  </h3>
                </div>
                <button
                  onClick={() => setIsWorkflowOpen(false)}
                  className="w-8 h-8 border border-white/20 text-white flex items-center justify-center text-sm hover:bg-white hover:text-black transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {processSteps.map((step) => (
                  <div key={step.num} className="p-5 border border-white/[0.08] bg-[#0d0905]">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-mono text-white/40">STEP {step.num}</span>
                      <span className="text-xs text-white/50">{step.arabic}</span>
                    </div>
                    <h4 className="text-base font-bold uppercase text-white mb-1">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
                <button
                  onClick={() => setIsWorkflowOpen(false)}
                  className="px-6 py-2.5 bg-white text-[#130e09] text-xs uppercase font-bold tracking-wider hover:bg-white/90 transition-colors"
                >
                  Proceed to Timeline
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SCROLL BACK TO TOP --- */}
      <AnimatePresence>
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-white text-[#130e09] font-mono font-bold flex items-center justify-center text-sm shadow-xl hover:bg-white/90 transition-all"
            aria-label="Scroll Top"
          >
            ↑
          </button>
        )}
      </AnimatePresence>

    </div>
  );
}
