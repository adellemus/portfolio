import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/proyectos/', '/blog/', '/contacto/'].map((path) => ({ url: `${SITE_URL}${path}` })),
    ...getAllPosts().filter((post) => post.published).map((post) => ({
      url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`,
    })),
  ]
}
