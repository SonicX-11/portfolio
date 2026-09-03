"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Splits text into words and reveals each with a clipped upward slide.
 * A lightweight, dependency-free stand-in for GSAP SplitText.
 */
export default function RevealText({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.06,
  once = true,
}: RevealTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const Tag = motion[as];

  return (
    <Tag className={cn("inline-block", className)}>
      <motion.span
        className="inline-block"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.6 }}
      >
        {words.map((word, i) => (
          <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
            <motion.span variants={child} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
