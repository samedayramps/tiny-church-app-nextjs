'use client'

import { createColumns } from "@/components/data-table/create-columns"
import { deleteOrganization } from "../actions"
import type { Organization } from "../types"

export const columns = createColumns<Organization>({
  deleteAction: deleteOrganization,
  editPath: '/admin/organizations',
  columns: [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
      cell: (value: unknown) => {
        if (typeof value === 'string') {
          return value
        }
        return '-'
      }
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: (value: unknown) => {
        if (typeof value === 'string') {
          return value ? new Date(value).toLocaleDateString() : '-'
        }
        return '-'
      }
    }
  ]
}) 