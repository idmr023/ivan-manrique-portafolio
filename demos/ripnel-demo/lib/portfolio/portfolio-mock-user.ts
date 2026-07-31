export type PortfolioUser = {
  user_id: string
  full_name: string
  username: string
  email: string
  role_id: string
  role_name: string
}

export type PortfolioLocation = {
  location_id: string
  name: string
  code: string
  type: "store" | "warehouse"
  address: string
  active: boolean
  is_default?: boolean
}

export const portfolioUser: PortfolioUser = {
  user_id: "demo-user-001",
  full_name: "Carla Mendoza",
  username: "carla.mendoza",
  email: "carla.mendoza@ripnel.demo",
  role_id: "role-admin",
  role_name: "Administrador",
}

export const portfolioLocations: PortfolioLocation[] = [
  {
    location_id: "loc-001",
    name: "Tienda Centro",
    code: "TC-01",
    type: "store",
    address: "Av. Larco 345, Miraflores",
    active: true,
    is_default: true,
  },
  {
    location_id: "loc-002",
    name: "Tienda Norte",
    code: "TN-02",
    type: "store",
    address: "Av. Independencia 1820, Lima",
    active: true,
  },
  {
    location_id: "loc-003",
    name: "Almacén Principal",
    code: "AL-00",
    type: "warehouse",
    address: "Calle Los Hilados 220, ATE",
    active: true,
  },
  {
    location_id: "loc-004",
    name: "Tienda Sur",
    code: "TS-03",
    type: "store",
    address: "Av. El Sol 480, Surco",
    active: true,
  },
  {
    location_id: "loc-005",
    name: "Outlet Plaza",
    code: "OP-04",
    type: "store",
    address: "Mall Plaza Sur, Stand 22",
    active: true,
  },
]

export const portfolioPermissions = [
  "admin.manage",
  "sales.pos",
  "sales.postsale.view",
  "sales.history.view",
  "customers.manage",
  "inventory.view",
  "inventory.adjust",
  "inventory.movements.view",
  "transfers.request",
  "transfers.approve",
  "transfers.ship",
  "transfers.receive",
  "catalogs.manage",
  "products.manage",
  "prices.manage",
  "cash.manage",
  "cash.history.view",
  "reports.view",
]
