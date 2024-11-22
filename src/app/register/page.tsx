import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { signup } from "../login/actions"
import { AuthCard } from "@/components/auth/auth-card"

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create an account" 
      description="Enter your email below to create your account"
    >
      <AuthForm type="register" action={signup} />
      <div className="text-center text-sm">
        <Link 
          href="/login"
          className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </AuthCard>
  )
} 