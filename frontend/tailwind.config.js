/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // Slate 900
        foreground: '#f8fafc', // Slate 50
        card: {
          DEFAULT: '#1e293b', // Slate 800
          foreground: '#f8fafc',
          border: '#334155', // Slate 700
        },
        primary: {
          DEFAULT: '#8b5cf6', // Violet 500
          from: '#8b5cf6',
          to: '#3b82f6', // Blue 500
          hover: '#7c3aed',
        },
        secondary: {
          DEFAULT: '#334155',
          foreground: '#94a3b8',
        },
        accent: {
          DEFAULT: '#22d3ee', // Cyan 400
          low: '#0891b2',
        },
        muted: {
          DEFAULT: '#1e293b',
          foreground: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      maxWidth: {
        'container': '1200px',
      }
    },
  },
  plugins: [],
}
