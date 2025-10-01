"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Dish } from "@/lib/types"
import { useRestaurant } from "@/lib/restaurant-context"

interface OrderDialogProps {
  dish: Dish
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDialog({ dish, open, onOpenChange }: OrderDialogProps) {
  const { addOrder } = useRestaurant()
  const [quantity, setQuantity] = useState(1)

  if (!open) return null

  const handleConfirm = () => {
    addOrder({
      dishId: dish.id,
      dishName: dish.name,
      customerName: "Cliente",
      customerPhone: "",
      quantity,
      status: "pendiente",
      isPreOrder: false,
    })
    onOpenChange(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-xl font-semibold">Ordenar: {dish.name}</h2>
        <p className="mb-4 text-sm text-gray-600">Precio: ${dish.price}</p>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm">Cantidad:</span>
          <input
            type="number"
            className="w-20 rounded-md border px-2 py-1 text-sm"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" className="bg-transparent" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </div>
      </div>
    </div>
  )
}


