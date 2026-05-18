/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera HTML estático en build time para todas las páginas posibles.
  // Esto es lo que nos permite deployar en Vercel sin ningún servidor corriendo.
  output: 'export',

  // Optimización de imágenes deshabilitada porque con output: 'export'
  // Next.js no puede hacer resize en servidor — usamos <img> estándar o
  // el componente Image con unoptimized: true.
  images: {
    unoptimized: true,
  },

  // Trailing slash para compatibilidad con hosting estático
  // (evita 404 en rutas como /blog/ vs /blog)
  trailingSlash: true,
}

module.exports = nextConfig