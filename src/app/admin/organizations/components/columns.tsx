'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { TableActions } from "@/components/data-table/table-actions"
import { deleteOrganization } from "../actions"
import { toast } from "@/hooks/use-toast"
import type { Organization } from "../types"
import { useRouter } from "next/navigation"
import type { TableRow } from "@/types/table"

// Create a client component for the actions cell
const ActionCell = ({ row }: { row: TableRow<Organization> }) => {
  'use client'
  
  const router = useRouter()
  
  return (
    <TableActions 
      row={row}
      onEdit={async () => {
        router.push(`/admin/organizations/${row.original.id}/edit`)
      }}
      onDelete={async () => {
        const result = await deleteOrganization(row.original.id)
        if (result.success) {
          toast({
            title: "Success",
            description: "Organization deleted successfully",
          })
        }
      }}
    />
  )
}

export const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      const val = row.getValue(id)
      return typeof val === 'string' 
        ? val.toLowerCase().includes((value as string).toLowerCase())
        : false
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string
      return date ? new Date(date).toLocaleDateString() : '-'
    }
  },
  {
    id: "actions",
    cell: ActionCell
  },
] 