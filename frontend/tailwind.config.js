/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#e4e4e7',
          100: '#c8c8cd',
          200: '#9898a1',
          300: '#6b6b76',
          400: '#4a4a55',
          500: '#2d2d3a',
          600: '#1e1e2e',
          700: '#181825',
          800: '#11111b',
          900: '#0a0a12',
        },
        accent: {
          purple: '#a78bfa',
          blue: '#60a5fa',
          cyan: '#22d3ee',
          green: '#34d399',
          pink: '#f472b6',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(167, 139, 250, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(167, 139, 250, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
