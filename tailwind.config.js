/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ['Lexend', 'sans-serif'],
    },
    extend: {},
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
      '3xl': '1700px',
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
