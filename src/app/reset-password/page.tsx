'use client'

import { useToast } from '@/hooks/use-toast'
import { resetPassword } from './actions'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    
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
        title: "Success",
        description: result.message
      })
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again."
      })
    } finally {
      setIsLoading(false)
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
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Send Reset Link'}
          </Button>
        </form>
      </div>
    </div>
  )
} 