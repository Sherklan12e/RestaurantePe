"use client"

import type React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "sm" | "md" | "lg" | "icon"
}

export function Button({ variant = "default", size = "md", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
  const variants: Record<string, string> = {
    default: "bg-orange-600 text-white hover:bg-orange-700",
    outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
  }
  const sizes: Record<string, string> = {
    sm: "h-8 px-3",
    md: "h-10 px-4",
    lg: "h-12 px-6",
    icon: "h-10 w-10",
  }

  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
}

export default Button


