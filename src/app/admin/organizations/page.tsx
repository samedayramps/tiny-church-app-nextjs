import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ResourcePage } from '@/components/admin/resource-page'
import { columns } from './components/columns'
import type { Database } from '@/types/database.types'
import { Suspense } from 'react'

export default async function OrganizationsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: organizations } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false })

  console.log('Organizations:', organizations)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResourcePage
        title="Organizations"
        createHref="/admin/organizations/create"
        columns={columns}
        data={organizations || []}
        searchKey="name"
      />
    </Suspense>
  )
} 