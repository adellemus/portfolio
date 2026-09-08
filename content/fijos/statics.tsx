// ─── Datos de proyectos ───────────────────────────────────────────────────────
// Están hardcodeados acá porque para un portafolio personal no vale la pena
// una base de datos ni un CMS — simplemente editás este array cuando tenés
// un proyecto nuevo. Simple, directo, sin dependencias extra.
export const PROJECTS = [
  {
    title: 'Mobeela',
    projectType: 'MVP SaaS',
    tagline: 'La gestión inmobiliaria, conectada.',
    description:
      'Plataforma SaaS que reúne propiedades, clientes y publicaciones en un solo lugar. Permite sincronizar avisos con portales inmobiliarios, gestionar oportunidades comerciales y utilizar inteligencia artificial para apoyar la creación de contenido y la relación entre clientes y propiedades. Participé en su desarrollo como parte del equipo, trabajando sobre una arquitectura multiempresa, permisos por rol e interfaces adaptables a cada corredora.',
    tags: ['SaaS', 'Next.js', 'NestJS', 'PostgreSQL', 'AI'],
    href: null,
    live: "www.mobeela.com",
    status: 'Activo',
    statusType: 'activo',
  },

  {
    title: 'Plataforma de Gestión Comercial',
    projectType: 'MVP SaaS',
    tagline: 'De un prospecto a una oportunidad, sin perder el seguimiento.',
    description:
      'Producto SaaS en desarrollo para equipos que gestionan prospectos, llamadas, seguimientos y citas. Busca concentrar en un solo flujo la información comercial y las próximas acciones de cada contacto, manteniendo trazabilidad sobre el trabajo realizado y reduciendo oportunidades perdidas por falta de seguimiento.',
    tags: ['SaaS', 'CRM', 'Workflows', 'RBAC'],
    href: null,
    live: "beacon.adelemus.com",
    status: 'Desarrollo',
    statusType: 'desarrollo',
  },

  {
    title: 'Dynamic Workflow Forms',
    projectType: 'Proyecto profesional',
    tagline: 'Formularios capaces de adaptarse al proceso.',
    description:
      'Trabajo realizado dentro de un proyecto empresarial sobre una plataforma de formularios utilizada en procesos con múltiples etapas, roles y reglas de negocio. Participé en la evolución de su arquitectura para permitir estructuras más flexibles, secciones dinámicas y diferentes experiencias según el estado del proceso y los permisos del usuario, manteniendo compatibilidad con funcionalidades existentes.',
    tags: ['React', 'Dynamic Forms', 'Workflows', 'RBAC'],
    href: null,
    live: null,
    status: 'Profesional',
    statusType: 'profesional',
  },

  {
    title: 'Gestión Documental Legal',
    projectType: 'Concepto de producto',
    tagline: 'Documentación legal organizada alrededor de cada caso.',
    description:
      'Concepto de producto orientado a estudios jurídicos, fiscalías y equipos legales que necesitan centralizar grandes volúmenes de documentos. La propuesta combina organización por casos y clientes, búsqueda avanzada y herramientas de inteligencia artificial para localizar, resumir y reutilizar información documental de forma más eficiente.',
    tags: ['Document Management', 'AI', 'Search', 'SaaS'],
    href: null,
    live: null,
    status: 'Desarrollo',
    statusType: 'desarrollo',
  },

  {
    title: 'Money Change World',
    projectType: 'Pagina Web',
    tagline: 'Operaciones financieras desde una experiencia simple.',
    description:
      'Plataforma digital para gestionar operaciones de cambio, pagos, beneficiarios y movimientos desde una aplicación móvil. El proyecto incluye aplicación, backend e infraestructura propia, con flujos de autenticación, comprobantes e historial de operaciones diseñados para simplificar la experiencia del usuario.',
    tags: ['React Native', 'Expo', 'Python', 'Flask', 'MySQL'],
    href: null,
    live: 'https://moneychangeworld.com',
    status: 'Activo',
    statusType: 'activo',
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
