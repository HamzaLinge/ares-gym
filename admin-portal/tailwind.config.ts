import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type import("tailwindcss").Config */
const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          100: "#2196F3",
          200: "#007ad4",
          300: "#003f8f",
        },
        accent: {
          100: "#FF4081",
          200: "#ffe4ff",
        },
        text: {
          100: "#333333",
          200: "#5c5c5c",
        },
        bg: {
          100: "#F5F5F5",
          200: "#ebebeb",
          300: "#c2c2c2",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
