import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

// Directorio donde viven todos los posts.
// path.join garantiza que funcione tanto en Windows como en Linux/Mac.
const POSTS_DIR = path.join(process.cwd(), 'content/blog')

// ─── Tipos ──────────────────────────────────────────────────────────────────

export interface PostFrontmatter {
  title: string
  date: string           // formato: 'YYYY-MM-DD'
  excerpt: string        // resumen corto para cards y SEO
  tags: string[]         // categorías del post
  published: boolean     // false = draft, no aparece en producción
  coverImage?: string    // opcional: ruta a imagen de portada en /public
}

export interface Post extends PostFrontmatter {
  slug: string           // nombre del archivo sin .mdx (usado en la URL)
  readingTime: string    // ej: "4 min de lectura"
  content: string        // contenido MDX crudo (para compilar después)
}

export type PostMeta = Omit<Post, 'content'>

// ─── Funciones ───────────────────────────────────────────────────────────────

/**
 * Lee todos los archivos .mdx de content/blog, parsea su frontmatter,
 * los filtra por published: true, y los ordena del más reciente al más viejo.
 *
 * Esta función SOLO la llama Next.js en build time (nunca en el browser).
 * Por eso puede usar `fs` sin problema.
 */
export function getAllPosts(): PostMeta[] {
  // Verifica que el directorio existe antes de leerlo
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn('⚠️  No existe el directorio content/blog — devolviendo array vacío.')
    return []
  }

  const filenames = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.mdx'))

  const posts = filenames
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const filePath = path.join(POSTS_DIR, filename)
      const raw = fs.readFileSync(filePath, 'utf-8')

      // gray-matter separa el frontmatter YAML del contenido MDX
      const { data, content } = matter(raw)
      const frontmatter = data as PostFrontmatter

      const stats = readingTime(content)

      return {
        slug,
        readingTime: `${Math.ceil(stats.minutes)} min de lectura`,
        ...frontmatter,
      } as PostMeta
    })
    // En producción solo mostramos posts publicados
    .filter((post) => process.env.NODE_ENV === 'development' || post.published)
    // Orden descendente por fecha (más reciente primero)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

/**
 * Lee un post específico por su slug.
 * Devuelve tanto el frontmatter como el contenido MDX crudo para
 * que next-mdx-remote lo compile en la página del post.
 *
 * Lanza un error si el archivo no existe (Next.js lo convierte en 404).
 */
export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post no encontrado: ${slug}`)
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as PostFrontmatter
  const stats = readingTime(content)

  return {
    slug,
    content,
    readingTime: `${Math.ceil(stats.minutes)} min de lectura`,
    ...frontmatter,
  }
}

/**
 * Devuelve todos los slugs disponibles.
 * Next.js lo usa en generateStaticParams() para pre-generar
 * cada página de post en build time.
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

/**
 * Formatea una fecha ISO a formato legible en español.
 * Ejemplo: '2025-05-01' → 'mayo 2025'
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00') // evita problemas de timezone
  return date.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}