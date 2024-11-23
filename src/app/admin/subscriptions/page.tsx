import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Database } from '@/types/supabase-types'
import type { TableRow } from '@/types/table'

type SubscriptionWithRelations = Database['public']['Tables']['subscriptions']['Row'] & {
  organization: Database['public']['Tables']['organizations']['Row'] | null
}

const columns = [
  {
    accessorKey: 'organization.name',
    header: 'Organization',
  },
  {
    accessorKey: 'plan',
    header: 'Plan',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: TableRow<SubscriptionWithRelations> }) => {
      const status = row.getValue('status') as string
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${status === 'active' ? 'bg-green-100 text-green-800' : 
            status === 'canceled' ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'}`}>
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: 'current_period_end',
    header: 'Renewal Date',
    cell: ({ row }: { row: TableRow<SubscriptionWithRelations> }) => {
      return new Date(row.getValue('current_period_end')).toLocaleDateString()
    },
  },
  {
    id: 'actions',
    cell: ({ row }: { row: TableRow<SubscriptionWithRelations> }) => {
      return (
        <Link href={`/admin/subscriptions/${row.original.id}`}>
          <Button variant="ghost" size="sm">
            Manage
          </Button>
        </Link>
      )
    },
  },
]

export default async function SubscriptionsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*, organization:organizations(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <Link href="/admin/subscriptions/plans">
          <Button>Manage Plans</Button>
        </Link>
      </div>
      
      <DataTable
        columns={columns}
        data={(subscriptions as SubscriptionWithRelations[]) || []}
        searchKey="organization.name"
      />
    </div>
  )
} 