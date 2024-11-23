import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import type { Database } from '@/types/supabase-types'
import type { TableRow } from '@/types/table'

type AuditLog = Database['public']['Tables']['audit_logs']['Row'] & {
  member: Database['public']['Tables']['members']['Row']
}

const columns = [
  {
    accessorKey: 'action',
    header: 'Action',
  },
  {
    accessorKey: 'created_at',
    header: 'Timestamp',
    cell: ({ row }: { row: TableRow<AuditLog> }) => {
      return new Date(row.getValue('created_at')).toLocaleString()
    },
  },
  {
    accessorKey: 'member.email',
    header: 'User',
    cell: ({ row }: { row: TableRow<AuditLog> }) => {
      return row.original.member?.email || 'System'
    },
  },
  {
    accessorKey: 'details',
    header: 'Details',
  },
]

export default async function LogsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: logs } = await supabase
    .from('audit_logs')
    .select('*, member:members(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Audit Logs</h1>
      
      <DataTable
        columns={columns}
        data={(logs as unknown as AuditLog[]) || []}
        searchKey="action"
      />
    </div>
  )
} 