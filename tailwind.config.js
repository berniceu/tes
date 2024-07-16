/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8FAB',
        secondary: '#C9974C',
        white: '#fff',
        black: '#000',
        gray: {
          100: '#F3F3F3',
          200: '#A9A9A9',
          300: '#676767'
        },
        brown: '#582F0E',
        hotPink: '#EF476F',
        green: '#005F73',
        navy: '#03045E',

        border: '#666666',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        sm: '360px',
        md: '540px',
        lg: '768px',
        xl: '1024px',
        '2xl': '1280px',
        '3xl': '1440px',
        '4xl': '1600px',
        '5xl': '1920px',
      },
    },
  },
  plugins: [],
}

