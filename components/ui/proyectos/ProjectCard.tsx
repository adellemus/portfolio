'use client'

import { useId, useRef } from 'react'
import type { PROJECTS } from '@/content/fijos/statics'
import { StatusBadge } from '@/components/ui/proyectos/StatusBadge'

const PROJECT_LINK_STYLES: Record<string, { label: string; className: string }> = {
  activo: { label: 'ver live', className: 'text-accent' },
  desarrollo: { label: 'ver avance', className: 'text-estado-desarrollo' },
  wip: { label: 'ver progreso', className: 'text-estado-wip' },
  profesional: { label: 'ver proyecto', className: 'text-estado-profesional' },
}

export function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialogId = useId()
  const titleId = useId()
  const linkStyle = PROJECT_LINK_STYLES[project.statusType] ?? PROJECT_LINK_STYLES.wip

  return (
    <article
      className="group flex h-[24rem] min-w-0 flex-col self-start rounded-lg border border-border bg-bg-secondary p-6 transition-colors hover:border-accent-border"
    >
      {/* Header de la card */}
      <div className="mb-4 shrink-0">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h2 className="min-w-0 break-words text-base font-bold leading-snug text-white">
            {project.title}
          </h2>

          <div className="flex justify-end text-right [&>span]:text-[12px] [&>span]:leading-relaxed">
            <StatusBadge
              status={project.status}
              type={project.statusType}
            />
          </div>
        </div>

        {project.tagline && (
          <p className="mt-2 text-sm italic leading-relaxed text-text-muted">
            {project.tagline}
          </p>
        )}
      </div>

      {/* Descripción */}
      <div className="mb-4 flex min-h-0 flex-1 flex-col">
        <p className="min-h-0 flex-1 overflow-hidden text-sm leading-relaxed text-text-muted [mask-image:linear-gradient(to_bottom,black_65%,transparent)]">
          {project.description}
        </p>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-controls={dialogId}
          onClick={() => dialogRef.current?.showModal()}
          className="mt-2 shrink-0 self-start rounded font-mono text-xs text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          Ver más <span aria-hidden="true">↗</span>
          <span className="sr-only"> sobre {project.title}</span>
        </button>
      </div>

      {/* Tags de tecnología */}
      <div className="mb-5 flex shrink-0 flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-accent-border/75 bg-bg-primary/30 px-2 py-0.5 font-mono text-xs text-text-muted transition-colors hover:border-accent-border hover:bg-bg-primary/50 hover:text-accent"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links — código fuente y demo */}
      <div className="flex shrink-0 items-center gap-4 border-t border-border pt-4">
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
            href={/^https?:\/\//i.test(project.live) ? project.live : `https://${project.live}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-auto font-mono text-xs ${linkStyle.className} transition-opacity hover:opacity-70`}
          >
            {linkStyle.label} →
          </a>
        )}
      </div>
      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return
          const bounds = event.currentTarget.getBoundingClientRect()
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            event.currentTarget.close()
          }
        }}
        className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl rounded-2xl border border-accent-border bg-bg-secondary p-6 text-text-secondary shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:p-10"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <StatusBadge status={project.status} type={project.statusType} />
          <button type="button" onClick={() => dialogRef.current?.close()} className="rounded border border-border px-3 py-2 font-mono text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
            Cerrar <span aria-hidden="true">×</span>
          </button>
        </div>
        <h2 id={titleId} className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl">{project.title}</h2>
        {project.tagline && <p className="mb-6 text-base text-accent">{project.tagline}</p>}
        <p className="text-base leading-relaxed text-text-secondary">{project.description}</p>
        <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
          {project.tags.map((tag) => <span key={tag} className="rounded border border-accent-border bg-bg-primary/30 px-2 py-1 font-mono text-xs text-text-muted">{tag}</span>)}
        </div>
        {project.live && <a href={/^https?:\/\//i.test(project.live) ? project.live : `https://${project.live}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-mono text-sm text-accent hover:underline">{linkStyle.label} ↗</a>}
      </dialog>
    </article>
  )
}
