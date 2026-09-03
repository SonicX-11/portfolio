"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import RevealText from "./ui/RevealText";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="mb-14 md:mb-20">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-accent">Career</p>
          <RevealText
            text="Experience"
            as="h2"
            className="font-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl"
          />
        </div>

        <div className="relative border-l border-line pl-8 md:pl-12">
          {experience.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative pb-16 last:pb-0"
            >
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent md:-left-[calc(3rem+5px)]" />

              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-2xl tracking-wide text-white sm:text-3xl">
                  {item.role}
                </h3>
                <span className="font-body text-xs uppercase tracking-[0.2em] text-accent">
                  {item.year}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-3">
                <span className="font-body text-sm text-white/70">{item.org}</span>
                <span className="rounded-full border border-line px-2.5 py-0.5 font-body text-[10px] uppercase tracking-wider text-muted">
                  {item.type}
                </span>
              </div>

              <p className="mt-3 max-w-lg font-body text-sm text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
