import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { resetPassword } from "../login/actions"

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we will send you a verification link
        </p>
      </div>
      <AuthForm type="reset" action={resetPassword} />
      <div className="text-center text-sm">
        <Link 
          href="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Back to login
        </Link>
      </div>
    </div>
  )
} 