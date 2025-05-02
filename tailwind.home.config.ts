import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./components/home/*.{js,ts,jsx,tsx,mdx}",
    "./app/(root)/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        customDark: "#35354e",
        "black-100": "#2B2C35",
        "primary-blue": {
          DEFAULT: "#2B59FF",
          100: "#F5F8FF",
          200: "#7676e7",
          300: "#d1d1f3",
          400: "#8f8f99",
        },
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
      },
      backgroundImage: {
        pattern: "url('/pattern.png')",
        "hero-bg": "url('/hero-bg.webp')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
