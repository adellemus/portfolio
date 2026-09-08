import type { Metadata } from 'next'
import { PROJECTS } from '@/content/fijos/statics'
import { ProjectCard } from '@/components/ui/proyectos/ProjectCard'

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Proyectos que he construido — desde aplicaciones web hasta herramientas internas.',
}

export default function ProyectosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      {/* Encabezado */}
      <div className="sticky top-[53px] z-40 -mx-6 mb-8 border-b border-border bg-bg-primary/95 px-6 py-4 backdrop-blur-sm">
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
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
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
