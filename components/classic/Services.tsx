"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import RevealText from "../ui/RevealText";

export default function Services() {
  return (
    <section id="services" className="relative bg-bg py-28 md:py-40">
      <div className="container-x">
        <div className="mb-14 md:mb-20">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-accent">Services</p>
          <RevealText
            text="What I Do"
            as="h2"
            className="font-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ backgroundColor: "#111111" }}
                className="group relative bg-bg p-8 transition-colors duration-300 md:p-10"
              >
                <Icon className="mb-8 text-3xl text-accent transition-transform duration-500 group-hover:-translate-y-1" />
                <h3 className="font-display text-2xl tracking-wide text-white">{service.title}</h3>
                <p className="mt-3 font-body text-sm text-muted">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
