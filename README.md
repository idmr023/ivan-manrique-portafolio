# Ivan Manrique — Portafolio Profesional

![Astro](https://img.shields.io/badge/Astro-4.x-FF5D01?logo=astro) ![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

Portafolio web profesional de **Ivan Daniel Manrique Roa** — Desarrollador Frontend & Data Analyst. Desplegado en Vercel con soporte multilingüe (ES / EN / PT).

---

## Stack

- **Framework**: [Astro 4](https://astro.build/) + React 18
- **Estilos**: Tailwind CSS 3, paleta "Azul Magneto" personalizada
- **Tipografía**: Inter, Montserrat, JetBrains Mono
- **i18n**: 3 idiomas (español, inglés, portugués) con JSON nativo
- **Deploy**: Vercel Serverless Functions
- **Componentes interactivos**: React (Chatbot, búsqueda Ctrl+K)

## Estructura

```
src/
├── components/
│   ├── App.astro            # Página principal (layout completo)
│   ├── Badge.astro
│   ├── Card/                # Tarjetas de skills, experiencia, certificaciones
│   ├── Chat/Chatbot.tsx     # Asistente virtual flotante
│   ├── Others/
│   │   ├── SocialMediaBar.astro
│   │   └── DemoButton.astro
│   └── Search/SearchModal.tsx  # Búsqueda rápida Ctrl+K
├── i18n/
│   ├── index.ts
│   ├── es.json
│   ├── en.json
│   └── pt.json
├── layouts/Layout.astro     # Layout base (SEO, fonts, estilos globales)
└── pages/
    ├── index.astro          # ES (default)
    ├── 404.astro
    ├── en/index.astro
    └── pt/index.astro
```

## Secciones

| Sección | Descripción |
|---|---|
| **Hero** | Titular de alto impacto, foto de perfil, CV, redes sociales |
| **Sobre mí** | Historia profesional + mentalidad runner (35km desierto Marcona) |
| **Experiencia** | Ripnel (ERP con React/Next.js/Supabase) y Teleperformance (Tableau, Tier 4) |
| **Proyectos** | ERP Ripnel, Plataforma Jurídica, Dashboard TP, Análisis Python |
| **Habilidades** | Frontend, Data & IA, Soft Skills, Herramientas |
| **Formación** | UTP Ingeniería de Software, Impulsa UTP, certificaciones Google/Oracle/Platzi |
| **Contacto** | Email, LinkedIn, CV descargable |

## Features

- **Chatbot**: Asistente virtual con detección de intenciones y respuestas en ES/EN/PT
- **Búsqueda Ctrl+K**: Modal de búsqueda rápida con navegación por teclado (↑↓↵)
- **Responsivo**: Diseño mobile-first optimizado para reclutadores
- **ATS-ready**: Contenido optimizado con keywords para sistemas de seguimiento
- **SEO**: Open Graph, meta tags, sitemap automático

## Comandos

```bash
npm install        # Instalar dependencias
npm run dev        # Servidor local (localhost:4321)
npm run build      # Build de producción + typecheck
npm run preview    # Preview del build
```

## Variables de entorno

No requiere variables de entorno. Los enlaces de contacto (LinkedIn, GitHub, email, CV) se editan directamente en:
- `src/components/Others/SocialMediaBar.astro`
- `src/components/App.astro` (footer, botones Hero y Contacto)

## Licencia

MIT — Ivan Daniel Manrique Roa © 2026
