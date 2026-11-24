/**
 * Mastery percentages shown in the skills universe.
 * EDIT THESE NUMBERS to adjust each level (0–100).
 * Keys are matched case-insensitively against the tech name in any locale.
 */
const TECH_LEVELS: Record<string, number> = {
  // Frontend
  react: 90,
  'next.js': 90,
  typescript: 85,
  astro: 70,
  'tailwind css': 90,
  html5: 95,
  css3: 90,
  'javascript (es6+)': 90,
  bootstrap: 75,

  // Data & IA
  python: 80,
  sql: 80,
  tableau: 85,
  'power bi': 70,
  pandas: 75,
  numpy: 65,
  jupyter: 75,
  etl: 65,
  'data cleaning': 80,
  'ia generativa': 80,
  'generative ai': 80,

  // Tools & infra
  git: 85,
  github: 85,
  'github actions': 70,
  'node.js': 75,
  express: 75,
  prisma: 70,
  supabase: 80,
  vercel: 85,
  render: 70,
  playwright: 70,
  docker: 60,
  figma: 70,
  'excel avanzado': 80,
  'advanced excel': 80,
  'excel avançado': 80,
};

/** Soft-skill levels by skill id (see `skills` in data.ts). */
const SOFT_LEVELS: Record<number, number> = {
  1: 90, // Liderazgo adaptativo
  2: 85, // Gestión del tiempo bajo presión
  3: 60, // Autenticidad y conexión interpersonal (en mejora)
  4: 90, // Resiliencia y disciplina
  5: 85, // Autogestión y resolución de problemas
  6: 65, // Flexibilidad cognitiva (en mejora)
  7: 85, // Gestión de la presión y organización
  8: 80, // Trabajo en equipo y adaptabilidad
};

const DEFAULT_LEVEL = 70;

export function techLevel(name: string): number {
  return TECH_LEVELS[name.trim().toLowerCase()] ?? DEFAULT_LEVEL;
}

export function softLevel(id: number): number {
  return SOFT_LEVELS[id] ?? DEFAULT_LEVEL;
}
