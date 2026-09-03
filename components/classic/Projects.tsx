"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import RevealText from "../ui/RevealText";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Commercial",
  "Documentary",
  "Real Estate",
  "Social Media",
  "Podcast",
  "Luxury Brand",
  "Sports",
] as const;

export default function Projects() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="projects" className="relative bg-bg py-28 md:py-40">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-accent">
              Featured Work
            </p>
            <RevealText
              text="Selected Projects"
              as="h2"
              className="font-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                data-cursor="hover"
                className={cn(
                  "rounded-full border px-4 py-2 font-body text-xs tracking-wide transition-colors duration-300",
                  active === cat
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-line text-muted hover:border-white/30 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
