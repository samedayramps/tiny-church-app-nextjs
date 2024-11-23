import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

interface ResourceLayoutProps {
  title: string
  createHref?: string
  createLabel?: string
  children: React.ReactNode
}

export function ResourceLayout({ 
  title, 
  createHref, 
  createLabel = 'Create New',
  children 
}: ResourceLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        {createHref && (
          <Link href={createHref}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {createLabel}
            </Button>
          </Link>
        )}
      </div>
      {children}
    </div>
  )
} 