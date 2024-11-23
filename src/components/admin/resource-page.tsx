'use client'

import { ResourceLayout } from './resource-layout'
import { DataTable } from '@/components/ui/data-table'
import { useSearchParams } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'

interface ResourcePageProps<T> {
  title: string
  createHref?: string
  columns: ColumnDef<T>[]
  data: T[]
  searchKey?: string
  totalPages?: number
}

export function ResourcePage<T>({
  title,
  createHref,
  columns,
  data,
  searchKey,
  totalPages
}: ResourcePageProps<T>) {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  return (
    <ResourceLayout title={title} createHref={createHref}>
      <DataTable
        columns={columns}
        data={data}
        searchKey={searchKey}
        totalPages={totalPages}
        currentPage={page}
      />
    </ResourceLayout>
  )
} 