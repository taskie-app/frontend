/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: colors.emerald,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
