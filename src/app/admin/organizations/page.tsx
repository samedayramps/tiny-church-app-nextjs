import { Suspense } from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ResourceLayout } from '@/components/admin/resource-layout'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './components/columns'
import type { Database } from '@/types/database.types'
import { Skeleton } from '@/components/ui/skeleton'
import type { Organization } from './types'

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <div className="rounded-lg border">
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  )
}

async function getOrganizations() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ 
    cookies: () => cookieStore 
  })
  
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('name', { ascending: true })
    
  if (error) {
    console.error('Error fetching organizations:', error)
    throw error
  }
  
  return data as Organization[]
}

export default async function OrganizationsPage() {
  const organizations = await getOrganizations()

  return (
    <ResourceLayout 
      title="Organizations"
      createHref="/admin/organizations/create"
      createLabel="Add Organization"
    >
      <Suspense fallback={<TableSkeleton />}>
        <DataTable
          columns={columns}
          data={organizations || []}
          searchKey="name"
          placeholder="Filter organizations..."
        />
      </Suspense>
    </ResourceLayout>
  )
} 