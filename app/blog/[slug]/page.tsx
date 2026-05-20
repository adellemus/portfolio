import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug, formatDate } from '@/lib/posts'

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Props {
  params: { slug: string }
}

// ─── Generación estática ──────────────────────────────────────────────────────
// Next.js llama a esta función en build time para saber qué rutas generar.
// Por cada slug que devolvemos, genera un archivo HTML estático.
// Así /blog/mi-post queda como un HTML pre-renderizado, no hay servidor.
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ─── Metadata dinámica ────────────────────────────────────────────────────────
// Esta función corre en build time para cada post y genera las etiquetas
// SEO específicas de ese post (título, descripción, Open Graph).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug)
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        tags: post.tags,
      },
    }
  } catch {
    // Si el post no existe, devolvemos metadata genérica
    return { title: 'Post no encontrado' }
  }
}

// ─── Componentes MDX personalizados ──────────────────────────────────────────
// Estos componentes reemplazan los elementos HTML que MDX genera.
// Por ejemplo, cada vez que el post tiene un ## Título, en vez de
// renderizar un <h2> genérico, renderiza nuestro componente personalizado.
// Esto nos da control total sobre el estilo sin tocar los archivos .mdx.
const mdxComponents = {
  // Podés agregar componentes React personalizados acá para usarlos en tus posts.
  // Ejemplo: si agregás `Callout`, podés escribir <Callout> en un .mdx y funciona.
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function BlogPostPage({ params }: Props) {
  // Si el slug no existe, getPostBySlug lanza un error y Next.js muestra 404
  const post = getPostBySlug(params.slug)

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* Breadcrumb de navegación */}
      <nav className="mb-10 flex items-center gap-2 font-mono text-xs text-text-dim">
        <Link href="/" className="transition-colors hover:text-accent">inicio</Link>
        <span>/</span>
        <Link href="/blog" className="transition-colors hover:text-accent">blog</Link>
        <span>/</span>
        <span className="text-text-muted">{params.slug}</span>
      </nav>

      {/* Header del post */}
      <header className="mb-12">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-accent-border bg-accent-muted px-2 py-0.5 font-mono text-xs text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Título */}
        <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          {post.title}
        </h1>

        {/* Meta — fecha y tiempo de lectura */}
        <div className="flex items-center gap-3 font-mono text-xs text-text-dim">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* Separador */}
      <hr className="mb-10 border-border" />

      {/* Contenido MDX
          prose-content es la clase definida en globals.css que aplica
          todos los estilos tipográficos al markdown renderizado. 
      */}
      <article className="prose-content">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
        />
      </article>

      {/* Footer del post */}
      <footer className="mt-16 border-t border-border pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-sm text-accent transition-opacity hover:opacity-70"
        >
          ← volver a las publicaciones
        </Link>
      </footer>

    </div>
  )
}