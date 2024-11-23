import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { Database } from '@/types/supabase-types'
import type { TableRow } from '@/types/table'

type NotificationWithRelations = Database['public']['Tables']['notifications']['Row'] & {
  recipient: Database['public']['Tables']['members']['Row'] | null
}

const columns = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'created_at',
    header: 'Sent',
    cell: ({ row }: { row: TableRow<NotificationWithRelations> }) => {
      return new Date(row.getValue('created_at')).toLocaleString()
    },
  },
  {
    accessorKey: 'recipient.email',
    header: 'Recipient',
  },
  {
    id: 'actions',
    cell: ({ row }: { row: TableRow<NotificationWithRelations> }) => {
      return (
        <Link href={`/admin/notifications/${row.original.id}`}>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </Link>
      )
    },
  },
]

export default async function NotificationsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*, recipient:members(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Link href="/admin/notifications/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Send Notification
          </Button>
        </Link>
      </div>
      
      <DataTable
        columns={columns}
        data={(notifications as NotificationWithRelations[]) || []}
        searchKey="title"
      />
    </div>
  )
} 