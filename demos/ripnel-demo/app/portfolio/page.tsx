"use client"

import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Eye,
  Home,
  Sparkles,
  ShoppingCart,
} from "lucide-react"

import { PosHeader } from "@/components/ui/purchase-system/PosHeader"
import { OpsPageShell, OpsSectionDivider } from "@/components/ui/ops-page-shell"
import { OpsSectionHeader } from "@/components/ui/ops-section-header"
import { OpsActionTile } from "@/components/ui/ops-action-tile"
import { OpsPanel, OpsPanelMuted } from "@/components/ui/ops-panel"
import { OpsInlineBadge } from "@/components/ui/ops-inline-badge"
import { OpsMetricCard } from "@/components/ui/ops-metric-card"
import { OpsStatusBadge } from "@/components/ui/ops-status-badge"
import { OpsAttentionRow } from "@/components/ui/ops-attention-row"
import { usePortfolioAuth } from "@/components/portfolio/portfolio-auth-provider"

const portfolioEntry = [
  {
    href: "/portfolio/inicio",
    icon: Home,
    label: "Inicio",
    helper: "Resumen del operador con alertas y acciones del día.",
    tone: "accent" as const,
  },
  {
    href: "/portfolio/panel",
    icon: BarChart3,
    label: "Panel",
    helper: "Indicadores y gráficos de la última semana.",
    tone: "info" as const,
  },
  {
    href: "/portfolio/ventas/nueva",
    icon: ShoppingCart,
    label: "Punto de venta",
    helper: "Flujo POS: cliente, productos, cobro y comprobante.",
    tone: "success" as const,
  },
  {
    href: "/portfolio/inventario",
    icon: Boxes,
    label: "Inventario",
    helper: "Stock por sede con filtros, búsqueda y exportación.",
    tone: "warning" as const,
  },
  {
    href: "/portfolio/componentes",
    icon: Eye,
    label: "Componentes",
    helper: "Catálogo visual de primitives, métricas y feedback.",
    tone: "neutral" as const,
  },
]

export default function PortfolioLandingPage() {
  const { user, defaultLocation } = usePortfolioAuth()

  return (
    <OpsPageShell width="wide">
      <PosHeader
        eyebrow="Portafolio · Demo estática"
        title={
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--ripnel-accent)]" />
            Ripnel — recorrido sin backend
          </span>
        }
        description="Esta carpeta reproduce las pantallas más representativas de la app con datos simulados en el navegador. No hay base de datos, ni autenticación real, ni cambios persistentes."
        meta={
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--ops-text-muted)]">
            <OpsInlineBadge label={user.role_name} tone="accent" />
            <span>·</span>
            <span>{defaultLocation?.name}</span>
            <span>·</span>
            <OpsStatusBadge tone="success" size="xs">
              Demo en vivo
            </OpsStatusBadge>
          </div>
        }
        actions={
          <Link
            href="/portfolio/inicio"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--ripnel-accent)] px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Empezar recorrido
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <OpsSectionDivider>
        <OpsSectionHeader
          icon={<BarChart3 className="h-4 w-4" />}
          title="Métricas de muestra"
        />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <OpsMetricCard
            icon={<ShoppingCart className="h-4 w-4" />}
            label="Ventas del día"
            value="S/. 4,520"
            detail="23 transacciones"
            tone="accent"
          />
          <OpsMetricCard
            icon={<Boxes className="h-4 w-4" />}
            label="Stock crítico"
            value="3"
            detail="productos bajo mínimo"
            tone="warning"
          />
          <OpsMetricCard
            icon={<Home className="h-4 w-4" />}
            label="Transferencias"
            value="5"
            detail="pendientes hoy"
            tone="info"
          />
          <OpsMetricCard
            icon={<Sparkles className="h-4 w-4" />}
            label="Sedes activas"
            value="5"
            detail="3 tiendas · 1 almacén · 1 outlet"
            tone="success"
          />
        </div>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader
          icon={<Eye className="h-4 w-4" />}
          title="Pantallas disponibles"
        />
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {portfolioEntry.map((entry) => (
            <OpsActionTile
              key={entry.href}
              icon={<entry.icon className="h-4 w-4" />}
              label={entry.label}
              href={entry.href}
              tone={entry.tone}
            />
          ))}
        </div>
        <OpsPanel className="mt-4 p-4">
          <p className="text-sm text-[var(--ops-text)]">
            Cada tarjeta abre una vista completamente navegable con datos simulados:
            métricas, tablas, formularios, búsquedas y feedback de carga.
          </p>
          <p className="mt-1 text-xs text-[var(--ops-text-muted)]">
            Los datos se mantienen en memoria del navegador y se reinician al recargar.
          </p>
        </OpsPanel>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader
          icon={<Sparkles className="h-4 w-4" />}
          title="Cómo está construido"
        />
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <OpsPanel className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
              Reutilización
            </p>
            <p className="mt-2 text-sm text-[var(--ops-text)]">
              Componentes compartidos de <code className="rounded bg-[var(--ops-surface-muted)] px-1 py-0.5 text-xs">components/ui</code> se montan
              con props de muestra, sin tocar la app real.
            </p>
          </OpsPanel>
          <OpsPanel className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
              Aislamiento
            </p>
            <p className="mt-2 text-sm text-[var(--ops-text)]">
              AuthProvider propio del demo con usuario, permisos y sedes ficticias.
              No se cruza con la sesión real.
            </p>
          </OpsPanel>
          <OpsPanel className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
              Alcance
            </p>
            <p className="mt-2 text-sm text-[var(--ops-text)]">
              Inicio, panel, POS, inventario y showcase de componentes. Suficiente
              para evaluar UX, jerarquía visual y densidad.
            </p>
          </OpsPanel>
        </div>
        <OpsPanelMuted className="mt-3 p-3 text-xs text-[var(--ops-text-muted)]">
          Esta carpeta no reemplaza la app protegida. La ruta <code className="rounded bg-[var(--ops-surface-muted)] px-1 py-0.5">/portfolio</code> existe
          como entrada independiente y separada del flujo autenticado.
        </OpsPanelMuted>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader
          icon={<Home className="h-4 w-4" />}
          title="Avisos de la operación"
        />
        <div className="mt-3 space-y-2">
          <OpsAttentionRow
            icon={<Boxes className="h-4 w-4" />}
            title="Stock bajo en 3 productos"
            description="Casaca Urbana XL, Polo Básico L y Camisa Oxford Celeste sin stock."
            ctaLabel="Revisar inventario"
            href="/portfolio/inventario"
            highlightValue="3"
            badge="Crítico"
            tone="danger"
            embedded
          />
          <OpsAttentionRow
            icon={<Sparkles className="h-4 w-4" />}
            title="Transferencia esperando aprobación"
            description="Solicitud de Tienda Norte a Almacén Principal por 12 unidades."
            ctaLabel="Ver en el panel"
            href="/portfolio/panel"
            highlightValue="12"
            badge="Pendiente"
            tone="warning"
            embedded
          />
        </div>
      </OpsSectionDivider>
    </OpsPageShell>
  )
}
