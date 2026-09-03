"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "bg-bg/70 backdrop-blur-md border-b border-line" : "bg-transparent"
        )}
      >
        <nav className="container-x flex h-20 items-center justify-between">
          <a
            href="#home"
            data-cursor="hover"
            className="font-display text-xl tracking-widest text-white"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("#home");
            }}
          >
            E. FADEL
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="hover"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(l.href);
                  }}
                  className="font-body text-sm tracking-wide text-muted transition-colors duration-300 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            data-cursor="hover"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("#contact");
            }}
            className="hidden rounded-full border border-line px-6 py-2.5 font-body text-sm text-white transition-colors duration-300 hover:border-accent hover:text-accent md:inline-block"
          >
            Hire Me
          </a>

          <button
            aria-label="Toggle menu"
            className="text-2xl text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(l.href);
                }}
                className="font-display text-4xl tracking-wide text-white"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
