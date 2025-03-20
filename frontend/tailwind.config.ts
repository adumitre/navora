import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Include index.html too
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a', // Deep blue for the nautical theme
        secondary: '#172554', // Darker blue
        background: {
          dark: '#0f172a', // Dark background for dark mode
        },
      },
    },
  },
  darkMode: 'class', // Enables manual dark mode control
  plugins: [],
};

export default config;
