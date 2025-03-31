/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {

      },
      keyframes: {
        scrollCode: {
          '0%': { top: '100%' },
          '100%': { top: '-100%' },
        },
        breathe: {
          '0%': { transform: 'translateX(-50%) scale(1)' },
          '50%': { transform: 'translateX(-50%) scale(1.05)' },
          '100%': { transform: 'translateX(-50%) scale(1)' },
        },
        typingLeft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        typingRight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        scrollCode: 'scrollCode 5s linear infinite',
        breathe: 'breathe 3s ease-in-out infinite',
        'typing-left': 'typingLeft 0.8s steps(5, end) infinite',
        'typing-right': 'typingRight 0.8s steps(5, end) infinite',
      },
    },
  },
  plugins: [],
};