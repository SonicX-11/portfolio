"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

// --- SOCIAL ICONS ---
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

// --- DATA REPOSITORY ---
const softwareStack = [
  { name: "Premiere Pro", tag: "Cutting & Story Flow", icon: "Pr" },
  { name: "After Effects", tag: "Kinetic Motion & Graphics", icon: "Ae" },
  { name: "DaVinci Resolve", tag: "Color Mastery & Balancing", icon: "Da" },
  { name: "Photoshop", tag: "High-CTR Graphic Covers", icon: "Ps" },
];

const processSteps = [
  { num: "01", title: "Creative Brief & Strategy", arabic: "الاتفاق وفهم فكرة الفيديو", desc: "دراسة الفكرة، الجمهور المستهدف، وإيقاع التقطيع المناسب لرفع نسبة التفاعل." },
  { num: "02", title: "Footage Intake & Media Selects", arabic: "رفع الماتريال والفرز السريع", desc: "استلام الماتريال الخام بجودتها الأصلية وفرز اللقطات الأقوى لبناء القصة." },
  { num: "03", title: "Cutting, Hooks & Multi-Layer Foley", arabic: "المونتاج، التقطيع والمؤثرات", desc: "تقطيع ديناميكي، خطاف بصري أول 3 ثوانٍ، نصوص حركية، ومؤثرات صوتية غامرة." },
  { num: "04", title: "Refinements & Frame-Accurate Notes", arabic: "المراجعة والتعديلات السريعة", desc: "ضبط سرعة الكلام ونقاط التأثير وتناسق الموسيقى طبقاً لملاحظاتك الدقيقة." },
  { num: "05", title: "Final 4K Master Delivery", arabic: "التسليم النهائي بأعلى جودة", desc: "تصدير الملفات بأعلى Bitrate ودقة 4K جاهزة للانتشار الفوري على Reels وTikTok وYouTube." },
];

const videosData = [
  { id: "reel-1", title: "High-Retention Commercial Reel #1", category: "Commercial Cut", tab: "reels", src: "/video/1.mp4", description: "إيقاع سريع وتصميم صوتي موجه لرفع معدل المشاهدة للنهاية." },
  { id: "reel-2", title: "Business Growth Reel #2", category: "Pop-Up Subtitles", tab: "reels", src: "/video/2.mp4", description: "فيديو بيزنس بنصوص متحركة وتركيز بصري على المعلومات الأساسية." },
  { id: "reel-3", title: "Dynamic Hook Cut #3", category: "Fast Paced", tab: "reels", src: "/video/3.mp4", description: "بداية خاطفة وانتقالات مدروسة لجذب المتابع من أول 3 ثوانٍ." },
  { id: "reel-4", title: "Viral Engagement Reel #4", category: "Retention First", tab: "reels", src: "/video/4.mp4", description: "تقطيع معتمد على الموسيقى مع زوومات سريعة ومؤثرات صوتية دقيقة." },
  { id: "reel-5", title: "Brand Storytelling #5", category: "Commercial Reel", tab: "reels", src: "/video/5.mp4", description: "سرد بصري للعلامة التجارية يجمع بين المونتاج النظيف والرسالة القوية." },
  { id: "reel-12", title: "Social Media Hook #12", category: "Short Form", tab: "reels", src: "/video/12.mp4", description: "ريل مصمم لمنصات تيك توك وإنستجرام للحفاظ على وتيرة التفاعل." },
  { id: "man-u", title: "Manchester United Highlight Cut", category: "Sports Narrative", tab: "commercial", src: "/video/Man-U.mp4", description: "مونتاج رياضي حماسي مع تزامن كامل بين حركة اللعب والإيقاع الموسيقي." },
  { id: "mb22", title: "Commercial Hardware Showcase", category: "Brand Promo", tab: "commercial", src: "/video/Mb22.mp4", description: "عرض تجاري لمنتج يركز على إبراز التفاصيل والقطع الديناميكي." },
  { id: "color", title: "Color Grading Showcase", category: "Color Dev", tab: "commercial", src: "/video/Color.mp4", description: "استعراض تصحيح وتدريج الألوان وإبراز التباين ونضارة ألوان البشرة." },
  { id: "the-odyssey", title: "The Odyssey Cinematic Master", category: "Cinematic Cut", tab: "cinematic", src: "/video/The-Odyssey.mp4", description: "مونتاج سينمائي قائم على الأجواء الصوتية وتدريج المشاعر في القصة." },
  { id: "habib-ayamy", title: "Habib Ayamy Aesthetic", category: "Atmosphere Edit", tab: "cinematic", src: "/video/Habib-Ayamy.mp4", description: "عمل فني يعتمد على التناغم بين الموسيقى، زوايا الكاميرا، والهدوء البصري." },
];

