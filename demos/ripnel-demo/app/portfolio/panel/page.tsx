"use client"

import {
  BarChart3,
  CalendarDays,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"

import { PosHeader } from "@/components/ui/purchase-system/PosHeader"
import { OpsPageShell, OpsSectionDivider } from "@/components/ui/ops-page-shell"
import { OpsSectionHeader } from "@/components/ui/ops-section-header"
import { DashboardChartCard } from "@/components/dashboard/dashboard-chart-card"
import { OpsMetricCard } from "@/components/ui/ops-metric-card"
import { OpsPanel, OpsPanelMuted } from "@/components/ui/ops-panel"
import { OpsInlineBadge } from "@/components/ui/ops-inline-badge"
import { OpsDataTable } from "@/components/ui/ops-data-table"
import { OpsStatusBadge } from "@/components/ui/ops-status-badge"
import { OpsSegmentedControl } from "@/components/ui/ops-segmented-control"
import {
  portfolioSalesByDay,
  portfolioTopProducts,
} from "@/lib/portfolio/portfolio-mock-data"
import { usePortfolioAuth } from "@/components/portfolio/portfolio-auth-provider"
import { formatCurrency } from "@/lib/format-utils"
import { useState } from "react"

const ticketAverage = [
  { range: "0-50", ventas: 28 },
  { range: "50-100", ventas: 64 },
  { range: "100-200", ventas: 38 },
  { range: "200-400", ventas: 12 },
  { range: "400+", ventas: 4 },
]

const channelShare = [
  { name: "Tienda Centro", value: 38, color: "var(--ripnel-accent)" },
  { name: "Tienda Norte", value: 22, color: "#7c3aed" },
  { name: "Outlet Plaza", value: 18, color: "#a78bfa" },
  { name: "Tienda Sur", value: 14, color: "#c4b5fd" },
  { name: "Almacén", value: 8, color: "#ede9fe" },
]

export default function PortfolioPanelPage() {
  const { user, defaultLocation } = usePortfolioAuth()
  const [range, setRange] = useState("7d")

  return (
    <OpsPageShell width="wide">
      <PosHeader
        eyebrow="Panel · Indicadores"
        title="Resumen de la última semana"
        description="Datos simulados del 2 al 8 de julio, 2026. La vista combina ventas, ticket promedio, mix por sede y productos top."
        meta={
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--ops-text-muted)]">
            <OpsInlineBadge label={user.role_name} tone="accent" />
            <span>·</span>
            <span>{defaultLocation?.name}</span>
            <span>·</span>
            <span>Sincronizado: hace 1 min</span>
          </div>
        }
        actions={
          <OpsSegmentedControl
            size="compact"
            value={range}
            onChange={setRange}
            options={[
              { value: "7d", label: "7 días" },
              { value: "30d", label: "30 días" },
              { value: "90d", label: "90 días" },
            ]}
          />
        }
      />

      <OpsSectionDivider>
        <OpsSectionHeader icon={<TrendingUp className="h-4 w-4" />} title="Indicadores clave" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <OpsMetricCard
            icon={<ShoppingCart className="h-4 w-4" />}
            label="Ventas totales"
            value={formatCurrency(31600)}
            detail="+12% vs semana anterior"
            tone="accent"
          />
          <OpsMetricCard
            icon={<Wallet className="h-4 w-4" />}
            label="Ticket promedio"
            value={formatCurrency(216)}
            detail="172 tickets"
            tone="success"
          />
          <OpsMetricCard
            icon={<Users className="h-4 w-4" />}
            label="Clientes únicos"
            value="428"
            detail="+8% vs semana anterior"
            tone="info"
          />
          <OpsMetricCard
            icon={<CalendarDays className="h-4 w-4" />}
            label="Días con venta"
            value="7/7"
            detail="Apertura continua"
            tone="default"
          />
        </div>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<BarChart3 className="h-4 w-4" />} title="Evolución de ventas" />
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardChartCard title="Ingresos por día" icon={<ShoppingCart className="h-4 w-4" />}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioSalesByDay} margin={{ top: 12, right: 16, left: 4, bottom: 4 }}>
                  <CartesianGrid stroke="var(--ops-border-soft)" strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} stroke="var(--ops-text-muted)" />
                  <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--ops-text-muted)" />
                  <RechartsTooltip
                    contentStyle={{
                      background: "var(--ops-surface)",
                      border: "1px solid var(--ops-border-strong)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "var(--ops-text)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="var(--ripnel-accent)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "var(--ripnel-accent)" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </DashboardChartCard>
          </div>
          <DashboardChartCard title="Tickets por día" icon={<BarChart3 className="h-4 w-4" />}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portfolioSalesByDay} margin={{ top: 12, right: 16, left: 4, bottom: 4 }}>
                <CartesianGrid stroke="var(--ops-border-soft)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} stroke="var(--ops-text-muted)" />
                <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--ops-text-muted)" />
                <RechartsTooltip
                  contentStyle={{
                    background: "var(--ops-surface)",
                    border: "1px solid var(--ops-border-strong)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "var(--ops-text)" }}
                />
                <Bar dataKey="tickets" fill="var(--ripnel-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </DashboardChartCard>
        </div>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<ShoppingCart className="h-4 w-4" />} title="Productos y ticket" />
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <OpsPanel className="p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
                Top 5 productos
              </p>
              <OpsDataTable
                columns={[
                  { key: "name", header: "Producto" },
                  { key: "sold", header: "Unidades" },
                  { key: "share", header: "Participación" },
                ]}
              >
                {portfolioTopProducts.map((product) => (
                  <tr key={product.name} className="text-sm transition hover:bg-[var(--ops-surface-muted)]">
                    <td className="px-4 py-2.5 font-medium text-[var(--ops-text)]">{product.name}</td>
                    <td className="px-4 py-2.5 font-semibold">{product.sold}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[var(--ops-surface-muted)]">
                          <div
                            className="h-full rounded-full bg-[var(--ripnel-accent)]"
                            style={{ width: `${product.share * 3}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-[var(--ops-text-muted)]">{product.share}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </OpsDataTable>
            </OpsPanel>
          </div>
          <DashboardChartCard title="Mix por sede" icon={<BarChart3 className="h-4 w-4" />}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <RechartsTooltip
                  contentStyle={{
                    background: "var(--ops-surface)",
                    border: "1px solid var(--ops-border-strong)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, color: "var(--ops-text-muted)" }}
                />
                <Pie data={channelShare} dataKey="value" nameKey="name" innerRadius={42} outerRadius={72} strokeWidth={2}>
                  {channelShare.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="var(--ops-surface)" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </DashboardChartCard>
        </div>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<BarChart3 className="h-4 w-4" />} title="Distribución de ticket" />
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardChartCard title="Rango de ticket" icon={<Wallet className="h-4 w-4" />}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ticketAverage} margin={{ top: 12, right: 16, left: 4, bottom: 4 }}>
                  <CartesianGrid stroke="var(--ops-border-soft)" strokeDasharray="3 3" />
                  <XAxis dataKey="range" tickLine={false} axisLine={false} fontSize={11} stroke="var(--ops-text-muted)" />
                  <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--ops-text-muted)" />
                  <RechartsTooltip
                    contentStyle={{
                      background: "var(--ops-surface)",
                      border: "1px solid var(--ops-border-strong)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="ventas" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </DashboardChartCard>
          </div>
          <OpsPanel className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
              Lectura del panel
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ops-text)]">
              <li className="flex items-center gap-2">
                <OpsStatusBadge tone="success" size="xs">
                  +12%
                </OpsStatusBadge>
                Ventas por encima del promedio histórico.
              </li>
              <li className="flex items-center gap-2">
                <OpsStatusBadge tone="warning" size="xs">
                  Mix
                </OpsStatusBadge>
                Outlet Plaza aporta el 18% de la venta semanal.
              </li>
              <li className="flex items-center gap-2">
                <OpsStatusBadge tone="accent" size="xs">
                  Top
                </OpsStatusBadge>
                Polo Classic Negro lidera con 84 unidades.
              </li>
            </ul>
            <OpsPanelMuted className="mt-3 p-2 text-xs text-[var(--ops-text-muted)]">
              Los valores se recalculan con cada nueva venta. Aquí son fijos para
              mantener estable la demo.
            </OpsPanelMuted>
          </OpsPanel>
        </div>
      </OpsSectionDivider>
    </OpsPageShell>
  )
}
