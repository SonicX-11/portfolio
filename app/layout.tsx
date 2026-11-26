import type { Metadata } from "next";
import "./globals.css";

const timelineFavicon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="%230B0B0E"/><rect x="6" y="14" width="52" height="9" rx="2.5" fill="%23FF007F"/><rect x="6" y="26" width="23" height="9" rx="2.5" fill="%2300E5FF"/><rect x="32" y="26" width="26" height="9" rx="2.5" fill="%23FF9100"/><rect x="6" y="38" width="52" height="9" rx="2.5" fill="%2300E676"/><line x1="28" y1="8" x2="28" y2="56" stroke="%23FFFFFF" stroke-width="4"/><polygon points="24,6 32,6 28,12" fill="%2300E5FF"/></svg>`;

const SITE_URL = "https://portfolio-two-ashen-80.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Lil Media",
  alternateName: ["Lil", "Ebrahim Fadel", "Lil Media Video Editing"],
  description:
    "Video editing and motion graphics for short-form reels, YouTube and brand content. Packages from 500 EGP per video.",
  url: SITE_URL,
  image: SITE_URL + "/images/avatar.png",
  areaServed: ["Egypt", "Saudi Arabia", "Middle East"],
  serviceType: ["Video editing", "Reels editing", "Motion graphics"],
  founder: { "@type": "Person", name: "Ebrahim Fadel" },
  sameAs: ["https://www.instagram.com/ebrahimfadel_8/"],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lil Media | Video Editing & Motion Graphics by Ebrahim Fadel",
    template: "%s",
  },
  description:
    "Lil Media: professional video editor in Egypt for reels, YouTube and brand videos. High-retention editing, subtitles, color and motion graphics. Packages from 500 EGP per video. | مونتاج فيديو احترافي",
  keywords: [
    "Lil Media",
    "Lil video editor",
    "Ebrahim Fadel",
    "video editor Egypt",
    "video editing services",
    "reels editing",
    "motion graphics",
    "مونتير",
    "مونتاج فيديو",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Lil Media",
    title: "Lil Media | Video Editing & Motion Graphics",
    description:
      "Professional video editing for reels, YouTube and brands. Packages from 500 EGP per video.",
    images: [{ url: "/images/avatar.png" }],
  },
  twitter: {
    card: "summary",
    title: "Lil Media | Video Editing & Motion Graphics",
    description: "Professional video editing for reels, YouTube and brands.",
  },
  icons: {
    icon: [
      {
        url: timelineFavicon,
        type: "image/svg+xml",
      },
    ],
    shortcut: timelineFavicon,
    apple: timelineFavicon,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={timelineFavicon} type="image/svg+xml" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}