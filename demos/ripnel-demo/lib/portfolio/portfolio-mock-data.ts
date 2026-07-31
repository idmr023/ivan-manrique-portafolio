export type PortfolioProduct = {
  id: string
  sku: string
  name: string
  color: string
  size: string
  stock: number
  price: number
  category: string
  status: "available" | "low" | "out"
}

export type PortfolioSale = {
  id: string
  date: string
  customer: string
  items: number
  total: number
  status: "completed" | "pending" | "cancelled"
  location: string
}

export const portfolioProducts: PortfolioProduct[] = [
  {
    id: "p-001",
    sku: "POL-001",
    name: "Polo Classic",
    color: "Negro",
    size: "M",
    stock: 45,
    price: 45.0,
    category: "Polos",
    status: "available",
  },
  {
    id: "p-002",
    sku: "POL-002",
    name: "Polo Classic",
    color: "Blanco",
    size: "M",
    stock: 8,
    price: 45.0,
    category: "Polos",
    status: "low",
  },
  {
    id: "p-003",
    sku: "CAM-101",
    name: "Camisa Oxford",
    color: "Blanco",
    size: "L",
    stock: 22,
    price: 72.5,
    category: "Camisas",
    status: "available",
  },
  {
    id: "p-004",
    sku: "CAM-102",
    name: "Camisa Oxford",
    color: "Celeste",
    size: "M",
    stock: 0,
    price: 72.5,
    category: "Camisas",
    status: "out",
  },
  {
    id: "p-005",
    sku: "JEA-201",
    name: "Jean Slim",
    color: "Azul",
    size: "32",
    stock: 38,
    price: 89.9,
    category: "Jeans",
    status: "available",
  },
  {
    id: "p-006",
    sku: "JEA-202",
    name: "Jean Slim",
    color: "Negro",
    size: "30",
    stock: 5,
    price: 89.9,
    category: "Jeans",
    status: "low",
  },
  {
    id: "p-007",
    sku: "CAS-301",
    name: "Casaca Urbana",
    color: "Gris",
    size: "XL",
    stock: 12,
    price: 129.0,
    category: "Casacas",
    status: "available",
  },
  {
    id: "p-008",
    sku: "POL-005",
    name: "Polo Básico",
    color: "Blanco",
    size: "S",
    stock: 67,
    price: 29.9,
    category: "Polos",
    status: "available",
  },
  {
    id: "p-009",
    sku: "POL-006",
    name: "Polo Básico",
    color: "Negro",
    size: "L",
    stock: 3,
    price: 29.9,
    category: "Polos",
    status: "low",
  },
  {
    id: "p-010",
    sku: "VES-401",
    name: "Vestido Casual",
    color: "Beige",
    size: "S",
    stock: 18,
    price: 99.0,
    category: "Vestidos",
    status: "available",
  },
  {
    id: "p-011",
    sku: "BLA-501",
    name: "Blazer Ejecutivo",
    color: "Azul Marino",
    size: "M",
    stock: 9,
    price: 189.0,
    category: "Blazers",
    status: "low",
  },
  {
    id: "p-012",
    sku: "FAL-601",
    name: "Falda Plisada",
    color: "Negro",
    size: "M",
    stock: 24,
    price: 79.0,
    category: "Faldas",
    status: "available",
  },
]

export const portfolioRecentSales: PortfolioSale[] = [
  {
    id: "S-2026-0001",
    date: "2026-07-08T09:42:00",
    customer: "María López",
    items: 3,
    total: 167.5,
    status: "completed",
    location: "Tienda Centro",
  },
  {
    id: "S-2026-0002",
    date: "2026-07-08T10:18:00",
    customer: "Juan Pérez",
    items: 1,
    total: 45.0,
    status: "completed",
    location: "Tienda Centro",
  },
  {
    id: "S-2026-0003",
    date: "2026-07-08T10:55:00",
    customer: "Cliente eventual",
    items: 2,
    total: 119.8,
    status: "completed",
    location: "Tienda Norte",
  },
  {
    id: "S-2026-0004",
    date: "2026-07-08T11:30:00",
    customer: "Ana Torres",
    items: 4,
    total: 287.0,
    status: "pending",
    location: "Tienda Sur",
  },
  {
    id: "S-2026-0005",
    date: "2026-07-08T12:14:00",
    customer: "Luis Rodríguez",
    items: 1,
    total: 89.9,
    status: "completed",
    location: "Tienda Centro",
  },
  {
    id: "S-2026-0006",
    date: "2026-07-08T13:05:00",
    customer: "Sofía Castro",
    items: 2,
    total: 154.0,
    status: "completed",
    location: "Outlet Plaza",
  },
]

export const portfolioSalesByDay = [
  { day: "Lun", total: 3240, tickets: 18 },
  { day: "Mar", total: 4120, tickets: 22 },
  { day: "Mié", total: 2980, tickets: 16 },
  { day: "Jue", total: 4870, tickets: 27 },
  { day: "Vie", total: 5640, tickets: 31 },
  { day: "Sáb", total: 6230, tickets: 35 },
  { day: "Dom", total: 4520, tickets: 23 },
]

export const portfolioTopProducts = [
  { name: "Polo Classic Negro", sold: 84, share: 28 },
  { name: "Jean Slim Azul", sold: 62, share: 21 },
  { name: "Camisa Oxford", sold: 48, share: 16 },
  { name: "Casaca Urbana", sold: 39, share: 13 },
  { name: "Polo Básico", sold: 35, share: 12 },
]

export const portfolioAlerts = [
  {
    id: "alert-1",
    severity: "danger" as const,
    title: "Stock bajo en 3 productos",
    description: "Casaca Urbana XL, Polo Básico L y Camisa Oxford Celeste sin stock.",
    cta: "Revisar inventario",
    href: "/portfolio/inventario",
  },
  {
    id: "alert-2",
    severity: "warning" as const,
    title: "Caja pendiente por cerrar",
    description: "La caja de Tienda Sur sigue abierta desde las 08:30.",
    cta: "Ir a caja",
    href: "/portfolio",
  },
  {
    id: "alert-3",
    severity: "accent" as const,
    title: "Transferencia esperando aprobación",
    description: "Solicitud de Tienda Norte a Almacén Principal por 12 unidades.",
    cta: "Ver transferencias",
    href: "/portfolio",
  },
]
