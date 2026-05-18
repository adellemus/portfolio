import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/posts'

// Metadata específica del home — sobrescribe el template del layout
export const metadata: Metadata = {
  title: 'Adel Lemus — Desarrollador Full Stack',
  description:
    'Portafolio personal de Adel Lemus. Desarrollo web con React, Vite, PHP, Python, Spring Boot, MySQL y MongoDB.,. Disponible para proyectos freelance.',
}

// Skills con su nivel (0-100). Cambiá los valores según tu honestidad contigo mismo 😄
const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Vite', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    category: 'Backend',
    items: ['PHP', 'Spring Boot', 'Python', 'REST APIs'],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'SQL', 'MongoDB'],
  },
  {
    category: 'Mobile',
    items: ['React Native'],
  },
  {
    category: 'CMS & Legacy',
    items: ['WordPress', 'jQuery'],
  },
]

// Esta es la función de componente principal.
// En Next.js App Router, los componentes de página son async por defecto,
// lo que permite hacer fetch de datos directamente sin useEffect ni estados.
export default async function HomePage() {
  // Traemos solo los 3 posts más recientes para el preview del home.
  // getAllPosts() lee el sistema de archivos — solo corre en el servidor.
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div className="mx-auto max-w-5xl px-6">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="grid min-h-[85vh] grid-cols-1 items-center gap-12 py-16 md:grid-cols-2">

        {/* Texto del hero */}
        <div className="animate-fade-up">
          {/* Tag superior */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-6 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Desarrollador Full Stack
            </span>
          </div>

          <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            Construyo cosas
            <br />
            para la{' '}
            <em className="not-italic text-accent">web</em>
          </h1>

          <p className="mb-8 max-w-md text-base leading-relaxed text-text-muted">
            Desarrollador con más de 12 años de experiencia creando aplicaciones web,
            plataformas de negocio e interfaces modernas con React, Vite, Next.js, PHP, Python, SQL y MongoDB.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/proyectos"
              className="rounded bg-accent px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-bg-primary transition-colors hover:bg-accent-dark"
            >
              Ver proyectos
            </Link>
            <Link
              href="/contacto"
              className="rounded border border-accent-border bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent-muted"
            >
              Contacto ↗
            </Link>
          </div>
        </div>

        {/* Terminal animado */}
        <div className="animate-fade-up animate-delay-200 rounded-lg border border-border bg-bg-secondary overflow-hidden">
          {/* Barra superior del terminal */}
          <div className="flex items-center gap-2 border-b border-border bg-bg-secondary px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c941]" />
            <span className="ml-auto font-mono text-xs text-text-dim">about.json</span>
          </div>

          {/* Contenido del terminal */}
          <div className="p-5 font-mono text-sm leading-loose">
            <div className="flex gap-2">
              <span className="text-accent">$</span>
              <span className="text-text-secondary">cat about.json</span>
            </div>
            <div className="mt-1 text-text-muted">{'{'}</div>
            <div className="pl-4 text-text-muted">
              <span className="text-[#7eb8f7]">"nombre"</span>:{' '}
              <span className="text-[#f7c07e]">"Adel Lemus"</span>,
            </div>
            <div className="pl-4 text-text-muted">
              <span className="text-[#7eb8f7]">"rol"</span>:{' '}
              <span className="text-[#f7c07e]">"Full Stack Dev"</span>,
            </div>
            <div className="pl-4 text-text-muted">
              <span className="text-[#7eb8f7]">"experiencia"</span>:{' '}
              <span className="text-[#f7c07e]">"12+ years"</span>,
            </div>
            <div className="pl-4 text-text-muted">
              <span className="text-[#7eb8f7]">"mainStack"</span>: [
              <span className="text-[#f7c07e]">"React"</span>,{' '}
              <span className="text-[#f7c07e]">"Vite"</span>,{' '}
              <span className="text-[#f7c07e]">"Next.js"</span>,{' '}
              <span className="text-[#f7c07e]">"PHP"</span>,{' '}
              <span className="text-[#f7c07e]">"Python"</span>,{' '}
              <span className="text-[#f7c07e]">"SQL"</span>,{' '}
              <span className="text-[#f7c07e]">"MongoDB"</span>],
            </div>
            <div className="pl-4 text-text-muted">
              <span className="text-[#7eb8f7]">"disponible"</span>:{' '}
              <span className="text-[#28c941]">true</span>
            </div>
            <div className="text-text-muted">{'}'}</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-accent">$</span>
              {/* Cursor parpadeante */}
              <span className="inline-block h-4 w-2 animate-blink bg-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────── */}
      <section className="border-t border-border py-16">
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-text-dim">
          // stack tecnológico
        </p>

         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group) => (
            <div
              key={group.category}
              className="rounded-md border border-border bg-bg-secondary p-5 transition-colors hover:border-accent"
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                {group.category}
              </p>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded border border-accent-border bg-accent-muted px-2 py-1 font-mono text-xs text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ÚLTIMOS POSTS ────────────────────────────────────────────── */}
      <section className="border-t border-border py-16">
        <div className="mb-8 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-text-dim">
            // últimas entradas del blog
          </p>
          <Link
            href="/blog"
            className="font-mono text-xs text-accent transition-opacity hover:opacity-70"
          >
            ver todos →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          // Estado vacío — aparece hasta que tengás tu primer post
          <div className="rounded-lg border border-border bg-bg-secondary p-8 text-center">
            <p className="font-mono text-sm text-text-dim">
              // próximamente —
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-lg border border-border bg-bg-secondary p-5 transition-all hover:-translate-y-1 hover:border-accent"
              >
                <p className="mb-2 font-mono text-xs text-text-dim">
                  {formatDate(post.date)} · {post.readingTime}
                </p>
                <h3 className="mb-2 text-base font-bold leading-snug text-white">
                  {post.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-text-muted">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-accent-border bg-accent-muted px-2 py-0.5 font-mono text-xs text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}