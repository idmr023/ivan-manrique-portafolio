import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIGO-OLLAS - Demo Interactiva",
  description: "Sistema de Gestión de Ollas Comunes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
