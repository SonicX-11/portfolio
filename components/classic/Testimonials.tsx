"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { testimonials } from "@/data/testimonials";
import RevealText from "../ui/RevealText";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section className="relative bg-bg py-28 md:py-40">
      <div className="container-x">
        <div className="mb-14 text-center md:mb-20">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-accent">
            Testimonials
          </p>
          <RevealText
            text="Kind words"
            as="h2"
            className="font-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl"
          />
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="glass relative overflow-hidden rounded-2xl px-8 py-12 text-center md:px-14 md:py-16">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.name}
                custom={direction}
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mx-auto mb-6 h-16 w-16 overflow-hidden rounded-full border border-line">
                  <Image src={t.avatar} alt={t.name} width={64} height={64} className="h-full w-full object-cover" />
                </div>
                <p className="font-body text-lg text-white/90 md:text-xl">&ldquo;{t.review}&rdquo;</p>
                <p className="mt-6 font-display text-lg tracking-wide text-white">{t.name}</p>
                <p className="font-body text-sm text-muted">{t.company}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              data-cursor="hover"
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-white transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <HiChevronLeft />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              data-cursor="hover"
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-white transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
