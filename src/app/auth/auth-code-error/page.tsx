export default function AuthCodeErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 space-y-6 text-center">
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="text-muted-foreground">
          The authentication code is invalid or has expired.
        </p>
        <p className="text-muted-foreground">
          Please try resetting your password again.
        </p>
        <a
          href="/reset-password"
          className="text-primary hover:underline"
        >
          Back to Reset Password
        </a>
      </div>
    </div>
  )
} 