"use client";

import { HiOutlineArrowUp } from "react-icons/hi";
import { FaBehance, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

const socials = [
  { label: "Behance", href: "https://behance.net", icon: FaBehance },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-line bg-bg py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="font-body text-xs text-muted">
          © {new Date().getFullYear()} Ebrahim Fadel. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                aria-label={s.label}
                className="text-muted transition-colors duration-300 hover:text-accent"
              >
                <Icon />
              </a>
            );
          })}
        </div>

        <button
          onClick={scrollTop}
          data-cursor="hover"
          aria-label="Back to top"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <HiOutlineArrowUp />
        </button>
      </div>
    </footer>
  );
}
