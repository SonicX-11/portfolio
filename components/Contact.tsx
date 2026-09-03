"use client";

import { FaBehance, FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

const socials = [
  { label: "WhatsApp", href: "https://wa.me/201211871199", icon: FaWhatsapp },
  { label: "Facebook", href: "https://www.facebook.com/EbrahimFadel8", icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/ebrahimfadel_8/", icon: FaInstagram },
  { label: "Behance", href: "https://www.behance.net/iprahemfahmed", icon: FaBehance },
];

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted">Available for</p>
          <p className="mt-2 font-display text-2xl text-white">New projects, right now</p>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted">Email</p>
          <a
            href="mailto:ebrahimfadel93@gmail.com"
            data-cursor="hover"
            className="mt-2 block font-display text-2xl text-white transition-colors duration-300 hover:text-accent"
          >
            ebrahimfadel93@gmail.com
          </a>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted">Elsewhere</p>
          <div className="mt-3 flex items-center gap-4">
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
                  className="text-lg text-white/60 transition-colors duration-300 hover:text-accent"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
