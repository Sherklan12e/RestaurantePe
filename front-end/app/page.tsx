import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, ChefHat, ClipboardList, Search } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Sistema de Menú Digital</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Consulta disponibilidad en tiempo real, tiempos de preparación y realiza pedidos anticipados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <ChefHat className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Menú para Clientes</CardTitle>
              <CardDescription>
                Vista del menú con disponibilidad en tiempo real y tiempos de preparación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/menu">
                <Button className="w-full">Ver Menú</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Seguir mi Pedido</CardTitle>
              <CardDescription>Consulta el estado de tu pedido en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pedidos">
                <Button variant="outline" className="w-full bg-transparent">
                  Rastrear Pedido
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ClipboardList className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Panel de Administración</CardTitle>
              <CardDescription>Gestiona disponibilidad de platos y visualiza pedidos en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button variant="outline" className="w-full bg-transparent">
                  Ir al Panel
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Código QR</CardTitle>
              <CardDescription>Genera y descarga el código QR para que los clientes accedan al menú</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/qr">
                <Button variant="outline" className="w-full bg-transparent">
                  Generar QR
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
