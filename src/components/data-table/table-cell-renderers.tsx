'use client'

import { TableRow } from '@/types/table'

interface CellProps<T> {
  row: TableRow<T>
  value: unknown
}

export function DateCell<T>({ value }: CellProps<T>) {
  if (!value) return null
  return <span>{new Date(value as string).toLocaleString()}</span>
}

export function ByteSizeCell<T>({ value }: CellProps<T>) {
  if (!value) return null
  const size = parseInt(value as string)
  const units = ['B', 'KB', 'MB', 'GB']
  let unitIndex = 0
  let adjustedSize = size

  while (adjustedSize >= 1024 && unitIndex < units.length - 1) {
    adjustedSize /= 1024
    unitIndex++
  }

  return <span>{`${adjustedSize.toFixed(2)} ${units[unitIndex]}`}</span>
}

export function StatusCell<T>({ value }: CellProps<T>) {
  if (!value) return null
  
  const status = value as string
  const styles = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }[status.toLowerCase()] || 'bg-gray-100 text-gray-800'

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  )
} 