"use client"

import { useRestaurant } from "@/lib/restaurant-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function SettingsManagement() {
  const { settings, updateSettings } = useRestaurant()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-1 text-sm">Nombre del restaurante</p>
          <Input value={settings.name} onChange={(e) => updateSettings({ name: e.target.value })} />
        </div>
        <div>
          <p className="mb-1 text-sm">Hora de cierre (HH:mm)</p>
          <Input value={settings.closingTime} onChange={(e) => updateSettings({ closingTime: e.target.value })} />
        </div>
        <div>
          <p className="mb-1 text-sm">Corte de pre-órdenes (min)</p>
          <Input
            type="number"
            value={settings.preOrderCutoffMinutes}
            onChange={(e) => updateSettings({ preOrderCutoffMinutes: Number(e.target.value || 0) })}
          />
        </div>
      </CardContent>
    </Card>
  )
}


