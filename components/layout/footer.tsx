import Link from 'next/link'

// Footer es un Server Component (sin 'use client') porque no tiene
// interactividad — se renderiza en el servidor y se envía como HTML estático.

const SOCIAL_LINKS = [
  { href: 'https://github.com/tu-usuario',   label: 'GitHub' },
  { href: 'https://linkedin.com/in/tu-usuario', label: 'LinkedIn' },
  // Agregá o quitá redes según las que uses
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg-primary">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">

        {/* Copyright */}
        <p className="font-mono text-xs text-text-dim">
          © {year}{' '}
          <Link href="/" className="text-text-muted hover:text-accent transition-colors">
            Adel Lemus.dev
          </Link>
          {' '}— hecho con Next.js,
        </p>

        {/* Links sociales */}
        <div className="flex gap-6">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-dim transition-colors hover:text-accent"
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}