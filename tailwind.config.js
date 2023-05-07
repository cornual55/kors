/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        green: "#CDE990",
        darkgreen: "#AACB73",
        lightpink: "#ffd4d4",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          xl: "15rem",
        },
      },
    },
  },
  plugins: [],
};
