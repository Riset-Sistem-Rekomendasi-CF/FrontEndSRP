/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'stix': ['STIX Two Text', 'serif'],
      },
      colors: {
        // bg
        'yellow-primary' : '#FCF4DF',
        'red-primary' : '#FF3737',
        'yellow-secondary' : '#FDF9ED',

        // btn
        'yellow-btn-primary' : '#FCC822',
        'purple-btn-primary' : '#6A5AE0',
        'greenDrak-btn-primary' :'#3C7178',
        'blueCloud-btn-primary' : '#AEDBED',

        // card
        'card_blue_primary' : '#336BB8',
        'card_green_primary' : '#8CAB4B',
        'card_pink_primary' : '#D7A3B7',
        

      }
    },
  },
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
  ],
}

