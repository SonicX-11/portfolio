"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useInView } from "framer-motion";

// --- SVG SOCIAL & SOFTWARE ICONS ---

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

// --- ANIMATION WRAPPER ---

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  x = 0,
  y = 20,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function CountUp({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

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
  { name: "Premiere Pro", tag: "Post-Production & Cutting", icon: "Pr" },
  { name: "After Effects", tag: "Transitions & Typography", icon: "Ae" },
  { name: "DaVinci Resolve", tag: "Color Grading & Mastering", icon: "Da" },
  { name: "Photoshop", tag: "High-CTR Graphic Covers", icon: "Ps" },
];

const processSteps = [
  {
    num: "01",
    title: "Project Brief & Creative Vision",
    arabic: "الاتفاق وفهم فكرة الفيديو",
    desc: "Understanding target audience, platform format, desired pacing, tone, and visual references.",
  },
  {
    num: "02",
    title: "Footage Upload & Assembly",
    arabic: "رفع الماتريال والفرز السريع",
    desc: "Seamless footage reception via Drive/WeTransfer, organizing media and building initial rough cuts.",
  },
  {
    num: "03",
    title: "The First Cut & Sound Design",
    arabic: "المونتاج، التقطيع والمؤثرات",
    desc: "Applying dynamic cuts, animated pop-up subtitles, visual hooks, sound Foley, and color balancing.",
  },
  {
    num: "04",
    title: "Feedback & Revisions",
    arabic: "المراجعة والتعديلات السريعة",
    desc: "Fine-tuning rhythm, subtitle cues, and visual flow based on your precise notes and vision.",
  },
  {
    num: "05",
    title: "Final 4K Master Delivery",
    arabic: "التسليم النهائي بأعلى جودة",
    desc: "Delivering crisp, native 4K/1080p high-bitrate master exports optimized for TikTok, Reels, and YouTube.",
  },
];

const videosData = [
  {
    id: "man-u",
    title: "Manchester United Highlight Cut",
    category: "Sports",
    tab: "commercial",
    src: "/video/Man-U.mp4",
    description: "Fast-paced football edit focused on rhythm, impact, typography and music synchronization.",
  },
  {
    id: "the-odyssey",
    title: "The Odyssey Cinematic Master",
    category: "Cinematic Narrative",
    tab: "cinematic",
    src: "/video/The-Odyssey.mp4",
    description: "Cinematic storytelling edit combining pacing, atmosphere, sound design and visual continuity.",
  },
  {
    id: "mb22",
    title: "Commercial Showcase (mb22)",
    category: "Brand Campaign",
    tab: "commercial",
    src: "/video/Mb22.mp4",
    description: "Commercial showcase built around product presentation, dynamic cuts and visual impact.",
  },
  {
    id: "color",
    title: "Color Grading Reel",
    category: "Color Correction",
    tab: "commercial",
    src: "/video/Color.mp4",
    description: "Color grading showcase demonstrating contrast, skin tones, mood and cinematic look development.",
  },
  {
    id: "reel-1",
    title: "High-Retention Commercial Reel #1",
    category: "TikTok / Reels",
    tab: "reels",
    src: "/video/1.mp4",
    description: "Short-form edit designed around strong hooks, rapid pacing and audience retention.",
  },
  {
    id: "reel-2",
    title: "Business Growth Reel #2",
    category: "Pop-Up Subtitles",
    tab: "reels",
    src: "/video/2.mp4",
    description: "Business-focused short-form edit using animated subtitles, visual emphasis and sound effects.",
  },
  {
    id: "reel-3",
    title: "Dynamic Hook Cut #3",
    category: "Fast Paced",
    tab: "reels",
    src: "/video/3.mp4",
    description: "High-energy social edit focused on hooks, fast transitions and visual storytelling.",
  },
  {
    id: "reel-4",
    title: "Viral Engagement Reel #4",
    category: "Fast Paced Cuts",
    tab: "reels",
    src: "/video/4.mp4",
    description: "Engagement-first edit with rhythmic cuts, zooms, subtitles and layered sound design.",
  },
  {
    id: "reel-5",
    title: "Brand Storytelling #5",
    category: "Commercial Cut",
    tab: "reels",
    src: "/video/5.mp4",
    description: "Brand storytelling reel combining clean editing, narrative structure and visual consistency.",
  },
  {
    id: "reel-12",
    title: "Social Media Hook #12",
    category: "Short-Form Reel",
    tab: "reels",
    src: "/video/12.mp4",
    description: "Short-form social media edit built to grab attention immediately and maintain momentum.",
  },
  {
    id: "habib-ayamy",
    title: "Habib Ayamy",
    category: "Cinematic Sound Design",
    tab: "cinematic",
    src: "/video/Habib-Ayamy.mp4",
    description: "Emotional cinematic edit with music synchronization, atmosphere and detailed sound design.",
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
    revisions: "1 Free Revision per video based on feedback",
    driveLink: "https://drive.google.com/file/d/1Y97S6qk9JqmONHOk-BQcj1XO1piaa0KT/view?usp=drive_link",
    features: [
      "Dynamic cutting eliminating dead spaces to ensure fluid rhythm",
      "Clean, readable, color-coded subtitles matching voice tempo",
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
    revisions: "Up to 2 Revisions per video",
    driveLink: "https://drive.google.com/file/d/1WtLRXTR_r5RQPndULSfyAwIqst8j7YYX/view?usp=drive_link",
    features: [
      "Retention-first pacing calculated to maximize completion rates",
      "Dynamic Pop-up Subtitles reacting rhythmically to vocal emphasis",
      "Visual zooms, sound design impacts, risers, and Foley FX",
      "Supporting B-roll and curated stock footage integration",
    ],
  },
  {
    id: "03",
    name: "Cinematic Prime",
    arabicName: "Commercial & Brand Showcase",
    priceUSD: "$24",
    priceEGP: "1,200 EGP",
    featured: false,
    revisions: "Up to 3 Revisions per video",
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
    title: "Deposit & Payment Milestones",
    desc: "A 25% upfront deposit is required prior to project start. The remaining 75% balance is settled upon final approval before delivery of unwatermarked master exports.",
  },
  {
    title: "Short Video Duration",
    desc: "Listed rates apply specifically to short-form reels and TikToks with a total duration not exceeding 60 seconds.",
  },
  {
    title: "Scheduled Batch Delivery",
    desc: "Deliveries are organized in clear, pre-scheduled batches agreed in advance to preserve craft precision and streamline production.",
  },
  {
    title: "Revisions Policy",
    desc: "Please respect the revision allocation per tier. Any additional revision rounds beyond this scope are accommodated at a minor pre-agreed rate.",
  },
  {
    title: "Raw Footage Submission",
    desc: "Source footage should be uploaded in full native resolution via neatly organized Google Drive or WeTransfer links.",
  },
];

const clientReviews = [
  {
    quote: "Lil transformed our raw footage into high-retention commercial reels. The pacing, audio sync, and pop-up subtitles significantly boosted our engagement.",
    client: "Ahmed Abdelkareem",
    role: "Content Creator & Entrepreneur",
    rating: "★★★★★",
  },
  {
    quote: "Exceptional turnaround and aesthetic sense. He understands video storytelling deeply, delivering flawless color grading and slick pacing without endless revisions.",
    client: "Sameh Othman",
    role: "Business Consultant",
    rating: "★★★★★",
  },
  {
    quote: "The retention on our educational campaigns jumped noticeably after hiring Lil. The edits are razor sharp and the communication is clear and professional.",
    client: "Rania",
    role: "E-Learning Academy Lead",
    rating: "★★★★★",
  },
  {
    quote: "Reliable, creative, and fast. His sound design and B-roll selection gave our commercial launches a truly cinematic presence.",
    client: "Maryam",
    role: "Commercial Brand Manager",
    rating: "★★★★★",
  },
];

// --- MAIN COMPONENT ---

export default function Home() {
  const [currencyMode, setCurrencyMode] = useState<"ALL" | "USD" | "EGP">("ALL");
  const [selectedVideoTab, setSelectedVideoTab] = useState<"all" | "reels" | "commercial" | "cinematic">("all");
  const [activeModalVideo, setActiveModalVideo] = useState<(typeof videosData)[0] | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isModalMuted, setIsModalMuted] = useState(false);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const highlightsScrollRef = useRef<HTMLDivElement>(null);

  const scrollHighlights = (direction: "left" | "right") => {
    if (highlightsScrollRef.current) {
      const scrollDistance = highlightsScrollRef.current.clientWidth * 0.75;
      highlightsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollDistance : scrollDistance,
        behavior: "smooth",
      });
    }
  };

  // --- SPRING CURSOR (DESKTOP ONLY) ---
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorRotation = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 900, mass: 0.1 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 900, mass: 0.1 });
  const smoothRotation = useSpring(cursorRotation, { damping: 25, stiffness: 350 });
  const prevMouseXRef = useRef(0);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches;
    if (isDesktop) {
      document.documentElement.style.cursor = "none";
      document.body.style.cursor = "none";
    }

    return () => {
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
    };
  }, []);

  // Typewriter
  useEffect(() => {
    const fullText = "Hi, i'm Lil";
    let index = 0;

    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 110);

    return () => clearInterval(interval);
  }, []);

  // Scroll & Mouse Listeners
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const deltaX = e.clientX - prevMouseXRef.current;
      prevMouseXRef.current = e.clientX;
      const targetRotation = Math.max(Math.min(deltaX * 0.7, 20), -20);
      cursorRotation.set(targetRotation);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, cursorRotation]);

  // Modal Video Handling
  const closeModal = useCallback(() => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setActiveModalVideo(null);
  }, []);

  const openModal = useCallback((video: (typeof videosData)[0]) => {
    setActiveModalVideo(video);
  }, []);

  const currentVideoIndex = activeModalVideo
    ? videosData.findIndex((v) => v.id === activeModalVideo.id)
    : -1;

  const goNext = useCallback(() => {
    if (currentVideoIndex === -1) return;
    setActiveModalVideo(videosData[(currentVideoIndex + 1) % videosData.length]);
  }, [currentVideoIndex]);

  const goPrevious = useCallback(() => {
    if (currentVideoIndex === -1) return;
    setActiveModalVideo(videosData[(currentVideoIndex - 1 + videosData.length) % videosData.length]);
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
        if (modalVideoRef.current.paused) modalVideoRef.current.play();
        else modalVideoRef.current.pause();
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

  const toggleSound = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsModalMuted(modalVideoRef.current.muted);
  };

  const filteredVideos = useMemo(() => {
    if (selectedVideoTab === "all") return videosData;
    return videosData.filter((video) => video.tab === selectedVideoTab);
  }, [selectedVideoTab]);

  return (
    <div className="relative w-full min-h-screen bg-[#070709] text-[#E2E8F0] selection:bg-[#B600A8] selection:text-white overflow-x-hidden font-sans">
      
      {/* AMBIENT GLOW BACKDROP */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[10%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-[#B600A8]/10 blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-[#7621B0]/10 blur-[120px] sm:blur-[160px]" />
      </div>

      {/* DESKTOP NEON CURSOR */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[999999] hidden lg:block"
        style={{
          x: smoothX,
          y: smoothY,
          rotate: smoothRotation,
          translateX: "-3px",
          translateY: "-3px",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 0 5px #B600A8) drop-shadow(0 0 12px #B600A8)" }}
        >
          <path
            d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
            fill="#FFFFFF"
            stroke="#B600A8"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100dvh] flex flex-col justify-between px-4 sm:px-8 md:px-12 pt-4 sm:pt-6 pb-8 sm:pb-12 z-10 border-b border-white/[0.06] overflow-hidden">
        
        {/* Navigation Bar */}
        <header className="w-full max-w-6xl mx-auto z-30">
          <nav className="flex items-center justify-between px-5 py-3 sm:py-3.5 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl text-xs uppercase font-mono">
            <a href="#about" className="font-bold tracking-widest text-sm text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B600A8] shadow-[0_0_8px_#B600A8]" />
              <span>LIL</span>
            </a>

            <div className="hidden md:flex items-center gap-6 tracking-wider text-[11px]">
              <a href="#about" className="hover:text-[#B600A8] transition-colors">About</a>
              <button
                onClick={() => setIsWorkflowOpen(true)}
                className="text-white hover:text-[#B600A8] transition-colors flex items-center gap-1 font-bold"
              >
                <span>Workflow</span>
                <span className="text-[10px]">↗</span>
              </button>
              <a href="#videos" className="hover:text-[#B600A8] transition-colors">Videos</a>
              <a href="#price" className="hover:text-[#B600A8] transition-colors">Pricing</a>
              <a href="#reviews" className="hover:text-[#B600A8] transition-colors">Reviews</a>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/201211871199"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/50 text-white font-bold hover:bg-[#B600A8] transition-all flex items-center gap-1.5 text-[11px] sm:text-xs shadow-[0_0_12px_rgba(182,0,168,0.3)]"
              >
                <WhatsAppIcon />
                <span className="hidden xs:inline">WhatsApp</span>
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-base active:scale-95 transition-transform"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden mt-2 p-5 rounded-3xl bg-[#100D14]/95 border border-white/15 backdrop-blur-3xl shadow-2xl flex flex-col gap-3 font-mono text-xs uppercase"
              >
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 text-white/80 hover:text-[#B600A8]"
                >
                  About Lil
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWorkflowOpen(true);
                  }}
                  className="py-2 border-b border-white/5 text-left text-white/80 hover:text-[#B600A8] flex justify-between items-center"
                >
                  <span>Production Workflow</span>
                  <span>↗</span>
                </button>
                <a
                  href="#videos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 text-white/80 hover:text-[#B600A8]"
                >
                  Video Portfolio (11)
                </a>
                <a
                  href="#price"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 text-white/80 hover:text-[#B600A8]"
                >
                  Packages & Rates
                </a>
                <a
                  href="#reviews"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 text-white/80 hover:text-[#B600A8]"
                >
                  Client Reviews
                </a>
                <a
                  href="#thumbnails"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 text-white/80 hover:text-[#B600A8]"
                >
                  Thumbnails & Covers
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* --- HERO CONTENT: صورتك في الباك والكلام فوقها تماماً --- */}
        <div className="relative my-auto py-10 sm:py-16 flex flex-col items-center justify-center text-center w-full min-h-[440px] sm:min-h-[520px]">
          
          {/* صورتك بالبوليس في الباك بخلفية سينمائية */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-0 pointer-events-none flex justify-center items-end select-none">
            <img
              src="/images/police.png"
              alt="Lil Police Portrait"
              className="w-[280px] xs:w-[340px] sm:w-[420px] md:w-[490px] max-h-[72vh] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] opacity-90 transition-transform duration-500"
            />
            {/* فيد خفيف في أسفل الصورة عشان تندمج مع سواد الصفحة */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-transparent" />
          </div>

          <FadeIn delay={0.05} y={15} className="mb-4 relative z-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono text-[#D7E2EA]/85 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Commercial & Retention Editor</span>
            </div>
          </FadeIn>

          {/* التكست بيتكتب فوق الصورة مباشرة */}
          <div className="relative z-20 select-none">
            <h1 className="text-[15vw] sm:text-[14vw] md:text-[13vw] font-black uppercase tracking-tight leading-none text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
              <span>{typedText}</span>
              <span className="text-[#B600A8] animate-pulse ml-1.5">|</span>
            </h1>
          </div>

          <p className="relative z-20 max-w-md text-xs sm:text-sm text-white/90 uppercase tracking-widest font-light leading-relaxed mt-5 px-4 drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
            Senior video editor shaping memorable visual stories with retention-driven pacing & sound design.
          </p>

          <div className="relative z-20 flex flex-col xs:flex-row gap-3 items-center mt-7 w-full xs:w-auto px-6 xs:px-0">
            <a
              href="#videos"
              className="w-full xs:w-auto text-center px-6 py-3 rounded-full border border-white/25 bg-black/50 backdrop-blur-xl text-white text-xs uppercase font-bold tracking-widest hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all shadow-xl active:scale-95"
            >
              Watch Videos ({videosData.length})
            </a>
            <a
              href="#contact"
              className="w-full xs:w-auto text-center px-6 py-3 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white text-xs uppercase font-bold tracking-widest hover:opacity-90 transition-all shadow-[0_0_25px_rgba(182,0,168,0.4)] active:scale-95"
            >
              Get in Touch →
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-xs font-mono text-white/40 border-t border-white/[0.06] pt-4 text-center z-20">
          <div>Post-Production • Foley Sound • Color Grading</div>
          <div>Available for Retainers 2026</div>
        </div>
      </section>

      {/* --- FEATURED HIGHLIGHTS & POSTERS --- */}
      <section className="py-14 border-b border-white/[0.06] bg-[#0A0A0C] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#B600A8] font-bold block mb-1">
              Visual Catalogue
            </span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
              Featured Highlights & Posters
            </h3>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => scrollHighlights("left")}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-[#B600A8] hover:border-[#B600A8] text-white flex items-center justify-center transition-all active:scale-90 shadow-lg text-sm"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scrollHighlights("right")}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-[#B600A8] hover:border-[#B600A8] text-white flex items-center justify-center transition-all active:scale-90 shadow-lg text-sm"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={highlightsScrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar px-5 sm:px-10 pb-4 touch-pan-x"
        >
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div
              key={idx}
              className="w-[220px] sm:w-[280px] h-[330px] sm:h-[370px] rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden shrink-0 group relative flex flex-col justify-end p-5 shadow-xl hover:border-[#B600A8]/50 transition-all duration-300"
            >
              {item.video ? (
                <video
                  src={item.video}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              <div className="relative z-10 pointer-events-none">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#B600A8] font-bold block mb-1">
                  {item.category}
                </span>
                <h4 className="text-white font-bold text-sm leading-snug line-clamp-2">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ABOUT & STATS --- */}
      <section id="about" className="py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-[#B600A8] font-bold">
            Track Record & Tools
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mt-1">
            Who Am I
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          <FadeIn className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                Lil — Senior Video Editor & Narrative Crafter
              </h3>
              <p className="text-[#D7E2EA]/75 leading-relaxed text-xs sm:text-sm font-light">
                Specialized in building high-retention visual assets that captivate audiences. With extensive experience across Adobe Premiere Pro, After Effects, and DaVinci Resolve, I bridge the gap between creative storytelling, surgical audio design, and conversion-driven marketing.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 mt-6 text-center font-mono">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white"><CountUp target={4} suffix="+" /></div>
                <div className="text-[10px] uppercase text-white/50 mt-1">Years Exp</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white"><CountUp target={350} suffix="+" /></div>
                <div className="text-[10px] uppercase text-white/50 mt-1">Masters Cut</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white"><CountUp target={20} suffix="+" /></div>
                <div className="text-[10px] uppercase text-white/50 mt-1">Brands</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white"><CountUp target={45} suffix="%" /></div>
                <div className="text-[10px] uppercase text-white/50 mt-1">Retention Lift</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#B600A8] font-bold">
                Software Stack
              </span>
              <div className="grid grid-cols-2 gap-2.5 mt-3">
                {softwareStack.map((soft, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center text-center">
                    <span className="w-8 h-8 rounded-xl bg-[#B600A8]/20 border border-[#B600A8]/40 text-[#B600A8] font-black text-xs flex items-center justify-center mb-1">
                      {soft.icon}
                    </span>
                    <h4 className="text-xs font-bold text-white">{soft.name}</h4>
                    <p className="text-[9px] text-white/40 mt-0.5">{soft.tag}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 mt-5">
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-2">Edited For:</span>
              <div className="flex flex-wrap gap-1.5">
                {["Ahmed Abdelkareem", "Sameh Othman", "Maryam", "Sawsan", "Yasmine", "Rania"].map((client, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* --- VIDEO PORTFOLIO --- */}
      <section id="videos" className="py-20 px-4 sm:px-8 md:px-12 border-t border-white/[0.06] bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-8 sm:mb-12">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#B600A8] font-bold">
                Archive & Showcase
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mt-1">
                Featured Videos
              </h2>
            </div>

            <div className="flex overflow-x-auto no-scrollbar gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs touch-pan-x">
              {[
                { id: "all", label: "All (11)" },
                { id: "reels", label: "Reels (6)" },
                { id: "commercial", label: "Commercial (3)" },
                { id: "cinematic", label: "Cinematic (2)" },
              ].map((tab) => {
                const isActive = selectedVideoTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedVideoTab(tab.id as any)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all ${
                      isActive ? "bg-[#B600A8] text-white font-bold shadow-md" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {filteredVideos.map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 0.04}>
                <div
                  onClick={() => openModal(item)}
                  className="group rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#B600A8]/60 overflow-hidden cursor-pointer transition-all duration-300 shadow-xl flex flex-col justify-between active:scale-[0.99]"
                >
                  <div className="relative aspect-[9/16] w-full bg-black overflow-hidden">
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                    />

                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase text-white font-bold">
                      {item.tab}
                    </div>

                    <div className="absolute bottom-3.5 right-3.5 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] text-white font-mono font-bold uppercase shadow-lg group-hover:bg-[#B600A8] transition-all">
                      ▶ Watch Cut
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0A0A0C]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#B600A8] font-bold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-white font-bold text-base leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#D7E2EA]/60 mt-1 leading-relaxed line-clamp-2 font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="price" className="py-20 px-5 sm:px-8 md:px-12 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-[#B600A8] font-bold">
              Transparent Production Rates
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mt-1">
              Rates & Packages
            </h2>

            <div className="inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 mt-5 font-mono text-xs">
              {(["ALL", "USD", "EGP"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCurrencyMode(mode)}
                  className={`px-3.5 py-1.5 rounded-full transition-all ${
                    currencyMode === mode
                      ? "bg-[#B600A8] text-white font-bold shadow-lg"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {mode === "ALL" ? "USD & EGP" : mode === "USD" ? "USD (\$)" : "EGP (ج.م)"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {packagesData.map((pkg) => {
              const priceDisplay =
                currencyMode === "USD"
                  ? pkg.priceUSD
                  : currencyMode === "EGP"
                  ? pkg.priceEGP
                  : `${pkg.priceUSD} / ${pkg.priceEGP}`;

              const waMessage = `https://wa.me/201211871199?text=${encodeURIComponent(
                `Hey Lil! I want to book the "${pkg.name}" tier (${priceDisplay} per video). Let's review the details.`
              )}`;

              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative backdrop-blur-2xl ${
                    pkg.featured
                      ? "bg-gradient-to-b from-[#18011F]/90 to-[#0e0814]/90 border-2 border-[#B600A8] shadow-[0_0_35px_rgba(182,0,168,0.25)]"
                      : "bg-white/[0.02] border border-white/10 hover:border-white/20"
                  }`}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B600A8] text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-0.5 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <div className="flex justify-between items-baseline mb-3 font-mono text-xs">
                      <span className="text-white/40">TIER {pkg.id}</span>
                      <span className="text-[#B600A8] font-bold">{pkg.arabicName}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black uppercase text-white">{pkg.name}</h3>

                    <div className="my-5 pb-5 border-b border-white/10">
                      <div className="text-3xl font-black font-mono text-white">{priceDisplay}</div>
                      <div className="text-[11px] text-white/40 uppercase font-mono mt-1">Per Video (Up to 60s)</div>
                    </div>

                    <ul className="space-y-3 mb-6 text-xs text-[#D7E2EA]/75">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-[#B600A8] font-bold mt-0.5">✦</span>
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 border-t border-white/10 space-y-2.5">
                    <p className="text-[10px] text-white/40 text-center font-mono">{pkg.revisions}</p>
                    
                    <a
                      href={pkg.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-2.5 rounded-full border border-white/15 text-xs uppercase font-mono tracking-wider text-white/80 hover:text-white hover:border-[#B600A8] transition-colors"
                    >
                      ▶ Watch Sample Cut
                    </a>

                    <a
                      href={waMessage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                        pkg.featured
                          ? "bg-[#B600A8] hover:bg-[#9d0091] text-white shadow-lg shadow-[#B600A8]/30"
                          : "border border-white/20 hover:bg-white/10 text-white"
                      }`}
                    >
                      Order via WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#B600A8] font-bold mb-4">
              Production Terms & Flow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs text-white/60">
              {generalTerms.map((term, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-white font-bold uppercase">{i + 1}. {term.title}</div>
                  <p className="leading-relaxed font-light">{term.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section id="reviews" className="py-20 px-5 sm:px-8 md:px-12 border-t border-white/[0.06] bg-[#0A0A0C]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-[#B600A8] font-bold">Client Feedback</span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mt-1">Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {clientReviews.map((rev, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#B600A8] text-xs tracking-widest">{rev.rating}</span>
                    <span className="text-2xl text-white/20 font-serif">“</span>
                  </div>
                  <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-5">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-3.5 border-t border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#B600A8] to-[#7621B0] flex items-center justify-center font-bold text-white text-xs">
                    {rev.client.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs sm:text-sm">{rev.client}</h4>
                    <p className="text-[11px] text-white/40">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THUMBNAILS & GRAPHICS --- */}
      <section id="thumbnails" className="py-20 px-5 sm:px-8 md:px-12 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-[#B600A8] font-bold">Graphic Art</span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mt-1">Thumbnails & Covers</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {thumbnailsData.map((thumb, idx) => (
              <div key={idx} className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden group">
                <div className="aspect-[4/5] w-full overflow-hidden bg-black">
                  <img
                    src={thumb.src}
                    alt={thumb.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                </div>
                <div className="p-4 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase text-[#B600A8] font-bold">{thumb.category}</span>
                  <h3 className="text-white font-bold text-sm mt-0.5">{thumb.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER & CONTACT --- */}
      <footer id="contact" className="py-20 px-5 text-center border-t border-white/[0.06] bg-[#060608]">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-widest text-[#B600A8] font-bold block mb-1">Available for new projects</span>
          <h2 className="text-3xl sm:text-6xl font-black uppercase text-white mb-4 leading-tight">
            Let&apos;s Create Together
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mb-8 font-light px-4">
            Available for commercial campaigns, ongoing reels retainers, and high-retention video post-production.
          </p>

          <a
            href="https://wa.me/201211871199?text=Hey%20Lil!%20I%20want%20to%20start%20a%20video%20editing%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#B600A8] hover:bg-[#9d0091] text-white uppercase tracking-widest text-xs font-bold transition-all shadow-[0_0_25px_rgba(182,0,168,0.4)] active:scale-95"
          >
            <span>Start Project via WhatsApp</span>
            <span>→</span>
          </a>

          <div className="flex justify-center items-center gap-3.5 mt-12 mb-6">
            <a href="https://www.instagram.com/ebrahimfadel_8/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#B600A8] transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/EbrahimFadel8" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#B600A8] transition-colors" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://wa.me/201211871199" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#25D366] transition-colors" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
            <a href="mailto:ebrahimfadel8903@gmail.com" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#B600A8] transition-colors" aria-label="Email">
              <MailIcon />
            </a>
          </div>

          <div className="text-[11px] text-white/30 font-mono">
            © 2026 Lil. All rights reserved.
          </div>
        </div>
      </footer>

      {/* --- THEATER VIDEO MODAL --- */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-3 sm:p-6"
          >
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex justify-between items-center text-xs font-mono">
              <span className="text-[#B600A8] font-bold truncate max-w-[200px] sm:max-w-none">
                [{currentVideoIndex + 1}/{videosData.length}] {activeModalVideo.title}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSound();
                  }}
                  className="px-3 py-1 rounded-full border border-white/20 text-white text-[10px] uppercase hover:bg-white hover:text-black transition-colors"
                >
                  {isModalMuted ? "🔇 UNMUTE" : "🔊 MUTE"}
                </button>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#B600A8] transition-colors text-sm"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); goPrevious(); }}
              className="absolute left-2 sm:left-6 w-10 h-10 rounded-full border border-white/20 bg-black/60 text-white flex items-center justify-center hover:bg-[#B600A8] transition-colors z-20 active:scale-95"
              aria-label="Previous"
            >
              ←
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 sm:right-6 w-10 h-10 rounded-full border border-white/20 bg-black/60 text-white flex items-center justify-center hover:bg-[#B600A8] transition-colors z-20 active:scale-95"
              aria-label="Next"
            >
              →
            </button>

            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full h-[76dvh] sm:h-[84dvh] aspect-[9/16] bg-black rounded-3xl border border-white/20 overflow-hidden shadow-[0_0_50px_rgba(182,0,168,0.35)]"
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
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[82dvh] overflow-y-auto bg-[#100D14] border border-white/20 rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 shadow-[0_0_60px_rgba(182,0,168,0.3)] custom-scrollbar"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-[#B600A8] font-bold">
                    Production Pipeline
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    Editing Workflow
                  </h3>
                </div>
                <button
                  onClick={() => setIsWorkflowOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#B600A8] transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3.5">
                {processSteps.map((step) => (
                  <div key={step.num} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[10px] font-mono text-[#B600A8] font-bold">STEP {step.num}</span>
                      <span className="text-[11px] text-white/50">{step.arabic}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{step.title}</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-light">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-center">
                <button
                  onClick={() => setIsWorkflowOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#B600A8] text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-[#9d0091] transition-all"
                >
                  Got It, Let&apos;s Start
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SCROLL TO TOP --- */}
      <AnimatePresence>
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 z-40 w-10 h-10 rounded-full bg-[#141418]/90 backdrop-blur-xl border border-white/20 text-[#B600A8] hover:bg-[#B600A8] hover:text-white shadow-2xl flex items-center justify-center font-black transition-all active:scale-95"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}
      </AnimatePresence>

    </div>
  );
}