import type { Row } from '@tanstack/react-table'

// Re-export the Row type from TanStack table with generic support
export type TableRow<T> = Row<T>

// Add any additional table-related types here
export interface TableColumn<T> {
  accessorKey?: string
  id?: string
  header: string
  cell?: ({ row }: { row: TableRow<T> }) => React.ReactNode
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  searchKey?: string
}

// Add specific cell renderer types
export interface CellProps<T> {
  row: TableRow<T>
  value: unknown
}

// Add action cell types with id requirement
export interface ActionCellProps<T extends { id: string }> {
  row: TableRow<T>
} 