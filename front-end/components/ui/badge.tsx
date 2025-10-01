import type React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "destructive" | "outline"
}

export function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    outline: "border border-gray-300 text-gray-700",
  }
  return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${variants[variant]} ${className}`} {...props} />
}


