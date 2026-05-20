import type { Metadata } from 'next'
import { PROJECTS } from '@/content/fijos/statics'
import { StatusBadge } from '@/components/ui/proyectos/StatusBadge'

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Proyectos que he construido — desde aplicaciones web hasta herramientas internas.',
}

export default function ProyectosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      {/* Encabezado */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-6 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            trabajo seleccionado
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white">
          Proyectos
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-text-muted">
          Una selección de lo que he construido — proyectos propios, trabajo para
          clientes y experimentos que me parecieron interesantes.
        </p>
      </div>

      {/* Grid de proyectos */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className="group flex flex-col rounded-lg border border-border bg-bg-secondary p-6 transition-colors hover:border-accent"
          >
            {/* Header de la card */}
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="text-base font-bold text-white leading-snug">
                {project.title}
              </h2>
              <StatusBadge status={project.status} />
            </div>

            {/* Descripción */}
            <p className="mb-5 flex-1 text-sm leading-relaxed text-text-muted">
              {project.description}
            </p>

            {/* Tags de tecnología */}
            <div className="mb-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-border px-2 py-0.5 font-mono text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links — código fuente y demo */}
            <div className="flex items-center gap-4 border-t border-border pt-4">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-text-muted transition-colors hover:text-accent"
                >
                  GitHub ↗
                </a>
              ) : (
                <span className="font-mono text-xs text-text-dim">
                  privado
                </span>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto font-mono text-xs text-accent transition-opacity hover:opacity-70"
                >
                  ver live →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA al final — invitar a ver más en GitHub */}
      <div className="mt-12 rounded-lg border border-border bg-bg-secondary p-8 text-center">
        <p className="mb-4 text-sm text-text-muted">
          Más proyectos y experimentos en GitHub
        </p>
        <a
          href="https://github.com/tu-usuario"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded border border-accent-border bg-accent-muted px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-bg-primary"
        >
          ver GitHub ↗
        </a>
      </div>

    </div>
  )
}