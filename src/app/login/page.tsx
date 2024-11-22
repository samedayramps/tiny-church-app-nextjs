import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { login } from "./actions"

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>
      <AuthForm type="login" action={login} />
      <div className="text-center text-sm">
        <Link 
          href="/register" 
          className="hover:text-brand underline underline-offset-4"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
      <div className="text-center text-sm">
        <Link
          href="/reset-password"
          className="hover:text-brand underline underline-offset-4"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  )
}