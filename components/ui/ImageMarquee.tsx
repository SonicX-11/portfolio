"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

interface ImageMarqueeProps {
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

/**
 * A single row of overlapping project stills that scrolls infinitely.
 * Used twice on the home page (top of hero, and again after the bio)
 * the way a personal reel plays the same tape from two angles.
 */
export default function ImageMarquee({
  direction = "left",
  speed = 34,
  className = "",
}: ImageMarqueeProps) {
  const tiles = [...projects, ...projects];

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex shrink-0 items-center gap-4 pr-4"
      >
        {tiles.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="relative h-32 w-48 shrink-0 overflow-hidden rounded-md border border-line sm:h-40 sm:w-60 md:h-48 md:w-72"
          >
            <Image
              src={p.thumbnail}
              alt={p.title}
              fill
              sizes="300px"
              className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
