/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': "#151515",
        'main-grey': "#ffffff99",
        'card-bg': "#202020",
        'success': "#6dc849",
        'grey-hsla': "hsla(0,0%,100%,.3)",
        'light-grey-hsla': "hsla(0,0%,100%,.4)",
        'user-gradient': "background-image: linear-gradient(0deg,#3023ae,#c86dd7)",
        'banner-gradient': "background: linear-gradient(180deg,#fd867d,#b1305c)"
      }
    },

  },
  plugins: [],
}