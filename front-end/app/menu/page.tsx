"use client"

import { useState } from "react"
import { useRestaurant } from "@/lib/restaurant-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ChefHat, AlertCircle, ShoppingCart } from "lucide-react"
import { OrderDialog } from "@/components/order-dialog"
import type { Dish } from "@/lib/types"

export default function MenuPage() {
  const { dishes, settings } = useRestaurant()
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const [orderDialogOpen, setOrderDialogOpen] = useState(false)

  const categories = ["entrada", "principal", "postre", "bebida"] as const

  const dishesByCategory = categories.map((category) => ({
    category,
    dishes: dishes.filter((dish) => dish.category === category),
  }))

  const handleOrderClick = (dish: Dish) => {
    if (!dish.available) return
    setSelectedDish(dish)
    setOrderDialogOpen(true)
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      entrada: "Entradas",
      principal: "Platos Principales",
      postre: "Postres",
      bebida: "Bebidas",
    }
    return labels[category] || category
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">{settings.name}</h1>
          </div>
          <p className="text-lg text-muted-foreground">Menú Digital - Disponibilidad en Tiempo Real</p>
        </div>

        {/* Info Banner */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Información importante:</p>
                <p>
                  Los tiempos de preparación son estimados. Puedes realizar pedidos anticipados para reducir tu tiempo
                  de espera.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu by Categories */}
        <div className="space-y-8">
          {dishesByCategory.map(
            ({ category, dishes: categoryDishes }) =>
              categoryDishes.length > 0 && (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{getCategoryLabel(category)}</h2>
                  <div className="grid gap-4">
                    {categoryDishes.map((dish) => (
                      <Card
                        key={dish.id}
                        className={`transition-all hover:shadow-md ${!dish.available ? "opacity-60" : ""}`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-xl">{dish.name}</CardTitle>
                                {dish.available ? (
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Disponible</Badge>
                                ) : (
                                  <Badge variant="destructive">Agotado</Badge>
                                )}
                              </div>
                              <CardDescription className="text-base">{dish.description}</CardDescription>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-2xl font-bold text-primary">${dish.price}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">Tiempo de preparación: {dish.prepTime} min</span>
                            </div>
                            <Button
                              onClick={() => handleOrderClick(dish)}
                              disabled={!dish.available}
                              size="sm"
                              className="gap-2"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Ordenar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Horario de cierre: {settings.closingTime}</p>
          <p className="mt-1">
            Los pedidos anticipados se aceptan hasta {settings.preOrderCutoffMinutes} minutos antes del cierre
          </p>
        </div>
      </div>

      {/* Order Dialog */}
      {selectedDish && <OrderDialog dish={selectedDish} open={orderDialogOpen} onOpenChange={setOrderDialogOpen} />}
    </div>
  )
}
