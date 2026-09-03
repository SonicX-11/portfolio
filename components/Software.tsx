"use client";

import { motion } from "framer-motion";
import { software } from "@/data/software";

export default function Software() {
  // Duplicate the list for a seamless marquee loop
  const loop = [...software, ...software];

  return (
    <section className="relative overflow-hidden border-y border-line py-16">
      <div className="container-x mb-10">
        <p className="text-center font-body text-xs uppercase tracking-[0.4em] text-muted">
          Tools of the Trade
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          className="flex shrink-0 items-center gap-16 pr-16"
        >
          {loop.map((item, i) => (
            <span
              key={`${item.name}-${i}`}
              className="whitespace-nowrap font-display text-3xl tracking-wide text-white/25 transition-colors duration-300 hover:text-white md:text-4xl"
            >
              {item.name}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent md:w-48" />
    </section>
  );
}
