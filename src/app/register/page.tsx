import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { signup } from "../login/actions"

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <AuthForm type="register" action={signup} />
      <div className="text-center text-sm">
        <Link 
          href="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  )
} 