import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leel | Senior Video Editor & Motion Designer",
  description: "Portfolio of Leel — Senior Video Editor, Colorist & Motion Designer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={kanit.variable} suppressHydrationWarning>
      <body className="antialiased bg-[#0C0C0C] text-[#D7E2EA]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}