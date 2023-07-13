/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundSecondary: '#242526',
        backgroundPrimary: '#18191A'
      }
    },
  },
  plugins: [],
}

