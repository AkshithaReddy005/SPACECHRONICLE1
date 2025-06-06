/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stellar-blue': '#00a9e0',
        'stellar-cyan': '#00f0ff',
        'stellar-gold': '#ffd700',
        'stellar-deep-blue': '#0a192f', // A deep blue for backgrounds
        'stellar-card-bg': '#1a2035', // Slightly lighter for cards
        'cosmic-navy': '#10162a', // Deep cosmic navy for gradients
        'space-blue': '#0d1b2a', // Space blue for hero and backgrounds
      },
      fontFamily: {
        oxanium: ['Oxanium', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
