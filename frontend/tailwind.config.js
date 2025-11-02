/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light"],
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    extend: {
      screens: {
        xs: "380px",
        xx: "280px",
        mm: "420px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        background: "#171C26",
        primary: "#FFD700",
        secondary: "#364259",
      },
      fontFamily: {
        generalSans: ["General Sans", "sans-serif"],
        Cabin: ["Cabin", "sans-serif"],
        Jost: ["Jost", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        fig: ["Figtree", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        Pin: ["Pineapple Demo", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        Sallomae: ["Sallomae", "sans-serif"],
        Mont: ["Montserrat", "sans-serif"],
        Oxanium: ["Oxanium", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui"), heroui()],
};
