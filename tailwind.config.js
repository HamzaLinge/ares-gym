/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "dela-gothic-one": ["DelaGothicOne-Regular", "sans-serif"],
        "albert-sans": ["AlbertSans-Regular", "sans-serif"],
      },
      keyframes: {
        "zoom-out": {
          "0%": { transform: "scale(1.2)", opacity: 0 },
          "20%": { opacity: 1 },
          "50%": { opacity: 1 },
          "80%": { opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
        crossfadeAnimation: {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        zoomOutAnimation: {
          "0%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "zoom-out": "zoom-out 5s backwards linear infinite",
      },
    },
  },
  plugins: [],
};
