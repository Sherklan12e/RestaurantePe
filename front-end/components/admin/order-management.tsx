"use client"

import { useRestaurant } from "@/lib/restaurant-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function OrderManagement() {
  const { orders, updateOrderStatus } = useRestaurant()

  const nextStatus: Record<string, string> = {
    pendiente: "preparando",
    preparando: "listo",
    listo: "entregado",
    entregado: "entregado",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Pedidos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{order.dishName} × {order.quantity}</p>
              <p className="text-sm text-gray-500">Estado: {order.status}</p>
            </div>
            <Button onClick={() => updateOrderStatus(order.id, nextStatus[order.status] as any)}>
              Avanzar estado
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


