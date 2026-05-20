// ─── Datos de proyectos ───────────────────────────────────────────────────────
// Están hardcodeados acá porque para un portafolio personal no vale la pena
// una base de datos ni un CMS — simplemente editás este array cuando tenés
// un proyecto nuevo. Simple, directo, sin dependencias extra.
export const PROJECTS = [
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

// Formspree recibe el POST del formulario,
// te reenvía el mensaje a tu email, y tiene un plan gratis de 50 envíos/mes
// — más que suficiente para un portafolio personal.
// SETUP (5 minutos):
// 1. Creá cuenta en https://formspree.io
// 2. Creá un nuevo form y copiá el endpoint (ej: https://formspree.io/f/xpwzabcd)
// 3. Reemplazá FORMSPREE_ENDPOINT abajo con tu endpoint real

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_ID_ACÁ'

// Estado del formulario
export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export const CONTACT_LINKS = [
  {
    label: 'GitHub',
    value: '@tu-usuario',
    href: 'https://github.com/tu-usuario',
  },
  {
    label: 'LinkedIn',
    value: 'Tu Nombre',
    href: 'https://linkedin.com/in/tu-usuario',
  },
  {
    label: 'Email',
    value: 'hola@adelemus.com',
    href: 'mailto:hola@adelemus.com',
  },
]
