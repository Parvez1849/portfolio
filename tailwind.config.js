/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Yeh line check karein
  ],
  theme: {
    extend: {
      colors: {
        'theme-yellow': '#facc15',
        'theme-red': '#ef4444',
      }
    },
  },
  plugins: [],
}