/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effcfb',
          100: '#d3f5f1',
          500: '#0f9b8e',
          600: '#0b7f75',
          700: '#0f5f5a',
          900: '#123b3b',
        },
      },
      boxShadow: {
        soft: '0 24px 70px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'transport-surface':
          "linear-gradient(rgba(248, 250, 252, 0.91), rgba(248, 250, 252, 0.91)), url('/images/travel-landscape.jpg')",
        'transport-dashboard':
          "linear-gradient(rgba(248, 250, 252, 0.78), rgba(248, 250, 252, 0.78)), url('/images/travel-landscape.jpg')",
        'transport-hero':
          "linear-gradient(115deg, rgba(2, 6, 23, 0.92), rgba(15, 95, 90, 0.78)), url('/images/travel-landscape.jpg')",
        'transport-account':
          "linear-gradient(135deg, rgba(2, 6, 23, 0.88), rgba(15, 95, 90, 0.78)), url('/images/travel-landscape.jpg')",
      },
    },
  },
  plugins: [],
};
