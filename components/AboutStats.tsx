"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Years Experience", value: 4, suffix: "+", max: 5, color: "#B600A8", detail: "Across Premiere Pro, After Effects & DaVinci Resolve" },
  { label: "Videos Delivered", value: 350, suffix: "+", max: 400, color: "#31A8FF", detail: "Reels, commercials & cinematic cuts" },
  { label: "Brands & Creators", value: 20, suffix: "+", max: 25, color: "#FF9A00", detail: "Creators, coaches & brands edited for" },
  { label: "Retention Growth", value: 45, suffix: "%", max: 100, color: "#2ECC71", detail: "Higher watch-time on client videos" },
];

const apps = [
  { name: "Premiere Pro", tag: "Post-Production & Cutting", icon: "Pr", color: "#EA77FF" },
  { name: "After Effects", tag: "Transitions & Text Animation", icon: "Ae", color: "#9999FF" },
  { name: "DaVinci Resolve", tag: "Color Grading & Mastering", icon: "Da", color: "#FF6B3D" },
  { name: "Photoshop", tag: "High-CTR Thumbnails", icon: "Ps", color: "#31A8FF" },
];

const pts: [number, number][] = [
  [30, 150], [55, 112], [75, 118], [95, 108], [115, 124], [135, 104], [155, 114], [175, 130],
  [195, 112], [215, 124], [235, 96], [255, 108], [275, 84], [295, 92], [315, 66], [335, 70], [355, 40], [375, 22],
];
// which line point carries each stat marker
const markers = [2, 7, 12, 17];
const linePath = "M" + pts.map((p) => p.join(",")).join(" L");

export function StatsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<number>(3);
  const cur = stats[active];

  return (
    <div ref={ref} className="pt-6 border-t border-white/10 mb-8">
      <div className="rounded-2xl bg-black border border-white/10 p-3 sm:p-4">
        <svg viewBox="0 0 400 190" className="w-full h-auto" role="img" aria-label="Growth graph">
          <defs>
            <filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path d="M20,10 V170 H390" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" filter="url(#neon)" />
          <motion.path
            d={linePath}
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#neon)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
          />
          {markers.map((m, i) => {
            const [x, y] = pts[m];
            const on = active === i;
            const last = i === markers.length - 1;
            return (
              <g key={i} style={{ cursor: "pointer" }} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}>
                <circle cx={x} cy={y} r="16" fill="transparent" />
                <motion.circle
                  cx={x}
                  cy={y}
                  fill={last ? "#ff1a1a" : stats[i].color}
                  filter="url(#neon)"
                  initial={{ r: 0 }}
                  animate={{ r: inView ? (on ? 8 : 5.5) : 0 }}
                  transition={{ duration: 0.4, delay: inView ? 0.5 + i * 0.6 : 0 }}
                />
                {on && <circle cx={x} cy={y} r="11" fill="none" stroke={stats[i].color} strokeWidth="1.5" />}
              </g>
            );
          })}
        </svg>
        <div className="grid grid-cols-4 gap-1.5 mt-2">
          {stats.map((s, i) => {
            const on = active === i;
            return (
              <button
                key={s.label}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="text-center rounded-xl py-2 px-1 border transition-colors"
                style={{ borderColor: on ? s.color : "rgba(255,255,255,0.08)", background: on ? `${s.color}1f` : "transparent" }}
              >
                <div className="text-base sm:text-xl font-black font-mono" style={{ color: s.color, textShadow: `0 0 10px ${s.color}` }}>
                  {s.value}{s.suffix}
                </div>
                <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-white/60 leading-tight mt-0.5">{s.label}</div>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-white/60 text-center pt-2 min-h-[1.5rem]">{cur.detail}</p>
      </div>
    </div>
  );
}

export function AppsRow() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {apps.map((a, i) => {
        const on = active === i;
        return (
          <div
            key={a.name}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(on ? null : i)}
            className="relative overflow-hidden p-3 rounded-2xl bg-white/[0.02] border flex flex-col items-center text-center cursor-pointer transition-colors"
            style={{ borderColor: on ? a.color : `${a.color}44` }}
          >
            <motion.span
              aria-hidden
              className="absolute inset-0"
              style={{ background: `${a.color}22`, transformOrigin: "right" }}
              initial={false}
              animate={{ scaleX: on ? 1 : 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
            <span
              className="relative w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center mb-2"
              style={{ background: `${a.color}2e`, border: `1px solid ${a.color}88`, color: a.color }}
            >
              {a.icon}
            </span>
            <h4 className="relative text-white text-xs font-semibold">{a.name}</h4>
            <p className="relative text-[10px] text-white/50 mt-0.5 leading-tight">{a.tag}</p>
            <motion.span
              aria-hidden
              className="absolute bottom-0 right-0 h-[3px] w-full"
              style={{ background: a.color, transformOrigin: "right" }}
              initial={false}
              animate={{ scaleX: on ? 1 : 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        );
      })}
    </div>
  );
}
