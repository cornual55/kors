/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#CDE990",
        darkgreen: "#AACB73",
        lightpink: "#FFD4D4"
      }
    },
  },
  plugins: [],
}

