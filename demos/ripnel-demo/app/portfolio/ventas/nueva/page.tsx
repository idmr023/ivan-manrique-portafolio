"use client"

import { useMemo, useState } from "react"
import {
  Banknote,
  Check,
  CreditCard,
  LoaderCircle,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  User,
  X,
} from "lucide-react"

import { PosHeader } from "@/components/ui/purchase-system/PosHeader"
import { OpsPageShell, OpsSectionDivider } from "@/components/ui/ops-page-shell"
import { OpsSectionHeader } from "@/components/ui/ops-section-header"
import { OpsPanel, OpsPanelMuted } from "@/components/ui/ops-panel"
import { OpsInlineBadge } from "@/components/ui/ops-inline-badge"
import { OpsStatusBadge } from "@/components/ui/ops-status-badge"
import { OpsQuantityStepper } from "@/components/ui/ops-quantity-stepper"
import { OpsSelect, type OpsOption } from "@/components/ui/ops-selection"
import { OpsSegmentedControl } from "@/components/ui/ops-segmented-control"
import { OpsFormField } from "@/components/ui/ops-form-field"
import { Button } from "@/components/ui/button"
import { usePortfolioAuth } from "@/components/portfolio/portfolio-auth-provider"
import { portfolioProducts } from "@/lib/portfolio/portfolio-mock-data"
import { formatCurrency } from "@/lib/format-utils"
import { cn } from "@/lib/utils"

type CartItem = {
  id: string
  productId: string
  name: string
  sku: string
  color: string
  size: string
  price: number
  quantity: number
}

const paymentOptions: OpsOption[] = [
  { value: "cash", label: "Efectivo", leading: <Banknote className="h-4 w-4" /> },
  { value: "card", label: "Tarjeta", leading: <CreditCard className="h-4 w-4" /> },
  { value: "mixed", label: "Pago mixto", leading: <Sparkles className="h-4 w-4" /> },
]

const mockCustomers = [
  { id: "c-1", name: "Cliente eventual", doc: "—" },
  { id: "c-2", name: "María López", doc: "DNI 45678901" },
  { id: "c-3", name: "Juan Pérez", doc: "DNI 78945612" },
  { id: "c-4", name: "Ana Torres", doc: "DNI 12345678" },
]

const initialCart: CartItem[] = [
  {
    id: "ci-1",
    productId: "p-001",
    name: "Polo Classic",
    sku: "POL-001",
    color: "Negro",
    size: "M",
    price: 45,
    quantity: 2,
  },
  {
    id: "ci-2",
    productId: "p-003",
    name: "Camisa Oxford",
    sku: "CAM-101",
    color: "Blanco",
    size: "L",
    price: 72.5,
    quantity: 1,
  },
]

