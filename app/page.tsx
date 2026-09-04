"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- SVG SOCIAL & SOFTWARE ICONS ---

const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.5 0 9 1.582 9 4.615V8z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
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
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(
        e.clientX - centerX,
        e.clientY - centerY
      );

      if (dist < rect.width / 2 + padding) {
        setIsHovered(true);
        setPosition({
          x: (e.clientX - centerX) / strength,
          y: (e.clientY - centerY) / strength,
        });
      } else {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? "transform 0.3s ease-out"
          : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

// --- DATA ---

const softwareStack = [
  {
    name: "Premiere Pro",
    tag: "Post-Production & Cutting",
    icon: "Pr",
  },
  {
    name: "After Effects",
    tag: "Transitions & Text Animation",
    icon: "Ae",
  },
  {
    name: "DaVinci Resolve",
    tag: "Color Grading & Mastering",
    icon: "Da",
  },
  {
    name: "Photoshop",
    tag: "High-CTR Thumbnails",
    icon: "Ps",
  },
];

// قائمة الفيديوهات الـ 11 موحدة بنسبة ريلز رأسية portrait ومسارات مطابقة لـ Vercel
const videosData = [
  {
    id: "man-u",
    title: "Manchester United Highlight Cut",
    category: "Sports",
    tab: "commercial",
    src: "/video/Man-U.mp4",
    description:
      "Fast-paced football edit focused on rhythm, impact, typography and music synchronization.",
    orientation: "portrait",
  },
  {
    id: "the-odyssey",
    title: "The Odyssey Cinematic Master",
    category: "Cinematic Narrative",
    tab: "cinematic",
    src: "/video/The-Odyssey.mp4",
    description:
      "Cinematic storytelling edit combining pacing, atmosphere, sound design and visual continuity.",
    orientation: "portrait",
  },
  {
    id: "mb22",
    title: "Commercial Showcase (mb22)",
    category: "Brand Campaign",
    tab: "commercial",
    src: "/video/Mb22.mp4",
    description:
      "Commercial showcase built around product presentation, dynamic cuts and visual impact.",
    orientation: "portrait",
  },
  {
    id: "color",
    title: "Color Grading Reel",
    category: "Color Correction",
    tab: "commercial",
    src: "/video/Color.mp4",
    description:
      "Color grading showcase demonstrating contrast, skin tones, mood and cinematic look development.",
    orientation: "portrait",
  },
  {
    id: "reel-1",
    title: "High-Retention Commercial Reel #1",
    category: "TikTok / Reels",
    tab: "reels",
    src: "/video/1.mp4",
    description:
      "Short-form edit designed around strong hooks, rapid pacing and audience retention.",
    orientation: "portrait",
  },
  {
    id: "reel-2",
    title: "Business Growth Reel #2",
    category: "Pop-Up Subtitles",
    tab: "reels",
    src: "/video/2.mp4",
    description:
      "Business-focused short-form edit using animated subtitles, visual emphasis and sound effects.",
    orientation: "portrait",
  },
  {
    id: "reel-3",
    title: "Dynamic Hook Cut #3",
    category: "Fast Paced",
    tab: "reels",
    src: "/video/3.mp4",
    description:
      "High-energy social edit focused on hooks, fast transitions and visual storytelling.",
    orientation: "portrait",
  },
  {
    id: "reel-4",
    title: "Viral Engagement Reel #4",
    category: "Fast Paced Cuts",
    tab: "reels",
    src: "/video/4.mp4",
    description:
      "Engagement-first edit with rhythmic cuts, zooms, subtitles and layered sound design.",
    orientation: "portrait",
  },
  {
    id: "reel-5",
    title: "Brand Storytelling #5",
    category: "Commercial Cut",
    tab: "reels",
    src: "/video/5.mp4",
    description:
      "Brand storytelling reel combining clean editing, narrative structure and visual consistency.",
    orientation: "portrait",
  },
  {
    id: "reel-12",
    title: "Social Media Hook #12",
    category: "Short-Form Reel",
    tab: "reels",
    src: "/video/12.mp4",
    description:
      "Short-form social media edit built to grab attention immediately and maintain momentum.",
    orientation: "portrait",
  },
  {
    id: "habib-ayamy",
    title: "Habib Ayamy",
    category: "Cinematic Sound Design",
    tab: "cinematic",
    src: "/video/Habib-Ayamy.mp4",
    description:
      "Emotional cinematic edit with music synchronization, atmosphere and detailed sound design.",
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
    revisions: "1 Free Revision per video based on feedback",
    driveLink:
      "https://drive.google.com/file/d/1Y97S6qk9JqmONHOk-BQcj1XO1piaa0KT/view?usp=drive_link",
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
    driveLink:
      "https://drive.google.com/file/d/1WtLRXTR_r5RQPndULSfyAwIqst8j7YYX/view?usp=drive_link",
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
    driveLink:
      "https://drive.google.com/file/d/19usAUA3dCWM4rYtLkX557m793uyGFLnW/view?usp=drive_link",
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
    quote:
      "Lil transformed our raw footage into high-retention commercial reels. The pacing, audio sync, and pop-up subtitles significantly boosted our engagement.",
    client: "Ahmed Abdelkareem",
    role: "Content Creator & Entrepreneur",
    rating: "★★★★★",
  },
  {
    quote:
      "Exceptional turnaround and aesthetic sense. He understands video storytelling deeply, delivering flawless color grading and slick pacing without endless revisions.",
    client: "Sameh Othman",
    role: "Business Consultant",
    rating: "★★★★★",
  },
  {
    quote:
      "The retention on our educational campaigns jumped noticeably after hiring Lil. The edits are razor sharp and the communication is clear and professional.",
    client: "Rania",
    role: "E-Learning Academy Lead",
    rating: "★★★★★",
  },
  {
    quote:
      "Reliable, creative, and fast. His sound design and B-roll selection gave our commercial launches a truly cinematic presence.",
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

// --- MARQUEE CARD ---

function MarqueeCard({
  item,
}: {
  item: (typeof marqueeItems)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => item.video && setIsHovered(true)}
      onMouseLeave={() => item.video && setIsHovered(false)}
      className="w-[240px] h-[340px] sm:w-[280px] sm:h-[390px] rounded-3xl border border-white/10 bg-[#141414] overflow-hidden shrink-0 shadow-xl group relative cursor-pointer"
    >
      {isHovered && item.video ? (
        <video
          src={item.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5 pointer-events-none">
        <span className="text-[11px] uppercase tracking-widest text-[#B600A8] font-bold">
          {item.category}
          {item.video && !isHovered ? " • Hover to Preview" : ""}
        </span>

        <h4 className="text-white font-semibold text-base truncate mt-1">
          {item.title}
        </h4>
      </div>

      {item.video && (
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-xs">
          ▶
        </div>
      )}
    </div>
  );
}

// --- VIDEO CARD (لقطة تلقائية من منتصف الفيديو لمنع الشاشة السوداء + نسبة ريلز 9:16) ---

function VideoCard({
  item,
  index,
  onOpen,
}: {
  item: (typeof videosData)[0];
  index: number;
  onOpen: (item: (typeof videosData)[0]) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const midPointRef = useRef<number>(1);

  // التقاط لقطة حية من 35% من مدة الفيديو لمنع الشاشة السوداء في البداية
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const midTime = videoRef.current.duration > 2 ? videoRef.current.duration * 0.35 : 1;
      midPointRef.current = midTime;
      videoRef.current.currentTime = midTime;
    }
  };

  const handleEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = midPointRef.current; // يعود للقطة الحية الجذابة
    }
  };

  return (
    <FadeIn delay={index * 0.05}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="bg-[#141414] border border-white/10 rounded-[28px] sm:rounded-[32px] overflow-hidden p-3 sm:p-3.5 shadow-2xl flex flex-col justify-between h-full group hover:border-[#B600A8]/50"
      >
        {/* نسبة العرض موحدة 9:16 دائماً لجميع الكروت كحجم ريلز حقيقي */}
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onClick={() => onOpen(item)}
          className="rounded-[20px] sm:rounded-[24px] overflow-hidden aspect-[9/16] w-full bg-black relative cursor-pointer"
        >
          {/* الفيديو نفسه يعمل كـ Thumbnail أصلي يلتقط فريم جذاب من وسطه */}
          <video
            ref={videoRef}
            src={item.src}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover"
          />

          <div
            className={`absolute inset-0 transition-all duration-300 flex items-center justify-center pointer-events-none ${
              isHovered ? "bg-black/10" : "bg-black/30"
            }`}
          >
            <motion.span
              whileHover={{ scale: 1.12 }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#B600A8]/90 text-white flex items-center justify-center text-lg sm:text-xl shadow-[0_0_30px_rgba(182,0,168,0.35)] backdrop-blur-md"
            >
              ▶
            </motion.span>
          </div>

          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 pointer-events-none">
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-white">
              {item.tab}
            </span>
          </div>

          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 pointer-events-none">
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] uppercase tracking-wider text-white/80">
              Click to watch
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#B600A8] font-bold">
              {item.category}
            </span>

            <h3 className="text-white font-semibold text-base sm:text-lg mt-0.5 sm:mt-1 leading-snug">
              {item.title}
            </h3>
          </div>

          <button
            onClick={() => onOpen(item)}
            className="shrink-0 text-[11px] sm:text-xs uppercase font-bold text-white/50 hover:text-[#B600A8] transition-colors pt-1"
          >
            Expand ↗
          </button>
        </div>
      </motion.div>
    </FadeIn>
  );
}

// --- MAIN COMPONENT ---

export default function Home() {
  const [currencyMode, setCurrencyMode] = useState<"ALL" | "USD" | "EGP">("ALL");
  const [selectedVideoTab, setSelectedVideoTab] = useState<"all" | "reels" | "commercial" | "cinematic">("all");
  const [isVideoMenuOpen, setIsVideoMenuOpen] = useState(true);
  const [isThumbnailsMenuOpen, setIsThumbnailsMenuOpen] = useState(false);
  const [activeModalVideo, setActiveModalVideo] = useState<(typeof videosData)[0] | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [typedText, setTypedText] = useState("");
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalMuted, setIsModalMuted] = useState(false);

  // Typewriter
  useEffect(() => {
    const fullText = "Hi, i'm Lil";
    let index = 0;

    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;

      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Scroll + Mouse
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      if (!marqueeRef.current) return;

      const rect = marqueeRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const closeModal = useCallback(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setActiveModalVideo(null);
    setIsFullscreen(false);
  }, []);

  const openModal = useCallback((video: (typeof videosData)[0]) => {
    setActiveModalVideo(video);
    setIsPlaying(true);
  }, []);

  const currentVideoIndex = activeModalVideo
    ? videosData.findIndex((video) => video.id === activeModalVideo.id)
    : -1;

  const goNext = useCallback(() => {
    if (currentVideoIndex === -1) return;
    const nextIndex = (currentVideoIndex + 1) % videosData.length;
    setActiveModalVideo(videosData[nextIndex]);
    setIsPlaying(true);
  }, [currentVideoIndex]);

  const goPrevious = useCallback(() => {
    if (currentVideoIndex === -1) return;
    const previousIndex = (currentVideoIndex - 1 + videosData.length) % videosData.length;
    setActiveModalVideo(videosData[previousIndex]);
    setIsPlaying(true);
  }, [currentVideoIndex]);

  // Modal ESC & Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalVideo) return;

      if (e.key === "Escape") {
        closeModal();
      }
      if (e.key === "ArrowRight") {
        goNext();
      }
      if (e.key === "ArrowLeft") {
        goPrevious();
      }
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
      if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalVideo, closeModal, goNext, goPrevious]);

  useEffect(() => {
    if (activeModalVideo && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      const playPromise = modalVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (modalVideoRef.current) {
            modalVideoRef.current.muted = true;
            setIsModalMuted(true);
            modalVideoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [activeModalVideo]);

  const toggleSound = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsModalMuted(modalVideoRef.current.muted);
  };

  const toggleFullscreen = async () => {
    try {
      if (!modalVideoRef.current) return;

      if (!document.fullscreenElement) {
        await modalVideoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen(false);
    }
  };

  const filteredVideos = useMemo(() => {
    if (selectedVideoTab === "all") {
      return videosData;
    }
    return videosData.filter((video) => video.tab === selectedVideoTab);
  }, [selectedVideoTab]);

  const tripleMarqueeItems = [
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      dir="ltr"
      className="relative w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] selection:bg-[#B600A8] selection:text-white"
    >
      {/* MOUSE GLOW */}
      <div
        className="pointer-events-none fixed z-50 w-[420px] h-[420px] rounded-full blur-[130px] opacity-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 hidden md:block"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background:
            "radial-gradient(circle, #B600A8 0%, #7621B0 60%, transparent 80%)",
        }}
      />

      {/* VIDEO THEATER MODE - موحد بالكامل كشاشة ريلز رأسية */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6"
          >
            {/* الشريط العلوي */}
            <div className="absolute top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 z-[130] flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto">
                <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-[10px] sm:text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                  {currentVideoIndex + 1} / {videosData.length}
                </span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSound();
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-white text-xs font-bold hover:bg-[#B600A8] transition-all flex items-center gap-1.5"
                >
                  {isModalMuted ? "🔇 UNMUTE" : "🔊 MUTE"}
                </button>

                <button
                  onClick={closeModal}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-white flex items-center justify-center text-lg hover:bg-[#B600A8] transition-all"
                  aria-label="Close video"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* أزرار التنقل */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrevious();
              }}
              className="absolute left-2 sm:left-6 z-[120] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl text-white flex items-center justify-center text-xl hover:bg-[#B600A8] transition-all"
              aria-label="Previous video"
            >
              ←
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 sm:right-6 z-[120] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl text-white flex items-center justify-center text-xl hover:bg-[#B600A8] transition-all"
              aria-label="Next video"
            >
              →
            </button>

            {/* حاوية الفيديو موحدة كشاشة ريلز رأسية 9:16 لكافة الفيديوهات */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[380px] sm:max-w-sm h-[84dvh] sm:h-[88vh] aspect-[9/16] bg-black rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 shadow-[0_0_60px_rgba(182,0,168,0.25)]"
            >
              <video
                key={activeModalVideo.id}
                ref={modalVideoRef}
                src={activeModalVideo.src}
                autoPlay
                controls
                playsInline
                loop
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover bg-black"
              />

              <div className="absolute left-0 right-0 bottom-0 pointer-events-none p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="max-w-2xl">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#B600A8] font-bold">
                    {activeModalVideo.category}
                  </span>

                  <h3 className="text-white font-bold text-base sm:text-xl mt-0.5 leading-snug">
                    {activeModalVideo.title}
                  </h3>

                  <p className="hidden sm:block text-white/60 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                    {activeModalVideo.description}
                  </p>
                </div>
              </div>

              <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
                <div className="flex gap-2 pointer-events-auto">
                  <button
                    onClick={() => {
                      if (!modalVideoRef.current) return;
                      if (modalVideoRef.current.paused) {
                        modalVideoRef.current.play().catch(() => {});
                        setIsPlaying(true);
                      } else {
                        modalVideoRef.current.pause();
                        setIsPlaying(false);
                      }
                    }}
                    className="w-10 h-10 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#B600A8] transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? "Ⅱ" : "▶"}
                  </button>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#B600A8] transition-colors"
                  aria-label="Fullscreen"
                >
                  ⛶
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] pb-8">
        <FadeIn delay={0} y={-20} className="w-full z-30">
          <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-sm md:text-base font-medium tracking-wider uppercase gap-6">
            <div className="flex gap-5 sm:gap-8 items-center flex-wrap">
              <a href="#about" className="hover:text-[#B600A8] transition-colors">About</a>
              <a href="#videos" className="hover:text-[#B600A8] transition-colors">Videos</a>
              <a href="#price" className="hover:text-[#B600A8] transition-colors">Pricing</a>
              <a href="#reviews" className="hover:text-[#B600A8] transition-colors">Reviews</a>
              <a href="#thumbnails" className="hover:text-[#B600A8] transition-colors">Thumbnails</a>
              <a href="#services" className="hover:text-[#B600A8] transition-colors">Services</a>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://www.instagram.com/ebrahimfadel_8/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all duration-300"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://www.facebook.com/EbrahimFadel8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all duration-300"
              >
                <FacebookIcon />
              </a>

              <a
                href="https://wa.me/201211871199"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300"
              >
                <WhatsAppIcon />
              </a>

              <a
                href="mailto:ebrahimfadel8903@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all duration-300"
              >
                <MailIcon />
              </a>
            </div>
          </nav>
        </FadeIn>

        <div className="overflow-hidden w-full select-none my-auto">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[15vw] sm:text-[16vw] md:text-[18vw] inline-flex items-center justify-center">
              <span>{typedText}</span>
              <span className="text-[#B600A8] animate-pulse ml-2 font-light">|</span>
            </h1>
          </FadeIn>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-10 bottom-16 sm:bottom-10 pointer-events-auto">
          <FadeIn delay={0.4} y={30}>
            <Magnet padding={150} strength={3}>
              <img
                src="/images/avatar.png"
                alt="Lil Portrait"
                className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] object-contain select-none pointer-events-none drop-shadow-2xl"
              />
            </Magnet>
          </FadeIn>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end px-6 md:px-10 gap-6 z-20 mt-12 sm:mt-0">
          <FadeIn delay={0.3} y={20}>
            <p className="text-[#D7E2EA] font-light leading-snug max-w-[280px] text-center sm:text-start text-xs sm:text-sm md:text-base opacity-80 uppercase tracking-wide">
              Senior video editor shaping memorable visual stories
            </p>
          </FadeIn>

          <FadeIn delay={0.4} y={20} className="flex gap-3 items-center">
            <a
              href="#videos"
              className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 text-xs sm:text-sm hover:bg-white/10 transition-colors"
            >
              Watch Videos
            </a>

            <a
              href="#contact"
              className="rounded-full uppercase tracking-widest font-semibold text-white px-7 py-3 text-xs sm:text-sm transition-transform duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                boxShadow:
                  "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
                outline: "2px solid #FFFFFF",
                outlineOffset: "-3px",
              }}
            >
              Get in touch
            </a>
          </FadeIn>
        </div>
      </section>

      {/* MARQUEE */}
      <section
        ref={marqueeRef}
        className="bg-[#0C0C0C] pt-16 pb-12 overflow-hidden flex flex-col gap-4 border-y border-white/5"
      >
        <div
          className="flex gap-4 whitespace-nowrap"
          style={{
            transform: `translateX(${scrollOffset - 150}px)`,
            willChange: "transform",
          }}
        >
          {tripleMarqueeItems.map((item, i) => (
            <MarqueeCard key={i} item={item} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12 bg-[#0C0C0C]">
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
            <FadeIn delay={0.1} className="md:col-span-7 bg-[#141414] border border-white/10 rounded-[32px] p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Hey, I&apos;m Lil — Senior Video Editor
              </h3>

              <p className="text-[#D7E2EA]/80 leading-relaxed text-base sm:text-lg mb-6">
                Specialized in building high-retention visual assets that captivate audiences. With extensive experience across Adobe Premiere Pro, After Effects, and DaVinci Resolve, I bridge the gap between creative storytelling, surgical audio design, and conversion-driven marketing.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center mb-8">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">4+</div>
                  <div className="text-[11px] sm:text-xs text-[#D7E2EA]/60 uppercase tracking-wider mt-1">Years Experience</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">350+</div>
                  <div className="text-[11px] sm:text-xs text-[#D7E2EA]/60 uppercase tracking-wider mt-1">Videos Delivered</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">+45%</div>
                  <div className="text-[11px] sm:text-xs text-[#D7E2EA]/60 uppercase tracking-wider mt-1">Retention Growth</div>
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
                      className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center text-center hover:border-[#B600A8]/60 transition-colors"
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

            <FadeIn delay={0.2} className="md:col-span-5 bg-[#141414] border border-white/10 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between h-full">
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
                <a
                  href="#contact"
                  className="block text-center w-full py-3 rounded-full bg-white/10 hover:bg-[#B600A8] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Book Your Project
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FEATURED VIDEOS */}
      <section
        id="videos"
        className="py-20 sm:py-24 px-4 sm:px-8 md:px-12 bg-[#0C0C0C] border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0} y={30} className="text-center mb-8">
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

              <p className="text-[#D7E2EA]/60 text-xs sm:text-sm mt-2 tracking-wider">
                {isVideoMenuOpen
                  ? "Click any video to open Theater Mode • Hover to preview"
                  : "Click to reveal featured video reels & commercial campaigns"}
              </p>

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
                        className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 border ${
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

          <AnimatePresence mode="wait">
            {isVideoMenuOpen && (
              <motion.div
                key={selectedVideoTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12"
              >
                {filteredVideos.map((item, idx) => (
                  <VideoCard
                    key={item.id}
                    item={item}
                    index={idx}
                    onOpen={openModal}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* PRICING */}
      <section id="price" className="py-24 px-5 sm:px-8 md:px-12 bg-[#0C0C0C]">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0} y={30} className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
              Video Editing Packages & Rates
            </span>

            <h2 className="hero-heading font-black uppercase text-4xl sm:text-6xl md:text-7xl mt-2">
              Rates & Packages
            </h2>

            <p className="text-[#D7E2EA]/60 max-w-xl mx-auto mt-3 text-sm sm:text-base">
              Transparent video production rates in USD and EGP with milestone delivery
            </p>
          </FadeIn>

          <FadeIn delay={0.1} y={20} className="flex justify-center mb-16">
            <div className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10">
              <button
                onClick={() => setCurrencyMode("ALL")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currencyMode === "ALL"
                    ? "bg-[#B600A8] text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                USD & EGP
              </button>

              <button
                onClick={() => setCurrencyMode("USD")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currencyMode === "USD"
                    ? "bg-[#B600A8] text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                USD ($)
              </button>

              <button
                onClick={() => setCurrencyMode("EGP")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currencyMode === "EGP"
                    ? "bg-[#B600A8] text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EGP (ج.م)
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
            {packagesData.map((pkg, idx) => {
              const selectedPriceText =
                currencyMode === "USD"
                  ? pkg.priceUSD
                  : currencyMode === "EGP"
                  ? pkg.priceEGP
                  : `${pkg.priceUSD} / ${pkg.priceEGP}`;

              const whatsappPreFilledLink = `https://wa.me/201211871199?text=${encodeURIComponent(
                `Hey Lil! I want to book the "${pkg.name}" package (${selectedPriceText} per video). Let's discuss the project details.`
              )}`;

              return (
                <FadeIn key={pkg.id} delay={idx * 0.15} className="flex">
                  <div
                    className={`w-full rounded-[36px] p-8 flex flex-col justify-between transition-all duration-300 relative ${
                      pkg.featured
                        ? "bg-gradient-to-b from-[#18011F] to-[#121212] border-2 border-[#B600A8] shadow-[0_0_40px_rgba(182,0,168,0.25)]"
                        : "bg-[#141414] border border-white/10 hover:border-white/20"
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
                          <p className="text-[#D7E2EA]/70 text-sm mt-1">{pkg.arabicName}</p>
                        </div>
                        <span className="font-mono text-white/30 text-lg font-bold">{pkg.id}</span>
                      </div>

                      <div className="my-6 pb-6 border-b border-white/10">
                        {currencyMode === "ALL" && (
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl sm:text-5xl font-black text-white">{pkg.priceUSD}</span>
                              <span className="text-sm uppercase tracking-wider text-[#D7E2EA]/60 font-medium">/ Video</span>
                            </div>
                            <div className="text-sm text-[#B600A8] font-bold mt-1">
                              ≈ {pkg.priceEGP} / Video
                            </div>
                          </div>
                        )}

                        {currencyMode === "USD" && (
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl sm:text-5xl font-black text-white">{pkg.priceUSD}</span>
                            <span className="text-sm uppercase tracking-wider text-[#D7E2EA]/60 font-medium">/ Video</span>
                          </div>
                        )}

                        {currencyMode === "EGP" && (
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl sm:text-5xl font-black text-white">{pkg.priceEGP}</span>
                            <span className="text-sm uppercase tracking-wider text-[#D7E2EA]/60 font-medium">/ Video</span>
                          </div>
                        )}
                      </div>

                      <ul className="space-y-4 mb-8">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[#D7E2EA]/80 leading-relaxed">
                            <span className="text-[#B600A8] text-base mt-0.5 inline-block animate-spin [animation-duration:4s] select-none">✦</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                      <p className="text-xs text-[#D7E2EA]/50 text-center font-medium">{pkg.revisions}</p>
                      <a
                        href={pkg.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-2.5 rounded-full border border-[#B600A8]/60 hover:bg-[#B600A8]/20 text-xs uppercase font-bold tracking-wider text-[#D7E2EA] transition-colors"
                      >
                        ▶ Watch Video Sample
                      </a>

                      <a
                        href={whatsappPreFilledLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full text-center rounded-full uppercase tracking-widest font-semibold py-3.5 text-sm transition-all duration-300 ${
                          pkg.featured
                            ? "bg-[#B600A8] hover:bg-[#9d0091] text-white shadow-lg shadow-[#B600A8]/30"
                            : "border border-white/20 hover:bg-white/10 text-white"
                        }`}
                      >
                        Order via WhatsApp
                      </a>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.2} y={30}>
            <div className="rounded-[36px] bg-[#121212] border border-white/10 p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[#B600A8] text-xl">✦</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">General Terms & Production Flow</h3>
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
                    <p className="text-sm text-[#D7E2EA]/70 leading-relaxed">{term.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 md:px-12 bg-[#0F0F0F] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0} y={30} className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">Testimonials</span>
            <h2 className="hero-heading font-black uppercase text-4xl sm:text-6xl md:text-7xl mt-2">Client Messages</h2>
            <p className="text-[#D7E2EA]/60 max-w-xl mx-auto mt-3 text-sm sm:text-base">
              Feedback from creators, entrepreneurs, and agencies I collaborate with
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {clientReviews.map((rev, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="p-8 rounded-[32px] bg-[#141414] border border-white/10 flex flex-col justify-between h-full hover:border-[#B600A8]/40 transition-colors">
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B600A8] to-[#7621B0] flex items-center justify-center font-bold text-white text-sm">
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

      {/* THUMBNAILS */}
      <section id="thumbnails" className="py-24 px-5 sm:px-8 md:px-12 bg-[#0C0C0C]">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0} y={30} className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
              Graphic Covers & Visuals
            </span>

            <div className="relative inline-block mt-3">
              <button
                onClick={() => setIsThumbnailsMenuOpen(!isThumbnailsMenuOpen)}
                className="group inline-flex items-center gap-3 sm:gap-4 hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl hover:opacity-90 transition-all cursor-pointer select-none"
              >
                <span>Thumbnails & Posters</span>
                <span
                  className={`text-2xl sm:text-4xl text-[#B600A8] transition-transform duration-300 ${
                    isThumbnailsMenuOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>

              <p className="text-[#D7E2EA]/60 text-xs sm:text-sm mt-2 tracking-wider">
                {isThumbnailsMenuOpen
                  ? "Click title to collapse gallery"
                  : "Click to reveal high-CTR YouTube covers and commercial posters"}
              </p>
            </div>
          </FadeIn>

          <AnimatePresence>
            {isThumbnailsMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12"
              >
                {thumbnailsData.map((thumb, index) => (
                  <FadeIn key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="bg-[#121212] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl group hover:border-[#B600A8]/50 transition-colors duration-300"
                    >
                      <div className="w-full aspect-[4/5] overflow-hidden bg-black/50">
                        <img
                          src={thumb.src}
                          alt={thumb.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-5 flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-widest text-[#B600A8] font-medium">{thumb.category}</span>
                        <h3 className="text-[#D7E2EA] font-semibold text-lg sm:text-xl">{thumb.title}</h3>
                      </div>
                    </motion.div>
                  </FadeIn>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SERVICES */}
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
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[rgba(12,12,12,0.15)] py-8 sm:py-10 gap-4 sm:gap-10"
                >
                  <span className="font-black text-[#0C0C0C] text-5xl sm:text-7xl leading-none shrink-0">
                    {item.num}
                  </span>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold uppercase text-xl sm:text-2xl text-[#0C0C0C]">{item.name}</h3>
                    <p className="font-normal leading-relaxed max-w-2xl text-[#0C0C0C]/70 text-sm sm:text-base">{item.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 text-center bg-[#0C0C0C] border-t border-white/10">
        <FadeIn delay={0} y={30} className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B600A8] font-bold">
            Available for new projects
          </span>

          <h2 className="hero-heading font-black uppercase text-4xl sm:text-6xl mb-4 mt-3">
            Let&apos;s Create Together
          </h2>

          <p className="text-[#D7E2EA]/70 mb-10 max-w-xl mx-auto text-sm sm:text-base">
            Available for commercial campaigns, ongoing reels retainers, and high-retention video post-production.
          </p>

          <div className="flex justify-center items-center gap-4 mb-10">
            <a
              href="https://www.instagram.com/ebrahimfadel_8/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all duration-300 hover:scale-110"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://www.facebook.com/EbrahimFadel8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all duration-300 hover:scale-110"
            >
              <FacebookIcon />
            </a>

            <a
              href="https://wa.me/201211871199"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 hover:scale-110"
            >
              <WhatsAppIcon />
            </a>

            <a
              href="mailto:ebrahimfadel8903@gmail.com"
              aria-label="Email"
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#B600A8] hover:bg-[#B600A8]/20 transition-all duration-300 hover:scale-110"
            >
              <MailIcon />
            </a>
          </div>

          <a
            href="https://wa.me/201211871199?text=Hey%20Lil!%20I%20want%20to%20start%20a%20video%20editing%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#B600A8] hover:bg-[#9d0091] text-white uppercase tracking-widest text-xs font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(182,0,168,0.25)]"
          >
            Start a Project
            <span>→</span>
          </a>

          <div className="text-xs text-white/40 mt-10">
            © 2026 Lil. All rights reserved.
          </div>
        </FadeIn>
      </section>

      {/* SCROLL TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#141414] border border-white/20 text-[#B600A8] hover:bg-[#B600A8] hover:text-white hover:border-[#B600A8] shadow-2xl flex items-center justify-center font-black transition-all duration-300"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}