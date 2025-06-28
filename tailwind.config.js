/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          500: '#5B21B6',
          600: '#4C1D95',
          700: '#3C1A78',
        },
        secondary: {
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        accent: {
          500: '#10B981',
          600: '#059669',
        },
        surface: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'scale-check': 'scaleCheck 0.2s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        scaleCheck: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}