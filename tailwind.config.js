/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Pure black and white palette
                black: '#000000',
                white: '#ffffff',
                gray: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#eeeeee',
                    300: '#e0e0e0',
                    400: '#bdbdbd',
                    500: '#9e9e9e',
                    600: '#757575',
                    700: '#616161',
                    800: '#424242',
                    900: '#212121',
                    950: '#0a0a0a'
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    },
                },
                'move-down': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' },
                },
                shine: {
                    '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
                    '100%': { transform: 'translateX(200%) skewX(-12deg)' },
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in',
                'pulse': 'pulse 1s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'blink': 'blink 1s step-end infinite',
                'gradient-x': 'gradient-x 3s ease infinite',
                'move-down': 'move-down 10s linear infinite',
                'shine': 'shine 3s ease-in-out',
                'shine-fast': 'shine 0.6s ease-in-out',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}
