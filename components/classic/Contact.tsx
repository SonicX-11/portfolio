"use client";

import {
  HiOutlineMail,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import { FaBehance, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import RevealText from "../ui/RevealText";
import MagneticButton from "../ui/MagneticButton";

const socials = [
  { label: "Email", href: "mailto:hello@ebrahimfadel.com", icon: HiOutlineMail },
  { label: "WhatsApp", href: "https://wa.me/000000000000", icon: HiOutlineChatAlt2 },
  { label: "Behance", href: "https://behance.net", icon: FaBehance },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
];

export default function Contact() {
  return (
    <section id="contact" className="relative bg-bg py-28 md:py-40">
      <div className="container-x flex flex-col items-center text-center">
        <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-accent">
          Let&apos;s Talk
        </p>

        <RevealText
          text="Let's Create Something Amazing"
          as="h2"
          className="max-w-4xl font-display text-4xl leading-[0.95] text-white sm:text-6xl md:text-7xl"
        />

        <p className="mt-8 max-w-md font-body text-muted">
          Have a project in mind? I&apos;m currently booking new work for late 2026 — reach out and
          let&apos;s talk about it.
        </p>

        <div className="mt-10">
          <MagneticButton
            as="a"
            href="mailto:hello@ebrahimfadel.com"
            className="bg-accent px-10 py-5 text-base font-medium text-white hover:bg-white hover:text-bg"
          >
            hello@ebrahimfadel.com
          </MagneticButton>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-5">
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-lg text-white transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
