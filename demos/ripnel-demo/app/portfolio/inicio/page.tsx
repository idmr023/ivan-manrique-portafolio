"use client"

import Link from "next/link"
import {
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  Boxes,
  CircleAlert,
  ClipboardList,
  Info,
  PackageSearch,
  ShoppingCart,
  Store,
  TriangleAlert,
  Truck,
  Users,
  Wallet,
} from "lucide-react"

import { PosHeader } from "@/components/ui/purchase-system/PosHeader"
import {
  OpsPageShell,
  OpsSectionDivider,
  OpsSearchField,
  OpsTableBlock,
} from "@/components/ui/ops-page-shell"
import { OpsSectionHeader } from "@/components/ui/ops-section-header"
import { OpsActionTile } from "@/components/ui/ops-action-tile"
import { OpsPanelMuted } from "@/components/ui/ops-panel"
import { OpsInfoCard } from "@/components/ui/ops-info-card"
import { OpsMetricCard } from "@/components/ui/ops-metric-card"
import { OpsAttentionRow } from "@/components/ui/ops-attention-row"
import { OpsStatusBadge } from "@/components/ui/ops-status-badge"
import { OpsInlineBadge } from "@/components/ui/ops-inline-badge"
import { OpsDataTable } from "@/components/ui/ops-data-table"
import { OpsEmptyState } from "@/components/ui/ops-empty-state"
import { OpsSelect, type OpsOption } from "@/components/ui/ops-selection"
import { usePortfolioAuth } from "@/components/portfolio/portfolio-auth-provider"
import {
  portfolioAlerts,
  portfolioProducts,
  portfolioRecentSales,
} from "@/lib/portfolio/portfolio-mock-data"
import { formatCurrency } from "@/lib/format-utils"
import { formatDate, formatDateTime } from "@/lib/date-utils"

const priorityTone = {
  danger: "danger" as const,
  warning: "warning" as const,
  accent: "accent" as const,
}

const filterOptions: OpsOption[] = [
  { value: "all", label: "Todas" },
  { value: "today", label: "Hoy" },
  { value: "pending", label: "Pendientes" },
]

