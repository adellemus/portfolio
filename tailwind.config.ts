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
        // Estados reutilizables: bg-estado-activo-bg, text-estado-activo, border-estado-activo-border.
        estado: {
          activo: {
            DEFAULT: '#28c941',
            bg: '#0f2a1f',
            border: '#1a4a2a',
          },
          desarrollo: {
            DEFAULT: '#f7c07e',
            bg: '#1a1a0f',
            border: '#3a3a1a',
          },
          wip: {
            DEFAULT: '#ff7e7e',
            bg: '#1a0f0f',
            border: '#3a1a1a',
          },
          profesional: {
            DEFAULT: '#7ec0f7',
            bg: '#0f1a2a',
            border: '#1a3a4a',
          },
        },
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
          dim: '#5f7794',
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
