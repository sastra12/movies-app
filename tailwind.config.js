/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#264653',
        secondary: '#2a9d8f',
        secondary2: '#e76f51'
      }
    }
  },
  plugins: []
}
