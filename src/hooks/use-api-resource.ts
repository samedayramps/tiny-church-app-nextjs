'use client'

import { useState } from 'react'
import { toast } from '@/hooks/use-toast'

interface UseApiResourceOptions<T> {
  endpoint: string
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useApiResource<T>({ endpoint, onSuccess, onError }: UseApiResourceOptions<T>) {
  const [loading, setLoading] = useState(false)

  async function create(data: Partial<T>) {
    setLoading(true)
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) throw new Error('Failed to create resource')
      
      const result = await response.json()
      onSuccess?.(result)
      toast({ title: 'Success', description: 'Resource created successfully' })
      return result
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      onError?.(error as Error)
      toast({ title: 'Error', description: message, variant: 'destructive' })
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function update(id: string, data: Partial<T>) {
    setLoading(true)
    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) throw new Error('Failed to update resource')
      
      const result = await response.json()
      onSuccess?.(result)
      toast({ title: 'Success', description: 'Resource updated successfully' })
      return result
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      onError?.(error as Error)
      toast({ title: 'Error', description: message, variant: 'destructive' })
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function remove(id: string) {
    setLoading(true)
    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete resource')
      
      onSuccess?.(undefined as T)
      toast({ title: 'Success', description: 'Resource deleted successfully' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      onError?.(error as Error)
      toast({ title: 'Error', description: message, variant: 'destructive' })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    create,
    update,
    remove,
  }
} 