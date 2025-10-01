import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { RestaurantProvider } from "@/lib/restaurant-context"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Menú Digital - Restaurante",
  description: "Consulta disponibilidad y realiza pedidos anticipados",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* Envolviendo la app con el provider y Suspense boundary */}
        <Suspense fallback={<div>Loading...</div>}>
          <RestaurantProvider>
            {children}
            <Toaster />
          </RestaurantProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