export default function PortfolioPosPage() {
  const { user, defaultLocation } = usePortfolioAuth()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [cart, setCart] = useState<CartItem[]>(initialCart)
  const [customer, setCustomer] = useState("c-2")
  const [payment, setPayment] = useState("cash")
  const [discount, setDiscount] = useState(0)
  const [received, setReceived] = useState(200)
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const categories = useMemo(() => {
    const unique = Array.from(new Set(portfolioProducts.map((p) => p.category)))
    return [
      { value: "all", label: "Todas" },
      ...unique.map((value) => ({ value, label: value })),
    ]
  }, [])

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    return portfolioProducts.filter((product) => {
      if (category !== "all" && product.category !== category) return false
      if (!term) return true
      return (
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        product.color.toLowerCase().includes(term)
      )
    })
  }, [search, category])

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discountAmount = subtotal * (discount / 100)
  const total = Math.max(0, subtotal - discountAmount)
  const change = Math.max(0, received - total)

  function addToCart(productId: string) {
    const product = portfolioProducts.find((p) => p.id === productId)
    if (!product) return
    if (product.status === "out") return

    setCart((current) => {
      const existing = current.find((item) => item.productId === productId)
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item,
        )
      }
      return [
        ...current,
        {
          id: `ci-${Date.now()}`,
          productId: product.id,
          name: product.name,
          sku: product.sku,
          color: product.color,
          size: product.size,
          price: product.price,
          quantity: 1,
        },
      ]
    })
  }

  function updateQuantity(itemId: string, quantity: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(1, Math.min(99, quantity)) } : item,
        ),
    )
  }

  function removeItem(itemId: string) {
    setCart((current) => current.filter((item) => item.id !== itemId))
  }

  function clearSale() {
    setCart([])
    setDiscount(0)
    setReceived(total || 0)
    setConfirmed(false)
  }

  function handleConfirm() {
    if (cart.length === 0) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setConfirmed(true)
    }, 800)
  }

  function handleNewSale() {
    clearSale()
    setCustomer("c-1")
  }

  const selectedCustomer = mockCustomers.find((c) => c.id === customer) || mockCustomers[0]

  if (confirmed) {
    return (
      <OpsPageShell width="default">
        <OpsPanel className="p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--ripnel-accent-soft)] text-[var(--ripnel-accent)]">
            <Check className="h-6 w-6" />
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
            Venta registrada
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--ops-text)]">
            {formatCurrency(total)}
          </h1>
          <p className="mt-1 text-sm text-[var(--ops-text-muted)]">
            {selectedCustomer.name} · {defaultLocation?.name}
          </p>
          <p className="mt-1 text-xs text-[var(--ops-text-muted)]">
            Comprobante: B001-00000427 · 8 jul 2026 · {formatCurrency(change)} de vuelto
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Button variant="accent" onClick={handleNewSale}>
              <ShoppingBag className="h-3.5 w-3.5" />
              Nueva venta
            </Button>
            <Button variant="outline" onClick={() => setConfirmed(false)}>
              Ver detalle
            </Button>
          </div>

          <OpsPanelMuted className="mx-auto mt-6 max-w-md p-3 text-xs text-[var(--ops-text-muted)]">
            Esto es una simulación: en la app real, la venta impacta caja, stock y
            comisiones. Aquí se muestra solo el flujo visual del POS.
          </OpsPanelMuted>
        </OpsPanel>
      </OpsPageShell>
    )
  }

  return (
    <OpsPageShell width="wide">
      <PosHeader
        eyebrow="Punto de venta"
        title={`${defaultLocation?.name} · ${user.full_name.split(" ")[0]}`}
        description="Flujo simulado: cliente, productos, cobro y comprobante. Los datos no se persisten."
        meta={
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--ops-text-muted)]">
            <OpsInlineBadge label="Caja abierta" tone="success" />
            <span>·</span>
            <span>Sesión activa</span>
          </div>
        }
      />

      <OpsSectionDivider>
        <OpsSectionHeader icon={<User className="h-4 w-4" />} title="Cliente" />
        <div className="mt-3 grid gap-3 lg:grid-cols-[2fr_1fr]">
          <OpsPanel className="p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <OpsFormField label="Buscar cliente" density="compact">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--ops-text-muted)]" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Nombre, DNI o RUC…"
                    className="h-9 w-full rounded-lg border border-[var(--ops-border-strong)] bg-[var(--ops-field)] pl-8 pr-3 text-sm text-[var(--ops-text)] outline-none focus:border-[var(--ripnel-accent)]"
                  />
                </div>
              </OpsFormField>
              <OpsFormField label="Seleccionar" density="compact">
                <OpsSelect
                  value={customer}
                  onValueChange={setCustomer}
                  options={mockCustomers.map((c) => ({
                    value: c.id,
                    label: c.name,
                    helper: c.doc,
                  }))}
                />
              </OpsFormField>
            </div>
          </OpsPanel>
          <OpsPanel className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
              Cliente actual
            </p>
            <p className="mt-1 text-base font-semibold text-[var(--ops-text)]">
              {selectedCustomer.name}
            </p>
            <p className="text-xs text-[var(--ops-text-muted)]">{selectedCustomer.doc}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <OpsInlineBadge label="Sin deuda" tone="success" />
              <OpsInlineBadge label="3 compras" tone="accent" />
            </div>
          </OpsPanel>
        </div>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<ShoppingBag className="h-4 w-4" />} title="Productos" />
        <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
          <OpsPanel className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--ops-text-muted)]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar producto, SKU o color…"
                  className="h-9 w-full rounded-lg border border-[var(--ops-border-strong)] bg-[var(--ops-field)] pl-8 pr-3 text-sm text-[var(--ops-text)] outline-none focus:border-[var(--ripnel-accent)]"
                />
              </div>
              <OpsSelect
                value={category}
                onValueChange={setCategory}
                options={categories}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {filteredProducts.map((product) => {
                const out = product.status === "out"
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => addToCart(product.id)}
                    disabled={out}
                    className={cn(
                      "group rounded-lg border bg-[var(--ops-surface)] p-2.5 text-left transition",
                      out
                        ? "cursor-not-allowed border-dashed border-[var(--ops-border-strong)] opacity-60"
                        : "border-[var(--ops-border-strong)] hover:border-[var(--ripnel-accent)] hover:shadow-sm",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-[var(--ops-text)]">{product.name}</p>
                        <p className="text-[11px] text-[var(--ops-text-muted)]">
                          {product.sku} · {product.color} · {product.size}
                        </p>
                      </div>
                      {out ? (
                        <OpsStatusBadge tone="danger" size="xs">Sin stock</OpsStatusBadge>
                      ) : product.status === "low" ? (
                        <OpsStatusBadge tone="warning" size="xs">{product.stock}</OpsStatusBadge>
                      ) : (
                        <OpsStatusBadge tone="success" size="xs">{product.stock}</OpsStatusBadge>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm font-bold text-[var(--ops-text)]">
                      {formatCurrency(product.price)}
                    </p>
                  </button>
                )
              })}
            </div>
          </OpsPanel>

          <OpsPanel className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
                Carrito
              </p>
              <button
                type="button"
                onClick={clearSale}
                className="text-[11px] font-semibold text-[var(--ops-text-muted)] hover:text-[var(--ops-tone-danger-text)]"
              >
                Vaciar
              </button>
            </div>
            {cart.length === 0 ? (
              <OpsPanelMuted className="mt-3 p-3 text-center text-xs text-[var(--ops-text-muted)]">
                Toca un producto del catálogo para agregarlo al carrito.
              </OpsPanelMuted>
            ) : (
              <ul className="mt-3 space-y-2">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-lg border border-[var(--ops-border-strong)] p-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-[var(--ops-text)]">{item.name}</p>
                        <p className="text-[11px] text-[var(--ops-text-muted)]">
                          {item.sku} · {item.color} · {item.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="grid h-6 w-6 place-items-center rounded-md text-[var(--ops-text-muted)] hover:bg-[var(--ops-surface-muted)] hover:text-[var(--ops-tone-danger-text)]"
                        aria-label="Quitar"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <OpsQuantityStepper
                        value={String(item.quantity)}
                        onChange={() => {}}
                        onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                      />
                      <p className="text-sm font-bold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 space-y-1 border-t border-[var(--ops-border-strong)] pt-3 text-sm">
              <div className="flex items-center justify-between text-[var(--ops-text-muted)]">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[var(--ops-text-muted)]">
                <span>Descuento</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-base font-bold text-[var(--ops-text)]">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </OpsPanel>
        </div>
      </OpsSectionDivider>

      <OpsSectionDivider>
        <OpsSectionHeader icon={<Banknote className="h-4 w-4" />} title="Cobro" />
        <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
          <OpsPanel className="p-4">
            <div className="space-y-3">
              <OpsFormField label="Método de pago" density="compact">
                <OpsSegmentedControl
                  value={payment}
                  onChange={setPayment}
                  options={paymentOptions.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                />
              </OpsFormField>
              <div className="grid gap-3 sm:grid-cols-2">
                <OpsFormField label="Descuento %" density="compact">
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={discount}
                    onChange={(event) =>
                      setDiscount(Math.max(0, Math.min(50, Number(event.target.value) || 0)))
                    }
                    className="h-9 w-full rounded-lg border border-[var(--ops-border-strong)] bg-[var(--ops-field)] px-3 text-sm text-[var(--ops-text)] outline-none focus:border-[var(--ripnel-accent)]"
                  />
                </OpsFormField>
                <OpsFormField label="Recibido" density="compact">
                  <input
                    type="number"
                    min={0}
                    value={received}
                    onChange={(event) => setReceived(Number(event.target.value) || 0)}
                    className="h-9 w-full rounded-lg border border-[var(--ops-border-strong)] bg-[var(--ops-field)] px-3 text-sm text-[var(--ops-text)] outline-none focus:border-[var(--ripnel-accent)]"
                  />
                </OpsFormField>
              </div>
              <OpsPanelMuted className="p-3 text-xs text-[var(--ops-text-muted)]">
                En la app real, el POS valida caja abierta, líneas de crédito y
                comprobantes electrónicos. Aquí solo se muestra el flujo visual.
              </OpsPanelMuted>
            </div>
          </OpsPanel>
          <OpsPanel className="flex flex-col p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ops-text-muted)]">
              Resumen de cobro
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[var(--ops-text-muted)]">Items</span>
                <span className="font-medium">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--ops-text-muted)]">Cliente</span>
                <span className="font-medium">{selectedCustomer.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--ops-text-muted)]">Pago</span>
                <span className="font-medium">
                  {paymentOptions.find((option) => option.value === payment)?.label}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex items-center justify-between text-[var(--ops-text-muted)]">
                <span>Vuelto</span>
                <span>{formatCurrency(change)}</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                onClick={handleConfirm}
                disabled={cart.length === 0 || submitting}
                className="h-10 w-full"
                variant="accent"
              >
                {submitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Procesando…
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Confirmar venta
                  </>
                )}
              </Button>
              <Button onClick={clearSale} variant="outline" className="h-9 w-full">
                <X className="h-4 w-4" />
                Limpiar
              </Button>
            </div>
          </OpsPanel>
        </div>
      </OpsSectionDivider>
    </OpsPageShell>
  )
}
