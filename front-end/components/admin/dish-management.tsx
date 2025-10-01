"use client"

import { useRestaurant } from "@/lib/restaurant-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DishManagement() {
  const { dishes, updateDishAvailability } = useRestaurant()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Platos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {dishes.map((dish) => (
          <div key={dish.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{dish.name}</p>
              <p className="text-sm text-gray-500">${dish.price} · {dish.prepTime} min</p>
            </div>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => updateDishAvailability(dish.id, !dish.available)}
            >
              {dish.available ? "Deshabilitar" : "Habilitar"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


