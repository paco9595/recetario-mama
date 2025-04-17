module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
      transformOrigin: {
        'center': 'center',
      },
      rotate: {
        'y-180': '180deg',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.perspective': {
          perspective: '1000px',
        },
        '.transform-style-preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      })
    }
  ],
}
