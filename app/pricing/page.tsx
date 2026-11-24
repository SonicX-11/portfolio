import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Ebrahim Fadel",
  description: "Video editing packages and rates for Ebrahim Fadel.",
};

const packagesData = [
  {
    id: "01",
    name: "The Spark Pack",
    subtitle: "Clean & Fast-Paced Cut",
    priceUSD: "$10",
    priceEGP: "500 EGP",
    featured: false,
    revisions: "1 Free Revision per video based on feedback",
    driveLink: "https://drive.google.com/file/d/1Y97S6qk9JqmONHOk-BQcj1XO1piaa0KT/view?usp=drive_link",
    features: [
      "Dynamic cutting eliminating dead spaces to ensure fluid rhythm",
      "Clean, readable, color-coded subtitles matching voice tempo",
      "Essential Color Correction paired with balanced background music",
    ],
  },
  {
    id: "02",
    name: "The Viral Growth",
    subtitle: "High Retention & Engaging",
    priceUSD: "$17",
    priceEGP: "850 EGP",
    featured: true,
    revisions: "Up to 2 Revisions per video",
    driveLink: "https://drive.google.com/file/d/1WtLRXTR_r5RQPndULSfyAwIqst8j7YYX/view?usp=drive_link",
    features: [
      "Retention-first pacing calculated to maximize completion rates",
      "Dynamic Pop-up Subtitles reacting rhythmically to vocal emphasis",
      "Visual zooms, sound design impacts, risers, and Foley FX",
      "Supporting B-roll and curated stock footage integration",
    ],
  },
  {
    id: "03",
    name: "Cinematic Prime",
    subtitle: "Commercial & Brand Showcase",
    priceUSD: "$24",
    priceEGP: "1,200 EGP",
    featured: false,
    revisions: "Up to 3 Revisions per video",
    driveLink: "https://drive.google.com/file/d/19usAUA3dCWM4rYtLkX557m793uyGFLnW/view?usp=drive_link",
    features: [
      "Bespoke cinematic pacing tailored for corporate brands and creators",
      "Full brand identity adaptation (typography, vectors, palette)",
      "Dynamic visual framing and pacing elevating core message impact",
      "Deep cinematic Color Grading + immersive multi-layer sound mastering",
    ],
  },
];

