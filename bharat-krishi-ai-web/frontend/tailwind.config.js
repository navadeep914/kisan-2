/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:   "#2d6a4f",
        secondary: "#52b788",
        accent:    "#f4a261",
        warning:   "#e9c46a",
        danger:    "#e63946",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
