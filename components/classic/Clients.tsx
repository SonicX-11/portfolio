"use client";

import { motion } from "framer-motion";
import { clients } from "@/data/clients";

export default function Clients() {
  const loop = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden bg-bg py-16">
      <div className="container-x mb-10">
        <p className="text-center font-body text-xs uppercase tracking-[0.4em] text-muted">
          Trusted By
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          className="flex shrink-0 items-center gap-20 pr-20"
        >
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-body text-lg font-semibold tracking-wide text-white/30 grayscale transition-all duration-300 hover:text-white hover:grayscale-0"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent md:w-48" />
    </section>
  );
}
