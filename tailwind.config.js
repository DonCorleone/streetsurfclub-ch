/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Lexend', 'sans-serif'],
    },
    extend: {
      spacing: {
        '112': '28rem', // 448px
        '128': '32rem', // 512px
        '144': '36rem', // 576px
        '160': '40rem', // 640px
        '176': '44rem', // 704px
        '192': '48rem', // 768px
        '208': '52rem', // 832px
        '224': '56rem', // 896px
        '240': '60rem', // 960px
        '256': '64rem', // 1024px
        '288': '72rem', // 1152px
        '320': '80rem', // 1280px
        '384': '96rem', // 1536px
        '448': '112rem', // 1792px
        '512': '128rem', // 2048px
      }
    },
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '992px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1400px',
      // => @media (min-width: 1400px) { ... }

      '3xl': '1700px',
      // => @media (min-width: 1700px) { ... }
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({addComponents}) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
          '@screen 2xl': {
            maxWidth: '1320px',
          },
        },
      });
    },
  ],
}
