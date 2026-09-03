"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1600;

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <span className="font-display text-5xl tracking-wide text-white md:text-7xl">
              EBRAHIM FADEL
            </span>
          </motion.div>

          <div className="mt-10 h-px w-56 overflow-hidden bg-white/10 md:w-72">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="mt-4 font-body text-xs tracking-[0.3em] text-muted">
            {String(progress).padStart(3, "0")}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
