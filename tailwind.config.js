/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#FFD1DC',
        'brand-orange': '#FF847C', // Legacy mapping
        'brand-coral': '#FF847C',
        'brand-warm-white': '#F5F5F0', // Slightly warmer/organic
        'brand-white': '#FFFFFF',
        'brand-sage': '#97af79', // New Luxury/Wellness Green
        'brand-gold': '#D4AF37', // New Luxury Gold
        'brand-gray': '#F5F5F5',
        'brand-text': '#4A4A4A',
        'brand-midnight': '#2D2B3F',
      },
      fontFamily: {
        sans: ['"Zen Maru Gothic"', 'Inter', 'sans-serif'], // Suggesting a round font if they add it, else fallback
      }
    },
  },
  plugins: [],
}
