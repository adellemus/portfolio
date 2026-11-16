import type { Metadata } from 'next'

export const SITE_URL = 'https://adelemus.com'
export const SITE_NAME = 'Adel Lemus — Dev'
export const SITE_DESCRIPTION = 'Portafolio y blog de Adel Lemus, desarrollador Full Stack con más de 12 años de experiencia en aplicaciones web, React, Next.js, PHP y Python.'

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: fullTitle, description, url: `${SITE_URL}${path}`,
      siteName: SITE_NAME, locale: 'es_CL', type: 'website',
    },
    twitter: { card: 'summary', title: fullTitle, description },
  }
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
