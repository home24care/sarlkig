import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: "#1f5488", strong: "#1a436c" },
        buy: { DEFAULT: "#4f7d27", hover: "#436b21" },
        dark: { DEFAULT: "#0c1117", 2: "#161d25", rule: "#242e39", text: "#d6dee7", muted: "#b3c0ce" },
        ink: { DEFAULT: "#161d25", body: "#242e39", soft: "#35414f", muted: "#475769", meta: "#5f7183" },
        line: { DEFAULT: "#d6dee7", strong: "#8596a8" },
        surface: { DEFAULT: "#f6f8fa", 2: "#ecf0f4" },
        tint: "#eef5fb",
        steel: { 100: "#d8e8f6" },
        rating: { DEFAULT: "#00b67a", text: "#007a4d" },
        signal: { bg: "#fdf2dc", text: "#8a4f08" },
        ice: { DEFAULT: "#3fd0e6", 500: "#12b6cf", 700: "#0b7689" },
      },
      fontFamily: {
        sans: ["var(--font-text)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Arial Narrow", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: { panel: "16px" },
      boxShadow: { float: "0 4px 5px rgb(12 17 23 / 0.05)" },
      maxWidth: { site: "1320px" },
    },
  },
  plugins: [],
} satisfies Config;
