# Gestionalo CMS — Demo Interactiva

Esta carpeta contiene un `demo.html` que simula visualmente el panel de administración de **Gestionalo**, un CMS construido con **Laravel 11 + Livewire 3 + PostgreSQL** para una empresa de arquitectura legal e inspección técnica de seguridad.

## ¿Qué hace único a Gestionalo?

### 🧩 Gestión dinámica de contenido
El administrador puede **crear, editar y eliminar** secciones completas del sitio web sin tocar una línea de código:

- **Servicios** — Añadir, modificar o desactivar los servicios profesionales visibles en la landing page.
- **Proyectos** — Administrar el portafolio de obras con galerías de imágenes, logotipos de clientes y estados de publicación.
- **Blog con Categorías** — Publicar artículos organizados por temas, con control de borradores y programación de fechas.

### 🤖 Lectura y resumen con Inteligencia Artificial
Cada artículo del blog incluye un asistente de IA integrado que permite:

- **Escuchar resumen** — Reproducción por voz del contenido usando síntesis de texto a voz.
- **Resumir con IA** — Generación automática de resúmenes ejecutivos usando un modelo de lenguaje (Gemini API) para extraer los puntos clave del artículo en segundos.
- Ideal para profesionales que necesitan consumir información técnica rápidamente sin leer el artículo completo.

### 📅 Sistema de citas nativo (sin Calendly)
Agendamiento de visitas técnicas directamente en la plataforma:

- Calendario con selección de fecha y horarios disponibles (09:00 — 16:00 h).
- Información de costos, medios de pago (Yape / Plin / Interbank) y flujo de confirmación vía WhatsApp.
- Historial completo para el cliente y panel de gestión para el administrador.

### 🛡️ Arquitectura segura y moderna

| Aspecto | Detalle |
|---------|---------|
| **Framework** | Laravel 11 (PHP 8.2) |
| **Frontend** | Livewire 3 + Alpine.js + Tailwind CSS |
| **Base de datos** | PostgreSQL con réplicas de lectura/escritura |
| **Cifrado** | Datos sensibles cifrados en reposo (`encrypted` cast) |
| **Auditoría** | Trazabilidad WORM (Write Once, Read Many) en la tabla `model_audits` — sin posibilidad de modificar o eliminar registros históricos |
| **Seguridad** | Rate limiting por IP/email, políticas por modelo (ServicePolicy, PostPolicy, etc.) |
| **Despliegue** | Contenedor Docker optimizado para Render / nube |

### ⚙️ Panel de administración completo

- Dashboard con métricas en tiempo real.
- CRUD completo de servicios, proyectos, artículos y categorías.
- Bandeja de contactos con mensajes entrantes desde la web.
- Papelera de reciclaje con restauración de elementos eliminados.
- Historial de cambios con auditoría inalterable.

## Cómo usar esta demo

Abre el archivo `demo.html` en cualquier navegador moderno:

```
gestionalo-demo/demo.html
```

Haz clic en **"Ingresar al Panel"** (las credenciales son ilustrativas, no hay conexión real a la base de datos) y navega por las diferentes secciones del menú lateral para explorar la interfaz.

---

*Esta demo es una representación visual del sistema real. Las funcionalidades descritas existen implementadas en el código fuente del proyecto principal.*
