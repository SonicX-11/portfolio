# Ebrahim Fadel — Portfolio Website

A cinematic, dark-luxury portfolio built for **Ebrahim Fadel**, Senior Video Editor & Motion
Designer. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP, and
Lenis smooth scroll.

## Stack

- **Next.js 15** (App Router, RSC)
- **TypeScript**
- **Tailwind CSS** — custom dark-luxury design tokens (`#090909` background, `#FF5A1F` accent)
- **Framer Motion** — scroll reveals, page transitions, magnetic buttons, 3D tilt cards
- **GSAP** — installed and ready for any additional timeline work (`gsap` is in `package.json`)
- **Lenis** — buttery smooth scrolling
- **react-icons** — iconography
- Custom cursor, animated loading screen, infinite marquees, glassmorphism testimonials

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note on fonts:** the project uses `next/font/google` to load Bebas Neue and Inter at build
> time, which requires an internet connection the first time you run `npm run dev` or
> `npm run build`. This is normal for any Next.js project using Google Fonts and will work on any
> machine (or CI/deploy target) with normal internet access.

## Production build

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx        Root layout: fonts, metadata/SEO, cursor, loading screen, Lenis provider
  page.tsx           Assembles all sections
  globals.css         Design tokens, grain overlay, scrollbar, selection styles
  robots.ts / sitemap.ts   SEO routes
components/
  Navbar.tsx          Transparent → blurred sticky nav with mobile menu
  Hero.tsx             Full-screen video hero, particles, parallax, scroll-linked zoom
  About.tsx             Portrait, bio, stats, CV download
  Projects.tsx / ProjectCard.tsx   Filterable grid, 3D tilt, glow, hover reveal
  Showreel.tsx           Custom video player with play/fullscreen controls
  Services.tsx            Icon grid, staggered reveal
  Software.tsx             Infinite marquee of tools (text wordmarks)
  Experience.tsx            Animated vertical timeline
  Clients.tsx                Infinite scrolling logo/name marquee
  Testimonials.tsx           Glassmorphism slider
  Contact.tsx                  CTA + social links
  Footer.tsx                    Minimal footer + back-to-top
  CustomCursor.tsx               Dot + lagging ring cursor (desktop only)
  LoadingScreen.tsx                Animated intro with progress bar
  ui/MagneticButton.tsx             Reusable magnetic-hover button
  ui/RevealText.tsx                 Word-by-word clipped text reveal
data/
  projects.ts, services.ts, software.ts, experience.ts, testimonials.ts, clients.ts
lib/
  SmoothScroll.tsx    Lenis provider, synced to requestAnimationFrame
  utils.ts             `cn()` classnames helper
```

## Replacing placeholder media

This repo ships with **generated placeholder SVGs** (labelled, on-brand palette) so the site
renders correctly out of the box with no broken images. Swap these for real assets before
shipping:

| What | Path | Used in |
|---|---|---|
| Hero background video | `public/video/showreel-bg.mp4` | `Hero.tsx` |
| Showreel video | `public/video/showreel.mp4` | `Showreel.tsx` |
| Hero poster frame | `public/images/hero-poster.svg` → replace with `.jpg`/`.webp` | `Hero.tsx` |
| Showreel poster frame | `public/images/showreel-poster.svg` | `Showreel.tsx` |
| Portrait photo | `public/images/portrait.svg` | `About.tsx` |
| Project thumbnails | `public/images/projects/*.svg` | `data/projects.ts` |
| Testimonial avatars | `public/images/testimonials/*.svg` | `data/testimonials.ts` |
| CV / résumé PDF | `public/cv/ebrahim-fadel-cv.pdf` (add the file) | `About.tsx` |
| Open Graph cover image | `public/images/og-cover.jpg` (add the file) | `app/layout.tsx` |

Update contact links, social URLs (`components/Contact.tsx`, `components/Footer.tsx`), and the
`metadataBase` URL in `app/layout.tsx` to the real production domain.

## Editing content

Everything text-based (projects, services, timeline, testimonials, client list, software list)
lives in `data/*.ts` — no need to touch component code to update copy.

## Deployment

### Vercel (recommended)
1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected). No environment variables required.
4. Deploy — Vercel handles image optimization, edge caching, and SSR out of the box.

### Any Node host (Netlify, Render, a VPS, etc.)
```bash
npm install
npm run build
npm run start   # serves on port 3000 by default
```
Ensure the host allows outbound requests to `fonts.googleapis.com` at build time, or switch
`app/layout.tsx` to self-hosted font files if the build environment has no internet access.

## Performance & accessibility notes

- Images use `next/image` with responsive `sizes` for automatic optimization and lazy loading.
- Semantic landmarks (`header`, `main`, `section`, `footer`) and labelled interactive controls
  throughout.
- `prefers-reduced-motion` is respected globally (see `app/globals.css`).
- The custom cursor and grain overlay are disabled on touch devices automatically.
- Route-level code is already split by Next.js's App Router; heavier libraries (GSAP) are only
  imported where used.

## Known scope notes

- **Three.js** was intentionally left out of the base build (the brief marked it optional) to
  keep the bundle lean; the structure supports adding a WebGL hero background later if desired.
- Software and client "logos" are rendered as styled wordmarks rather than actual brand marks, to
  avoid shipping placeholder trademarked logos — drop in real SVGs from each brand's press kit if
  needed.

## Two designs in this repo

- **`/` (home)** — the current, editorial/personal redesign: minimal text nav, a scrolling image
  collage, a narrative bio with inline links, and a Work section with filterable video-thumbnail
  cards (grid/list toggle) that open straight to an external link (e.g. Google Drive) in a new
  tab.
- **`/classic`** — the original "Dark Luxury / Awwwards" layout (full hero video, 3D-tilt project
  cards, services grid, timeline, testimonials slider) is kept exactly as built, untouched, at
  this route in case you want to go back to it or compare the two.

Both share the same design tokens, data files, and UI primitives (`components/ui/`), so editing
`data/projects.ts` updates both versions at once.

## Drive links on project cards

Each project in `data/projects.ts` has an optional `driveLink`. When set, clicking that project's
card (in `/` Work section) opens the link directly in a new tab — no video needs to be uploaded to
the site itself.

The six links you shared are wired in, **in the order you sent them**, against the seven sample
projects:

```
Velour              → drive folder 1 (19tGAv...)
Concrete & Light     → drive folder 2 (1R-OdY...)
Meridian Towers       → drive folder 3 (1XBqXV...)
Nightshift             → drive folder 4 (1BVKkw...)
Off Record             → msi.mp4 file link
Halcyon Watches         → second file link
Match Day: Origins       → (no link yet — only 6 links were provided for 7 projects)
```

**This mapping is a guess** — I don't actually know which folder/file corresponds to which real
project of yours. Open `data/projects.ts` and re-order the `driveLink` values (and the
`title`/`category`/`description` text) to match your real project names and files; the file names
themselves (`msi.mp4`, etc.) are left untouched as you asked.

Also make sure every Drive folder/file's sharing setting is **"Anyone with the link"** — otherwise
visitors clicking through will hit a sign-in wall instead of your work.
