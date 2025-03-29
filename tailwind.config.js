/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B7D87',   // Muted blue-gray
        secondary: '#D2D5D9', // Light gray
        accent: '#A8B5BE',    // Medium blue-gray
        background: '#F8F9FA', // Off-white
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
