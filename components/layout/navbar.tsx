'use client'

// 'use client' es necesario acá porque usamos usePathname() que lee
// la URL actual — eso solo existe en el browser, no en el servidor.
// Todo lo demás en el proyecto es Server Component por defecto.

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/',           label: 'inicio' },
  { href: '/proyectos',  label: 'proyectos' },
  { href: '/blog',       label: 'blog' },
  { href: '/contacto',   label: 'contacto' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Un link está activo si el pathname actual empieza con su href.
  // La excepción es '/' (home) que solo está activo si es exactamente '/'.
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/90 backdrop-blur-sm">
      {/* backdrop-blur-sm + bg con opacidad 90% = efecto "frosted glass"
          sin que el contenido de abajo se vea completamente al hacer scroll */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

        {/* Logo / nombre del sitio */}
        <Link
          href="/"
          className="font-mono text-sm text-accent transition-opacity hover:opacity-80"
        >
          ~/<span className="text-white">Adel Lemus</span>
        </Link>

        {/* Links de escritorio — ocultos en mobile */}
        <ul className="hidden gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`
                  font-mono text-xs uppercase tracking-widest transition-colors
                  ${isActive(href)
                    ? 'text-accent'
                    : 'text-text-muted hover:text-text-secondary'
                  }
                `}
              >
                {/* Indicador visual del link activo */}
                {isActive(href) && (
                  <span className="mr-1 text-accent">_</span>
                )}
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa — solo visible en mobile */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          {/* Las tres líneas se transforman en X cuando el menú está abierto */}
          <span
            className={`block h-px w-6 bg-text-secondary transition-transform duration-200
              ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-text-secondary transition-opacity duration-200
              ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-text-secondary transition-transform duration-200
              ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Menú mobile — desplegable */}
      {menuOpen && (
        <div className="border-t border-border bg-bg-primary px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    font-mono text-sm uppercase tracking-widest
                    ${isActive(href) ? 'text-accent' : 'text-text-muted'}
                  `}
                  // Cierra el menú al navegar
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}