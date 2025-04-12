module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#000000', // Custom color for background
        'text-color': '#ffffff', // Custom color for text
        'component-bg': '#000000', // Custom color for header and sidebar
        'theme-color': '#373737', // Color for main theme of website
        'border-color': '#D3D3D3', // Color for borders
      },
    },
  },
  plugins: [],
};

