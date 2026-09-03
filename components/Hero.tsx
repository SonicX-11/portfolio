"use client";

import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import ImageMarquee from "./ui/ImageMarquee";
import ClapperMark from "./ui/ClapperMark";

const handleNavigate = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      data-cursor="hover"
      onClick={(e) => {
        e.preventDefault();
        handleNavigate(href);
      }}
      className="font-medium text-white underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-300 hover:text-accent"
    >
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 md:pt-40">
      <div className="mb-14 md:mb-20">
        <ImageMarquee direction="left" speed={38} />
      </div>

      <div className="container-x">
        <p className="mb-4 font-body text-sm lowercase tracking-widest text-accent">hey</p>

        <h1 className="font-display leading-[0.85] text-white">
          <span className="block text-[15vw] sm:text-[11vw] md:text-[7.5vw]">
            Hey, I&apos;m Ebrahim
          </span>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-24 w-24 shrink-0 md:h-32 md:w-32"
          >
            <ClapperMark className="h-full w-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl font-body text-xl leading-relaxed text-white/85 md:text-2xl"
          >
            Senior video editor and motion designer. I mix pacing, color, and sound to make
            footage feel like it was always meant to look this way. Recent work includes cuts
            for <InlineLink href="#work">Yasmin Yousry</InlineLink>,{" "}
            <InlineLink href="#work">Emirates</InlineLink>,{" "}
            <InlineLink href="#work">Hatoom</InlineLink>, and{" "}
            <InlineLink href="#work">Dr Maan</InlineLink>. A little over a year and a half in,
            still happiest at 2am with a timeline open and one more cut left to try.
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={() => handleNavigate("#work")}
          data-cursor="hover"
          className="mt-16 flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] text-muted transition-colors duration-300 hover:text-white"
        >
          scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <HiArrowDown />
          </motion.span>
        </motion.button>
      </div>

      <div className="mt-16 md:mt-24">
        <ImageMarquee direction="right" speed={44} />
      </div>
    </section>
  );
}
