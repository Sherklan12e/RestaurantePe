"use client"

import { useState } from "react"
import { useRestaurant } from "@/lib/restaurant-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Search, Phone, MessageSquare, CheckCircle2, Package } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { Order } from "@/lib/types"

export default function OrderTrackingPage() {
  const { orders } = useRestaurant()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [searchResults, setSearchResults] = useState<Order[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!phoneNumber.trim()) return

    const results = orders.filter((order) => order.customerPhone.includes(phoneNumber.trim()))
    setSearchResults(results)
    setHasSearched(true)
  }

  const getStatusLabel = (status: Order["status"]) => {
    const labels: Record<Order["status"], string> = {
      pendiente: "Pendiente",
      preparando: "En Preparación",
      listo: "Listo para Retirar",
      entregado: "Entregado",
    }
    return labels[status]
  }

  const getStatusColor = (status: Order["status"]) => {
    const colors: Record<Order["status"], string> = {
      pendiente: "bg-yellow-100 text-yellow-800",
      preparando: "bg-blue-100 text-blue-800",
      listo: "bg-green-100 text-green-800",
      entregado: "bg-gray-100 text-gray-800",
    }
    return colors[status]
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pendiente":
        return <Clock className="w-5 h-5" />
      case "preparando":
        return <Package className="w-5 h-5" />
      case "listo":
      case "entregado":
        return <CheckCircle2 className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Seguimiento de Pedidos</h1>
          <p className="text-lg text-muted-foreground">Consulta el estado de tu pedido en tiempo real</p>
        </div>

        {/* Search Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buscar tu Pedido</CardTitle>
            <CardDescription>Ingresa tu número de teléfono para ver tus pedidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="phone" className="sr-only">
                  Número de teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+54 9 11 1234-5678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="gap-2">
                <Search className="w-4 h-4" />
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {hasSearched && (
          <div className="space-y-4">
            {searchResults.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <Phone className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-medium mb-1">No se encontraron pedidos</p>
                    <p className="text-sm">Verifica que el número de teléfono sea correcto</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-foreground">Tus Pedidos ({searchResults.length})</h2>
                {searchResults.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <div className={`h-2 ${getStatusColor(order.status)}`} />
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">{order.dishName}</CardTitle>
                            {order.isPreOrder && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                Pre-orden
                              </Badge>
                            )}
                          </div>
                          <CardDescription>
                            Pedido realizado el {format(order.orderTime, "PPp", { locale: es })}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Cantidad</p>
                          <p className="text-2xl font-bold">{order.quantity}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Status */}
                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <div className={`p-2 rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{getStatusLabel(order.status)}</p>
                          {order.status !== "entregado" && (
                            <p className="text-sm text-muted-foreground">
                              Hora estimada: {format(order.estimatedReadyTime, "HH:mm", { locale: es })}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${order.status === "pendiente" || order.status === "preparando" || order.status === "listo" || order.status === "entregado" ? "bg-primary" : "bg-gray-300"}`}
                          />
                          <span className="text-sm">Pedido recibido</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${order.status === "preparando" || order.status === "listo" || order.status === "entregado" ? "bg-primary" : "bg-gray-300"}`}
                          />
                          <span className="text-sm">En preparación</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${order.status === "listo" || order.status === "entregado" ? "bg-primary" : "bg-gray-300"}`}
                          />
                          <span className="text-sm">Listo para retirar</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${order.status === "entregado" ? "bg-primary" : "bg-gray-300"}`}
                          />
                          <span className="text-sm">Entregado</span>
                        </div>
                      </div>

                      {/* Notes */}
                      {order.notes && (
                        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                          <MessageSquare className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-blue-900 mb-1">Notas del pedido:</p>
                            <p className="text-sm text-blue-800">{order.notes}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
