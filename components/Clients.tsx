"use client";

import { motion } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import { clients } from "@/data/clients";

const clientsDriveLink = "https://drive.google.com/drive/folders/1gDoMkmJDDOD99Frtz7U1ER5ikXaM3tPT";

export default function Clients() {
  const loop = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden py-16">
      <div className="container-x mb-10 flex items-center justify-center gap-3">
        <p className="text-center font-body text-xs uppercase tracking-[0.4em] text-muted">
          Trusted By
        </p>
        <a
          href={clientsDriveLink}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="flex items-center gap-1 font-body text-xs uppercase tracking-widest text-accent transition-colors duration-300 hover:text-white"
        >
          View all clients <HiOutlineExternalLink />
        </a>
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
