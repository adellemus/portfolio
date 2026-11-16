import type { Metadata } from 'next'
import { Syne, Space_Mono } from 'next/font/google'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, serializeJsonLd } from '@/lib/seo'
import '../styles/globals.css'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
  display: 'swap',
})

// ─── Metadata SEO ────────────────────────────────────────────────────────────
// Next.js usa este objeto para generar automáticamente las etiquetas
// <title>, <meta name="description">, Open Graph, etc. en TODAS las páginas.
// Cada página puede sobrescribir estos valores con su propio export metadata.
export const metadata: Metadata = {
  title: {
    template: '%s | Adel Lemus — Dev',
    default: 'Adel Lemus — Desarrollador Full Stack',
  },
  description:
    'Portafolio y blog de Adel Lemus, desarrollador Full Stack especializado en React, Python y PHP.',
  keywords: ['desarrollador', 'full stack', 'react', 'python', 'php', 'next.js'],
  authors: [{ name: 'Adel Lemus' }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Adel Lemus — Dev',
  },
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
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#person`,
                  name: 'Adel Lemus',
                  url: `${SITE_URL}/`,
                  jobTitle: 'Desarrollador Full Stack',
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  name: SITE_NAME,
                  url: `${SITE_URL}/`,
                  description: SITE_DESCRIPTION,
                  inLanguage: 'es-CL',
                  author: { '@id': `${SITE_URL}/#person` },
                },
              ],
            }),
          }}
        />

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