"use client";

import { useEffect, useId, useRef, useState } from "react";

// Displacement map: neutral in the middle, bend at the rim (lens-like refraction).
function buildMap(w: number, h: number, r: number) {
  const ex = Math.min(0.5, 44 / w) * 100;
  const ey = Math.min(0.5, 30 / h) * 100;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>
<linearGradient id="x" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stop-color="rgb(255,0,0)"/><stop offset="${ex}%" stop-color="rgb(128,0,0)"/><stop offset="${100 - ex}%" stop-color="rgb(128,0,0)"/><stop offset="100%" stop-color="rgb(0,0,0)"/></linearGradient>
<linearGradient id="y" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="rgb(0,0,255)"/><stop offset="${ey}%" stop-color="rgb(0,0,128)"/><stop offset="${100 - ey}%" stop-color="rgb(0,0,128)"/><stop offset="100%" stop-color="rgb(0,0,0)"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="rgb(0,128,128)"/>
<rect width="${w}" height="${h}" rx="${r}" fill="url(#x)" style="mix-blend-mode:screen"/>
<rect width="${w}" height="${h}" rx="${r}" fill="url(#y)" style="mix-blend-mode:screen"/></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

export default function LiquidBar({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const barRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const [refract, setRefract] = useState(false);
  const [map, setMap] = useState<{ url: string; w: number; h: number } | null>(null);
  const fid = "lgb" + useId().replace(/:/g, "");
  const hideT = useRef<number | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    setRefract(/Chrome|Chromium|Edg\//.test(ua) && !/CriOS|FxiOS|iPhone|iPad/.test(ua));
  }, []);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const upd = () => {
      const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
      if (w && h) setMap({ url: buildMap(w, h, 24), w, h });
    };
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const showLens = (target: Element | null) => {
    const bar = barRef.current, lens = lensRef.current;
    if (!bar || !lens || !target) return;
    if (hideT.current) window.clearTimeout(hideT.current);
    const b = bar.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    const padX = 10, padY = 6;
    const wasHidden = !lens.classList.contains("on");
    if (wasHidden) lens.style.transition = "opacity .25s ease";
    else lens.style.transition = "";
    lens.style.width = t.width + padX * 2 + "px";
    lens.style.height = t.height + padY * 2 + "px";
    lens.style.transform = `translate(${t.left - b.left - padX}px, ${t.top - b.top - padY}px)`;
    // stretch like a blob while travelling
    lens.classList.remove("stretch");
    void lens.offsetWidth;
    if (!wasHidden) lens.classList.add("stretch");
    lens.classList.add("on");
  };
  const hideLens = () => {
    const lens = lensRef.current;
    if (!lens) return;
    lens.classList.remove("on", "press", "stretch");
  };

  const itemOf = (e: React.SyntheticEvent) => (e.target as HTMLElement).closest("a, button");

  return (
    <nav
      ref={barRef}
      className={`lg-bar ${refract ? "has-refraction" : ""} ${className}`}
      onPointerMove={(e) => {
        const bar = barRef.current;
        if (bar) {
          const r = bar.getBoundingClientRect();
          bar.style.setProperty("--mx", e.clientX - r.left + "px");
          bar.style.setProperty("--my", e.clientY - r.top + "px");
        }
      }}
      onPointerOver={(e) => showLens(itemOf(e))}
      onPointerLeave={hideLens}
      onPointerDown={(e) => {
        const it = itemOf(e);
        if (it) {
          showLens(it);
          lensRef.current?.classList.add("press");
          barRef.current?.classList.add("pressing");
        }
      }}
      onPointerUp={() => {
        lensRef.current?.classList.remove("press");
        barRef.current?.classList.remove("pressing");
        if (barRef.current && window.matchMedia("(hover: none)").matches) {
          hideT.current = window.setTimeout(hideLens, 450);
        }
      }}
      onPointerCancel={() => {
        lensRef.current?.classList.remove("press");
        barRef.current?.classList.remove("pressing");
      }}
    >
      {refract && map && (
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
          <filter id={fid} x="0" y="0" width={map.w} height={map.h} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feImage href={map.url} x="0" y="0" width={map.w} height={map.h} result="m" preserveAspectRatio="none" />
            <feDisplacementMap in="SourceGraphic" in2="m" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </svg>
      )}
      <div
        className="lg-bar__glass"
        style={refract && map ? { backdropFilter: `blur(3px) url(#${fid}) saturate(1.7) brightness(1.12)` } : undefined}
      />
      <div className="lg-bar__shine" />
      <div className="lg-bar__ring" />
      <div className="lg-bar__lens" ref={lensRef} />
      {children}
    </nav>
  );
}
