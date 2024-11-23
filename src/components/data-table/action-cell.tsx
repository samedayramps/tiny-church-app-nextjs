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
          const formData = new FormData()
          formData.append('name', row.original.name)
          
          if ('status' in row.original && row.original.status) {
            formData.append('status', String(row.original.status))
          }
          
          await editOrganization(row.original.id, formData)
        }}
        onDelete={async () => {
          await deleteOrganization(row.original.id)
        }}
      />
    </div>
  )
} 