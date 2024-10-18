/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        LXGWFont: ["LXGW WenKai TC", "cursive"],
        LibreFont: ["Libre Franklin", "sans-serif"],
      },
    },
  },
  plugins: [],
}