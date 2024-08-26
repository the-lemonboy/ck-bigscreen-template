// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'regal-blue': 'rgba(90,137,193,0.2)',
      },
      fontFamily: {
        titleFont: ['ziticqtezhanti'],
        numberFont: ['zhenyangb'],
      },
    },
  },
  plugins: [],
};
