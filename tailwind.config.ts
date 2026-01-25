import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand barvy podle specifikace
        background: "#0f1217", // černá
        foreground: "#ffffff", // bílá
        primary: {
          DEFAULT: "#7b3beb", // lila pro "Jdeme"
          red: "#ef2c28", // červená pro "vibit" a navigaci
          gray: "#6b6c6d", // šedá pro sekundární prvky
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
