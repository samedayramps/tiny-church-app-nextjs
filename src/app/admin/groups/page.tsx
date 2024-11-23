import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Users } from 'lucide-react'
import type { Database } from '@/types/supabase-types'
import type { TableRow } from '@/types/table'

type GroupWithRelations = Database['public']['Tables']['groups']['Row'] & {
  organization: Database['public']['Tables']['organizations']['Row'] | null
  members_count: { count: number }[]
}

const columns = [
  {
    accessorKey: 'name',
    header: 'Group Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'organization.name',
    header: 'Organization',
  },
  {
    accessorKey: 'members_count',
    header: 'Members',
    cell: ({ row }: { row: TableRow<GroupWithRelations> }) => {
      return (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{row.getValue('members_count')}</span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }: { row: TableRow<GroupWithRelations> }) => {
      return (
        <div className="flex gap-2">
          <Link href={`/admin/groups/${row.original.id}`}>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </Link>
          <Link href={`/admin/groups/${row.original.id}/members`}>
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-1" />
              Members
            </Button>
          </Link>
        </div>
      )
    },
  },
]

export default async function GroupsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: groups } = await supabase
    .from('groups')
    .select('*, organization:organizations(*), members_count:group_members(count)')
    .order('name', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Link href="/admin/groups/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </Link>
      </div>
      
      <DataTable
        columns={columns}
        data={(groups as GroupWithRelations[]) || []}
        searchKey="name"
      />
    </div>
  )
} 