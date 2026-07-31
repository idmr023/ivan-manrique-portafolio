"use client"

import { useMemo, useState } from "react"
import { Download, MapPin, RotateCcw, Search } from "lucide-react"

import { PosHeader } from "@/components/ui/purchase-system/PosHeader"
import {
  OpsPageShell,
  OpsSectionDivider,
  OpsTableBlock,
  OpsFiltersRow,
  OpsSearchField,
} from "@/components/ui/ops-page-shell"
import { OpsSectionHeader } from "@/components/ui/ops-section-header"
import { OpsDataTable } from "@/components/ui/ops-data-table"
import { OpsSelect, type OpsOption } from "@/components/ui/ops-selection"
import { OpsStatusBadge } from "@/components/ui/ops-status-badge"
import { OpsInlineBadge } from "@/components/ui/ops-inline-badge"
import { OpsMetricInlineGroup } from "@/components/ui/ops-metric-inline-group"
import { OpsPanel, OpsPanelMuted } from "@/components/ui/ops-panel"
import { Pagination } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { usePortfolioAuth } from "@/components/portfolio/portfolio-auth-provider"
import { portfolioProducts } from "@/lib/portfolio/portfolio-mock-data"
import { formatCurrency } from "@/lib/format-utils"

const statusOptions: OpsOption[] = [
  { value: "all", label: "Todos los estados" },
  { value: "available", label: "Disponible", badge: "OK", tone: "success" },
  { value: "low", label: "Stock bajo", badge: "!", tone: "warning" },
  { value: "out", label: "Sin stock", badge: "0", tone: "danger" },
]

