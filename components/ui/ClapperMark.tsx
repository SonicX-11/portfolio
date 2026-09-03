"use client";

import { motion } from "framer-motion";

/**
 * A small looping clapperboard mark — the signature illustrated element,
 * standing in for a mascot but drawn from the subject's own world
 * (video editing) rather than any borrowed character.
 */
export default function ClapperMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Animated clapperboard"
    >
      <rect x="10" y="34" width="100" height="76" rx="6" fill="#111111" stroke="#FF5A1F" strokeWidth="2" />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x={10 + i * 20} y="34" width="10" height="18" fill={i % 2 === 0 ? "#FFFFFF" : "#FF5A1F"} />
      ))}
      <motion.g
        style={{ transformOrigin: "12px 34px" }}
        animate={{ rotate: [0, -22, 0] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", repeatDelay: 1.4 }}
      >
        <rect x="10" y="14" width="100" height="20" rx="4" fill="#111111" stroke="#FF5A1F" strokeWidth="2" />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={10 + i * 20} y="14" width="10" height="20" fill={i % 2 === 0 ? "#FF5A1F" : "#FFFFFF"} />
        ))}
      </motion.g>
      <circle cx="60" cy="72" r="18" fill="none" stroke="#A1A1A1" strokeWidth="1.5" />
      <path d="M60 62 L68 72 L60 82 L52 72 Z" fill="#FF5A1F" />
    </svg>
  );
}
