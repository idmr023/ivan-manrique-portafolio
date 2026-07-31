import type { Metadata, Viewport } from "next"
import { Poppins, Geist } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Ripnel · Demo de portafolio",
  description:
    "Recorrido estático por las pantallas más representativas de Ripnel. Sin backend, sin base de datos, sin cambios persistentes.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={cn(poppins.className, "font-sans", geist.variable)}
    >
      <body suppressHydrationWarning>
        <TooltipProvider>
          {children}
          <Toaster
            richColors
            closeButton
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: "var(--font-poppins)",
                fontSize: "14px",
              },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  )
}
