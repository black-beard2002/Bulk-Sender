/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '405': '405deg',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Add Roboto as the default sans-serif font
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ matchUtilities }) => {
      matchUtilities({
        'g': (value) => ({
          [`@apply ${value.replaceAll(',', ' ')}`]: {}
        })
      })
    })
  ],
  
}