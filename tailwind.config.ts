import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#090909",
        card: "#111111",
        primary: "#FFFFFF",
        accent: "#FF5A1F",
        muted: "#A1A1A1",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "hero-sm": ["4.5rem", { lineHeight: "0.9", letterSpacing: "-0.01em" }],
        "hero-lg": ["10rem", { lineHeight: "0.85", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        container: "1440px",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
