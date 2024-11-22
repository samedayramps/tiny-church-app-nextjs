"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
import { authFormSchema } from "@/app/login/schema"

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "login" | "register" | "reset"
  action: (data: z.infer<typeof authFormSchema>) => Promise<{ message?: string } | void>
}

export function AuthForm({ type, action, ...props }: AuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    setIsLoading(true)

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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6" {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type !== "reset" && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {type === "login" && "Sign In"}
            {type === "register" && "Sign Up"}
            {type === "reset" && "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  )
} 