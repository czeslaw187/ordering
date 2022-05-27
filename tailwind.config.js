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
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