export default function PortfolioInicioPage() {
  const { user, defaultLocation } = usePortfolioAuth()

  const criticalStock = portfolioProducts
    .filter((product) => product.status === "low" || product.status === "out")
    .slice(0, 4)

  const todaySales = portfolioRecentSales.slice(0, 5)

  return (
    <OpsPageShell width="wide">
      <PosHeader
        eyebrow="Inicio · Resumen del operador"
        title={`Hola, ${user.full_name.split(" ")[0]}`}
        description={`${defaultLocation?.name} · ${user.role_name} · ${formatDate(new Date().toISOString())}`}
        meta={
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--ops-text-muted)]">
            <OpsInlineBadge label="Caja abierta" tone="success" />
            <span>·</span>
            <span>6 ventas registradas</span>
          </div>
        }
        actions={
          <Link
            href="/portfolio/ventas/nueva"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--ripnel-accent)] px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <ShoppingCart className="h-4 w-4" />
            Nueva venta
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <OpsSectionDivider>
        <OpsSectionHeader icon={<BarChart3 className="h-4 w-4" />} title="Métricas del día" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <OpsMetricCard
            icon={<ShoppingCart className="h-4 w-4" />}
            label="Ventas"
            value={formatCurrency(4520)}
            detail="23 transacciones"
            tone="accent"
          />
          <OpsMetricCard
            icon={<Wallet className="h-4 w-4" />}
            label="Caja actual"
            value={formatCurrency(1240)}
            detail="Esperado: S/. 1,200"
            tone="success"
          />
          <OpsMetricCard
            icon={<Boxes className="h-4 w-4" />}
            label="Stock crítico"
            value="3"
            detail="productos bajo mínimo"
            tone="warning"
          />
          <OpsMetricCard
            icon={<ArrowLeftRight className="h-4 w-4" />}
            label="Transferencias"
            value="5"
            detail="3 sin recibir"
            tone="info"
          />
        </div>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<TriangleAlert className="h-4 w-4" />} title="Atención prioritaria" />
        <div className="mt-3 space-y-2">
          {portfolioAlerts.map((alert) => (
            <OpsAttentionRow
              key={alert.id}
              icon={
                alert.severity === "danger" ? (
                  <CircleAlert className="h-4 w-4" />
                ) : alert.severity === "warning" ? (
                  <TriangleAlert className="h-4 w-4" />
                ) : (
                  <Info className="h-4 w-4" />
                )
              }
              title={alert.title}
              description={alert.description}
              ctaLabel={alert.cta}
              href={alert.href}
              highlightValue={
                alert.severity === "danger" ? "3" : alert.severity === "warning" ? "5" : "12"
              }
              badge={alert.severity === "danger" ? "Crítico" : alert.severity === "warning" ? "Pendiente" : "Info"}
              tone={priorityTone[alert.severity]}
              embedded
            />
          ))}
        </div>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<Store className="h-4 w-4" />} title="Accesos rápidos" />
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <OpsActionTile icon={<ShoppingCart className="h-4 w-4" />} label="Nueva venta" href="/portfolio/ventas/nueva" tone="accent" />
          <OpsActionTile icon={<Boxes className="h-4 w-4" />} label="Inventario" href="/portfolio/inventario" tone="warning" />
          <OpsActionTile icon={<ArrowLeftRight className="h-4 w-4" />} label="Transferencias" href="/portfolio/panel" tone="info" />
          <OpsActionTile icon={<BarChart3 className="h-4 w-4" />} label="Panel BI" href="/portfolio/panel" tone="success" />
          <OpsActionTile icon={<Users className="h-4 w-4" />} label="Clientes" href="/portfolio/inicio" tone="neutral" />
          <OpsActionTile icon={<Wallet className="h-4 w-4" />} label="Caja del día" href="/portfolio/inicio" tone="neutral" />
          <OpsActionTile icon={<Truck className="h-4 w-4" />} label="Recepciones" href="/portfolio/inicio" tone="info" />
          <OpsActionTile icon={<ClipboardList className="h-4 w-4" />} label="Postventa" href="/portfolio/inicio" tone="neutral" />
        </div>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<PackageSearch className="h-4 w-4" />} title="Stock crítico" />
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <OpsTableBlock>
              <OpsDataTable
                columns={[
                  { key: "name", header: "Producto" },
                  { key: "sku", header: "SKU" },
                  { key: "variant", header: "Variante" },
                  { key: "stock", header: "Stock" },
                  { key: "status", header: "Estado" },
                ]}
                emptyMessage="Sin productos críticos"
                isEmpty={criticalStock.length === 0}
              >
                {criticalStock.map((product) => (
                  <tr key={product.id} className="text-sm transition hover:bg-[var(--ops-surface-muted)]">
                    <td className="px-4 py-2.5 font-medium text-[var(--ops-text)]">{product.name}</td>
                    <td className="px-4 py-2.5 text-[var(--ops-text-muted)]">{product.sku}</td>
                    <td className="px-4 py-2.5 text-[var(--ops-text-muted)]">
                      {product.color} · Talla {product.size}
                    </td>
                    <td className="px-4 py-2.5 font-semibold">{product.stock}</td>
                    <td className="px-4 py-2.5">
                      <OpsStatusBadge tone={product.status === "out" ? "danger" : "warning"} size="xs">
                        {product.status === "out" ? "Sin stock" : "Bajo mínimo"}
                      </OpsStatusBadge>
                    </td>
                  </tr>
                ))}
              </OpsDataTable>
            </OpsTableBlock>
          </div>
          <OpsInfoCard title="Resumen de atención" icon={TriangleAlert}>
            <ul className="space-y-2 text-sm text-[var(--ops-text-muted)]">
              <li className="flex items-center justify-between">
                <span>Productos bajo mínimo</span>
                <OpsInlineBadge label="3" tone="warning" />
              </li>
              <li className="flex items-center justify-between">
                <span>Sin stock</span>
                <OpsInlineBadge label="1" tone="danger" />
              </li>
              <li className="flex items-center justify-between">
                <span>Transferencias sin recibir</span>
                <OpsInlineBadge label="3" tone="accent" />
              </li>
            </ul>
            <OpsPanelMuted className="mt-3 p-2 text-xs text-[var(--ops-text-muted)]">
              Datos ficticios del 8 de julio, 2026.
            </OpsPanelMuted>
          </OpsInfoCard>
        </div>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<ShoppingCart className="h-4 w-4" />} title="Ventas recientes" />
        <OpsTableBlock>
          <div className="flex flex-wrap items-center gap-3 pb-3">
            <OpsSearchField
              label="Buscar venta"
              value=""
              onChange={() => {}}
              placeholder="Cliente, ID o monto…"
              ariaLabel="Buscar venta reciente"
            />
            <OpsSelect
              label="Filtro"
              value="all"
              onValueChange={() => {}}
              options={filterOptions}
            />
          </div>
          <OpsDataTable
            columns={[
              { key: "id", header: "ID" },
              { key: "date", header: "Fecha" },
              { key: "customer", header: "Cliente" },
              { key: "items", header: "Items" },
              { key: "total", header: "Total" },
              { key: "location", header: "Sede" },
              { key: "status", header: "Estado" },
            ]}
            emptyMessage="Sin ventas registradas"
          >
            {todaySales.length > 0 ? (
              todaySales.map((sale) => (
                <tr key={sale.id} className="text-sm transition hover:bg-[var(--ops-surface-muted)]">
                  <td className="px-4 py-2.5 font-mono text-[11px] text-[var(--ops-text-muted)]">
                    {sale.id}
                  </td>
                  <td className="px-4 py-2.5 text-[var(--ops-text-muted)]">
                    {formatDateTime(sale.date)}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-[var(--ops-text)]">{sale.customer}</td>
                  <td className="px-4 py-2.5 text-[var(--ops-text-muted)]">{sale.items}</td>
                  <td className="px-4 py-2.5 font-semibold">{formatCurrency(sale.total)}</td>
                  <td className="px-4 py-2.5 text-[var(--ops-text-muted)]">{sale.location}</td>
                  <td className="px-4 py-2.5">
                    <OpsStatusBadge
                      tone={sale.status === "completed" ? "success" : sale.status === "pending" ? "warning" : "danger"}
                      size="xs"
                    >
                      {sale.status === "completed" ? "Completada" : sale.status === "pending" ? "Pendiente" : "Cancelada"}
                    </OpsStatusBadge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-6">
                  <OpsEmptyState
                    title="Sin ventas hoy"
                    description="Cuando registres ventas aparecerán en este listado."
                    variant="compact"
                  />
                </td>
              </tr>
            )}
          </OpsDataTable>
        </OpsTableBlock>
      </OpsSectionDivider>
    </OpsPageShell>
  )
}
