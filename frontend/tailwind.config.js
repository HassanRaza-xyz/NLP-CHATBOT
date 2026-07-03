/** @type {import('tailwindcss').Config} */
export default {
  // Enable dark mode via a CSS class on the root element
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom color palette for the design system
      colors: {
        primary: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5b9fc',
          400: '#8191f8',
          500: '#6366f1',  // Main brand color (indigo)
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          400: '#a78bfa',  // Violet accent
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        dark: {
          900: '#0a0a0f',  // Deepest background
          800: '#111118',
          700: '#1a1a2e',
          600: '#16213e',
          500: '#1f2040',
          400: '#252550',
        }
      },
      // Custom font families
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      // Custom animations
      keyframes: {
        // Typing indicator bounce animation
        typingBounce: {
          '0%, 80%, 100%': { transform: 'scale(0.8)', opacity: '0.4' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        // Fade in from bottom
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Shimmer effect for loading states
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Pulse glow for active elements
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(99, 102, 241, 0)' },
        },
        // Slide in from left
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        // Float animation
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        'typing-bounce': 'typingBounce 1.2s infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-glow': 'pulseGlow 2s infinite',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      // Custom backdrop blur values
      backdropBlur: {
        xs: '2px',
      },
      // Custom box shadows
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
