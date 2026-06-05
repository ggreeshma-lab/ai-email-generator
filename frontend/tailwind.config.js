/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideInFromBottom 0.5s ease-out',
        'pop': 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        slideInFromBottom: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        popIn: {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.05)',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
}
