"use client";

import { motion } from "framer-motion";
import { HiOutlineDownload } from "react-icons/hi";
import MagneticButton from "./ui/MagneticButton";

const stats = [
  { value: "120+", label: "Projects" },
  { value: "50+", label: "Clients" },
  { value: "1.5+", label: "Years" },
];

export default function About() {
  return (
    <section id="about" className="relative border-y border-line py-14">
      <div className="container-x flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-3xl text-white sm:text-4xl">{s.value}</p>
              <p className="mt-1 font-body text-[11px] uppercase tracking-widest text-muted">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <MagneticButton
          as="a"
          href="/cv/ebrahim-fadel-cv.pdf"
          className="gap-2 border border-line text-white hover:border-accent hover:text-accent"
        >
          <HiOutlineDownload className="text-lg" />
          Download CV
        </MagneticButton>
      </div>
    </section>
  );
}
