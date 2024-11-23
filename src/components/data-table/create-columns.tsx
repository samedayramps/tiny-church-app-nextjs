'use client'

import { ColumnDef, Row, Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { TableActions } from "@/components/data-table/table-actions"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import type { TableRow } from "@/types/table"

interface CreateColumnsOptions<TData> {
  deleteAction: (id: string) => Promise<{ success: boolean }>
  editPath: string
  columns: {
    accessorKey: keyof TData | string
    header: string
    sortable?: boolean
    cell?: (value: unknown) => React.ReactNode
  }[]
}

export function createColumns<TData extends { id: string }>({
  deleteAction,
  editPath,
  columns
}: CreateColumnsOptions<TData>): ColumnDef<TData>[] {
  // Create a client component for the actions cell
  const ActionCell = ({ row }: { row: TableRow<TData> }) => {
    const router = useRouter()
    
    return (
      <TableActions 
        row={row}
        onEdit={async () => {
          router.push(`${editPath}/${row.original.id}/edit`)
        }}
        onDelete={async () => {
          const result = await deleteAction(row.original.id)
          if (result.success) {
            toast({
              title: "Success",
              description: "Item deleted successfully",
            })
          }
        }}
      />
    )
  }

  return [
    ...columns.map((column) => ({
      accessorKey: column.accessorKey,
      header: ({ column: tableColumn }: { column: Column<TData> }) => {
        return column.sortable ? (
          <Button
            variant="ghost"
            onClick={() => tableColumn.toggleSorting(tableColumn.getIsSorted() === "asc")}
          >
            {column.header}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ) : column.header
      },
      cell: column.cell ? 
        ({ row }: { row: Row<TData> }) => 
          column.cell!(row.getValue(column.accessorKey as string)) :
        undefined,
      filterFn: (row: Row<TData>, id: string, value: string) => {
        const val = row.getValue(id)
        return typeof val === 'string' 
          ? val.toLowerCase().includes(value.toLowerCase())
          : false
      },
    })),
    {
      id: "actions",
      cell: ActionCell
    },
  ]
} 