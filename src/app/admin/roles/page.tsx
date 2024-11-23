import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { Database } from '@/types/supabase-types'
import type { TableRow } from '@/types/table'

type RoleWithRelations = Database['public']['Tables']['roles']['Row'] & {
  organization: Database['public']['Tables']['organizations']['Row'] | null
  members_count: { count: number }[]
}

const columns = [
  {
    accessorKey: 'name',
    header: 'Role Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'organization.name',
    header: 'Organization',
    cell: ({ row }: { row: TableRow<RoleWithRelations> }) => {
      return row.original.organization?.name || 'N/A'
    },
  },
  {
    accessorKey: 'members_count',
    header: 'Members',
    cell: ({ row }: { row: TableRow<RoleWithRelations> }) => {
      return row.original.members_count || 0
    },
  },
  {
    id: 'actions',
    cell: ({ row }: { row: TableRow<RoleWithRelations> }) => {
      return (
        <Link href={`/admin/roles/${row.original.id}`}>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </Link>
      )
    },
  },
]

export default async function RolesPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: roles } = await supabase
    .from('roles')
    .select('*, organization:organizations(*), members_count:role_members(count)')
    .order('name', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Roles</h1>
        <Link href="/admin/roles/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Button>
        </Link>
      </div>
      
      <DataTable
        columns={columns}
        data={(roles as RoleWithRelations[]) || []}
        searchKey="name"
      />
    </div>
  )
} 