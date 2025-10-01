"use client"

import { useState } from "react"
import { useRestaurant } from "@/lib/restaurant-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DishManagement } from "@/components/admin/dish-management"
import { OrderManagement } from "@/components/admin/order-management"
import { SettingsManagement } from "@/components/admin/settings-management"
import { ClipboardList, ChefHat } from "lucide-react"

export default function AdminPage() {
  const { dishes, orders } = useRestaurant()
  const [activeTab, setActiveTab] = useState("dishes")

  const availableDishes = dishes.filter((d) => d.available).length
  const pendingOrders = orders.filter((o) => o.status === "pendiente" || o.status === "preparando").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Panel de Administración</h1>
          <p className="text-lg text-muted-foreground">Gestiona tu restaurante en tiempo real</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platos Disponibles</CardTitle>
              <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {availableDishes} / {dishes.length}
              </div>
              <p className="text-xs text-muted-foreground">platos activos en el menú</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Activos</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders}</div>
              <p className="text-xs text-muted-foreground">pedidos pendientes o en preparación</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pedidos</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">pedidos registrados hoy</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="dishes">Platos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="dishes" className="space-y-4">
            <DishManagement />
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <SettingsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
