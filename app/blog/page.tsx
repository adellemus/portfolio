import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos sobre desarrollo web, React, Python, PHP y todo lo que aprendo en el camino.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      {/* Encabezado */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-6 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            escritura técnica
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white">
          Blog
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-text-muted">
          Lo que aprendo trabajando — arquitectura, herramientas, decisiones técnicas
          y todo lo que ojalá hubiera encontrado en un post cuando lo necesitaba.
        </p>
      </div>

      {/* Lista de posts */}
      {posts.length === 0 ? (
        <div className="rounded-lg border border-border bg-bg-secondary p-12 text-center">
          <p className="font-mono text-sm text-text-dim">
            // los posts aparecerán acá pronto
          </p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-3 py-8 transition-colors first:pt-0 sm:flex-row sm:items-start sm:gap-8"
            >
              {/* Fecha — columna izquierda en desktop */}
              <div className="w-full shrink-0 sm:w-32">
                <p className="font-mono text-xs text-text-dim">
                  {formatDate(post.date)}
                </p>
              </div>

              {/* Contenido */}
              <div className="flex-1">
                <h2 className="mb-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-text-muted">
                  {post.excerpt}
                </p>

                {/* Tags + tiempo de lectura */}
                <div className="flex flex-wrap items-center gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-accent-border bg-accent-muted px-2 py-0.5 font-mono text-xs text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="font-mono text-xs text-text-dim">
                    · {post.readingTime}
                  </span>
                </div>
              </div>

              {/* Flecha — indicador visual de navegación */}
              <div className="hidden shrink-0 text-text-dim transition-colors group-hover:text-accent sm:block">
                →
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}