import { AuthCard } from '@/components/auth/auth-card'
import Link from 'next/link'

export default function AuthCodeErrorPage() {
  return (
    <AuthCard 
      title="Authentication Error"
      description="The authentication code is invalid or has expired"
    >
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Please try resetting your password again.
        </p>
        <Link
          href="/reset-password"
          className="mt-4 inline-block text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          Back to Reset Password
        </Link>
      </div>
    </AuthCard>
  )
} 