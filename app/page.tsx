"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useInView } from "framer-motion";

// Add your live payment-page URL here when it is published.
const PAYMENT_PAGE_URL = "/payment.html";
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

// --- REUSABLE ANIMATION COMPONENTS ---

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
  y = 25,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
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
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1600;
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

function MagneticButton({
  children,
  href,
  className = "",
  style = {},
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setPos({
      x: (e.clientX - centerX) * 0.35,
      y: (e.clientY - centerY) * 0.35,
    });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
      style={style}
    >
      {children}
    </motion.a>
  );
}

// --- DATA ---

const softwareStack = [
  { name: "Premiere Pro", tag: "Post-Production & Cutting", icon: "Pr" },
  { name: "After Effects", tag: "Transitions & Text Animation", icon: "Ae" },
  { name: "DaVinci Resolve", tag: "Color Grading & Mastering", icon: "Da" },
  { name: "Photoshop", tag: "High-CTR Thumbnails", icon: "Ps" },
];

const processSteps = [
  {
    num: "01",
    title: "Project Brief & Creative Vision",
    tag: "Creative Direction",
    desc: "Understanding target audience, platform format, desired pacing, tone, and visual references.",
  },
  {
    num: "02",
    title: "Footage Upload & Assembly",
    tag: "Media Intake",
    desc: "Seamless footage reception via Drive/WeTransfer, organizing media and building initial rough cuts.",
  },
  {
    num: "03",
    title: "The First Cut & Sound Design",
    tag: "Editorial & SFX",
    desc: "Applying dynamic cuts, animated pop-up subtitles, visual hooks, sound Foley, and color balancing.",
  },
  {
    num: "04",
    title: "Feedback & Revisions",
    tag: "Refinement Round",
    desc: "Fine-tuning rhythm, subtitle cues, and visual flow based on your precise notes and vision.",
  },
  {
    num: "05",
    title: "Final 4K Master Delivery",
    tag: "Master Export",
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
    subtitle: "Clean & Fast-Paced Cut",
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
    subtitle: "High Retention & Engaging",
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
    subtitle: "Commercial & Brand Showcase",
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

const servicesList = [
  {
    num: "01",
    name: "Video Editing & Post-Production",
    desc: "Crafting engaging social media reels, commercial ads, and storytelling cuts with precise timing, match cuts, and visual rhythm.",
  },
  {
    num: "02",
    name: "Color Grading & Look Dev",
    desc: "Cinematic color grading and palette balancing tailored to capture the emotional mood and professional visual polish.",
  },
  {
    num: "03",
    name: "High-CTR Thumbnails & Graphic Art",
    desc: "Eye-catching graphic design for YouTube thumbnails, sports graphics, and commercial social covers designed to maximize clicks.",
  },
  {
    num: "04",
    name: "Layered Foley Sound Design",
    desc: "Layered Foley sound design, impacts, risers, and music mixing that immerse viewers into the scene.",
  },
];

// --- MAIN COMPONENT ---

export default function Home() {
  const [currencyMode, setCurrencyMode] = useState<"ALL" | "USD" | "EGP">("ALL");
  const [selectedVideoTab, setSelectedVideoTab] = useState<"all" | "reels" | "commercial" | "cinematic">("all");
  
  // Accordions state
  const [isVideoMenuOpen, setIsVideoMenuOpen] = useState(true);
  const [isThumbnailsMenuOpen, setIsThumbnailsMenuOpen] = useState(true);

  const [activeModalVideo, setActiveModalVideo] = useState<(typeof videosData)[0] | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isModalMuted, setIsModalMuted] = useState(false);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);

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

  // --- SMOOTH SCROLL HANDLER ---
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", id);
    }
  };

  // --- MOUSE TRACKING ---
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const cursorRotation = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 45, stiffness: 1000, mass: 0.1 });
  const smoothY = useSpring(mouseY, { damping: 45, stiffness: 1000, mass: 0.1 });
  const smoothRotation = useSpring(cursorRotation, { damping: 28, stiffness: 400 });

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
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Scroll & Mouse Tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
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
    <>
      {/* NEON CURSOR */}
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 0 4px #B600A8) drop-shadow(0 0 10px #B600A8)" }}
        >
          <path
            d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
            fill="#FFFFFF"
            stroke="#B600A8"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* --- WORKFLOW MODAL --- */}
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
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#121216] border border-white/20 rounded-[36px] p-6 sm:p-10 shadow-[0_0_60px_rgba(182,0,168,0.3)] custom-scrollbar"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                    Production Pipeline
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Editing Workflow
                  </h3>
                </div>
                <button
                  onClick={() => setIsWorkflowOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center text-lg hover:bg-[#B600A8] transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="relative border-l-2 border-white/15 ml-4 pl-6 space-y-8">
                {processSteps.map((step) => (
                  <div key={step.num} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-5 h-5 rounded-full bg-[#0A0A0A] border-2 border-[#B600A8] flex items-center justify-center shadow-[0_0_12px_rgba(182,0,168,0.8)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#B600A8]/50 transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#B600A8] font-bold px-2 py-0.5 rounded bg-[#B600A8]/20 border border-[#B600A8]/40">
                            STEP {step.num}
                          </span>
                          <h4 className="text-base font-bold text-white">{step.title}</h4>
                        </div>
                        <span className="text-xs text-[#D7E2EA]/50 font-mono">{step.tag}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#D7E2EA]/75 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-center">
                <button
                  onClick={() => setIsWorkflowOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#B600A8] text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-[#9d0091] transition-all cursor-pointer"
                >
                  Got It, Let&apos;s Start
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main
        dir="ltr"
        className="relative w-full min-h-screen bg-[#0A0A0A] text-[#D7E2EA] selection:bg-[#B600A8] selection:text-white overflow-x-hidden font-sans"
      >
        {/* --- HERO SECTION WITH SUBTLE AMBIENT DUAL-VIDEO BACKGROUND --- */}
        <section className="relative min-h-screen flex flex-col justify-between overflow-x-clip bg-[#0A0A0A] pb-8">
          
          {/* Subtle Split Ambient Video Background */}
          <div className="absolute inset-0 z-0 flex pointer-events-none overflow-hidden select-none">
            {/* Man Utd View (Left) */}
            <div className="w-1/2 h-full relative border-r border-white/[0.04] overflow-hidden">
              <video
                src="/video/Man-U.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover opacity-15 filter contrast-125 brightness-90"
              />
            </div>

            {/* Odyssey View (Right) */}
            <div className="w-1/2 h-full relative overflow-hidden">
              <video
                src="/video/The-Odyssey.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover opacity-15 filter contrast-125 brightness-90"
              />
            </div>
            
            {/* Gradient Mask Overlay to ensure complete text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
          </div>

          {/* Navigation Bar with Smooth Scroll */}
          <FadeIn delay={0} y={-20} className="w-full z-30">
            <nav className="flex justify-between items-center px-6 md:px-10 py-4 md:py-5 mt-4 mx-4 md:mx-10 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 text-xs md:text-sm font-medium tracking-wider uppercase gap-6 shadow-2xl">
              <div className="flex gap-4 sm:gap-7 items-center flex-wrap">
                <a
                  href="#about"
                  onClick={(e) => handleScrollTo(e, "#about")}
                  className="hover:text-[#B600A8] transition-colors cursor-pointer"
                >
                  About
                </a>
                <button
                  onClick={() => setIsWorkflowOpen(true)}
                  className="text-[#D7E2EA] hover:text-[#B600A8] transition-colors uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Workflow ↗
                </button>
                <a
                  href="#videos"
                  onClick={(e) => handleScrollTo(e, "#videos")}
                  className="hover:text-[#B600A8] transition-colors cursor-pointer"
                >
                  Videos
                </a>
                <a
                  href="#price"
                  onClick={(e) => handleScrollTo(e, "#price")}
                  className="hover:text-[#B600A8] transition-colors cursor-pointer"
                >
                  Pricing
                </a>
                <a
                  href="#reviews"
                  onClick={(e) => handleScrollTo(e, "#reviews")}
                  className="hover:text-[#B600A8] transition-colors cursor-pointer"
                >
                  Reviews
                </a>
                <a
                  href="#thumbnails"
                  onClick={(e) => handleScrollTo(e, "#thumbnails")}
                  className="hover:text-[#B600A8] transition-colors cursor-pointer"
                >
                  Thumbnails
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="hover:text-[#B600A8] transition-colors cursor-pointer"
                >
                  Services
                </a>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a href="https://www.instagram.com/ebrahimfadel_8/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all">
                  <InstagramIcon />
                </a>
                <a href="https://www.facebook.com/EbrahimFadel8" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all">
                  <FacebookIcon />
                </a>
                <a href="https://wa.me/201211871199" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all">
                  <WhatsAppIcon />
                </a>
                <a href="mailto:ebrahimfadel8903@gmail.com" aria-label="Email" className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all">
                  <MailIcon />
                </a>
              </div>
            </nav>
          </FadeIn>

          {/* Clean Big Title */}
          <div className="overflow-hidden w-full select-none my-auto z-10">
            <FadeIn delay={0.15} y={40}>
              <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[15vw] sm:text-[16vw] md:text-[18vw] inline-flex items-center justify-center">
                <span>{typedText}</span>
                <span className="text-[#B600A8] animate-pulse ml-2 font-light">|</span>
              </h1>
            </FadeIn>
          </div>

          {/* Hero Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end px-6 md:px-10 gap-6 z-20 mt-12 sm:mt-0">
            <FadeIn delay={0.3} y={20}>
              <p className="text-[#D7E2EA] font-light leading-snug max-w-[280px] text-center sm:text-start text-xs sm:text-sm md:text-base opacity-80 uppercase tracking-wide">
                Senior video editor shaping memorable visual stories
              </p>
            </FadeIn>

            <FadeIn delay={0.4} y={20} className="flex gap-3 items-center">
              <MagneticButton
                href="#videos"
                onClick={(e) => handleScrollTo(e, "#videos")}
                className="rounded-full border-2 border-white/20 bg-white/[0.04] backdrop-blur-xl text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 text-xs sm:text-sm hover:bg-white/15 transition-colors shadow-lg cursor-pointer"
              >
                Watch Videos
              </MagneticButton>

              <MagneticButton
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="rounded-full uppercase tracking-widest font-semibold text-white px-7 py-3 text-xs sm:text-sm shadow-xl cursor-pointer"
                style={{
                  background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                  boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
                  outline: "2px solid #FFFFFF",
                  outlineOffset: "-3px",
                }}
              >
                Get in touch
              </MagneticButton>
            </FadeIn>
          </div>
        </section>

        {/* --- HIGHLIGHTS SECTION --- */}
        <section className="bg-[#0A0A0A] pt-16 pb-12 overflow-hidden flex flex-col gap-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                Visual Catalogue
              </span>
              <h3 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Featured Highlights & Posters
              </h3>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <button
                onClick={() => scrollHighlights("left")}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/15 text-white flex items-center justify-center hover:bg-[#B600A8] hover:border-[#B600A8] transition-all text-sm active:scale-95 shadow-md cursor-pointer"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scrollHighlights("right")}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/15 text-white flex items-center justify-center hover:bg-[#B600A8] hover:border-[#B600A8] transition-all text-sm active:scale-95 shadow-md cursor-pointer"
                aria-label="Scroll right"
              >
                →
              </button>

              <a
                href="#videos"
                onClick={(e) => handleScrollTo(e, "#videos")}
                className="px-5 py-2 rounded-full bg-white/5 border border-white/15 text-white text-xs uppercase font-bold tracking-wider hover:bg-[#B600A8] hover:border-[#B600A8] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>View All Videos</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div
            ref={highlightsScrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-6 md:px-12 pb-3 touch-pan-x"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div
                key={i}
                className="w-[240px] h-[340px] sm:w-[280px] sm:h-[390px] rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-xl overflow-hidden shrink-0 shadow-2xl group relative cursor-pointer"
              >
                {item.video ? (
                  <video
                    src={item.video}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-5 pointer-events-none">
                  <span className="text-[11px] uppercase tracking-widest text-[#B600A8] font-bold">
                    {item.category}
                  </span>
                  <h4 className="text-white font-semibold text-base truncate mt-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- ABOUT --- */}
        <section id="about" className="py-24 px-6 md:px-12 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto">
            <FadeIn delay={0} y={30} className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                Background & Track Record
              </span>
              <h2 className="hero-heading font-black uppercase text-4xl sm:text-6xl md:text-7xl mt-2">
                Who Am I
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <FadeIn delay={0.1} className="md:col-span-7 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 sm:p-10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Hey, I&apos;m Lil — Senior Video Editor
                </h3>

                <p className="text-[#D7E2EA]/80 leading-relaxed text-base sm:text-lg mb-6 font-light">
                  Specialized in building high-retention visual assets that captivate audiences. With extensive experience across Adobe Premiere Pro, After Effects, and DaVinci Resolve, I bridge the gap between creative storytelling, surgical audio design, and conversion-driven marketing.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center mb-8 font-mono">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white"><CountUp target={4} suffix="+" /></div>
                    <div className="text-[10px] sm:text-[11px] text-[#D7E2EA]/60 uppercase tracking-wider mt-1">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white"><CountUp target={350} suffix="+" /></div>
                    <div className="text-[10px] sm:text-[11px] text-[#D7E2EA]/60 uppercase tracking-wider mt-1">Videos Delivered</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white"><CountUp target={20} suffix="+" /></div>
                    <div className="text-[10px] sm:text-[11px] text-[#D7E2EA]/60 uppercase tracking-wider mt-1">Brands & Creators</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white"><CountUp target={45} suffix="%" /></div>
                    <div className="text-[10px] sm:text-[11px] text-[#D7E2EA]/60 uppercase tracking-wider mt-1">Retention Growth</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold block mb-4">
                    Primary Software Suite
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {softwareStack.map((soft, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center text-center hover:border-[#B600A8]/60 transition-colors"
                      >
                        <span className="w-9 h-9 rounded-xl bg-[#B600A8]/20 border border-[#B600A8]/40 text-[#B600A8] font-black text-sm flex items-center justify-center mb-2">
                          {soft.icon}
                        </span>
                        <h4 className="text-white text-xs font-semibold">{soft.name}</h4>
                        <p className="text-[10px] text-white/50 mt-0.5 leading-tight">{soft.tag}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="md:col-span-5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between h-full shadow-2xl">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold">
                    Client Deliverables
                  </span>

                  <h4 className="text-xl font-bold text-white mt-1 mb-4">
                    Creators & Brands I&apos;ve Edited For
                  </h4>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Ahmed Abdelkareem", "Sameh Othman", "Maryam", "Sawsan", "Yasmine", "Rania", "Mai"].map((client, idx) => (
                      <div
                        key={idx}
                        className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#D7E2EA]/90 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
                        <span>{client}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <MagneticButton
                    href="#contact"
                    onClick={(e) => handleScrollTo(e, "#contact")}
                    className="block text-center w-full py-3 rounded-full bg-white/10 hover:bg-[#B600A8] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                  >
                    Book Your Project
                  </MagneticButton>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- FEATURED VIDEOS (COLLAPSIBLE - PURE ENGLISH) --- */}
        <section
          id="videos"
          className="py-20 sm:py-24 px-4 sm:px-8 md:px-12 bg-[#0A0A0A] border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto">
            <FadeIn delay={0} y={30} className="text-center mb-4">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                Interactive Video Portfolio
              </span>

              <div className="relative inline-block mt-3">
                <button
                  onClick={() => setIsVideoMenuOpen(!isVideoMenuOpen)}
                  className="group inline-flex items-center gap-3 sm:gap-4 hero-heading font-black uppercase text-2xl sm:text-5xl md:text-6xl hover:opacity-90 transition-all cursor-pointer select-none"
                >
                  <span>Featured Video Cuts</span>
                  <span
                    className={`text-xl sm:text-4xl text-[#B600A8] transition-transform duration-300 ${
                      isVideoMenuOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {isVideoMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-center flex-wrap gap-2 sm:gap-3 mt-6"
                    >
                      {[
                        { id: "all", label: "All Videos (11)" },
                        { id: "reels", label: "Reels & Hooks (6)" },
                        { id: "commercial", label: "Commercial & Sports (3)" },
                        { id: "cinematic", label: "Cinematic & Narrative (2)" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() =>
                            setSelectedVideoTab(
                              tab.id as "all" | "reels" | "commercial" | "cinematic"
                            )
                          }
                          className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                            selectedVideoTab === tab.id
                              ? "bg-[#B600A8] text-white border-[#B600A8] shadow-lg shadow-[#B600A8]/30"
                              : "bg-white/5 text-[#D7E2EA]/70 border-white/10 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>

            <AnimatePresence>
              {isVideoMenuOpen && (
                <motion.div
                  key={selectedVideoTab}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10 overflow-hidden"
                >
                  {filteredVideos.map((item, idx) => (
                    <FadeIn key={item.id} delay={idx * 0.05}>
                      <div
                        onClick={() => openModal(item)}
                        className="bg-white/[0.04] backdrop-blur-2xl border border-white/15 rounded-[28px] overflow-hidden p-3 sm:p-3.5 shadow-2xl flex flex-col justify-between h-full group hover:border-[#B600A8]/60 transition-all cursor-pointer"
                      >
                        <div className="rounded-[20px] overflow-hidden aspect-[9/16] w-full bg-black relative">
                          <video
                            src={item.src}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/65 border border-white/15 text-[9px] font-mono uppercase text-white font-bold">
                            {item.tab}
                          </div>
                          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/65 border border-white/15 text-[9px] uppercase tracking-wider text-white/90">
                            Click to watch
                          </div>
                        </div>

                        <div className="p-3.5 flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B600A8] font-bold">
                              {item.category}
                            </span>
                            <h3 className="text-white font-semibold text-base mt-0.5 leading-snug">
                              {item.title}
                            </h3>
                          </div>
                          <span className="shrink-0 text-xs uppercase font-bold text-white/50 group-hover:text-[#B600A8] transition-colors pt-1">
                            Expand ↗
                          </span>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

               {/* --- PRICING --- */}
        <section id="price" className="py-24 px-5 sm:px-8 md:px-12 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto">
            <FadeIn delay={0} y={30} className="text-center mb-10">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                Video Editing Packages & Rates
              </span>

              <h2 className="hero-heading font-black uppercase text-4xl sm:text-6xl md:text-7xl mt-2">
                Rates & Packages
              </h2>

              <p className="text-[#D7E2EA]/60 max-w-xl mx-auto mt-3 text-sm sm:text-base font-light">
                Transparent video production rates in USD and EGP with milestone delivery
              </p>
            </FadeIn>

            <FadeIn delay={0.1} y={20} className="flex justify-center mb-16">
              <div className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl font-mono">
                <button
                  onClick={() => setCurrencyMode("ALL")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    currencyMode === "ALL" ? "bg-[#B600A8] text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  USD & EGP
                </button>
                <button
                  onClick={() => setCurrencyMode("USD")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    currencyMode === "USD" ? "bg-[#B600A8] text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrencyMode("EGP")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    currencyMode === "EGP" ? "bg-[#B600A8] text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  EGP
                </button>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
              {packagesData.map((pkg, idx) => (
                <FadeIn key={pkg.id} delay={idx * 0.15} className="flex">
                  <div
                    className={`w-full rounded-[36px] p-8 flex flex-col justify-between transition-all duration-300 relative backdrop-blur-2xl ${
                      pkg.featured
                        ? "bg-gradient-to-b from-[#18011F]/90 to-[#121212]/90 border-2 border-[#B600A8] shadow-[0_0_40px_rgba(182,0,168,0.25)]"
                        : "bg-white/[0.03] border border-white/10 hover:border-white/25 shadow-2xl"
                    }`}
                  >
                    {pkg.featured && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B600A8] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                          <p className="text-[#D7E2EA]/70 text-sm mt-1">{pkg.subtitle}</p>
                        </div>
                        <span className="font-mono text-white/30 text-lg font-bold">{pkg.id}</span>
                      </div>

                      <div className="my-6 pb-6 border-b border-white/10">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-black text-white">
                            {currencyMode === "EGP" ? pkg.priceEGP : pkg.priceUSD}
                          </span>
                          <span className="text-sm uppercase tracking-wider text-[#D7E2EA]/60 font-medium">
                            / Video
                          </span>
                        </div>
                        {currencyMode === "ALL" && (
                          <div className="text-sm text-[#B600A8] font-bold mt-1">
                            ≈ {pkg.priceEGP} / Video
                          </div>
                        )}
                      </div>

                      <ul className="space-y-4 mb-8">
                        {pkg.features.map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-[#D7E2EA]/80 leading-relaxed font-light"
                          >
                            <span className="text-[#B600A8] text-base mt-0.5 inline-block select-none">✦</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                      <p className="text-xs text-[#D7E2EA]/50 text-center font-medium font-mono">
                        {pkg.revisions}
                      </p>

                      <a
                        href={pkg.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-2.5 rounded-full border border-[#B600A8]/60 hover:bg-[#B600A8]/20 text-xs uppercase font-bold tracking-wider text-[#D7E2EA] transition-colors shadow-md"
                      >
                        ▶ Watch Video Sample
                      </a>

                      <MagneticButton>
                        href={`${PAYMENT_PAGE_URL}?package=${encodeURIComponent(pkg.name)}`}
                        className={`block w-full text-center rounded-full uppercase tracking-widest font-semibold py-3.5 text-sm transition-all duration-300 cursor-pointer ${
                          pkg.featured
                            ? "bg-[#B600A8] hover:bg-[#9d0091] text-white shadow-lg shadow-[#B600A8]/30"
                            : "border border-white/20 hover:bg-white/10 text-white shadow-md"
                        }`}
                      >
                        Book This Package
                      </MagneticButton>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.2} y={30}>
              <div className="rounded-[36px] bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-8 sm:p-12 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[#B600A8] text-xl">✦</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    General Terms & Production Flow
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {generalTerms.map((term, i) => (
                    <div
                      key={i}
                      className={`p-6 rounded-2xl bg-white/[0.02] border border-white/5 ${
                        i === 0 ? "md:col-span-2 border-[#B600A8]/30 bg-[#B600A8]/5" : ""
                      }`}
                    >
                      <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <span className="text-xs text-[#B600A8] font-mono">0{i + 1}.</span>
                        {term.title}
                      </h4>
                      <p className="text-sm text-[#D7E2EA]/70 leading-relaxed font-light">{term.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- REVIEWS --- */}
        <section id="reviews" className="py-24 px-6 md:px-12 bg-[#0A0A0A] border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <FadeIn delay={0} y={30} className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">Testimonials</span>
              <h2 className="hero-heading font-black uppercase text-4xl sm:text-6xl md:text-7xl mt-2">Client Messages</h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {clientReviews.map((rev, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="p-8 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex flex-col justify-between h-full shadow-2xl">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[#B600A8] text-sm tracking-widest font-mono">{rev.rating}</span>
                        <span className="text-3xl text-white/20 font-serif leading-none">“</span>
                      </div>
                      <p className="text-[#D7E2EA]/85 text-base sm:text-lg leading-relaxed mb-6 font-light">
                        &quot;{rev.quote}&quot;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B600A8] to-[#7621B0] flex items-center justify-center font-bold text-white text-sm shadow-md">
                        {rev.client.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm sm:text-base">{rev.client}</h4>
                        <p className="text-xs text-[#D7E2EA]/60">{rev.role}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* --- THUMBNAILS & COVERS (COLLAPSIBLE - PURE ENGLISH) --- */}
        <section id="thumbnails" className="py-24 px-5 sm:px-8 md:px-12 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto">
            <FadeIn delay={0} y={30} className="text-center mb-4">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                Graphic Covers & Visuals
              </span>

              <div className="relative inline-block mt-3">
                <button
                  onClick={() => setIsThumbnailsMenuOpen(!isThumbnailsMenuOpen)}
                  className="group inline-flex items-center gap-3 sm:gap-4 hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl hover:opacity-90 transition-all cursor-pointer select-none"
                >
                  <span>Thumbnails & Covers</span>
                  <span
                    className={`text-2xl sm:text-4xl text-[#B600A8] transition-transform duration-300 ${
                      isThumbnailsMenuOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {isThumbnailsMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 overflow-hidden"
                    >
                      {thumbnailsData.map((thumb, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[28px] overflow-hidden shadow-2xl group hover:border-[#B600A8]/50 transition-colors duration-300">
                            <div className="w-full aspect-[4/5] overflow-hidden bg-black/50">
                              <img
                                src={thumb.src}
                                alt={thumb.title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>

                            <div className="p-5 flex flex-col gap-1 text-left">
                              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-medium">{thumb.category}</span>
                              <h3 className="text-[#D7E2EA] font-semibold text-lg sm:text-xl">{thumb.title}</h3>
                            </div>
                          </div>
                        </FadeIn>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- SERVICES --- */}
        <section id="services" className="bg-white rounded-t-[40px] sm:rounded-t-[60px] px-6 sm:px-10 py-24 text-[#0C0C0C]">
          <div className="max-w-5xl mx-auto">
            <FadeIn delay={0} y={30}>
              <h2 className="font-black uppercase text-center mb-16 sm:mb-24 text-4xl sm:text-6xl md:text-7xl text-[#0C0C0C]">
                Services
              </h2>
            </FadeIn>

            <div className="flex flex-col">
              {servicesList.map((item, index) => (
                <FadeIn key={item.num} delay={index * 0.1}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[rgba(12,12,12,0.15)] py-8 sm:py-10 gap-4 sm:gap-10">
                    <span className="font-black text-[#0C0C0C] text-5xl sm:text-7xl leading-none shrink-0">
                      {item.num}
                    </span>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold uppercase text-xl sm:text-2xl text-[#0C0C0C]">{item.name}</h3>
                      <p className="font-normal leading-relaxed max-w-2xl text-[#0C0C0C]/70 text-sm sm:text-base">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT --- */}
        <section id="contact" className="py-24 px-6 text-center bg-[#0A0A0A] border-t border-white/10">
          <FadeIn delay={0} y={30} className="max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B600A8] font-bold">
              Available for new projects
            </span>

            <h2 className="hero-heading font-black uppercase text-4xl sm:text-6xl mb-4 mt-3">
              Let&apos;s Create Together
            </h2>

            <p className="text-[#D7E2EA]/70 mb-10 max-w-xl mx-auto text-sm sm:text-base font-light">
              Available for commercial campaigns, ongoing reels retainers, and high-retention video post-production.
            </p>

            <div className="flex justify-center items-center gap-4 mb-10">
              <a href="https://www.instagram.com/ebrahimfadel_8/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all shadow-xl">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/EbrahimFadel8" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all shadow-xl">
                <FacebookIcon />
              </a>
              <a href="https://wa.me/201211871199" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/20 transition-all shadow-xl">
                <WhatsAppIcon />
              </a>
              <a href="mailto:ebrahimfadel8903@gmail.com" aria-label="Email" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all shadow-xl">
                <MailIcon />
              </a>
            </div>

            <MagneticButton
              href="https://wa.me/201211871199?text=Hey%20Lil!%20I%20want%20to%20start%20a%20video%20editing%20project."
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#B600A8] hover:bg-[#9d0091] text-white uppercase tracking-widest text-xs font-bold transition-all shadow-[0_0_30px_rgba(182,0,168,0.35)] cursor-pointer"
            >
              Start a Project
              <span>→</span>
            </MagneticButton>

            <div className="text-xs text-white/40 mt-10 font-mono">
              © 2026 Lil. All rights reserved.
            </div>
          </FadeIn>
        </section>

        {/* --- SCROLL TOP --- */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#141418]/80 backdrop-blur-xl border border-white/20 text-[#B600A8] hover:bg-[#B600A8] hover:text-white hover:border-[#B600A8] shadow-2xl flex items-center justify-center font-black transition-all"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </main>

      {/* --- VIDEO THEATER MODE --- */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-2 sm:p-6"
          >
            <div className="absolute top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 z-[130] flex items-center justify-between pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-2xl text-xs uppercase font-mono text-[#B600A8] font-bold pointer-events-auto">
                {currentVideoIndex + 1} / {videosData.length}
              </span>

              <div className="flex items-center gap-2.5 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSound();
                  }}
                  className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-[#B600A8] transition-all cursor-pointer"
                >
                  {isModalMuted ? "🔇 UNMUTE" : "🔊 MUTE"}
                </button>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-[#B600A8] transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); goPrevious(); }}
              className="absolute left-2 sm:left-6 z-[120] w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center text-xl hover:bg-[#B600A8] transition-all cursor-pointer"
            >
              ←
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 sm:right-6 z-[120] w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center text-xl hover:bg-[#B600A8] transition-all cursor-pointer"
            >
              →
            </button>

            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[380px] h-[84dvh] aspect-[9/16] bg-black rounded-[32px] overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(182,0,168,0.35)]"
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
    </>
  );
}