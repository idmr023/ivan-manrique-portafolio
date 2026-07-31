export const appRoutes = {
  login: "/portfolio/login",
  firstAccess: "/portfolio",
  forbidden: "/portfolio",
  demo: "/portfolio/componentes",
  home: "/portfolio/inicio",
  dashboard: "/portfolio/panel",
  businessIntelligence: "/portfolio/panel",
  account: "/portfolio",
  accountSecurity: "/portfolio",
  administrationUsers: "/portfolio",
  administrationRoles: "/portfolio",
  administrationLocations: "/portfolio",
  customers: "/portfolio",
  catalogs: "/portfolio",
  products: "/portfolio",
  prices: "/portfolio",
  inventory: "/portfolio/inventario",
  inventoryMovements: "/portfolio/inventario",
  inventoryAdjustments: "/portfolio/inventario",
  kardex: "/portfolio/inventario",
  transfers: "/portfolio",
  transferRequest: "/portfolio",
  transferPendingReceipts: "/portfolio",
  transferHistory: "/portfolio",
  purchaseSystem: "/portfolio/ventas/nueva",
  transactionHistory: "/portfolio",
  postsales: "/portfolio",
  cash: "/portfolio",
} as const

export const transferRouteSlugs = {
  create: "crear-transferencia",
  list: "listado-de-transferencias",
  pendingReceipts: "recepciones-pendientes",
  requestProducts: "solicitar-productos",
} as const

export const productRouteSlugs = {
  styles: "estilos",
  variants: "variantes",
} as const

export type TransferRouteSlug = (typeof transferRouteSlugs)[keyof typeof transferRouteSlugs]
export type ProductRouteSlug = (typeof productRouteSlugs)[keyof typeof productRouteSlugs]

export function buildCatalogRoute(slug: string) {
  return `/portfolio/${slug}`
}

export function buildProductModuleRoute(slug: ProductRouteSlug) {
  return `/portfolio/${slug}`
}

export function buildTransferModuleRoute(slug: TransferRouteSlug) {
  return `/portfolio/${slug}`
}

export function buildInventoryDetailRoute(styleId: string, locationId?: string | null) {
  const params = new URLSearchParams()

  if (locationId) {
    params.set("location_id", locationId)
  }

  return params.toString()
    ? `/portfolio/inventario/${styleId}?${params.toString()}`
    : `/portfolio/inventario/${styleId}`
}

export function buildSaleDetailRoute(saleId: string) {
  return `/portfolio/ventas/${saleId}`
}

export function buildAdjustmentDetailRoute(adjustmentId: string) {
  return `/portfolio/inventario/ajustes/${adjustmentId}`
}
