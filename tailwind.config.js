const defaulTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
        display: ['cursive', ...defaulTheme.fontFamily.sans]
      },
  },
  plugins: [],
}
