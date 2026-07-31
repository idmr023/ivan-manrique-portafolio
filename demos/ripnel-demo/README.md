# Ripnel · Demo de portafolio

Demo standalone de las pantallas más representativas de **Ripnel**, un ERP interno para una operación textil. Esta versión corre 100% en el navegador: no hay backend, no hay base de datos, no hay autenticación real.

Pensada para展示 en entrevistas, portafolio público o revisión de UX sin levantar infraestructura.

## Demo en vivo

- Landing: `/portfolio`
- Login simulado: `/portfolio/login` (cualquier credencial abre la sesión demo)
- Home del operador: `/portfolio/inicio`
- Panel BI: `/portfolio/panel`
- Punto de venta: `/portfolio/ventas/nueva`
- Inventario: `/portfolio/inventario`
- Showcase de componentes: `/portfolio/componentes`

## Stack

- Next.js 16 (App Router, webpack)
- React 19
- Tailwind CSS 4
- shadcn / Radix UI primitives
- Recharts (gráficos del panel)
- Lucide (iconografía)
- TypeScript estricto

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) (redirige a `/portfolio`).

## Build y deploy

```bash
npm run build
npm run start
```

Para generar un sitio estático sin servidor, agregar a `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: "export",
  // ...
}
```

Y luego `next build` produce `out/`, listo para subir a Vercel, Netlify, Cloudflare Pages o GitHub Pages.

## Qué hay en este repo

```text
app/
  portfolio/         # todas las rutas del demo
    layout.tsx       # layout propio con banner "modo demo" y sidebar
    page.tsx         # landing
    login/           # login simulado
    inicio/          # home del operador
    panel/           # indicadores y gráficos
    ventas/nueva/    # POS
    inventario/      # stock con filtros
    componentes/     # showcase de primitives UI
  layout.tsx         # root layout (sin AuthProvider real)
  page.tsx           # redirect a /portfolio
  globals.css        # tokens y temas
components/
  portfolio/         # auth provider simulado
  ui/                # primitives ops-* y derivados
  modules/demo/      # página de showcase
  dashboard/         # chart card y attention panel
  admin/             # shells administrativos del showcase
  feedback/          # status pages
lib/
  portfolio/         # mock data y mock user
  utils.ts           # cn helper
  format-utils.ts    # formatCurrency
  date-utils.ts      # formatDate, formatDateTime
  routes.ts          # rutas del portfolio
public/              # logo y assets
```

## Aislamiento

- No hay llamadas a `/api/*`.
- No se usa `AuthProvider` real. Toda la sesión se resuelve con datos en memoria.
- El cambio de sede en el sidebar solo afecta al contexto del demo.
- Los datos se reinician al recargar la página.

## Acerca de Ripnel

Ripnel es un ERP interno para una operación textil que cubre inventario, ventas, precios, caja, postventa y transferencias. El repo productivo está separado y no se incluye en este paquete.
