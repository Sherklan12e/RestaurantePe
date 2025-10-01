"use client"

import type React from "react"
import { useState } from "react"

interface TabsProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

export function Tabs({ value, onValueChange, className = "", children }: TabsProps) {
  return <div className={className} data-tabs-value={value}>{children}</div>
}

export function TabsList({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`inline-flex rounded-md border bg-white p-1 ${className}`} {...props} />
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function TabsTrigger({ value, className = "", ...props }: TabsTriggerProps) {
  return <button data-value={value} className={`px-4 py-2 text-sm rounded-md data-[state=active]:bg-gray-100 ${className}`} {...props} />
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function TabsContent({ value, className = "", ...props }: TabsContentProps) {
  // This minimal placeholder doesn't implement hide/show logic; pages using Tabs also manage state
  return <div data-value={value} className={className} {...props} />
}