const thumbnailsData = [
  { title: "Bruno Fernandes - The King", category: "Sports Poster", src: "/images/thumbnails/thumb-1.png" },
  { title: "Business Budgeting Strategy", category: "Finance Cover", src: "/images/thumbnails/thumb-2.png" },
  { title: "EdTech Agency Growth", category: "Case Study Cover", src: "/images/thumbnails/thumb-3.png" },
  { title: "US Company Setup", category: "Educational Art", src: "/images/thumbnails/thumb-4.png" },
  { title: "Gigabyte B840M Eagle", category: "Hardware Commercial", src: "/images/thumbnails/thumb-5.png" },
  { title: "Manchester United | Bruno", category: "Social Graphic", src: "/images/thumbnails/thumb-6.png" },
];

const packagesData = [
  {
    id: "01",
    name: "The Spark Pack",
    arabicName: "مونتاج سريع وسلس",
    priceUSD: "$10",
    priceEGP: "500 EGP",
    featured: false,
    revisions: "تعديل مجاني واحد لكل فيديو",
    driveLink: "https://drive.google.com/file/d/1Y97S6qk9JqmONHOk-BQcj1XO1piaa0KT/view?usp=drive_link",
    features: [
      "تقطيع احترافي يزيل الوقفات واللحظات الميتة لضمان استمرار المشاهدة",
      "نصوص واضحة وسريعة متناسقة مع طبقة الصوت ونبرة المتحدث",
      "تصحيح ألوان أساسي وموازنة صوتية للموسيقى الخلفية",
    ],
  },
  {
    id: "02",
    name: "The Viral Growth",
    arabicName: "ريلز ذات تفاعل واحتفاظ عالي",
    priceUSD: "$17",
    priceEGP: "850 EGP",
    featured: true,
    revisions: "حتى جولتين من التعديلات لكل فيديو",
    driveLink: "https://drive.google.com/file/d/1WtLRXTR_r5RQPndULSfyAwIqst8j7YYX/view?usp=drive_link",
    features: [
      "إيقاع محسوب لرفع نسبة إكمال الفيديو (Completion Rate)",
      "نصوص حركية منبثقة (Pop-up Subtitles) متزامنة مع نبرة الكلام",
      "مؤثرات بصرية وزوومات سريعة وطبقات Foley FX صوتية متقنة",
      "دمج لقطات B-roll سينمائية وسياقية داعمة للموضوع",
    ],
  },
  {
    id: "03",
    name: "Cinematic Prime",
    arabicName: "مونتاج سينمائي وتجاري للبراندات",
    priceUSD: "$24",
    priceEGP: "1,200 EGP",
    featured: false,
    revisions: "حتى 3 جولات تعديل شاملة",
    driveLink: "https://drive.google.com/file/d/19usAUA3dCWM4rYtLkX557m793uyGFLnW/view?usp=drive_link",
    features: [
      "سرد بصري متقدم مخصص لحملات الشركات وصناع المحتوى المحترفين",
      "ملاءمة الهوية البصرية للعلامة التجارية (Typography & Colors)",
      "تدريج ألوان سينمائي متكامل (DaVinci Resolve)",
      "هندسة صوتية شاملة ومؤثرات سينمائية غامرة",
    ],
  },
];

