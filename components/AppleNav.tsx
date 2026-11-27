"use client";

import { useEffect, useId, useRef, useState } from "react";

export type AppleNavItem = {
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

type Props = {
  items: AppleNavItem[];
  current?: string;
  onWorkflow?: () => void;
  brandHref?: string;
};

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/ebrahimfadel_8/" },
  { label: "WhatsApp", href: "https://wa.me/201211871199" },
  { label: "Email", href: "mailto:ebrahimfadel8903@gmail.com" },
];

// Displacement map: neutral in the middle, strong bend at the rim (lens-like refraction).
function buildMap(w: number, h: number) {
  const r = h / 2;
  const edgeX = Math.min(0.5, (h * 0.55) / w) * 100;
  const edgeY = 38;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>
<linearGradient id="x" x1="0" x2="1" y1="0" y2="0">
<stop offset="0%" stop-color="rgb(255,0,0)"/><stop offset="${edgeX}%" stop-color="rgb(128,0,0)"/>
<stop offset="${100 - edgeX}%" stop-color="rgb(128,0,0)"/><stop offset="100%" stop-color="rgb(0,0,0)"/>
</linearGradient>
<linearGradient id="y" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="rgb(0,0,255)"/><stop offset="${edgeY}%" stop-color="rgb(0,0,128)"/>
<stop offset="${100 - edgeY}%" stop-color="rgb(0,0,128)"/><stop offset="100%" stop-color="rgb(0,0,0)"/>
</linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="rgb(0,128,128)"/>
<rect width="${w}" height="${h}" rx="${r}" fill="url(#x)" style="mix-blend-mode:screen"/>
<rect width="${w}" height="${h}" rx="${r}" fill="url(#y)" style="mix-blend-mode:screen"/>
</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

export default function AppleNav({ items, current, onWorkflow, brandHref = "/" }: Props) {
  const [open, setOpen] = useState(false);
  const [refract, setRefract] = useState(false);
  const [mapUrl, setMapUrl] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const pillRef = useRef<HTMLDivElement>(null);
  const fid = "lg" + useId().replace(/:/g, "");

  useEffect(() => {
    const ua = navigator.userAgent;
    const chromium = /Chrome|Chromium|Edg\//.test(ua) && !/CriOS|FxiOS|iPhone|iPad/.test(ua);
    setRefract(chromium);
  }, []);

  useEffect(() => {
    const el = pillRef.current;
    if (!el) return;
    const upd = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      if (w && h) {
        setSize({ w, h });
        setMapUrl(buildMap(w, h));
      }
    };
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => window.innerWidth > 833 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={`lg-nav ${open ? "is-open" : ""} ${refract ? "has-refraction" : ""}`} dir="ltr">
      {refract && mapUrl && (
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
          <filter id={fid} x="0" y="0" width={size.w} height={size.h} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feImage href={mapUrl} x="0" y="0" width={size.w} height={size.h} result="map" preserveAspectRatio="none" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="34" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </svg>
      )}

      <div className="lg-pill" ref={pillRef}>
        <div
          className="lg-glass"
          style={refract && mapUrl ? { backdropFilter: `blur(3px) url(#${fid}) saturate(1.7) brightness(1.12)` } : undefined}
        />
        <div className="lg-ring" />
        <div className="lg-content">
          <a href={brandHref} className="lg-brand" aria-label="Lil Media home">
            Lil<span> Media</span>
          </a>

          <nav className="lg-links" aria-label="Main">
            {items.map((it) => (
              <a key={it.label} href={it.href} onClick={it.onClick} className={current === it.label ? "is-current" : ""}>
                {it.label}
              </a>
            ))}
            {onWorkflow && (
              <button type="button" onClick={onWorkflow}>
                Workflow
              </button>
            )}
          </nav>

          <div className="lg-actions">
            <a href="https://wa.me/201211871199" target="_blank" rel="noopener noreferrer" className="lg-cta">
              Book
            </a>
            <button
              type="button"
              className="lg-burger"
              aria-label={open ? "Close menu" : "Menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div className="lg-panel" aria-hidden={!open}>
        <div className="lg-panel__inner">
          <div className="lg-glass lg-glass--panel" />
          <div className="lg-ring" />
          <ul>
            {items.map((it, i) => (
              <li key={it.label} style={{ transitionDelay: open ? `${90 + i * 45}ms` : "0ms" }}>
                <a
                  href={it.href}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => {
                    setOpen(false);
                    it.onClick?.(e);
                  }}
                >
                  {it.label}
                </a>
              </li>
            ))}
            {onWorkflow && (
              <li style={{ transitionDelay: open ? `${90 + items.length * 45}ms` : "0ms" }}>
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => {
                    setOpen(false);
                    onWorkflow();
                  }}
                >
                  Workflow
                </button>
              </li>
            )}
          </ul>
          <div className="lg-panel__foot">
            {socials.map((s) => (
              <a key={s.label} href={s.href} tabIndex={open ? 0 : -1} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="lg-scrim" onClick={() => setOpen(false)} />
    </header>
  );
}
