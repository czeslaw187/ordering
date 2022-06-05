module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        openWindow: {
          '100%': {width: '15rem', height: '15rem'},
          '0%': {width: '0', height: '0'},
          
        },
        closeWindow: {
          '0%': {width: '15rem', height: '15rem'},
          '100%': {width: '0', height: '0'}
        }
      },
      animation: {
        openWindow: 'openWindow 0.3s ease-out',
        closeWindow: 'closeWindow 0.3s ease-out'
      },
      boxShadow: {
        'click': 'inset -5px 5px 5px rgba(0,0,0,0.4)',
        'button': '7px 12px 20px -7px rgba(0,0,0,0.3)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
