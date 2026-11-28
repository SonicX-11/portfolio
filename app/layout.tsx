import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic"], weight: ["400", "700"], variable: "--font-playfair", display: "swap" });


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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
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