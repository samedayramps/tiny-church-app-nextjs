'use client'

import { useToast } from '@/hooks/use-toast'
import { resetPassword } from './actions'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { AuthCard } from '@/components/auth/auth-card'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    try {
      const result = await resetPassword(formData)
      
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error
        })
        return
      }

      toast({
        title: "Check your email",
        description: result.message,
      })
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again."
      })
    }
  }

  return (
    <AuthCard 
      title="Reset Password"
      description="Enter your email to receive a password reset link"
    >
      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <LoadingButton className="w-full">
          Send Reset Link
        </LoadingButton>
      </form>
      <div className="text-center text-sm">
        <Link 
          href="/login"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          Back to login
        </Link>
      </div>
    </AuthCard>
  )
} 