'use client'

import { DataTable } from '@/components/ui/data-table'
import { StatusCell, DateCell } from './table-cell-renderers'
import type { TableColumn, TableRow } from '@/types/table'

interface ClientTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  searchKey?: string
}

export function ClientTable<T>({ data, columns, searchKey }: ClientTableProps<T>) {
  // Process columns to wrap cell renderers in client components
  const clientColumns = columns.map((column) => ({
    ...column,
    cell: column.cell ? 
      ({ row }: { row: TableRow<T> }) => {
        // Special handling for known cell types
        if (column.accessorKey === 'status') {
          return <StatusCell row={row} value={row.getValue(column.accessorKey)} />
        }
        if (column.accessorKey?.includes('date') || column.accessorKey?.includes('at')) {
          return <DateCell row={row} value={row.getValue(column.accessorKey)} />
        }
        // Default to the provided cell renderer
        if (column.cell) {
          return column.cell({ row })
        }
        return null
      } : undefined
  }))

  return (
    <DataTable 
      columns={clientColumns}
      data={data}
      searchKey={searchKey}
    />
  )
} 