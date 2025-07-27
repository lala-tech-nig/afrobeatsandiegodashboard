/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'fade-in-down': { '0%': { opacity: 0, transform: 'translateY(-20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'slide-in': {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.7s ease',
        'fade-in-down': 'fade-in-down 0.7s ease',
        'slide-in': 'slide-in 0.4s cubic-bezier(.4,0,.2,1)',
      },
    },
  },
}