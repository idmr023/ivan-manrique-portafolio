export type ProjectStatus = 'completed' | 'in-progress' | 'planning' | 'not-started';
export type ProjectCategory = 'work' | 'academic' | 'personal' | 'future';

export interface TrackedProject {
  id: string;
  name: string;
  progress: number;
  status: ProjectStatus;
  category: ProjectCategory;
  currentTask: string;
  notes: string;
  updatedAt: string;
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: 'Completado',
  'in-progress': 'En progreso',
  planning: 'Planeación',
  'not-started': 'Por definir',
};

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  completed: '#4ade80',
  'in-progress': '#38bdf8',
  planning: '#f472b6',
  'not-started': '#f59e0b',
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  work: 'Work',
  academic: 'Académico',
  personal: 'Personal',
  future: 'Futuro',
};

export const trackedProjects: TrackedProject[] = [
  {
    id: 'ripnel',
    name: 'Ripnel ERP',
    progress: 95,
    status: 'in-progress',
    category: 'work',
    currentTask: 'Detalles finales',
    notes: 'MVP listo. Documentación lista. Fase final de optimización visual y performance.',
    updatedAt: '2026-06-29',
  },
  {
    id: 'portfolio',
    name: 'Mi Portafolio',
    progress: 100,
    status: 'completed',
    category: 'personal',
    currentTask: 'Completado',
    notes: 'Migrado a Next.js 2026. Nueva especificación de módulos. Imágenes reales colocadas. 100% funcional.',
    updatedAt: '2026-06-29',
  },
  {
    id: 'ollas-comunes',
    name: 'Ollas Comunes',
    progress: 100,
    status: 'completed',
    category: 'academic',
    currentTask: 'Completado',
    notes: 'Proyecto finalizado al 100%. Demo interactiva disponible.',
    updatedAt: '2026-07-30',
  },
  {
    id: 'multisaas',
    name: 'MultiSaaS',
    progress: 50,
    status: 'in-progress',
    category: 'work',
    currentTask: 'Sistema que crea otros sistemas',
    notes: 'Landing page listo. Docker configurado. Funcionalidad interna al 30%.',
    updatedAt: '2026-06-29',
  },
  {
    id: 'cineplanet-impulsa',
    name: 'Cineplanet - Impulsa',
    progress: 30,
    status: 'in-progress',
    category: 'academic',
    currentTask: 'Análisis exploratorio avanzado',
    notes: 'Requerimientos definidos. Data recolectada con el equipo. Avanzando en análisis exploratorio. Definición de métricas clave.',
    updatedAt: '2026-07-30',
  },
  {
    id: 'portafolio-abogado',
    name: 'Portafolio Abogado',
    progress: 100,
    status: 'completed',
    category: 'personal',
    currentTask: 'Completado',
    notes: 'Actualizado 2026 con datos reales. Contacto directo a WhatsApp integrado. 100% funcional.',
    updatedAt: '2026-06-29',
  },
  {
    id: 'peluqueria-yvete',
    name: 'Proyecto Peluquería Yvete',
    progress: 100,
    status: 'completed',
    category: 'personal',
    currentTask: 'Completado',
    notes: 'Landing page + admin frontend/backend completados. Demo estática disponible en el portafolio.',
    updatedAt: '2026-07-30',
  },
  {
    id: 'portafolio-ana',
    name: 'Portafolio Ana',
    progress: 0,
    status: 'not-started',
    category: 'personal',
    currentTask: 'Levantantar data y darme tiempo para revisarlo',
    notes: 'Necesito levantar la data, darme tiempo para verlo y eso.',
    updatedAt: '2026-06-29',
  },
  {
    id: 'app-reto-pasos',
    name: 'App Reto Pasos',
    progress: 85,
    status: 'in-progress',
    category: 'work',
    currentTask: 'Corrección de bugs y pulido de funcionalidades',
    notes: 'App para llevar un reto personal cada día con seguimiento y gamificación. Funcionalidad principal completa, afinando detalles.',
    updatedAt: '2026-07-30',
  },
  {
    id: 'proyecto-architecto-olan',
    name: 'Proyecto Arquitecto Olan',
    progress: 100,
    status: 'completed',
    category: 'personal',
    currentTask: 'Completado',
    notes: 'Proyecto finalizado sobre gestión de arquitectura y optimización de espacios.',
    updatedAt: '2026-07-30',
  },
  {
    id: 'proyecto-dentista',
    name: 'Proyecto Dentista',
    progress: 0,
    status: 'not-started',
    category: 'work',
    currentTask: 'Recolección de data en proceso',
    notes: 'Sistema de gestión de clínica dental con agenda y historial médico',
    updatedAt: '2026-06-29',
  },
  {
    id: 'pagina-web-sharol',
    name: 'Página Web Sharol',
    progress: 0,
    status: 'not-started',
    category: 'personal',
    currentTask: 'Por definir',
    notes: 'Página web personal pendiente de inicio.',
    updatedAt: '2026-07-30',
  },
];
