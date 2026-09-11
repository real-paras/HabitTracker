/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables class-based dark mode toggling ('dark')
  theme: {
    extend: {
      colors: {
        // GitHub contribution grid default color palette
        gh: {
          empty: '#161b22',
          l1: '#0e4429',
          l2: '#006d32',
          l3: '#26a641',
          l4: '#39d353',
        },
      },
    },
  },
  plugins: [],
};