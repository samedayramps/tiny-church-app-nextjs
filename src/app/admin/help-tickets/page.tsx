import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import type { Database } from '@/types/supabase-types'
import type { TableRow } from '@/types/table'

type HelpTicket = Database['public']['Tables']['help_tickets']['Row'] & {
  submitter: Database['public']['Tables']['members']['Row'] | null
}

const columns = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }: { row: TableRow<HelpTicket> }) => {
      return new Date(row.getValue('created_at')).toLocaleDateString()
    },
  },
  {
    accessorKey: 'submitter.email',
    header: 'Submitted By',
    cell: ({ row }: { row: TableRow<HelpTicket> }) => {
      return row.original.submitter?.email || 'N/A'
    },
  },
]

export default async function HelpTicketsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: tickets } = await supabase
    .from('help_tickets')
    .select('*, submitter:members(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Help Tickets</h1>
      
      <DataTable
        columns={columns}
        data={tickets || []}
        searchKey="title"
      />
    </div>
  )
} 