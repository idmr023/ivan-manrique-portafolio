"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import { ArrowRight, Eye, EyeOff, LoaderCircle, Sparkles, User } from "lucide-react"

import { PosHeader } from "@/components/ui/purchase-system/PosHeader"
import { OpsPageShell, OpsSectionDivider } from "@/components/ui/ops-page-shell"
import { OpsSectionHeader } from "@/components/ui/ops-section-header"
import { OpsPanel, OpsPanelMuted } from "@/components/ui/ops-panel"
import { OpsInlineBadge } from "@/components/ui/ops-inline-badge"
import { OpsFormField } from "@/components/ui/ops-form-field"
import { Button } from "@/components/ui/button"
import { usePortfolioAuth } from "@/components/portfolio/portfolio-auth-provider"

export default function PortfolioLoginPage() {
  const router = useRouter()
  const { user, defaultLocation } = usePortfolioAuth()
  const [username, setUsername] = useState("carla.mendoza")
  const [password, setPassword] = useState("demo-2026")
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!username.trim() || !password.trim()) {
      setError("Ingresa cualquier usuario y contraseña para entrar al demo.")
      return
    }

    setSubmitting(true)
    window.setTimeout(() => {
      router.push("/portfolio/inicio")
    }, 350)
  }

  return (
    <OpsPageShell width="default">
      <PosHeader
        eyebrow="Demo · Login simulado"
        title={
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--ripnel-accent)]" />
            Acceso al portafolio
          </span>
        }
        description="Esta pantalla no se conecta a ningún servicio. Cualquier credencial abre la sesión demo con datos simulados."
        meta={
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--ops-text-muted)]">
            <OpsInlineBadge label={user.role_name} tone="accent" />
            <span>·</span>
            <span>{defaultLocation?.name}</span>
          </div>
        }
        actions={
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--ops-border-strong)] px-3 py-1.5 text-sm font-semibold text-[var(--ops-text-muted)] transition hover:text-[var(--ops-text)]"
          >
            Volver al inicio
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <OpsSectionDivider>
        <OpsSectionHeader
          icon={<User className="h-4 w-4" />}
          title="Identifícate"
        />
        <div className="mt-3 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <OpsPanel className="p-5">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error ? (
                <OpsPanelMuted className="p-3 text-xs text-[var(--ops-tone-danger-text)]">
                  {error}
                </OpsPanelMuted>
              ) : null}

              <OpsFormField label="Usuario" density="compact">
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="h-9 w-full rounded-lg border border-[var(--ops-border-strong)] bg-[var(--ops-field)] px-3 text-sm text-[var(--ops-text)] outline-none transition focus:border-[var(--ripnel-accent)] focus:ring-2 focus:ring-[var(--ripnel-accent-soft)]"
                  placeholder="usuario.demo"
                />
              </OpsFormField>

              <OpsFormField label="Contraseña" density="compact">
                <div className="relative">
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="h-9 w-full rounded-lg border border-[var(--ops-border-strong)] bg-[var(--ops-field)] px-3 pr-10 text-sm text-[var(--ops-text)] outline-none transition focus:border-[var(--ripnel-accent)] focus:ring-2 focus:ring-[var(--ripnel-accent-soft)]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-1.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-[var(--ops-text-muted)] hover:bg-[var(--ops-surface-muted)]"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </OpsFormField>

              <Button
                type="submit"
                disabled={submitting}
                className="h-9 w-full rounded-lg text-sm font-semibold"
                variant="accent"
                size="lg"
              >
                {submitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    <span>Entrando…</span>
                  </>
                ) : (
                  <>
                    <span>Entrar al demo</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </OpsPanel>

          <OpsPanel className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
              Sesión precargada
            </p>
            <p className="mt-2 text-base font-semibold text-[var(--ops-text)]">
              {user.full_name}
            </p>
            <p className="text-sm text-[var(--ops-text-muted)]">{user.email}</p>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-[var(--ops-text-muted)]">Rol</dt>
                <dd className="font-medium text-[var(--ops-text)]">{user.role_name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--ops-text-muted)]">Sede</dt>
                <dd className="font-medium text-[var(--ops-text)]">{defaultLocation?.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--ops-text-muted)]">Sesión</dt>
                <dd className="font-medium text-[var(--ops-text)]">Persistente en demo</dd>
              </div>
            </dl>

            <OpsPanelMuted className="mt-4 p-3 text-xs leading-5 text-[var(--ops-text-muted)]">
              No necesitas recordar credenciales. Cualquier valor abre la sesión
              del operador simulado con permisos completos.
            </OpsPanelMuted>
          </OpsPanel>
        </div>
      </OpsSectionDivider>
    </OpsPageShell>
  )
}
