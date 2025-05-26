import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a2b4b',
          dark: '#0f172a',
          light: '#2a4b7c',
        },
        secondary: {
          DEFAULT: '#2d3748',
          dark: '#1a202c',
          light: '#4a5568',
        },
        accent: {
          DEFAULT: '#60a5fa',
          light: '#93c5fd',
        },
      },
    },
  },
  plugins: [],
};

export default config; 