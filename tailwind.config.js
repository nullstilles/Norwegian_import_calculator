/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        norwegian: {
          blue: '#00205B', // Deep Norwegian flag blue
          red: '#BA0C2F',  // Norwegian flag red
          white: '#FFFFFF',
          gray: '#F3F4F6', // Soft gray background
          slate: '#4B5563', // Slate for text
        },
        nordic: {
          dark: '#0f172a', // Slate-900
          card: '#1e293b', // Slate-800
          text: '#f8fafc', // Slate-50
          accent: '#3b82f6', // Blue-500
          accentHover: '#2563eb', // Blue-600
        }
      }
    },
  },
  plugins: [],
}
