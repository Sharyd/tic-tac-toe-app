/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                backgroundPrimary: '#1A2A33',
                backgroundSecondary: '#1F3641',
                primary: '#31C3BD',
                primaryLight: '#65E9E4',
                secondary: '#F2B137',
                secondaryLight: '#FFC860',
                tertiary: '#A8BFC9',
                tertiaryLight: '#DBE8ED',
            },
            fontSize: {
                xsmall: '0.875rem',
                small: '1rem',
                medium: '1.3rem',
                large: '1.5rem',
                xlarge: '2.5rem',
            },
            boxShadow: {
                customInnerBottom: 'inset 0rem -0.5rem 0rem 0 rgb(0 0 0 / 0.2)',
                customInnerBottomSmall:
                    'inset 0rem -0.3rem 0rem 0 rgb(0 0 0 / 0.2)',
                customInnerBottomDark:
                    'inset 0rem -0.5rem 0rem 0 rgb(0 0 0 / 0.5)',
                customInnerBottomDarkSmall:
                    'inset 0rem -0.3rem 0rem 0 rgb(0 0 0 / 0.5)',
            },
        },
    },
    plugins: [],
}
