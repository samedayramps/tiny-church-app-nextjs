'use client'

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"
import { ButtonHTMLAttributes } from "react"

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export function LoadingButton({ 
  children, 
  className,
  ...props 
}: LoadingButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={cn("w-full", className)}
      disabled={pending}
      {...props}
    >
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
} 