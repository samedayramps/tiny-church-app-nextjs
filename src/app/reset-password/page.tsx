'use client'

import { useToast } from '@/hooks/use-toast'
import { resetPassword } from './actions'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <LoadingButton>
            Send Reset Link
          </LoadingButton>
        </form>
      </div>
    </div>
  )
} 