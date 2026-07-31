import os from "node:os"
import type { NextConfig } from "next"

function getLanDevOrigins() {
  const origins = new Set(["127.0.0.1", "localhost"])

  for (const networkInterface of Object.values(os.networkInterfaces())) {
    for (const address of networkInterface || []) {
      if (address.family !== "IPv4" || address.internal) {
        continue
      }

      origins.add(address.address)
    }
  }

  return Array.from(origins)
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/demo",
  trailingSlash: true,
  images: { unoptimized: true },
  allowedDevOrigins: getLanDevOrigins(),
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "radix-ui",
      "recharts",
      "sonner",
    ],
  },
}

export default nextConfig
