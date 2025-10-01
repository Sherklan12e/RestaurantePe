export function isRestaurantOpen(closingTime: string): boolean {
  const now = new Date()
  const [closingHour, closingMinute] = closingTime.split(":").map(Number)

  const closingDate = new Date()
  closingDate.setHours(closingHour, closingMinute, 0, 0)

  return now < closingDate
}

export function canAcceptPreOrder(closingTime: string, cutoffMinutes: number): boolean {
  const now = new Date()
  const [closingHour, closingMinute] = closingTime.split(":").map(Number)

  const closingDate = new Date()
  closingDate.setHours(closingHour, closingMinute, 0, 0)

  const cutoffDate = new Date(closingDate.getTime() - cutoffMinutes * 60000)

  return now < cutoffDate
}

export function getTimeUntilClosing(closingTime: string): number {
  const now = new Date()
  const [closingHour, closingMinute] = closingTime.split(":").map(Number)

  const closingDate = new Date()
  closingDate.setHours(closingHour, closingMinute, 0, 0)

  const diffMs = closingDate.getTime() - now.getTime()
  return Math.max(0, Math.floor(diffMs / 60000)) // retorna minutos
}
