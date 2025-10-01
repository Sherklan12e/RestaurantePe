export interface Dish {
  id: string
  name: string
  description: string
  price: number
  prepTime: number // en minutos
  available: boolean
  category: "entrada" | "principal" | "postre" | "bebida"
  image?: string
}

export interface Order {
  id: string
  dishId: string
  dishName: string
  customerName: string
  customerPhone: string
  quantity: number
  status: "pendiente" | "preparando" | "listo" | "entregado"
  orderTime: Date
  estimatedReadyTime: Date
  isPreOrder: boolean
  notes?: string
}

export interface RestaurantSettings {
  name: string
  closingTime: string // formato HH:mm
  preOrderCutoffMinutes: number // minutos antes del cierre para aceptar pedidos
}
