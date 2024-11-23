'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Something went wrong!</h2>
      <p className="text-sm text-gray-500">{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
} 