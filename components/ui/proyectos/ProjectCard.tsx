'use client'

import { useId, useState } from 'react'
import type { PROJECTS } from '@/content/fijos/statics'
import { StatusBadge } from '@/components/ui/proyectos/StatusBadge'

const PROJECT_LINK_STYLES: Record<string, { label: string; className: string }> = {
  activo: { label: 'ver live', className: 'text-accent' },
  desarrollo: { label: 'ver avance', className: 'text-estado-desarrollo' },
  wip: { label: 'ver progreso', className: 'text-estado-wip' },
  profesional: { label: 'ver proyecto', className: 'text-estado-profesional' },
}

export function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const [expanded, setExpanded] = useState(false)
  const descriptionId = useId()
  const linkStyle = PROJECT_LINK_STYLES[project.statusType] ?? PROJECT_LINK_STYLES.wip

  return (
    <article
      className={`group flex flex-col self-start rounded-lg border border-border bg-bg-secondary p-6 transition-colors hover:border-accent-border ${expanded ? "min-h-[24rem]" : "h-[24rem]"}`}
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
      <div className="mb-5 min-h-0 flex-1">
        <p id={descriptionId} className={`text-justify text-sm leading-relaxed text-text-muted ${expanded ? "" : "line-clamp-5"}`}>
          {project.description}
        </p>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={descriptionId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 rounded font-mono text-xs text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {expanded ? 'ver menos?' : 'ver mas?'}
          <span className="sr-only"> sobre {project.title}</span>
        </button>
      </div>

      {/* Tags de tecnología */}
      <div className="mb-5 flex shrink-0 flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border/60 bg-bg-primary/30 px-2 py-0.5 font-mono text-xs text-text-muted"
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
    </article>
  )
}
