"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineDownload } from "react-icons/hi";
import RevealText from "../ui/RevealText";
import MagneticButton from "../ui/MagneticButton";

const stats = [
  { value: "120+", label: "Projects" },
  { value: "50+", label: "Clients" },
  { value: "6+", label: "Years Experience" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-bg py-28 md:py-40">
      <div className="container-x grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line"
        >
          <Image
            src="/images/portrait.svg"
            alt="Portrait of Ebrahim Fadel"
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
        </motion.div>

        <div>
          <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-accent">About</p>
          <RevealText
            text="Stories are built in the edit."
            as="h2"
            className="font-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg font-body text-muted"
          >
            I&apos;m Ebrahim, a video editor and motion designer with six years spent turning raw
            footage into films that hold attention from the first frame. My work spans
            commercials, documentaries, and brand campaigns — always with rhythm, color, and sound
            treated as equal partners to the story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid grid-cols-3 gap-6 border-y border-line py-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl text-white sm:text-4xl">{s.value}</p>
                <p className="mt-1 font-body text-xs uppercase tracking-wider text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <MagneticButton
              as="a"
              href="/cv/ebrahim-fadel-cv.pdf"
              className="gap-2 border border-line text-white hover:border-accent hover:text-accent"
            >
              <HiOutlineDownload className="text-lg" />
              Download CV
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
