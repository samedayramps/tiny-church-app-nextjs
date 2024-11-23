import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { Database } from '@/types/database.types'
import type { TableRow } from '@/types/table'

type UserWithRelations = Database['public']['Tables']['members']['Row'] & {
  organization: Database['public']['Tables']['organizations']['Row'] | null
}

const columns = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: TableRow<UserWithRelations> }) => {
      const status = row.getValue('status') as string
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${status === 'active' ? 'bg-green-100 text-green-800' : 
            status === 'inactive' ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'}`}>
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: 'organization.name',
    header: 'Organization',
    cell: ({ row }: { row: TableRow<UserWithRelations> }) => {
      return row.original.organization?.name || 'N/A'
    },
  },
  {
    id: 'actions',
    cell: ({ row }: { row: TableRow<UserWithRelations> }) => {
      return (
        <Link href={`/admin/users/${row.original.id}`}>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </Link>
      )
    },
  },
]

interface PageProps {
  searchParams?: {
    page?: string
  }
}

export default async function UsersPage({ searchParams }: PageProps) {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  // Get current page from URL params or default to 1
  const currentPage = Number(searchParams?.page) || 1
  
  const { data: users } = await supabase
    .from('members')
    .select('*, organization:organizations(*)')
    .order('email', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link href="/admin/users/invite">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        </Link>
      </div>
      
      <DataTable
        columns={columns}
        data={(users as UserWithRelations[]) || []}
        searchKey="email"
        currentPage={currentPage}
      />
    </div>
  )
} 