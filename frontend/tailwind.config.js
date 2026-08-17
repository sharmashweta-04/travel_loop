/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5F0',
          100: '#CBE5DC',
          200: '#A9D3C5',
          300: '#83BFAC',
          400: '#5BA892',
          500: '#349076',
          600: '#1A7A5E', // Accent teal
          700: '#135C47',
          800: '#0E4032',
          900: '#08251D',
          950: '#04130E',
        },
        pageBg: '#F5F0E8',
        cardBg: '#FFFFFF',
        textPrimary: '#1A1A1A',
        textSecondary: '#4A4A4A',
        textMuted: '#888888',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(160deg, #E8C9A0 0%, #C4A882 30%, #8B9E8A 70%, #6B7F6A 100%)',
      },
      boxShadow: {
        'card': '0 8px 32px rgba(0,0,0,0.10)',
        'nav': '0 2px 16px rgba(0,0,0,0.08)',
        'mockup': '0 32px 80px rgba(0,0,0,0.25)',
      }
    },
  },
  plugins: [],
}
