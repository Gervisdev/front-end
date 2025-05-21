/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "pacific":["Pacifico", 'sans-serif']
      },
      colors:{
        "custom-blue":"#004e8c"
      }
    },
  },
  plugins: [],
  variants : {
    extend: {
      display: ["focus-group"]
    }
  }
}

