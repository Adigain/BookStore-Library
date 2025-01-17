/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx}',],
  theme: {
    extend: {
      colors: {
        'primary': '#FFCE1A',
        'secondary': '#0D0842',
        'blackBG': '#F3F3F3',
        'Favorite': '#FF5841',
      },
      fontFamily: {
        'primary': ["Montserrat", "Sans Serif"],
        'secondary': ["Nunito Sans", "Sans Serif"]
      }
    },
  },
  plugins: [],
}

