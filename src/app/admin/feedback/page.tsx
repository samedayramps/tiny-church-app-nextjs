import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import type { Database } from '@/types/supabase-types'
import type { TableRow } from '@/types/table'
import type { Member, Organization, Feedback } from '@/types/database'

type FeedbackWithRelations = Feedback & {
  member: Member | null
  organization: Organization | null
}

const columns = [
  {
    accessorKey: 'member.email',
    header: 'User',
    cell: ({ row }: { row: TableRow<FeedbackWithRelations> }) => {
      return row.original.member?.email || 'N/A'
    },
  },
  {
    accessorKey: 'message',
    header: 'Message',
  },
  {
    accessorKey: 'created_at',
    header: 'Submitted',
    cell: ({ row }: { row: TableRow<FeedbackWithRelations> }) => {
      return new Date(row.getValue('created_at')).toLocaleString()
    },
  },
  {
    accessorKey: 'organization.name',
    header: 'Organization',
    cell: ({ row }: { row: TableRow<FeedbackWithRelations> }) => {
      return row.original.organization?.name || 'N/A'
    },
  }
]

export default async function FeedbackPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: feedback } = await supabase
    .from('feedback')
    .select('*, member:members(*), organization:organizations(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Feedback</h1>
      <DataTable
        columns={columns}
        data={feedback || []}
        searchKey="message"
      />
    </div>
  )
} 