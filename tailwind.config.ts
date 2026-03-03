import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bud: {
          primary: "#539987",
          primarySoft: "#75ad9f",
          primaryDeep: "#3f7668",
          secondary: "#A1869E",
          secondarySoft: "#c1adbe",
          secondaryDeep: "#7f697d",
          lightBg: "#FAF8D4",
          darkBg: "#2A2B2A",
        },
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.1rem",
      },
      boxShadow: {
        calm: "0 8px 24px rgba(42, 43, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
