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
          "0%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "zoom-out": "zoom-out 5s forwards linear infinite",
      },
    },
  },
  plugins: [],
};
