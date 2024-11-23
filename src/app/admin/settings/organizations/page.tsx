import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Edit2 } from 'lucide-react'
import type { Database } from '@/types/supabase-types'
import type { TableRow } from '@/types/table'

type OrganizationSettingWithRelations = Database['public']['Tables']['organization_settings']['Row'] & {
  organization: Database['public']['Tables']['organizations']['Row'] | null
}

const columns = [
  {
    accessorKey: 'organization.name',
    header: 'Organization',
  },
  {
    accessorKey: 'timezone',
    header: 'Timezone',
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'updated_at',
    header: 'Last Updated',
    cell: ({ row }: { row: TableRow<OrganizationSettingWithRelations> }) => {
      return new Date(row.getValue('updated_at')).toLocaleString()
    },
  },
  {
    id: 'actions',
    cell: ({ row }: { row: TableRow<OrganizationSettingWithRelations> }) => {
      return (
        <Link href={`/admin/settings/organizations/${row.original.organization_id}`}>
          <Button variant="ghost" size="sm">
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </Link>
      )
    },
  },
]

export default async function OrganizationSettingsPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ 
    cookies: () => cookieStore 
  })
  
  const { data: settings } = await supabase
    .from('organization_settings')
    .select('*, organization:organizations(*)')
    .order('updated_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organization Settings</h1>
      <DataTable
        columns={columns}
        data={settings as unknown as OrganizationSettingWithRelations[] || []}
        searchKey="organization.name"
      />
    </div>
  )
} 