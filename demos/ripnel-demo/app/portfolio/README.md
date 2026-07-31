# Ripnel · Demo de portafolio

Esta carpeta reproduce las pantallas más representativas de RIPNEL como una
demo estática que corre 100% en el navegador. No toca la app protegida ni
requiere backend.

## Cómo se entra

```text
http://localhost:3000/portfolio
```

Esa ruta carga el layout propio del demo, con su sidebar, banner y auth provider
simulado. Desde ahí se navega a:

| Ruta                       | Pantalla                              |
|----------------------------|----------------------------------------|
| `/portfolio`               | Landing con métricas y accesos rápidos |
| `/portfolio/login`         | Login simulado (cualquier credencial)  |
| `/portfolio/inicio`        | Home del operador con alertas y ventas |
| `/portfolio/panel`         | Panel BI con gráficos y tops          |
| `/portfolio/ventas/nueva`  | POS: cliente, productos, cobro        |
| `/portfolio/inventario`    | Stock con filtros y paginación        |
| `/portfolio/componentes`   | Catálogo de primitives y patrones UI  |

## Qué se reutilizó

- `components/ui/*` y `components/ui/purchase-system/*` para todos los
  primitives y patrones canónicos.
- `components/modules/demo/demo-page.tsx` para la vista de componentes.
- `recharts` para los gráficos del panel.
- Estilos y tokens de `globals.css` (claro / oscuro funcionan igual que en la
  app principal).

## Qué se agregó

- `app/portfolio/layout.tsx`: layout dedicado con banner "modo demo", sidebar
  reducido y selector de sede.
- `app/portfolio/page.tsx`: landing con accesos directos y resumen de lo que
  se puede mostrar.
- `app/portfolio/login/page.tsx`: pantalla de login que acepta cualquier
  credencial.
- `app/portfolio/{inicio,panel,ventas/nueva,inventario,componentes}/page.tsx`:
  versiones mockeadas de los módulos más visuales.
- `components/portfolio/portfolio-auth-provider.tsx`: contexto de auth
  simulado, con usuario, permisos y sedes ficticias.
- `lib/portfolio/portfolio-mock-user.ts` y `lib/portfolio/portfolio-mock-data.ts`:
  datos de muestra (productos, ventas, métricas, alertas).

## Aislamiento

- No se cruza con `AuthProvider` real ni con el `ProtectedGuard`.
- Las rutas no se redirigen a login si la sesión real no existe.
- No se hacen llamadas a `/api/*`. Todo se resuelve con datos estáticos o
  estado local (`useState`).
- El cambio de sede en el selector solo afecta al contexto del demo.

## Cómo correr la app y entrar al demo

```bash
npm run dev:frontend
```

Abrir `http://localhost:3000/portfolio`. La app real sigue funcionando como
siempre en sus rutas protegidas (`/`, `/inicio`, etc.).
