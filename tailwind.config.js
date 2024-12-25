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
        'blue-home' : '#077efd',


        // btn
        'yellow-btn-primary' : '#FCC822',
        'purple-btn-primary' : '#6A5AE0',
        'greenDrak-btn-primary' :'#3C7178',
        'blueCloud-btn-primary' : '#AEDBED',

        // card
        'card_blue_primary' : '#336BB8',
        'card_green_primary' : '#8CAB4B',
        'card_pink_primary' : '#D7A3B7',
        'card_purple_primary' : '#704fe6',
        'card_purple_secondary' : '#dcb4fe',
        'card_yellow_primary' : '#ffd25d',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      maxWidth: {
        'screen-xl': '1280px',
        'screen-lg': '1024px',
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
  ],
}

