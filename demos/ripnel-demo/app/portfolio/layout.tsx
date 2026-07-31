"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import {
  BarChart3,
  Boxes,
  Eye,
  Home,
  ShoppingCart,
  Sparkles,
  Store,
  X,
} from "lucide-react"

import { PortfolioAuthProvider, usePortfolioAuth } from "@/components/portfolio/portfolio-auth-provider"
import { cn } from "@/lib/utils"

type PortfolioLink = {
  href: string
  label: string
  icon: typeof Home
  eyebrow: string
}

const portfolioLinks: PortfolioLink[] = [
  { href: "/portfolio/inicio", label: "Inicio", icon: Home, eyebrow: "Resumen" },
  { href: "/portfolio/panel", label: "Panel", icon: BarChart3, eyebrow: "Indicadores" },
  {
    href: "/portfolio/ventas/nueva",
    label: "Punto de venta",
    icon: ShoppingCart,
    eyebrow: "Operación",
  },
  { href: "/portfolio/inventario", label: "Inventario", icon: Boxes, eyebrow: "Stock" },
  {
    href: "/portfolio/componentes",
    label: "Componentes",
    icon: Eye,
    eyebrow: "Showcase",
  },
]

function PortfolioSidebar() {
  const pathname = usePathname()
  const { user, defaultLocation, locationAssignments, setDefaultLocation } = usePortfolioAuth()

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[var(--ops-border-strong)] bg-[var(--ops-surface)] md:flex md:flex-col">
      <div className="border-b border-[var(--ops-border-strong)] px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--ripnel-accent-soft)] text-[var(--ripnel-accent)]">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[var(--ops-text)]">Ripnel · Demo</p>
            <p className="text-[11px] text-[var(--ops-text-muted)]">Modo portafolio</p>
          </div>
        </div>
      </div>

      <div className="border-b border-[var(--ops-border-strong)] px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
          Sesión demo
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-[var(--ops-text)]">
          {user.full_name}
        </p>
        <p className="truncate text-[11px] text-[var(--ops-text-muted)]">{user.role_name}</p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
          Sede
        </p>
        <select
          value={defaultLocation?.location_id}
          onChange={(event) => setDefaultLocation(event.target.value)}
          className="mt-1 h-8 w-full rounded-md border border-[var(--ops-border-strong)] bg-[var(--ops-field)] px-2 text-xs text-[var(--ops-text)] outline-none focus:border-[var(--ripnel-accent)]"
        >
          {locationAssignments.map(({ location }) => (
            <option key={location.location_id} value={location.location_id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-1">
          {portfolioLinks.map((link) => {
            const Icon = link.icon
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition",
                    active
                      ? "bg-[var(--ripnel-accent-soft)] text-[var(--ripnel-accent)]"
                      : "text-[var(--ops-text-muted)] hover:bg-[var(--ops-surface-muted)] hover:text-[var(--ops-text)]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-[var(--ops-border-strong)] px-4 py-3">
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
          Demo estático
        </p>
        <p className="mt-1 text-[11px] leading-4 text-[var(--ops-text-muted)]">
          Datos de muestra sin conexión al backend. Cambios no se persisten.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--ops-text-muted)] hover:text-[var(--ripnel-accent)]"
          >
            <X className="h-3 w-3" />
            Salir
          </Link>
        </div>
      </div>
    </aside>
  )
}

function PortfolioBanner() {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--ripnel-accent-soft)] bg-[var(--ripnel-accent-soft)] px-4 py-1.5 text-[11px] text-[var(--ripnel-accent)] md:px-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5" />
        <span className="font-semibold">Ripnel · Demo de portafolio</span>
        <span className="text-[var(--ripnel-accent)] opacity-80">
          Datos simulados en el navegador. No requiere backend.
        </span>
      </div>
    </div>
  )
}

function PortfolioMobileNav() {
  const pathname = usePathname()
  return (
    <nav className="md:hidden border-b border-[var(--ops-border-strong)] bg-[var(--ops-surface)]">
      <ul className="flex items-center gap-1 overflow-x-auto px-3 py-2">
        {portfolioLinks.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap",
                  active
                    ? "bg-[var(--ripnel-accent-soft)] text-[var(--ripnel-accent)]"
                    : "text-[var(--ops-text-muted)] hover:text-[var(--ops-text)]",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function PortfolioHeader() {
  const { user, defaultLocation } = usePortfolioAuth()
  return (
    <header className="hidden border-b border-[var(--ops-border-strong)] bg-[var(--ops-surface)] px-6 py-3 md:flex md:items-center md:justify-between">
      <div className="flex items-center gap-2 text-[11px] text-[var(--ops-text-muted)]">
        <Store className="h-3.5 w-3.5" />
        <span>{defaultLocation?.name}</span>
        <span className="text-[var(--ops-border-soft)]">·</span>
        <span>{user.role_name}</span>
      </div>
    </header>
  )
}

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <PortfolioAuthProvider>
      <div className="min-h-dvh bg-[var(--ops-surface-muted)] text-[var(--ops-text)]">
        <PortfolioBanner />
        <div className="flex min-h-[calc(100dvh-32px)]">
          <PortfolioSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <PortfolioHeader />
            <PortfolioMobileNav />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
        <a
          href="/"
          style={{position:"fixed",top:8,right:8,zIndex:999999,display:"flex",alignItems:"center",justifyContent:"center",width:40,height:40,borderRadius:12,background:"#000",border:"2px solid rgba(255,255,255,0.6)",boxShadow:"0 4px 16px rgba(0,0,0,0.4)"}}
          aria-label="Volver al portafolio"
        >
          <Home className="h-5 w-5" style={{fill:"white",stroke:"white"}} />
        </a>
      </div>
    </PortfolioAuthProvider>
  )
}
