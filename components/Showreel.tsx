"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiPlay, HiOutlineArrowsExpand } from "react-icons/hi";
import RevealText from "./ui/RevealText";

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
    } else {
      v.muted = false;
      v.play();
    }
    setPlaying(!playing);
  };

  const goFullscreen = () => {
    const v = videoRef.current;
    if (v?.requestFullscreen) v.requestFullscreen();
  };

  return (
    <section className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="mb-14 text-center">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-accent">Showreel</p>
          <RevealText
            text="Watch the reel"
            as="h2"
            className="font-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-sm"
        >
          <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/20 blur-3xl" />

          <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-line bg-card">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/showreel-poster.jpg"
            >
              <source src="/video/showreel.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />

            <button
              onClick={togglePlay}
              data-cursor="hover"
              aria-label={playing ? "Pause showreel" : "Play showreel"}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl text-white backdrop-blur-sm"
              >
                <HiPlay className="ml-1" />
              </motion.span>
            </button>

            <button
              onClick={goFullscreen}
              data-cursor="hover"
              aria-label="Fullscreen"
              className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-bg/60 text-base text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
            >
              <HiOutlineArrowsExpand />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
