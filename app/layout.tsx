import type { Metadata } from "next";
import "./globals.css";

const timelineFavicon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="%230B0B0E"/><rect x="6" y="14" width="52" height="9" rx="2.5" fill="%23FF007F"/><rect x="6" y="26" width="23" height="9" rx="2.5" fill="%2300E5FF"/><rect x="32" y="26" width="26" height="9" rx="2.5" fill="%23FF9100"/><rect x="6" y="38" width="52" height="9" rx="2.5" fill="%2300E676"/><line x1="28" y1="8" x2="28" y2="56" stroke="%23FFFFFF" stroke-width="4"/><polygon points="24,6 32,6 28,12" fill="%2300E5FF"/></svg>`;

export const metadata: Metadata = {
  title: "Lil | Senior Video Editor",
  description: "High-retention commercial video editing and motion graphics portfolio",
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
      <body>{children}</body>
    </html>
  );
}