const generalTerms = [
  {
    title: "Deposit & Payment Milestones",
    desc: "A 25% upfront deposit is required prior to project start. The remaining 75% balance is settled upon final approval before delivery of unwatermarked master exports.",
  },
  {
    title: "Short Video Duration",
    desc: "Listed rates apply specifically to short-form reels and TikToks with a total duration not exceeding 60 seconds.",
  },
  {
    title: "Scheduled Batch Delivery",
    desc: "Deliveries are organized in clear, pre-scheduled batches agreed in advance to preserve craft precision and streamline production.",
  },
  {
    title: "Revisions Policy",
    desc: "Please respect the revision allocation per tier. Any additional revision rounds beyond this scope are accommodated at a minor pre-agreed rate.",
  },
  {
    title: "Raw Footage Submission",
    desc: "Source footage should be uploaded in full native resolution via neatly organized Google Drive or WeTransfer links.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <nav className="container-x flex h-20 items-center justify-between gap-3 border-b border-white/5">
        <Link href="/" className="whitespace-nowrap font-display text-base tracking-widest text-white sm:text-lg">
          Ebrahim Fadel
        </Link>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/70 sm:gap-5 sm:text-xs sm:tracking-[0.25em]">
          <Link href="/#videos" className="transition-colors hover:text-white">
            Videos
          </Link>
          <Link href="/pricing" className="text-white">
            Pricing
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-white">
            Contact
          </Link>
        </div>
      </nav>

      <section className="px-5 py-20 sm:px-8 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#B600A8]">
              Video Editing Packages
            </p>
            <h1 className="hero-heading mt-3 text-5xl font-black uppercase sm:text-6xl md:text-7xl">
              Rates & Packages
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm font-light text-[#D7E2EA]/65 sm:text-base">
              Transparent video production rates in EGP, with the matching USD rate shown on each package.
            </p>
          </div>

          <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7E2EA]/45 lg:hidden">
            Swipe to compare packages
          </p>
          <div className="mb-16 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto pb-5 no-scrollbar lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0">
            {packagesData.map((pkg) => (
              <article
                key={pkg.id}
                className={`relative flex w-[86vw] max-w-[420px] shrink-0 snap-center flex-col justify-between rounded-[36px] p-8 text-center backdrop-blur-2xl transition-all duration-300 lg:w-full lg:max-w-none lg:shrink ${
                  pkg.featured
                    ? "border-2 border-[#B600A8] bg-gradient-to-b from-[#18011F]/90 to-[#121212]/90 shadow-[0_0_40px_rgba(182,0,168,0.25)]"
                    : "border border-white/10 bg-white/[0.03] shadow-2xl hover:border-white/25"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 animate-blink whitespace-nowrap rounded-full bg-[#B600A8] px-5 py-1.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(182,0,168,0.55)] sm:text-sm">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="mb-4 flex flex-col items-center gap-1">
                    <span className="font-mono text-xs font-bold text-white/35">{pkg.id}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{pkg.name}</h2>
                      <p className="mt-1 text-sm text-[#D7E2EA]/70">{pkg.subtitle}</p>
                    </div>
                  </div>

                  <div className="my-6 border-b border-white/10 pb-6">
                    <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
                      <span className="whitespace-nowrap text-4xl font-black text-white sm:text-5xl lg:text-[2.6rem] xl:text-[2.6rem] 2xl:text-[2.6rem]">
                        {pkg.priceEGP}
                      </span>
                      <span className="whitespace-nowrap text-sm font-medium uppercase tracking-wider text-[#D7E2EA]/60">
                        / Video
                      </span>
                    </div>
                    <div className="mt-1 text-sm font-bold text-[#B600A8]">≈ {pkg.priceUSD} / Video</div>
                  </div>

                  <ul className="mb-8 space-y-4">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start justify-center gap-2 text-center text-sm font-light leading-relaxed text-[#D7E2EA]/80"
                      >
                        <span className="mt-0.5 inline-block select-none text-base text-[#B600A8]">✦</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
                  <p className="text-center font-mono text-xs font-medium text-[#D7E2EA]/50">
                    {pkg.revisions}
                  </p>
                  <a
                    href={pkg.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-full border border-[#B600A8]/60 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#D7E2EA] shadow-md transition-colors hover:bg-[#B600A8]/20"
                  >
                    ▶ Watch Video Sample
                  </a>
                  <a
                    href={`/payment.html?package=${encodeURIComponent(pkg.name)}`}
                    className={`block w-full rounded-full py-3.5 text-center text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
                      pkg.featured
                        ? "bg-[#B600A8] text-white shadow-lg shadow-[#B600A8]/30 hover:bg-[#9d0091]"
                        : "border border-white/20 text-white shadow-md hover:bg-white/10"
                    }`}
                  >
                    Book This Package
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl sm:p-12">
            <div className="mb-8 flex flex-col items-center gap-2 text-center">
              <span className="text-xl text-[#B600A8]">✦</span>
              <h2 className="text-2xl font-bold uppercase tracking-wide">General Terms</h2>
            </div>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0">
              {generalTerms.map((term, index) => (
                <div
                  key={term.title}
                  className={`w-[82vw] max-w-[360px] shrink-0 snap-center rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:w-auto md:max-w-none md:shrink ${
                    index === 0 ? "border-[#B600A8]/30 bg-[#B600A8]/5 md:col-span-2" : ""
                  }`}
                >
                  <h3 className="mb-2 flex flex-wrap items-center justify-center gap-2 text-center text-lg font-semibold text-white">
                    <span className="font-mono text-xs text-[#B600A8]">0{index + 1}.</span>
                    {term.title}
                  </h3>
                  <p className="text-center text-sm font-light leading-relaxed text-[#D7E2EA]/70">{term.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
