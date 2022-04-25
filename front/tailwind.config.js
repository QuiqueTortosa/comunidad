module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        screens: {
          '2xl': {'max': '1535px'},
          // => @media (max-width: 1535px) { ... }
    
          'xl': {'max': '1279px'},
          // => @media (max-width: 1279px) { ... }
    
          'lg': {'max': '1023px'},
          // => @media (max-width: 1023px) { ... }
    
          'md': {'max': '767px'},
          // => @media (max-width: 767px) { ... }
    
          'sm': {'max': '639px'},
          // => @media (max-width: 639px) { ... }
        },
        colors: {
          "dark-purple": "#081A51",
          "light-white": "rgba(255,255,255,0.17)",
        },
        boxShadow: {
          '3xl': '0px 0px 20px 5px rgba(0, 0, 0, 0.3)',
        },
        height: {
          '278': '278px',
      },
      },
    },
    plugins: [],
  }