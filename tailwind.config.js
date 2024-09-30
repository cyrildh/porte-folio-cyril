module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f5f5',
        components: '#008573',
        border: '#83CDC1',
        solid: '#0D9B8A',
        text: '#0D3D38',
        text2: '#008573',
        nav:'white',
        background2: 'white',
        hover: '#D2DEFF',
      },
      keyframes: {
        floatingLeft: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.7' },
          '50%': { transform: 'translateY(-30px) translateX(-30px)', opacity: '0.9' },
        },
        floatingRight: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.7' },
          '50%': { transform: 'translateY(30px) translateX(30px)', opacity: '0.9' },
        },
      },
      animation: {
        'floating-left': 'floatingLeft 8s ease-in-out infinite',
        'floating-right': 'floatingRight 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}