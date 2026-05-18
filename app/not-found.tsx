import Link from 'next/link'

// Next.js usa automáticamente este archivo cuando una ruta no existe.
// No necesita ninguna configuración extra.
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 font-mono text-6xl font-bold text-accent">404</p>
      <h1 className="mb-3 text-2xl font-bold text-white">Página no encontrada</h1>
      <p className="mb-8 max-w-sm text-sm text-text-muted">
        La ruta que buscás no existe o fue movida. Volvé al inicio.
      </p>
      <div className="rounded-lg border border-border bg-bg-secondary p-5 font-mono text-sm text-text-dim">
        <span className="text-accent">$</span> cd ~/<span className="text-white">inicio</span>
      </div>
      <Link
        href="/"
        className="mt-8 rounded border border-accent-border bg-accent-muted px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-bg-primary"
      >
        ← volver al inicio
      </Link>
    </div>
  )
}