export default function PortfolioInventarioPage() {
  const { defaultLocation, locationAssignments } = usePortfolioAuth()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [locationId, setLocationId] = useState<string>(defaultLocation?.location_id || "all")
  const [page, setPage] = useState(1)
  const pageSize = 6

  const locationOptions: OpsOption[] = useMemo(
    () => [
      { value: "all", label: "Todas las sedes" },
      ...locationAssignments.map(({ location }) => ({
        value: location.location_id,
        label: location.name,
        badge: location.is_default ? "★" : undefined,
        tone: location.is_default ? ("accent" as const) : undefined,
      })),
    ],
    [locationAssignments],
  )

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    return portfolioProducts.filter((product) => {
      if (status !== "all" && product.status !== status) return false
      if (!term) return true
      return (
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        product.color.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      )
    })
  }, [search, status])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const paginated = filteredProducts.slice((page - 1) * pageSize, page * pageSize)

  const counts = useMemo(() => {
    const available = portfolioProducts.filter((p) => p.status === "available").length
    const low = portfolioProducts.filter((p) => p.status === "low").length
    const out = portfolioProducts.filter((p) => p.status === "out").length
    const totalStock = portfolioProducts.reduce((acc, p) => acc + p.stock, 0)
    return { available, low, out, totalStock }
  }, [])

  return (
    <OpsPageShell width="wide">
      <PosHeader
        eyebrow="Stock · Inventario"
        title="Stock por sede"
        description="Vista de catálogo con stock por variante. Filtros, búsqueda y métricas calculadas sobre datos de muestra."
        meta={
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--ops-text-muted)]">
            <MapPin className="h-3.5 w-3.5" />
            <span>{defaultLocation?.name}</span>
            <span>·</span>
            <span>{portfolioProducts.length} productos</span>
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <RotateCcw className="h-3.5 w-3.5" />
              Refrescar
            </Button>
            <Button variant="accent" size="sm" className="h-8 text-xs">
              <Download className="h-3.5 w-3.5" />
              Exportar CSV
            </Button>
          </div>
        }
      />

      <OpsSectionDivider>
        <OpsSectionHeader icon={<Search className="h-4 w-4" />} title="Resumen" />
        <OpsMetricInlineGroup
          className="mt-3"
          items={[
            { label: "Productos", value: String(portfolioProducts.length), tone: "default" },
            { label: "Unidades totales", value: String(counts.totalStock), tone: "accent" },
            { label: "Disponibles", value: String(counts.available), tone: "success" },
            { label: "Stock bajo", value: String(counts.low), tone: "warning" },
            { label: "Sin stock", value: String(counts.out), tone: "danger" },
          ]}
        />
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<MapPin className="h-4 w-4" />} title="Filtros" />
        <OpsTableBlock className="mt-3">
          <OpsFiltersRow>
            <OpsSearchField
              label="Buscar"
              value={search}
              onChange={setSearch}
              placeholder="Nombre, SKU, color o categoría…"
              ariaLabel="Buscar producto"
            />
            <OpsSelect
              label="Estado"
              value={status}
              onValueChange={setStatus}
              options={statusOptions}
            />
            <OpsSelect
              label="Sede"
              value={locationId}
              onValueChange={setLocationId}
              options={locationOptions}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("")
                setStatus("all")
                setLocationId(defaultLocation?.location_id || "all")
                setPage(1)
              }}
              className="h-8 text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Limpiar
            </Button>
          </OpsFiltersRow>

          <OpsDataTable
            columns={[
              { key: "name", header: "Producto" },
              { key: "sku", header: "SKU" },
              { key: "category", header: "Categoría" },
              { key: "variant", header: "Variante" },
              { key: "stock", header: "Stock" },
              { key: "price", header: "Precio" },
              { key: "status", header: "Estado" },
            ]}
            emptyMessage="No hay productos que coincidan con los filtros"
            isEmpty={filteredProducts.length === 0}
            footer={
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[11px] text-[var(--ops-text-muted)]">
                <span>
                  Mostrando {Math.min(filteredProducts.length, (page - 1) * pageSize + 1)}–
                  {Math.min(filteredProducts.length, page * pageSize)} de {filteredProducts.length}
                </span>
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            }
          >
            {paginated.map((product) => (
              <tr key={product.id} className="text-sm transition hover:bg-[var(--ops-surface-muted)]">
                <td className="px-4 py-2.5 font-medium text-[var(--ops-text)]">{product.name}</td>
                <td className="px-4 py-2.5 font-mono text-[11px] text-[var(--ops-text-muted)]">
                  {product.sku}
                </td>
                <td className="px-4 py-2.5 text-[var(--ops-text-muted)]">{product.category}</td>
                <td className="px-4 py-2.5 text-[var(--ops-text-muted)]">
                  {product.color} · Talla {product.size}
                </td>
                <td className="px-4 py-2.5 font-semibold">{product.stock}</td>
                <td className="px-4 py-2.5 font-semibold">{formatCurrency(product.price)}</td>
                <td className="px-4 py-2.5">
                  {product.status === "out" ? (
                    <OpsStatusBadge tone="danger" size="xs">Sin stock</OpsStatusBadge>
                  ) : product.status === "low" ? (
                    <OpsStatusBadge tone="warning" size="xs">Bajo mínimo</OpsStatusBadge>
                  ) : (
                    <OpsStatusBadge tone="success" size="xs">Disponible</OpsStatusBadge>
                  )}
                </td>
              </tr>
            ))}
          </OpsDataTable>
        </OpsTableBlock>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<MapPin className="h-4 w-4" />} title="Distribución por sede" />
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {locationAssignments.slice(0, 3).map(({ location }) => {
            const productsHere = portfolioProducts.slice(0, 4)
            return (
              <OpsPanel key={location.location_id} className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--ops-text)]">{location.name}</p>
                  <OpsInlineBadge
                    label={location.is_default ? "Sede actual" : location.type === "warehouse" ? "Almacén" : "Tienda"}
                    tone={location.is_default ? "accent" : "neutral"}
                  />
                </div>
                <p className="text-xs text-[var(--ops-text-muted)]">{location.address}</p>
                <ul className="mt-3 space-y-1.5 text-xs">
                  {productsHere.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-center justify-between border-b border-dashed border-[var(--ops-border-soft)] pb-1 last:border-0"
                    >
                      <span className="text-[var(--ops-text)]">{product.name}</span>
                      <span className="font-semibold text-[var(--ops-text-muted)]">{product.stock}</span>
                    </li>
                  ))}
                </ul>
                <OpsPanelMuted className="mt-3 p-2 text-[11px] text-[var(--ops-text-muted)]">
                  Stock simulado para la demo. La app real agrega filtros por talla
                  y agotados por sede.
                </OpsPanelMuted>
              </OpsPanel>
            )
          })}
        </div>
      </OpsSectionDivider>
    </OpsPageShell>
  )
}
