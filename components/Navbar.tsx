"use client";

import { motion } from "framer-motion";

const handleNavigate = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <a
          href="#work"
          data-cursor="hover"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("#work");
          }}
          className="font-body text-xs uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:text-white"
        >
          Work
        </a>

        <a
          href="#home"
          data-cursor="hover"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("#home");
          }}
          className="font-display text-lg tracking-widest text-white"
        >
          Ebrahim Fadel
        </a>

        <a
          href="#contact"
          data-cursor="hover"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("#contact");
          }}
          className="font-body text-xs uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:text-white"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
