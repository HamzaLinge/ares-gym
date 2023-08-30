/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        32: "repeat(32, minmax(0, 1fr))",
      },
      gridColumnStart: {
        15: "15",
        16: "16",
        17: "17",
        21: "21",
        23: "23",
        33: "33",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "dela-gothic-one": ["DelaGothicOne-Regular", "sans-serif"],
        "albert-sans": ["AlbertSans-Regular", "sans-serif"],
        inter: ["Inter-Regular", "sans-serif"],
        "inter-bold": ["Inter-Bold", "sans-serif"],
        "inter-extrabold": ["Inter-ExtraBold", "sans-serif"],
        "inter-light": ["Inter-Light", "sans-serif"],
        "inter-extralight": ["Inter-ExtraLight", "sans-serif"],
        "inter-semibold": ["Inter-SemiBold", "sans-serif"],
      },
      keyframes: {
        "zoom-out": {
          "0%": { transform: "scale(1.2)", opacity: 0 },
          "20%": { opacity: 1 },
          "50%": { opacity: 1 },
          "80%": { opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
        "display-clipboard-notification": {
          "0%": { opacity: 0, transform: "translate(-50%, -100%)" },
          "5%": {
            opacity: 1,
            transform: "translate(-50%, calc(0px - 100% - 4px))",
          },
          "95%": {
            opacity: 1,
            transform: "translate(-50%, calc(0px - 100% - 4px))",
          },
          "100%": { opacity: 0, transform: "translate(-50%, -100%)" },
        },
      },
      animation: {
        "zoom-out": "zoom-out 8s backwards linear infinite",
        "display-clipboard-notification":
          "display-clipboard-notification 4s backwards ",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
