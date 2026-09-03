"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import MagneticButton from "../ui/MagneticButton";
import RevealText from "../ui/RevealText";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);

  // Lightweight ambient particle field on canvas (no external deps)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vy: Math.random() * 0.3 + 0.05,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y -= p.vy;
        if (p.y < 0) p.y = height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex h-[100svh] w-full items-end overflow-hidden bg-bg"
    >
      {/* Background video */}
      <motion.video
        style={{ scale: videoScale }}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.svg"
      >
        <source src="/video/showreel-bg.mp4" type="video/mp4" />
      </motion.video>

      {/* Gradient overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-bg/70" />

      {/* Ambient particles */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />

      {/* Content */}
      <motion.div style={{ y: contentY }} className="container-x relative z-10 w-full pb-20 md:pb-28">
        <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-accent">
          Video Editor · Motion Designer
        </p>

        <h1 className="font-display leading-[0.85] text-white">
          <RevealText
            text="EBRAHIM"
            as="span"
            className="block text-[16vw] sm:text-[13vw] md:text-[8vw] lg:text-[7.5vw]"
            delay={0.2}
          />
          <RevealText
            text="FADEL"
            as="span"
            className="block text-[16vw] text-accent sm:text-[13vw] md:text-[8vw] lg:text-[7.5vw]"
            delay={0.4}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md font-body text-base text-muted md:text-lg"
        >
          Senior Video Editor, Motion Designer, and Creative Storyteller — crafting cinematic work
          for brands that refuse to be forgettable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#projects"
            className="bg-white text-bg hover:bg-accent hover:text-white"
          >
            View Portfolio
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="border border-line text-white hover:border-accent hover:text-accent"
          >
            Hire Me
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 right-6 z-10 flex flex-col items-center gap-2 md:right-12"
      >
        <span className="font-body text-[10px] tracking-[0.3em] text-muted [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="text-white"
        >
          <HiArrowDown />
        </motion.span>
      </motion.div>
    </section>
  );
}
