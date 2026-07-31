"use client"

import * as React from "react"
import {
  portfolioLocations,
  portfolioPermissions,
  portfolioUser,
  type PortfolioLocation,
} from "@/lib/portfolio/portfolio-mock-user"

type PortfolioAuthState = {
  user: typeof portfolioUser
  permissions: string[]
  defaultLocation: PortfolioLocation
  locationAssignments: { location_id: string; is_default: boolean; location: PortfolioLocation }[]
  has: (permissionKey: string) => boolean
  setDefaultLocation: (locationId: string) => void
}

const PortfolioAuthContext = React.createContext<PortfolioAuthState | null>(null)

export function PortfolioAuthProvider({ children }: { children: React.ReactNode }) {
  const [defaultLocationId, setDefaultLocationId] = React.useState<string>(
    portfolioLocations.find((location) => location.is_default)?.location_id ||
      portfolioLocations[0]?.location_id ||
      "",
  )

  const defaultLocation =
    portfolioLocations.find((location) => location.location_id === defaultLocationId) ||
    portfolioLocations[0]

  const locationAssignments = React.useMemo(
    () =>
      portfolioLocations.map((location) => ({
        location_id: location.location_id,
        is_default: location.location_id === defaultLocation?.location_id,
        location,
      })),
    [defaultLocation],
  )

  const value = React.useMemo<PortfolioAuthState>(
    () => ({
      user: portfolioUser,
      permissions: portfolioPermissions,
      defaultLocation,
      locationAssignments,
      has: (permissionKey: string) =>
        portfolioPermissions.includes(permissionKey) ||
        portfolioPermissions.includes("admin.manage"),
      setDefaultLocation: (locationId: string) => setDefaultLocationId(locationId),
    }),
    [defaultLocation, locationAssignments],
  )

  return <PortfolioAuthContext.Provider value={value}>{children}</PortfolioAuthContext.Provider>
}

export function usePortfolioAuth() {
  const ctx = React.useContext(PortfolioAuthContext)
  if (!ctx) {
    throw new Error("usePortfolioAuth must be used within PortfolioAuthProvider")
  }
  return ctx
}
