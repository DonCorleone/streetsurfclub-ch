/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        fontFamily: {
            'sans': ['Lexend', 'sans-serif'],
        },
        extend: {},
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
        function ({ addComponents }) {
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