const generalTerms = [
  { title: "الدفع وجدولة المشروع", desc: "دفعة مقدمة 25% لبدء العمل، والمتبقي 75% بعد الاعتماد النهائي وقبل تسليم الملفات الأصلية بدون علامة مائية." },
  { title: "مدة الفيديو القصير", desc: "الأسعار الموضحة تنطبق على الفيديوهات القصيرة (Reels / TikTok / Shorts) بمدة تصل إلى 60 ثانية." },
  { title: "التسليم على دفعات", desc: "يتم تسليم باقات الفيديوهات في جداول زمنية محددة مسبقاً لضمان التدقيق الفني والإخراجي." },
  { title: "سياسة التعديلات", desc: "تلتزم كل باقة بعدد التعديلات الموضح، وتتم أي تعديلات جذرية إضافية خارج الاسكوب باتفاق مسبق مرن." },
  { title: "تسليم الماتريال الخام", desc: "يُفضل إرسال المواد المصورة بكامل جودتها الأصلية منظمة داخل مجلد Google Drive أو WeTransfer." },
];

export default function DynamicPortfolio() {
  const [currencyMode, setCurrencyMode] = useState<"ALL" | "USD" | "EGP">("ALL");
  const [selectedVideoTab, setSelectedVideoTab] = useState<"all" | "reels" | "commercial" | "cinematic">("all");
  const [activeModalVideo, setActiveModalVideo] = useState<(typeof videosData)[0] | null>(null);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "video" | "button">("default");
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // --- DYNAMIC SPOTLIGHT & MORPHING CURSOR ---
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 450, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Modal navigation
  const currentVideoIndex = activeModalVideo ? videosData.findIndex((v) => v.id === activeModalVideo.id) : -1;

  const closeModal = useCallback(() => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setActiveModalVideo(null);
  }, []);

  const openModal = useCallback((video: (typeof videosData)[0]) => {
    setActiveModalVideo(video);
  }, []);

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

  const filteredVideos = useMemo(() => {
    if (selectedVideoTab === "all") return videosData;
    return videosData.filter((v) => v.tab === selectedVideoTab);
  }, [selectedVideoTab]);

  return (
    <div className="bg-[#090705] text-[#eee7df] min-h-screen relative overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* 1. DYNAMIC BACKGROUND MOUSE SPOTLIGHT (هالة ضوئية تفاعلية ناعمة تتبع الماوس) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-60"
        style={{
          background: `radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(220, 180, 130, 0.045), transparent 80%)`,
        }}
      />

      {/* 2. CONTEXTUAL MORPHING CURSOR (ماوس ذكي يتفاعل مع العناصر) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] hidden lg:flex items-center justify-center font-mono font-bold uppercase"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: cursorVariant === "video" ? "-50%" : "-8px",
          translateY: cursorVariant === "video" ? "-50%" : "-8px",
        }}
      >
        {cursorVariant === "video" ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center gap-1.5 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span>{cursorText || "PLAY"}</span>
          </motion.div>
        ) : cursorVariant === "button" ? (
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1.6 }}
            className="w-5 h-5 rounded-full bg-white/20 border border-white/60 backdrop-blur-sm"
          />
        ) : (
          <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] border border-black" />
        )}
      </motion.div>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[100dvh] min-h-[620px] flex flex-col justify-between p-6 sm:p-12 border-b border-white/[0.08] overflow-hidden z-10">
        
        {/* خلفية فيديو سينمائية هادئة مع قناع إضاءة */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <video
            src="/video/The-Odyssey.mp4"
            muted
            loop
            autoPlay
            playsInline
            className="w-full h-full object-cover grayscale contrast-125 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_45%,black_20%,transparent_90%)]"
          />
        </div>

        {/* الشريط العلوي */}
        <header className="relative z-20 flex justify-between items-center text-xs font-mono uppercase tracking-wider text-white/80">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full text-white/90">
              Lil Studio
            </span>
            <span className="hidden sm:inline text-white/40">Editorial & Post-Production</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWorkflowOpen(true)}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
              className="px-4 py-1.5 bg-white text-black font-semibold text-xs tracking-tight hover:bg-white/90 transition-all rounded-full shadow-sm"
            >
              Workflow Pipeline ↗
            </button>
            <a
              href="https://wa.me/201211871199"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
              className="px-4 py-1.5 border border-white/20 rounded-full hover:border-white text-xs transition-all hover:bg-white/5"
            >
              WhatsApp
            </a>
          </div>
        </header>

        {/* شريط المهارات الحي */}
        <div className="relative z-20 my-auto">
          <div className="flex justify-between items-center text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/60 pb-3">
            <span>[01] High-Retention Pacing</span>
            <span className="hidden md:inline">[02] Kinetic Typography & Hooks</span>
            <span>[03] Sound Foley & Color Grading</span>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* هيدر سينمائي ضخم ومتحرك */}
        <div className="relative z-20">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-white/50 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Available for Select Projects
          </div>

          <h1 className="text-[13vw] sm:text-[14.5vw] font-black uppercase tracking-[-0.07em] leading-[0.82] text-white select-none">
            CRAFTWORK
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-6 pt-4 border-t border-white/[0.08] gap-4">
            <p className="max-w-md text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              صياغة محتوى بصري عالي الاحتفاظ؛ نجمع بين الإيقاع السريع، التصميم الصوتي ثلاثي الأبعاد، والهندسة اللونية لدفع التفاعل إلى أقصاه.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono uppercase">
              <a
                href="#videos"
                className="text-white border-b border-white hover:text-white/70 transition-colors pb-0.5"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                شاهد الأعمال ({videosData.length}) ↓
              </a>
              <span className="text-white/30">/</span>
              <a
                href="#pricing"
                className="text-white/60 hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                الباقات والأسعار
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- إحصائيات سريعة بنظام Glass Cards --- */}
      <section className="border-b border-white/[0.08] bg-[#0c0906]/60 backdrop-blur-xl py-8 px-6 sm:px-12 relative z-10 font-mono">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "4+", label: "Years Experience" },
            { num: "350+", label: "Master Delivered" },
            { num: "20+", label: "Brands & Creators" },
            { num: "45%", label: "Avg. Retention Lift" },
          ].map((stat, i) => (
            <div key={i} className="border-l border-white/10 pl-4">
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{stat.num}</div>
              <div className="text-[10px] uppercase text-white/40 tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- أَرشيف الفيديوهات التفاعلي الديناميكي --- */}
      <section id="videos" className="py-24 px-6 sm:px-12 border-b border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header + Fluid Sliding Tabs */}
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 block mb-2">[Interactive Reel]</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                الأعمال المختارة
              </h2>
            </div>

            {/* الفلاتر الانسيابية (LayoutId Sliding Pill) */}
            <div className="inline-flex p-1 bg-white/[0.03] border border-white/[0.08] rounded-full backdrop-blur-md">
              {[
                { id: "all", label: "الكل (11)" },
                { id: "reels", label: "ريلز وهوكات (6)" },
                { id: "commercial", label: "إعلانات ورياضة (3)" },
                { id: "cinematic", label: "سينمائي (2)" },
              ].map((tab) => {
                const isActive = selectedVideoTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedVideoTab(tab.id as any)}
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={() => setCursorVariant("default")}
                    className={`relative px-4 py-2 text-xs uppercase tracking-wider font-mono transition-colors z-10 ${
                      isActive ? "text-black font-bold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-lg"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* شبكة الفيديوهات الحديثة مع Hover State غامرة */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredVideos.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => openModal(item)}
                  onMouseEnter={() => {
                    setCursorVariant("video");
                    setCursorText("WATCH");
                  }}
                  onMouseLeave={() => {
                    setCursorVariant("default");
                    setCursorText("");
                  }}
                  className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/30 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between"
                >
                  {/* شاشة الفيديو */}
                  <div className="relative aspect-[9/16] w-full bg-black overflow-hidden">
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 1;
                      }}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />

                    {/* Badge تصنيف العمل */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase text-white/90">
                      {item.tab}
                    </div>

                    {/* Audio Wave Indicator عند الـ Hover */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-1 h-3 bg-white animate-pulse" />
                      <span className="w-1 h-2 bg-white/70 animate-pulse [animation-delay:0.15s]" />
                      <span className="w-1 h-4 bg-white/90 animate-pulse [animation-delay:0.3s]" />
                    </div>

                    {/* زر التوسيع السفلي */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex justify-between items-end opacity-90 group-hover:opacity-100">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                        Expand Cut ↗
                      </span>
                    </div>
                  </div>

                  {/* بيانات العمل */}
                  <div className="p-5 border-t border-white/[0.06] bg-[#0c0906]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-white/90">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/60 mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* --- الأغلفة والبوسترات (THUMBNAILS) --- */}
      <section className="py-24 px-6 sm:px-12 border-b border-white/[0.08] relative z-10 bg-[#0c0906]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 block mb-2">[Cover Design]</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                أغلفة وبوسترات عالية الـ CTR
              </h2>
            </div>
            <span className="text-xs font-mono text-white/40 hidden sm:block">Visual Art & Typography</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {thumbnailsData.map((thumb, i) => (
              <div
                key={i}
                onMouseEnter={() => {
                  setCursorVariant("video");
                  setCursorText("VIEW");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
                className="group rounded-2xl border border-white/[0.08] bg-[#100d09] overflow-hidden hover:border-white/30 transition-all duration-300"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-black relative">
                  <img
                    src={thumb.src}
                    alt={thumb.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                </div>
                <div className="p-4 border-t border-white/[0.08] bg-[#090705]">
                  <span className="text-[10px] font-mono uppercase text-white/40">{thumb.category}</span>
                  <h3 className="text-sm font-bold uppercase text-white mt-0.5">{thumb.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- الباقات والأسعار (PRICING TIERS) --- */}
      <section id="pricing" className="py-24 px-6 sm:px-12 border-b border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-16 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 block mb-2">[Production Rates]</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                باقات الإنتاج والمونتاج
              </h2>
            </div>

            {/* محول العملات الانسيابي */}
            <div className="inline-flex p-1 bg-white/[0.03] border border-white/[0.08] rounded-full text-xs font-mono">
              {(["ALL", "USD", "EGP"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCurrencyMode(mode)}
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    currencyMode === mode
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {mode === "ALL" ? "USD & EGP" : mode === "USD" ? "USD (\$)" : "EGP (ج.م)"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packagesData.map((pkg) => {
              const priceText =
                currencyMode === "USD"
                  ? pkg.priceUSD
                  : currencyMode === "EGP"
                  ? pkg.priceEGP
                  : `${pkg.priceUSD} / ${pkg.priceEGP}`;

              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.featured
                      ? "bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-2 border-white shadow-[0_0_40px_rgba(255,255,255,0.06)]"
                      : "bg-white/[0.02] border border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4 text-xs font-mono">
                      <span className="text-white/40">TIER {pkg.id}</span>
                      {pkg.featured && (
                        <span className="px-3 py-1 bg-white text-black font-bold uppercase text-[10px] rounded-full">
                          الأكثر طلباً
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-black uppercase text-white tracking-tight">{pkg.name}</h3>
                    <p className="text-xs text-white/50 mt-1">{pkg.arabicName}</p>

                    <div className="my-8 pb-6 border-b border-white/[0.08] font-mono">
                      <div className="text-3xl sm:text-4xl font-black text-white">{priceText}</div>
                      <div className="text-xs text-white/40 mt-1 uppercase">لكل فيديو (حتى 60 ثانية)</div>
                    </div>

                    <ul className="space-y-3.5 mb-8 text-xs text-white/70">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="text-white/40 font-mono mt-0.5">—</span>
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
                      onMouseEnter={() => setCursorVariant("button")}
                      onMouseLeave={() => setCursorVariant("default")}
                      className="block text-center py-2.5 text-xs uppercase font-mono tracking-wider border border-white/15 rounded-xl text-white/80 hover:text-white hover:border-white transition-all hover:bg-white/5"
                    >
                      عينة من الشغل ↗
                    </a>

                    <a
                      href={`https://wa.me/201211871199?text=${encodeURIComponent(`أهلاً يا ليل! حابب أطلب باقة ${pkg.name} (${priceText}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setCursorVariant("button")}
                      onMouseLeave={() => setCursorVariant("default")}
                      className={`block text-center py-3 text-xs uppercase font-bold tracking-wider rounded-xl transition-all ${
                        pkg.featured
                          ? "bg-white text-black hover:bg-white/90 shadow-lg"
                          : "border border-white/20 text-white hover:border-white hover:bg-white/5"
                      }`}
                    >
                      طلب الباقة عبر واتساب
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* شروط التعاقد وتدفق الإنتاج */}
          <div className="mt-16 p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02]">
            <h3 className="text-base font-mono uppercase tracking-wider text-white mb-6">
              شروط التعاقد وتدفق الإنتاج
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-white/60">
              {generalTerms.map((term, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-white font-semibold uppercase">{i + 1}. {term.title}</div>
                  <p className="leading-relaxed font-light">{term.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER & CONTACT --- */}
      <footer className="py-24 px-6 sm:px-12 bg-[#060403] text-center border-t border-white/[0.08] relative z-10">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 block mb-3">Initiate Timeline</span>
          <h2 className="text-4xl sm:text-7xl font-black uppercase text-white mb-6 tracking-tight">
            جاهز نبدأ؟
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mb-10 leading-relaxed font-light">
            متاح لحملات الفيديو، المونتاج المستمر للريلز، وصناعة الهويات البصرية للشركات وصناع المحتوى.
          </p>

          <a
            href="https://wa.me/201211871199?text=Hey%20Lil!%20I%20want%20to%20start%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
            className="inline-block px-9 py-4 bg-white text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-white/90 transition-all shadow-[0_0_35px_rgba(255,255,255,0.2)]"
          >
            تواصل عبر واتساب المباشر →
          </a>

          <div className="flex justify-center gap-6 mt-16 pt-8 border-t border-white/[0.08] text-white/40">
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

          <div className="text-[11px] font-mono text-white/30 mt-4">© 2026 Lil Studio. All Rights Reserved.</div>
        </div>
      </footer>

      {/* --- نافذة مشاهدة الفيديو (THEATER MODE) --- */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-xs font-mono text-white/70">
              <span>[{currentVideoIndex + 1} / {videosData.length}] — {activeModalVideo.title}</span>
              <button onClick={closeModal} className="px-4 py-1.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors">
                إغلاق ✕
              </button>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); goPrevious(); }}
              className="absolute left-4 sm:left-8 w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors z-10"
            >
              ←
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 sm:right-8 w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors z-10"
            >
              →
            </button>

            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full h-[85vh] aspect-[9/16] bg-black rounded-3xl border border-white/20 overflow-hidden shadow-2xl"
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

      {/* --- نافذة خطة العمل (WORKFLOW MODAL) --- */}
      <AnimatePresence>
        {isWorkflowOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWorkflowOpen(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#100d0a] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl custom-scrollbar"
            >
              <div className="flex justify-between items-start pb-6 border-b border-white/10 mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">Production System</span>
                  <h3 className="text-2xl font-black uppercase text-white">مراحل وخطوات الإنتاج</h3>
                </div>
                <button
                  onClick={() => setIsWorkflowOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {processSteps.map((step) => (
                  <div key={step.num} className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-mono text-white/40">STEP {step.num}</span>
                      <span className="text-xs text-white/50">{step.arabic}</span>
                    </div>
                    <h4 className="text-base font-bold uppercase text-white mb-1">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <button
                  onClick={() => setIsWorkflowOpen(false)}
                  className="px-6 py-2.5 bg-white text-black text-xs uppercase font-bold tracking-wider rounded-full hover:bg-white/90 transition-all shadow-md"
                >
                  فهمت الخطوات، متابعة الموقع
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}