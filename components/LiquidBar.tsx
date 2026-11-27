"use client";

import { useEffect, useId, useRef, useState } from "react";

// Displacement map: neutral in the middle, bend at the rim (lens-like refraction).
function buildMap(w: number, h: number, r: number, lens?: boolean) {
  if (lens) {
    // Thick-lens map: gentle magnification in the middle, strong bending at the rim.
    const amp = Math.min(1, (h / w) * 0.7);
    const hi = Math.round(128 + 127 * amp), lo = Math.round(128 - 128 * amp);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>
<linearGradient id="x" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stop-color="rgb(255,0,0)"/><stop offset="10%" stop-color="rgb(185,0,0)"/><stop offset="30%" stop-color="rgb(148,0,0)"/><stop offset="50%" stop-color="rgb(128,0,0)"/><stop offset="70%" stop-color="rgb(108,0,0)"/><stop offset="90%" stop-color="rgb(71,0,0)"/><stop offset="100%" stop-color="rgb(0,0,0)"/></linearGradient>
<linearGradient id="y" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="rgb(0,0,${hi})"/><stop offset="12%" stop-color="rgb(0,0,${Math.round(128 + (hi - 128) * 0.6)})"/><stop offset="50%" stop-color="rgb(0,0,128)"/><stop offset="88%" stop-color="rgb(0,0,${Math.round(128 - (128 - lo) * 0.6)})"/><stop offset="100%" stop-color="rgb(0,0,${lo})"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="rgb(0,0,0)"/>
<rect width="${w}" height="${h}" rx="${r}" fill="url(#x)" style="mix-blend-mode:screen"/>
<rect width="${w}" height="${h}" rx="${r}" fill="url(#y)" style="mix-blend-mode:screen"/></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  const ex = Math.min(0.5, 44 / w) * 100;
  const ey = Math.min(0.5, 30 / h) * 100;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>
<linearGradient id="x" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stop-color="rgb(255,0,0)"/><stop offset="${ex}%" stop-color="rgb(128,0,0)"/><stop offset="${100 - ex}%" stop-color="rgb(128,0,0)"/><stop offset="100%" stop-color="rgb(0,0,0)"/></linearGradient>
<linearGradient id="y" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="rgb(0,0,255)"/><stop offset="${ey}%" stop-color="rgb(0,0,128)"/><stop offset="${100 - ey}%" stop-color="rgb(0,0,128)"/><stop offset="100%" stop-color="rgb(0,0,0)"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="rgb(0,0,0)"/>
<rect width="${w}" height="${h}" rx="${r}" fill="url(#x)" style="mix-blend-mode:screen"/>
<rect width="${w}" height="${h}" rx="${r}" fill="url(#y)" style="mix-blend-mode:screen"/></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

export default function LiquidBar({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const barRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lfRef = useRef<SVGFilterElement>(null);
  const lmRef = useRef<SVGFEImageElement>(null);
  const lensDispRefs = useRef<SVGFEDisplacementMapElement[]>([]);
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
        const bar2 = bar.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    const t = { left: tr.left - bar2.left - bar.clientLeft, top: tr.top - bar2.top - bar.clientTop, width: tr.width, height: tr.height };
    const isIcon = !!(target as HTMLElement).getAttribute('aria-label');
    const padX = isIcon ? 6 : 16, padY = isIcon ? 6 : 9;
    const wasHidden = !lens.classList.contains("on");
    if (wasHidden) lens.style.transition = "opacity .25s ease";
    else lens.style.transition = "";
    lens.style.width = t.width + padX * 2 + "px";
    lens.style.height = t.height + padY * 2 + "px";
    const lw = Math.round(t.width + padX * 2), lh = Math.round(t.height + padY * 2);
    const lf = lfRef.current, lm = lmRef.current;
    if (lf && lm) {
      lf.setAttribute('width', String(lw)); lf.setAttribute('height', String(lh));
      lm.setAttribute('width', String(lw)); lm.setAttribute('height', String(lh));
      lm.setAttribute('href', buildMap(lw, lh, lh / 2, true));
      const sc = lw * 0.3;
      lensDispRefs.current.forEach((d, i) => d && d.setAttribute('scale', String(sc * (1 - i * 0.12))));
    }
    lens.style.transform = `translate(${t.left - padX}px, ${t.top - padY}px)`;
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
      {refract && (
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
          <filter ref={lfRef} id={fid + "L"} x="0" y="0" width="100" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feImage ref={lmRef} x="0" y="0" width="100" height="40" result="m" preserveAspectRatio="none" />
            <feDisplacementMap ref={(e) => { if (e) lensDispRefs.current[0] = e; }} in="SourceGraphic" in2="m" scale="30" xChannelSelector="R" yChannelSelector="B" result="dr" />
            <feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feDisplacementMap ref={(e) => { if (e) lensDispRefs.current[1] = e; }} in="SourceGraphic" in2="m" scale="27" xChannelSelector="R" yChannelSelector="B" result="dg" />
            <feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feDisplacementMap ref={(e) => { if (e) lensDispRefs.current[2] = e; }} in="SourceGraphic" in2="m" scale="24" xChannelSelector="R" yChannelSelector="B" result="db" />
            <feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b" mode="screen" />
          </filter>
        </svg>
      )}
      <div
        className="lg-bar__glass"
        style={refract && map ? { backdropFilter: `blur(3px) url(#${fid}) saturate(1.7) brightness(1.12)` } : undefined}
      />
      <div className="lg-bar__shine" />
      <div className="lg-bar__ring" />
      <div className="lg-bar__lens" ref={lensRef} style={refract ? { backdropFilter: `url(#${fid}L) saturate(1.35) brightness(1.12)` } : undefined} />
      {children}
    </nav>
  );
}
