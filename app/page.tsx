"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

// Global types for CDN scripts (GSAP & Hls)
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Hls: any;
  }
}

interface VideoItem {
  id: string;
  title: string;
  category: string;
  tab: "reels" | "commercial" | "cinematic";
  src: string;
  description: string;
  span: string;
  aspect: string;
}

interface ThumbnailItem {
  id: string;
  title: string;
  category: string;
  src: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingCount, setLoadingCount] = useState<number>(0);
  const [activeNav, setActiveNav] = useState<string>("Home");
  const [currentRoleIndex, setCurrentRoleIndex] = useState<number>(0);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [currencyMode, setCurrencyMode] = useState<"ALL" | "USD" | "EGP">("ALL");
  const [selectedVideoTab, setSelectedVideoTab] = useState<"all" | "reels" | "commercial" | "cinematic">("all");
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<ThumbnailItem | null>(null);
  const [isModalMuted, setIsModalMuted] = useState<boolean>(false);

  const roles = ["Video Editor", "Colorist", "Sound Designer", "Storyteller"];
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const footerVideoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // --- PRELOADER COUNTER ---
  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;
    const duration = 2500;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * 100);

      setLoadingCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 350);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // --- ROLES & SCROLL ---
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(roleInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [roles.length]);

  // --- GSAP MARQUEE & REVEALS ---
  useEffect(() => {
    if (isLoading) return;

    if (window.gsap) {
      const gsap = window.gsap;

      gsap.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1, delay: 0.25, ease: "power3.out" }
      );

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 35,
          ease: "none",
          repeat: -1,
        });
      }
    }
  }, [isLoading]);

  // --- DATA ---
  const videosData: VideoItem[] = [
    { id: "reel-1", title: "High-Retention Commercial Reel #1", category: "Commercial Cut", tab: "reels", src: "/video/1.mp4", description: "إيقاع سريع وتصميم صوتي موجه لرفع معدل المشاهدة للنهاية.", span: "md:col-span-7", aspect: "aspect-[16/10]" },
    { id: "man-u", title: "Manchester United Highlight Cut", category: "Sports Narrative", tab: "commercial", src: "/video/Man-U.mp4", description: "مونتاج رياضي حماسي مع تزامن كامل بين حركة اللعب والموسيقى.", span: "md:col-span-5", aspect: "aspect-[4/5]" },
    { id: "reel-2", title: "Business Growth Reel #2", category: "Pop-Up Subtitles", tab: "reels", src: "/video/2.mp4", description: "فيديو بيزنس بنصوص متحركة وتركيز بصري على المعلومات الأساسية.", span: "md:col-span-5", aspect: "aspect-[4/5]" },
    { id: "the-odyssey", title: "The Odyssey Cinematic Master", category: "Cinematic Cut", tab: "cinematic", src: "/video/The-Odyssey.mp4", description: "مونتاج سينمائي قائم على الأجواء الصوتية وتدريج المشاعر في القصة.", span: "md:col-span-7", aspect: "aspect-[16/10]" },
    { id: "reel-3", title: "Dynamic Hook Cut #3", category: "Fast Paced", tab: "reels", src: "/video/3.mp4", description: "بداية خاطفة وانتقالات مدروسة لجذب المتابع من أول 3 ثوانٍ.", span: "md:col-span-4", aspect: "aspect-[9/16]" },
    { id: "reel-4", title: "Viral Engagement Reel #4", category: "Retention First", tab: "reels", src: "/video/4.mp4", description: "تقطيع معتمد على الموسيقى مع زوومات سريعة ومؤثرات صوتية دقيقة.", span: "md:col-span-4", aspect: "aspect-[9/16]" },
    { id: "reel-5", title: "Brand Storytelling #5", category: "Commercial Reel", tab: "reels", src: "/video/5.mp4", description: "سرد بصري للعلامة التجارية يجمع بين المونتاج النظيف والرسالة القوية.", span: "md:col-span-4", aspect: "aspect-[9/16]" },
    { id: "mb22", title: "Commercial Hardware Showcase", category: "Brand Promo", tab: "commercial", src: "/video/Mb22.mp4", description: "عرض تجاري لمنتج يركز على إبراز التفاصيل والقطع الديناميكي.", span: "md:col-span-6", aspect: "aspect-[16/10]" },
    { id: "color", title: "Color Grading Showcase", category: "Color Dev", tab: "commercial", src: "/video/Color.mp4", description: "استعراض تصحيح وتدريج الألوان وإبراز التباين ونضارة ألوان البشرة.", span: "md:col-span-6", aspect: "aspect-[16/10]" },
    { id: "reel-12", title: "Social Media Hook #12", category: "Short Form", tab: "reels", src: "/video/12.mp4", description: "ريل مصمم لمنصات تيك توك وإنستجرام للحفاظ على وتيرة التفاعل.", span: "md:col-span-6", aspect: "aspect-[16/10]" },
    { id: "habib-ayamy", title: "Habib Ayamy Aesthetic", category: "Atmosphere Edit", tab: "cinematic", src: "/video/Habib-Ayamy.mp4", description: "عمل فني يعتمد على التناغم بين الموسيقى، زوايا الكاميرا، والهدوء البصري.", span: "md:col-span-6", aspect: "aspect-[16/10]" },
  ];

  const thumbnailsData: ThumbnailItem[] = [
    { id: "t1", title: "Bruno Fernandes - The King", category: "Sports Poster", src: "/images/thumbnails/thumb-1.png" },
    { id: "t2", title: "Business Budgeting Strategy", category: "Finance Cover", src: "/images/thumbnails/thumb-2.png" },
    { id: "t3", title: "EdTech Agency Growth", category: "Case Study Cover", src: "/images/thumbnails/thumb-3.png" },
    { id: "t4", title: "US Company Setup", category: "Educational Art", src: "/images/thumbnails/thumb-4.png" },
    { id: "t5", title: "Gigabyte B840M Eagle", category: "Hardware Commercial", src: "/images/thumbnails/thumb-5.png" },
    { id: "t6", title: "Manchester United | Bruno Cut", category: "Social Graphic", src: "/images/thumbnails/thumb-6.png" },
  ];

  const processSteps = [
    { num: "01", title: "Creative Brief & Strategy", arabic: "الاتفاق وفهم فكرة الفيديو", desc: "فهم الجمهور المستهدف، منصة النشر، وإيقاع التقطيع والهوك المناسب للقصة." },
    { num: "02", title: "Footage Intake & Media Selects", arabic: "رفع الماتريال والفرز السريع", desc: "استلام الماتريال الخام بدقة كاملة عبر Drive أو WeTransfer واختيار اللقطات الأقوى." },
    { num: "03", title: "Cutting, Hooks & Multi-Layer Foley", arabic: "المونتاج، التقطيع والمؤثرات", desc: "تقطيع ديناميكي، هوك أول 3 ثوانٍ، نصوص حركية، وهندسة صوتية محيطية." },
    { num: "04", title: "Refinements & Frame-Accurate Notes", arabic: "المراجعة والتعديلات السريعة", desc: "ضبط سرعة الكلام ونقاط التأثير وتناسق الموسيقى طبقاً لملاحظاتك الدقيقة." },
    { num: "05", title: "Final 4K Master Delivery", arabic: "التسليم النهائي بأعلى جودة", desc: "تصدير الملفات بأعلى معدل Bitrate ودقة 4K جاهزة للانتشار الفوري." },
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

  const clientReviews = [
    { quote: "Lil transformed our raw footage into high-retention commercial reels. The pacing, audio sync, and pop-up subtitles significantly boosted our engagement.", client: "Ahmed Abdelkareem", role: "Content Creator & Entrepreneur" },
    { quote: "Exceptional turnaround and aesthetic sense. He understands video storytelling deeply, delivering flawless color grading and slick pacing without endless revisions.", client: "Sameh Othman", role: "Business Consultant" },
    { quote: "The retention on our educational campaigns jumped noticeably after hiring Lil. The edits are razor sharp and the communication is clear and professional.", client: "Rania", role: "E-Learning Academy Lead" },
    { quote: "Reliable, creative, and fast. His sound design and B-roll selection gave our commercial launches a truly cinematic presence.", client: "Maryam", role: "Commercial Brand Manager" },
  ];

  // --- MODAL CONTROLS ---
  const currentVideoIndex = activeModalVideo ? videosData.findIndex((v) => v.id === activeModalVideo.id) : -1;

  const closeModal = useCallback(() => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setActiveModalVideo(null);
  }, []);

  const openModal = useCallback((video: VideoItem) => {
    setActiveModalVideo(video);
  }, []);

  const goNext = useCallback(() => {
    if (currentVideoIndex === -1) return;
    setActiveModalVideo(videosData[(currentVideoIndex + 1) % videosData.length]);
  }, [currentVideoIndex, videosData]);

  const goPrevious = useCallback(() => {
    if (currentVideoIndex === -1) return;
    setActiveModalVideo(videosData[(currentVideoIndex - 1 + videosData.length) % videosData.length]);
  }, [currentVideoIndex, videosData]);

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
  }, [selectedVideoTab, videosData]);

  return (
    <div className="bg-[hsl(var(--bg))] text-[hsl(var(--text))] font-sans antialiased selection:bg-[hsl(var(--muted))] selection:text-[hsl(var(--text))] min-h-screen relative overflow-x-hidden">
      
      {/* Dynamic Fonts & Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        
        :root {
          --bg: 0 0% 4%;
          --surface: 0 0% 8%;
          --text: 0 0% 96%;
          --muted: 0 0% 53%;
          --stroke: 0 0% 12%;
          --accent: 0 0% 96%;
        }

        .font-display {
          font-family: 'Instrument Serif', serif;
        }

        .accent-gradient {
          background: linear-gradient(90deg, #89AACC 0%, #4E85BF 100%);
        }

        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(200%); }
          100% { transform: translateY(-100%); }
        }

        .animate-scroll-down {
          animation: scroll-down 1.5s ease-in-out infinite;
        }

        @keyframes role-fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-role-fade-in {
          animation: role-fade-in 0.4s ease-out forwards;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient-border {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }
      `}</style>

      {/* External Scripts Loader */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

      {/* --- PRELOADER --- */}
      {isLoading && (
        <div className="fixed inset-0 z-[99999] bg-[hsl(var(--bg))] flex flex-col justify-between p-6 md:p-12 transition-opacity duration-700">
          <div className="flex justify-between items-start">
            <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em]">Lil Studio</span>
            <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-mono">SYSTEM READY</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-20 flex items-center justify-center overflow-hidden">
              <span className="text-4xl md:text-6xl lg:text-7xl font-display italic text-[hsl(var(--text))] opacity-80 transition-all duration-300">
                {["Pacing", "Rhythm", "Retention", "Mastering"][Math.floor(loadingCount / 26) % 4]}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="w-full md:w-96">
              <div className="h-[3px] bg-[hsl(var(--stroke))]/50 w-full overflow-hidden rounded-full">
                <div
                  className="h-full accent-gradient transition-all duration-75 ease-out rounded-full"
                  style={{
                    transform: `scaleX(${loadingCount / 100})`,
                    transformOrigin: "left",
                    boxShadow: "0 0 10px rgba(137, 170, 204, 0.4)",
                  }}
                />
              </div>
            </div>
            <div className="text-6xl md:text-8xl lg:text-9xl font-display text-[hsl(var(--text))] tabular-nums leading-none">
              {String(loadingCount).padStart(3, "0")}
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
        <div
          className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-[hsl(var(--surface))]/90 px-2 py-2 transition-all duration-300 ${
            scrolled ? "shadow-xl shadow-black/60" : ""
          }`}
        >
          {/* Logo Badge */}
          <div className="relative group p-0.5 rounded-full">
            <div className="absolute -inset-0.5 rounded-full accent-gradient opacity-75 blur-[1px] group-hover:opacity-100 transition duration-300 animate-gradient-border"></div>
            <a
              href="#home"
              className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[hsl(var(--bg))] text-[hsl(var(--text))] font-display italic text-sm font-bold transition-transform duration-300 group-hover:scale-110"
            >
              LF
            </a>
          </div>

          <div className="w-px h-5 bg-[hsl(var(--stroke))] mx-1.5 hidden sm:block"></div>

          {/* Nav Items */}
          <div className="flex items-center gap-1 font-mono text-xs">
            {[
              { label: "Home", href: "#home" },
              { label: "Works", href: "#work" },
              { label: "Covers", href: "#covers" },
              { label: "Pipeline", href: "#pipeline" },
              { label: "Pricing", href: "#pricing" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveNav(item.label)}
                className={`rounded-full px-3 sm:px-4 py-1.5 transition-colors duration-200 uppercase ${
                  activeNav === item.label
                    ? "text-[hsl(var(--text))] bg-[hsl(var(--stroke))]/60 font-bold"
                    : "text-[hsl(var(--muted))] hover:text-[hsl(var(--text))] hover:bg-[hsl(var(--stroke))]/30"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="w-px h-5 bg-[hsl(var(--stroke))] mx-1.5 hidden sm:block"></div>

          {/* Direct Contact Button */}
          <div className="relative group ml-1">
            <div className="absolute -inset-0.5 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition duration-300 blur-[1px]"></div>
            <a
              href="https://wa.me/201211871199"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full bg-[hsl(var(--surface))] text-[hsl(var(--text))] backdrop-blur-md transition-transform duration-200 group-hover:scale-[1.02] font-mono"
            >
              <span>WhatsApp</span>
              <span className="text-xs">↗</span>
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={heroVideoRef}
            src="/video/The-Odyssey.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute min-w-full min-h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter brightness-75 contrast-125 grayscale"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(var(--bg))] to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-12">
          <span className="blur-in text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] mb-4 font-mono">
            COLLECTION &apos;26 • SENIOR VIDEO EDITOR
          </span>

          <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-[hsl(var(--text))] mb-6">
            Lil Fadel
          </h1>

          <div className="text-lg md:text-xl text-[hsl(var(--muted))] mb-6 font-light">
            A <span key={currentRoleIndex} className="font-display italic text-[hsl(var(--text))] text-2xl md:text-3xl animate-role-fade-in inline-block mx-1">{roles[currentRoleIndex]}</span> crafting high-retention stories.
          </div>

          <p className="blur-in text-sm md:text-base text-[hsl(var(--muted))] max-w-lg mb-10 leading-relaxed font-light">
            تصميم محتوى بصري سريع الانتشار، بمعدل احتفاظ عالي للمشاهدة وهندسة صوتية متقنة تخدم أهداف صناع المحتوى والشركات.
          </p>

          <div className="blur-in flex flex-wrap items-center justify-center gap-4">
            <a
              href="#work"
              className="rounded-full text-xs font-mono uppercase tracking-wider px-7 py-3.5 bg-[hsl(var(--text))] text-[hsl(var(--bg))] font-semibold transition-all duration-300 hover:scale-105"
            >
              See Works ({videosData.length})
            </a>
            <a
              href="https://wa.me/201211871199?text=Hey%20Lil!%20I%20want%20to%20start%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full text-xs font-mono uppercase tracking-wider px-7 py-3.5 border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))] text-[hsl(var(--text))] font-semibold transition-all duration-300 hover:scale-105 hover:border-white/40"
            >
              Reach out... ↗
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[9px] text-[hsl(var(--muted))] uppercase tracking-[0.2em] font-mono">SCROLL</span>
          <div className="w-px h-10 bg-[hsl(var(--stroke))] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 accent-gradient animate-scroll-down"></div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-[hsl(var(--bg))] py-16 px-6 border-b border-[hsl(var(--stroke))]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-3xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))]">
            <div className="text-4xl md:text-6xl font-display italic text-[hsl(var(--text))] mb-1">4+</div>
            <div className="text-xs text-[hsl(var(--muted))] uppercase font-mono tracking-wider">Years Experience</div>
          </div>
          <div className="p-6 rounded-3xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))]">
            <div className="text-4xl md:text-6xl font-display italic text-[hsl(var(--text))] mb-1">350+</div>
            <div className="text-xs text-[hsl(var(--muted))] uppercase font-mono tracking-wider">Videos Delivered</div>
          </div>
          <div className="p-6 rounded-3xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))]">
            <div className="text-4xl md:text-6xl font-display italic text-[hsl(var(--text))] mb-1">20+</div>
            <div className="text-xs text-[hsl(var(--muted))] uppercase font-mono tracking-wider">Brands & Creators</div>
          </div>
          <div className="p-6 rounded-3xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))]">
            <div className="text-4xl md:text-6xl font-display italic text-[hsl(var(--text))] mb-1">45%</div>
            <div className="text-xs text-[hsl(var(--muted))] uppercase font-mono tracking-wider">Retention Boost</div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID: SELECTED WORK --- */}
      <section id="work" className="bg-[hsl(var(--bg))] py-20 md:py-32 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-[hsl(var(--stroke))]"></div>
                <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-mono">Selected Work</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sans font-light tracking-tight text-[hsl(var(--text))]">
                Featured <span className="font-display italic">projects</span>
              </h2>
            </div>

            {/* Category Filters */}
            <div className="inline-flex flex-wrap p-1 rounded-full border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))] font-mono text-xs">
              {[
                { id: "all", label: "All (11)" },
                { id: "reels", label: "Reels (6)" },
                { id: "commercial", label: "Commercial (3)" },
                { id: "cinematic", label: "Cinematic (2)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedVideoTab(tab.id as any)}
                  className={`px-4 py-1.5 rounded-full uppercase transition-colors ${
                    selectedVideoTab === tab.id
                      ? "bg-white text-black font-bold"
                      : "text-[hsl(var(--muted))] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {filteredVideos.map((project) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className={`${project.span} group relative bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-3xl overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div className={`relative w-full ${project.aspect} overflow-hidden bg-black`}>
                  <video
                    src={project.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 1;
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  />

                  {/* Hover Backdrop */}
                  <div className="absolute inset-0 bg-[hsl(var(--bg))]/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center p-6">
                    <div className="relative inline-flex items-center px-5 py-2.5 rounded-full bg-[hsl(var(--surface))] text-[hsl(var(--text))] border border-white/10 shadow-lg">
                      <div className="absolute -inset-0.5 rounded-full accent-gradient opacity-75 blur-[1px]"></div>
                      <span className="relative text-sm font-medium">Watch Cut — <span className="font-display italic">{project.title}</span></span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono uppercase text-white">
                    {project.tab}
                  </div>
                </div>

                <div className="p-6 flex items-center justify-between bg-[hsl(var(--surface))] border-t border-[hsl(var(--stroke))]">
                  <div>
                    <h3 className="text-lg font-medium text-[hsl(var(--text))]">{project.title}</h3>
                    <p className="text-xs text-[hsl(var(--muted))] mt-1">{project.category}</p>
                  </div>
                  <span className="w-10 h-10 rounded-full border border-[hsl(var(--stroke))] flex items-center justify-center text-[hsl(var(--muted))] group-hover:text-[hsl(var(--text))] group-hover:border-[hsl(var(--text))] transition-colors">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- PRODUCTION PIPELINE (FORMERLY JOURNAL) --- */}
      <section id="pipeline" className="bg-[hsl(var(--bg))] py-20 md:py-32 px-6 md:px-10 lg:px-16 border-t border-[hsl(var(--stroke))]">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-[hsl(var(--stroke))]"></div>
                <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-mono">Production System</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sans font-light tracking-tight text-[hsl(var(--text))]">
                Editorial <span className="font-display italic">pipeline</span>
              </h2>
            </div>
            <p className="text-sm text-[hsl(var(--muted))] max-w-sm">
              مراحل الإنتاج من استلام الماتريال الخام وحتى تسليم الماستر النهائي بأعلى دقة.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {processSteps.map((entry) => (
              <div
                key={entry.num}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-5 md:p-6 bg-[hsl(var(--surface))]/30 hover:bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-3xl transition-all duration-300"
              >
                <div className="flex items-center gap-5 w-full sm:w-auto">
                  <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] flex items-center justify-center font-display italic text-2xl text-[hsl(var(--text))]">
                    {entry.num}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-medium text-[hsl(var(--text))] group-hover:text-[#89AACC] transition-colors">
                        {entry.title}
                      </h3>
                      <span className="text-xs text-[hsl(var(--muted))] font-mono">({entry.arabic})</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[hsl(var(--muted))] mt-1 max-w-xl leading-relaxed">
                      {entry.desc}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center mr-2 w-10 h-10 rounded-full border border-[hsl(var(--stroke))] flex items-center justify-center text-[hsl(var(--muted))] group-hover:text-[hsl(var(--text))] group-hover:border-[hsl(var(--text))] transition-colors">
                  ✦
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- VISUAL COVERS & THUMBNAILS (EXPLORATIONS) --- */}
      <section id="covers" className="bg-[hsl(var(--bg))] py-24 px-6 md:px-12 border-t border-[hsl(var(--stroke))]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] mb-3 block font-mono">Visual Explorations</span>
            <h2 className="text-4xl md:text-7xl font-display italic text-[hsl(var(--text))] mb-4">
              Posters & High-CTR <span className="not-italic font-sans font-light">covers</span>
            </h2>
            <p className="text-sm text-[hsl(var(--muted))] max-w-md mx-auto">
              أغلفة وبوسترات دعائية مصممة لجذب النقرات ورفع معدلات التفاعل على المنصات. اضغط على أي غلاف للمعاينة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {thumbnailsData.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedThumbnail(item)}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))] cursor-pointer shadow-xl hover:scale-[1.02] transition-transform duration-500"
              >
                <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#89AACC]">{item.category}</span>
                  <span className="text-base font-medium text-white mt-1">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Covers */}
      {selectedThumbnail && (
        <div
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedThumbnail(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-3xl p-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedThumbnail(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[hsl(var(--bg))] text-white flex items-center justify-center border border-[hsl(var(--stroke))] z-10"
            >
              ✕
            </button>
            <img src={selectedThumbnail.src} alt={selectedThumbnail.title} className="w-full max-h-[60vh] object-cover rounded-2xl mb-4" />
            <h3 className="text-2xl font-display italic text-white">{selectedThumbnail.title}</h3>
            <p className="text-xs text-[hsl(var(--muted))] font-mono uppercase tracking-widest mt-1">{selectedThumbnail.category}</p>
          </div>
        </div>
      )}

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="bg-[hsl(var(--bg))] py-20 md:py-32 px-6 border-t border-[hsl(var(--stroke))]">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-16 pb-6 border-b border-[hsl(var(--stroke))]">
            <div>
              <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-mono block mb-2">[Transparent Rates]</span>
              <h2 className="text-4xl md:text-6xl font-sans font-light tracking-tight text-[hsl(var(--text))]">
                Production <span className="font-display italic">packages</span>
              </h2>
            </div>

            {/* Currency Switcher */}
            <div className="inline-flex p-1 rounded-full border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))] text-xs font-mono">
              {(["ALL", "USD", "EGP"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCurrencyMode(mode)}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    currencyMode === mode ? "bg-white text-black font-bold" : "text-[hsl(var(--muted))] hover:text-white"
                  }`}
                >
                  {mode === "ALL" ? "USD & EGP" : mode === "USD" ? "USD (\$)" : "EGP (ج.م)"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  className={`p-8 rounded-3xl border flex flex-col justify-between ${
                    pkg.featured
                      ? "border-white bg-[hsl(var(--surface))] relative shadow-2xl"
                      : "border-[hsl(var(--stroke))] bg-[hsl(var(--surface))]/40"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-baseline mb-4 font-mono text-xs">
                      <span className="text-[hsl(var(--muted))]">TIER {pkg.id}</span>
                      {pkg.featured && (
                        <span className="px-3 py-1 bg-white text-black font-bold uppercase text-[10px] rounded-full">
                          الأكثر طلباً
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold uppercase text-white tracking-tight">{pkg.name}</h3>
                    <p className="text-xs text-[hsl(var(--muted))] mt-1">{pkg.arabicName}</p>

                    <div className="my-8 pb-6 border-b border-[hsl(var(--stroke))] font-mono">
                      <div className="text-3xl sm:text-4xl font-bold text-white">{priceText}</div>
                      <div className="text-xs text-[hsl(var(--muted))] mt-1 uppercase">لكل فيديو (حتى 60 ثانية)</div>
                    </div>

                    <ul className="space-y-3.5 mb-8 text-xs text-[hsl(var(--muted))]">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-[#89AACC] font-mono mt-0.5">—</span>
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-[hsl(var(--stroke))] space-y-3">
                    <div className="text-[11px] font-mono text-[hsl(var(--muted))] text-center">{pkg.revisions}</div>
                    
                    <a
                      href={pkg.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-2.5 text-xs uppercase font-mono tracking-wider border border-[hsl(var(--stroke))] rounded-full text-white/80 hover:text-white hover:border-white transition-colors"
                    >
                      عينة من الشغل ↗
                    </a>

                    <a
                      href={`https://wa.me/201211871199?text=${encodeURIComponent(`أهلاً يا ليل! حابب أطلب باقة ${pkg.name} (${priceText}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center py-3 text-xs uppercase font-bold tracking-wider rounded-full transition-colors ${
                        pkg.featured ? "bg-white text-black hover:bg-white/90" : "border border-[hsl(var(--stroke))] text-white hover:border-white"
                      }`}
                    >
                      طلب الباقة عبر واتساب
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terms */}
          <div className="mt-16 p-8 rounded-3xl border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))]/30">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white mb-6">
              شروط التعاقد وتدفق الإنتاج
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[hsl(var(--muted))]">
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

      {/* --- CLIENT REVIEWS --- */}
      <section className="bg-[hsl(var(--bg))] py-20 px-6 border-t border-[hsl(var(--stroke))]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-mono block mb-2">[Dispatches]</span>
            <h2 className="text-4xl md:text-6xl font-sans font-light tracking-tight text-[hsl(var(--text))]">
              Client <span className="font-display italic">messages</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientReviews.map((rev, i) => (
              <div key={i} className="p-8 rounded-3xl border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))]/40 flex flex-col justify-between">
                <p className="text-base text-white/85 font-light leading-relaxed mb-6 font-display italic text-xl">
                  &ldquo;{rev.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-[hsl(var(--stroke))] flex justify-between items-end text-xs">
                  <div>
                    <h4 className="font-semibold text-white uppercase">{rev.client}</h4>
                    <p className="text-[hsl(var(--muted))] mt-0.5">{rev.role}</p>
                  </div>
                  <span className="font-mono text-[hsl(var(--muted))] text-[10px]">VERIFIED REVIEW</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="relative bg-[hsl(var(--bg))] pt-20 md:pt-32 pb-8 md:pb-12 overflow-hidden border-t border-[hsl(var(--stroke))]">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={footerVideoRef}
            src="/video/The-Odyssey.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute min-w-full min-h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-y-[-1] filter brightness-50 contrast-125 grayscale"
          />
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
          
          {/* GSAP Marquee */}
          <div className="overflow-hidden whitespace-nowrap mb-16 py-4 border-y border-white/10">
            <div ref={marqueeRef} className="inline-flex gap-8 text-xl md:text-2xl font-display italic text-[hsl(var(--muted))]/80 uppercase tracking-widest">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="inline-flex items-center gap-8">
                  <span>RETENTION FIRST • CINEMATIC MASTERY • SURGICAL TIMELINE</span>
                  <span className="text-[#89AACC]">•</span>
                </span>
              ))}
            </div>
          </div>

          <span className="text-xs text-[hsl(var(--muted))] uppercase tracking-[0.3em] block mb-4 font-mono">Get in touch</span>

          <h2 className="text-5xl md:text-8xl font-display italic text-[hsl(var(--text))] mb-8">
            Let&apos;s create something <br />
            <span className="not-italic font-sans font-light">extraordinary.</span>
          </h2>

          <div className="relative inline-block group mb-20">
            <div className="absolute -inset-1 rounded-full accent-gradient opacity-75 blur-md group-hover:opacity-100 transition duration-300"></div>
            <a
              href="mailto:ebrahimfadel8903@gmail.com"
              className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[hsl(var(--surface))] text-[hsl(var(--text))] text-lg font-medium border border-white/10 transition-transform duration-300 group-hover:scale-105"
            >
              <span>ebrahimfadel8903@gmail.com</span>
              <span>↗</span>
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/10 text-xs">
            {/* Socials */}
            <div className="flex items-center gap-6 text-[hsl(var(--muted))]">
              <a href="https://www.instagram.com/ebrahimfadel_8/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.facebook.com/EbrahimFadel8" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://wa.me/201211871199" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
              <a href="mailto:ebrahimfadel8903@gmail.com" className="hover:text-white transition-colors">Email</a>
            </div>

            {/* Availability Badge */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[hsl(var(--surface))] border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 relative"></span>
              <span className="text-xs text-[hsl(var(--text))] font-medium font-mono">Available for projects</span>
            </div>

            <div className="text-[hsl(var(--muted))] font-mono">
              © 2026 Lil Fadel. All rights reserved.
            </div>
          </div>

        </div>
      </footer>

      {/* --- THEATER VIDEO MODAL --- */}
      {activeModalVideo && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          onClick={closeModal}
        >
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none text-xs font-mono">
            <span className="text-white/70 pointer-events-auto">
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
                className="px-3 py-1 border border-white/20 rounded-full text-white text-[10px] uppercase hover:bg-white hover:text-black transition-colors"
              >
                {isModalMuted ? "Unmute" : "Mute"}
              </button>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goPrevious(); }}
            className="absolute left-4 sm:left-8 w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center text-sm hover:bg-white hover:text-black transition-colors z-10"
          >
            ←
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 sm:right-8 w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center text-sm hover:bg-white hover:text-black transition-colors z-10"
          >
            →
          </button>

          <div
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
          </div>
        </div>
      )}

    </div>
  );
}