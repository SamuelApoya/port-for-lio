import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg: "#38383a",
          fg: "#e6e9f0",
          accent: "#a89fff", // hover only
          card: "#4b4b4f", // logo card
        },
      },
    },
  },
  plugins: [],
};

export default config;