import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { login } from "./actions"
import { AuthCard } from "@/components/auth/auth-card"

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your Tiny Church account"
    >
      <AuthForm type="login" action={login} />
      <div className="space-y-2 text-center text-sm">
        <div>
          <Link 
            href="/register" 
            className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
        <div>
          <Link
            href="/reset-password"
            className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </AuthCard>
  )
}