"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Dish, Order, RestaurantSettings } from "./types"

interface RestaurantContextType {
  dishes: Dish[]
  orders: Order[]
  settings: RestaurantSettings
  updateDishAvailability: (dishId: string, available: boolean) => void
  addOrder: (order: Omit<Order, "id" | "orderTime" | "estimatedReadyTime">) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  updateSettings: (settings: Partial<RestaurantSettings>) => void
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined)

const INITIAL_DISHES: Dish[] = [
  {
    id: "1",
    name: "Papas a la española",
    description: "Papas doradas con cebolla y pimientos",
    price: 850,
    prepTime: 10,
    available: true,
    category: "entrada",
  },
  {
    id: "2",
    name: "Ravioles",
    description: "Ravioles caseros con salsa a elección",
    price: 1200,
    prepTime: 7,
    available: true,
    category: "principal",
  },
  {
    id: "3",
    name: "Pollo al verdeo con crema",
    description: "Pechuga de pollo en salsa cremosa con verdeo",
    price: 1500,
    prepTime: 12,
    available: true,
    category: "principal",
  },
  {
    id: "4",
    name: "Empanadas",
    description: "Empanadas de carne, pollo o jamón y queso",
    price: 300,
    prepTime: 3,
    available: true,
    category: "entrada",
  },
  {
    id: "5",
    name: "Ensalada césar",
    description: "Lechuga, pollo, crutones y aderezo césar",
    price: 950,
    prepTime: 5,
    available: false,
    category: "entrada",
  },
]

const INITIAL_SETTINGS: RestaurantSettings = {
  name: "Restaurante El Buen Sabor",
  closingTime: "23:00",
  preOrderCutoffMinutes: 60,
}

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [settings, setSettings] = useState<RestaurantSettings>(INITIAL_SETTINGS)

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedDishes = localStorage.getItem("restaurant-dishes")
    const savedOrders = localStorage.getItem("restaurant-orders")
    const savedSettings = localStorage.getItem("restaurant-settings")

    if (savedDishes) {
      setDishes(JSON.parse(savedDishes))
    } else {
      setDishes(INITIAL_DISHES)
    }

    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders)
      // Convertir strings de fecha a objetos Date
      const ordersWithDates = parsedOrders.map((order: any) => ({
        ...order,
        orderTime: new Date(order.orderTime),
        estimatedReadyTime: new Date(order.estimatedReadyTime),
      }))
      setOrders(ordersWithDates)
    }

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Guardar dishes en localStorage cuando cambien
  useEffect(() => {
    if (dishes.length > 0) {
      localStorage.setItem("restaurant-dishes", JSON.stringify(dishes))
    }
  }, [dishes])

  // Guardar orders en localStorage cuando cambien
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("restaurant-orders", JSON.stringify(orders))
    }
  }, [orders])

  // Guardar settings en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("restaurant-settings", JSON.stringify(settings))
  }, [settings])

  const updateDishAvailability = (dishId: string, available: boolean) => {
    setDishes((prev) => prev.map((dish) => (dish.id === dishId ? { ...dish, available } : dish)))
  }

  const addOrder = (orderData: Omit<Order, "id" | "orderTime" | "estimatedReadyTime">) => {
    const dish = dishes.find((d) => d.id === orderData.dishId)
    if (!dish) return

    const orderTime = new Date()
    const estimatedReadyTime = new Date(orderTime.getTime() + dish.prepTime * 60000)

    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderTime,
      estimatedReadyTime,
    }

    setOrders((prev) => [newOrder, ...prev])
  }

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const updateSettings = (newSettings: Partial<RestaurantSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  return (
    <RestaurantContext.Provider
      value={{
        dishes,
        orders,
        settings,
        updateDishAvailability,
        addOrder,
        updateOrderStatus,
        updateSettings,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant() {
  const context = useContext(RestaurantContext)
  if (context === undefined) {
    throw new Error("useRestaurant must be used within a RestaurantProvider")
  }
  return context
}
