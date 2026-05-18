import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Proyectos que he construido — desde aplicaciones web hasta herramientas internas.',
}

// ─── Datos de proyectos ───────────────────────────────────────────────────────
// Están hardcodeados acá porque para un portafolio personal no vale la pena
// una base de datos ni un CMS — simplemente editás este array cuando tenés
// un proyecto nuevo. Simple, directo, sin dependencias extra.
const PROJECTS = [
  {
    title: 'Portfolio Personal',
    description:
      'Este mismo sitio — construido con Next.js, MDX y Tailwind. Deployado en Vercel con generación estática completa. Cero WordPress.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'MDX'],
    href: 'https://github.com/tu-usuario/portfolio',
    live: 'https://tu-dominio.dev',
    status: 'producción',
  },
  {
    title: 'Nombre del Proyecto',
    description:
      'Descripción breve de qué hace el proyecto, qué problema resuelve y qué tecnología interesante usaste.',
    tags: ['React', 'Python', 'FastAPI'],
    href: 'https://github.com/tu-usuario/proyecto',
    live: null, // null = no hay demo live
    status: 'producción',
  },
  {
    title: 'Otro Proyecto',
    description:
      'Otro proyecto destacado. Podés tener tantas cards como proyectos relevantes quieras mostrar.',
    tags: ['PHP', 'MySQL', 'WordPress'],
    href: null, // null = repositorio privado
    live: 'https://cliente.com',
    status: 'cliente',
  },
]

// Badge de estado del proyecto — color según si está en producción, en desarrollo, etc.
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'producción': 'bg-[#0f2a1f] text-[#28c941] border-[#1a4a2a]',
    'cliente':    'bg-[#1a1a0f] text-[#f7c07e] border-[#3a3a1a]',
    'wip':        'bg-[#1a0f0f] text-[#ff7e7e] border-[#3a1a1a]',
  }
  const style = styles[status] ?? styles['wip']

  return (
    <span className={`rounded border px-2 py-0.5 font-mono text-xs ${style}`}>
      {status}
    </span>
  )
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