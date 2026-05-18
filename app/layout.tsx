import type { Metadata } from 'next'
import '../styles/globals.css'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

// ─── Metadata SEO ────────────────────────────────────────────────────────────
// Next.js usa este objeto para generar automáticamente las etiquetas
// <title>, <meta name="description">, Open Graph, etc. en TODAS las páginas.
// Cada página puede sobrescribir estos valores con su propio export metadata.
export const metadata: Metadata = {
  title: {
    // %s es reemplazado por el título de cada página
    // Ej: "Blog | Adel Lemus — Dev" en la página de blog
    template: '%s | Adel Lemus — Dev',
    default: 'Adel Lemus — Desarrollador Full Stack',
  },
  description:
    'Portafolio y blog de Adel Lemus, desarrollador Full Stack especializado en React, Python y PHP.',
  keywords: ['desarrollador', 'full stack', 'react', 'python', 'php', 'next.js'],
  authors: [{ name: 'Adel Lemus' }],
  // Cambiá esto por tu dominio real cuando lo tengas
  metadataBase: new URL('https://tu-dominio.dev'),
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Adel Lemus — Dev',
  },
  // Indica a los motores de búsqueda que indexen el sitio
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning evita warnings de extensiones del browser
    // que modifican el DOM (ej: dark mode extensions, LastPass, etc.)
    <html lang="es" suppressHydrationWarning>
      <body>
        {/* Navbar fijo en la parte superior de todas las páginas */}
        <Navbar />

        {/* main ocupa el espacio disponible entre nav y footer */}
        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}