/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0B1437',
          DEFAULT: '#1A237E',
          light: '#303F9F',
        },
        secondary: {
          dark: '#1A1F3C',
          DEFAULT: '#2C3E50',
          light: '#34495E',
        },
        accent: {
          DEFAULT: '#00BCD4',
          light: '#4DD0E1',
        }
      },
    },
  },
  plugins: [],
} 