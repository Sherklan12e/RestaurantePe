"use client"

export function useToast() {
  return {
    toast: ({ title, description, variant }: { title: string; description?: string; variant?: "destructive" | "default" }) => {
      if (typeof window !== "undefined") {
        // Minimal placeholder toast
        const message = `${title}${description ? `: ${description}` : ""}`
        if (variant === "destructive") {
          console.error(message)
        } else {
          console.log(message)
        }
      }
    },
  }
}


