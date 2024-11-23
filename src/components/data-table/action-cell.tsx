'use client'

import { TableActions } from './table-actions'
import type { ActionCellProps } from '@/types/table'
import { deleteOrganization, editOrganization } from '@/app/admin/organizations/actions'
import type { Organization } from '@/app/admin/organizations/types'

export function ActionCell({ row }: ActionCellProps<Organization>) {
  return (
    <div className="flex justify-end">
      <TableActions 
        row={row}
        onEdit={async () => {
          await editOrganization(row.original.id, {
            name: row.original.name,
            status: row.original.status || 'active'
          })
        }}
        onDelete={async () => {
          await deleteOrganization(row.original.id)
        }}
      />
    </div>
  )
} 