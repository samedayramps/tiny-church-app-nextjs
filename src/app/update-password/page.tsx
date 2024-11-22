'use client'

import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { useRouter } from 'next/navigation'
import { Icons } from "@/components/icons"
import { AuthCard } from '@/components/auth/auth-card'

export default function UpdatePasswordPage() {
  const [isVerified, setIsVerified] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  // Check if user has a valid recovery session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session error:', error)
        toast({
          variant: "destructive",
          title: "Session Error",
          description: "Failed to verify session. Please try again."
        })
        router.push('/reset-password')
        return
      }

      if (!session) {
        toast({
          variant: "destructive",
          title: "Invalid Link",
          description: "Invalid or expired reset link. Please request a new one."
        })
        router.push('/reset-password')
        return
      }

      setIsVerified(true)
    }
    
    checkSession()
  }, [router, supabase.auth, toast])

  async function handleSubmit(formData: FormData) {
    if (!isVerified) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please verify your session before updating password"
      })
      return
    }
    
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match"
      })
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message
        })
        return
      }

      // Sign out after password update
      await supabase.auth.signOut()

      toast({
        title: "Success",
        description: "Password updated successfully. Please sign in with your new password."
      })
      
      router.push('/login')
    } catch (error) {
      console.error('Password update error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update password. Please try again."
      })
    }
  }

  if (!isVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <Icons.spinner className="h-6 w-6 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Verifying session...
          </span>
        </div>
      </div>
    )
  }

  return (
    <AuthCard 
      title="Update Password"
      description="Enter your new password below"
    >
      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            New Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            required
          />
        </div>
        <LoadingButton className="w-full">
          Update Password
        </LoadingButton>
      </form>
    </AuthCard>
  )
} 