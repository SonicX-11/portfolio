"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HiPlay } from "react-icons/hi";
import { Project } from "@/data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        data-cursor="hover"
        className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-lg border border-line bg-card"
      >
        <motion.div
          style={{ transform: "translateZ(40px)" }}
          className="absolute inset-0"
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />

        {/* Glow */}
        <motion.div
          animate={{ opacity: hovered ? 0.35 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute -inset-1 bg-accent blur-3xl"
        />

        <motion.div
          animate={{ scale: hovered ? 1 : 0.6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-bg">
            <HiPlay className="ml-1" />
          </span>
        </motion.div>

        <div style={{ transform: "translateZ(60px)" }} className="absolute inset-x-0 bottom-0 p-6">
          <p className="mb-2 font-body text-[11px] uppercase tracking-[0.3em] text-accent">
            {project.category}
          </p>
          <h3 className="font-display text-2xl leading-tight text-white sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 max-w-xs font-body text-sm text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
