"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { LoadingButton } from "@/components/ui/loading-button"
import { authFormSchema } from "@/app/login/schema"

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "login" | "register" | "reset"
  action: (data: z.infer<typeof authFormSchema>) => Promise<{ message?: string } | void>
}

export function AuthForm({ type, action }: AuthFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    try {
      const result = await action(values)
      
      if (result?.message) {
        toast({
          title: "Success",
          description: result.message,
        })
      }

      if (type === "login") {
        router.push("/")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
      })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email
        </label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      {type !== "reset" && (
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete={type === "login" ? "current-password" : "new-password"}
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
      )}
      <LoadingButton className="w-full">
        {type === "login" && "Sign In"}
        {type === "register" && "Sign Up"}
        {type === "reset" && "Reset Password"}
      </LoadingButton>
    </form>
  )
} 