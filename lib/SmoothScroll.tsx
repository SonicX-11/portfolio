"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Wraps the app in a Lenis smooth-scroll instance and drives it
 * from requestAnimationFrame. Also exposes the instance on
 * window so GSAP ScrollTrigger (or any other script) can sync to it.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    // @ts-expect-error - expose for other scripts (e.g. GSAP ScrollTrigger)
    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    let rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // @ts-expect-error - cleanup
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
