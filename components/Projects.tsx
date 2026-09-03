"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineViewGrid, HiOutlineViewList, HiOutlineExternalLink } from "react-icons/hi";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function Projects() {
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );
  const [active, setActive] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-display text-3xl tracking-wide text-white sm:text-4xl">Work</h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              data-cursor="hover"
              aria-label="Grid view"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border text-base transition-colors duration-300",
                view === "grid" ? "border-accent text-accent" : "border-line text-muted hover:text-white"
              )}
            >
              <HiOutlineViewGrid />
            </button>
            <button
              onClick={() => setView("list")}
              data-cursor="hover"
              aria-label="List view"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border text-base transition-colors duration-300",
                view === "list" ? "border-accent text-accent" : "border-line text-muted hover:text-white"
              )}
            >
              <HiOutlineViewList />
            </button>
          </div>
        </div>

        <div className="mb-12 flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              data-cursor="hover"
              className={cn(
                "font-body text-sm capitalize tracking-wide transition-colors duration-300",
                active === cat ? "text-accent" : "text-muted hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((p, i) => (
                <motion.a
                  key={p.id}
                  href={p.driveLink ?? "#work"}
                  target={p.driveLink ? "_blank" : undefined}
                  rel={p.driveLink ? "noopener noreferrer" : undefined}
                  data-cursor="hover"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative block aspect-video overflow-hidden rounded-md border border-line bg-card"
                >
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.25em] text-accent">
                        {p.category}
                      </p>
                      <h3 className="mt-1 font-display text-xl leading-tight text-white">
                        {p.title}
                      </h3>
                    </div>
                    {p.driveLink && (
                      <HiOutlineExternalLink className="mb-1 shrink-0 text-lg text-white/60 transition-colors duration-300 group-hover:text-accent" />
                    )}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="divide-y divide-line border-t border-line"
            >
              {filtered.map((p) => (
                <a
                  key={p.id}
                  href={p.driveLink ?? "#work"}
                  target={p.driveLink ? "_blank" : undefined}
                  rel={p.driveLink ? "noopener noreferrer" : undefined}
                  data-cursor="hover"
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded border border-line">
                      <Image src={p.thumbnail} alt={p.title} fill sizes="120px" className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-white transition-colors duration-300 group-hover:text-accent">
                        {p.title}
                      </h3>
                      <p className="font-body text-xs uppercase tracking-widest text-muted">
                        {p.category}
                      </p>
                    </div>
                  </div>
                  {p.driveLink && (
                    <HiOutlineExternalLink className="shrink-0 text-lg text-white/40 transition-colors duration-300 group-hover:text-accent" />
                  )}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
