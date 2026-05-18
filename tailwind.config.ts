import type { Config } from 'tailwindcss'

const config: Config = {
  // Solo genera CSS para los archivos que realmente usan clases Tailwind.
  // Esto mantiene el bundle de CSS mínimo en producción.
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Paleta de colores del portafolio — centralizada acá para no
      // repetir hex codes por todo el código.
      colors: {
        bg: {
          primary: '#0a0e17',
          secondary: '#0d1520',
          card: '#0d1520',
          nav: '#0a0e17',
        },
        accent: {
          DEFAULT: '#4ecca3',
          dark: '#38b48d',
          muted: '#0f2a1f',
          border: '#1e3a2e',
        },
        text: {
          primary: '#ffffff',
          secondary: '#c9d1e0',
          muted: '#6b7a99',
          dim: '#3a4a5e',
        },
        border: {
          DEFAULT: '#1e2a3a',
          hover: '#4ecca3',
        },
      },
      // Tipografías — Space Mono para código/monospace, Syne para títulos editoriales.
      // Se cargan desde Google Fonts en el layout global.
      fontFamily: {
        mono: ['Space Mono', 'Courier New', 'monospace'],
        sans: ['Syne', 'system-ui', 'sans-serif'],
      },
      // Animaciones personalizadas
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        blink: 'blink 1.2s step-end infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
        'slide-in': 'slideIn 0.4s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config