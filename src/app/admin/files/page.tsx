import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import { TableActions } from '@/components/data-table/table-actions'
import { ByteSizeCell, DateCell } from '@/components/data-table/table-cell-renderers'
import type { Database } from '@/types/supabase-types'
import type { TableRow } from '@/types/table'
import type { Member, File } from '@/types/database'

type FileWithRelations = File & {
  uploaded_by: Member | null
}

const columns = [
  {
    accessorKey: 'name',
    header: 'File Name',
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ row }: { row: TableRow<FileWithRelations> }) => (
      <ByteSizeCell row={row} value={row.getValue('size')} />
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'uploaded_by.email',
    header: 'Uploaded By',
    cell: ({ row }: { row: TableRow<FileWithRelations> }) => {
      return row.original.uploaded_by?.email || 'N/A'
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Upload Date',
    cell: ({ row }: { row: TableRow<FileWithRelations> }) => (
      <DateCell row={row} value={row.getValue('created_at')} />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }: { row: TableRow<FileWithRelations> }) => {
      return <TableActions row={row} />
    },
  },
]

export default async function FilesPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: files } = await supabase
    .from('files')
    .select('*, uploaded_by:members(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Files</h1>
      <DataTable
        columns={columns}
        data={files || []}
        searchKey="name"
      />
    </div>
  )
} 