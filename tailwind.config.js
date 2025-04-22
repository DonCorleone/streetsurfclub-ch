/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      'sans': ['Lexend', 'sans-serif'],
    },
    extend: {
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '45': '0.45',
        '55': '0.55',
        '65': '0.65',
        '85': '0.85',
        '95': '0.95',
      }
    },
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
      '3xl': '1700px',
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
          '@screen sm': { maxWidth: '540px' },
          '@screen md': { maxWidth: '720px' },
          '@screen lg': { maxWidth: '960px' },
          '@screen xl': { maxWidth: '1140px' },
          '@screen 2xl': { maxWidth: '1320px' },
        },
      });
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
    disableColorOpacityUtilitiesByDefault: false, // Enable opacity utilities
  },
}
