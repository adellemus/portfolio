import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata(
  'Contacto',
  'Contacta a Adel Lemus para conversar sobre desarrollo web, aplicaciones y proyectos freelance con React, Next.js, PHP y Python.',
  '/contacto/',
)

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
