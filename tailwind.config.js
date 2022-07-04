const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        toggleSlider: {
          '0%': {
            height: '0%',
          },
          '25%': {
            height: '25%',
          },
          '50%': {
            height: '50%',
          },
          '75%': {
            height: '75%',
          },
          '100%': {
            height: '100%',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        toggleSlider: 'toggleSlider 1s ease-out ',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },

  plugins: [],
});
