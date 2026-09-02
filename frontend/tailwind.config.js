/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: "#ff5500",
          dark: "#0d0d0f",
          card: "#18191d",
        }
      }
    },
  },
  plugins: [],
}
