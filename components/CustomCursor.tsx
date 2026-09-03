"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal dot + trailing ring cursor. Ring lags the dot with a lerp
 * for a "magnetic" feel. Hidden entirely on touch devices via CSS.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const onDown = () => ring.classList.add("scale-75", "bg-accent/20");
    const onUp = () => ring.classList.remove("scale-75", "bg-accent/20");

    const onEnterInteractive = () => ring.classList.add("scale-[1.8]", "border-accent");
    const onLeaveInteractive = () => ring.classList.remove("scale-[1.8]", "border-accent");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const interactiveEls = document.querySelectorAll("a, button, [data-cursor='hover']");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    let rafId: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 flex h-6 w-6 items-center justify-center rounded-[6px] bg-accent shadow-[0_0_10px_rgba(255,90,31,0.6)]"
        style={{ willChange: "transform" }}
      >
        <span className="font-body text-[9px] font-bold leading-none tracking-tight text-bg">
          Pr
        </span>
      </div>
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-white/40 transition-[transform,background-color,border-color] duration-200 ease-out"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
