'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/database.types'

type TableName = keyof Database['public']['Tables']

export async function createResource<TData extends Record<string, unknown>>(
  tableName: TableName,
  redirectPath: string,
  data: TData
) {
  const supabase = createServerActionClient<Database>({ cookies })
  
  try {
    const { error } = await supabase
      .from(tableName)
      .insert(data as Database['public']['Tables'][typeof tableName]['Insert'])
    
    if (error) throw error
    
    revalidatePath(redirectPath)
    return { success: true }
  } catch (error) {
    console.error(`Failed to create ${tableName}:`, error)
    return { 
      success: false, 
      error: `Failed to create ${tableName}` 
    }
  }
}

export async function editResource<TData extends Record<string, unknown>>(
  tableName: TableName,
  redirectPath: string,
  id: string,
  data: Partial<TData>
) {
  const supabase = createServerActionClient<Database>({ cookies })
  
  try {
    const { error } = await supabase
      .from(tableName)
      .update(data as Database['public']['Tables'][typeof tableName]['Update'])
      .eq('id', id)
    
    if (error) throw error
    
    revalidatePath(redirectPath)
    return { success: true }
  } catch (error) {
    console.error(`Failed to update ${tableName}:`, error)
    return { 
      success: false, 
      error: `Failed to update ${tableName}` 
    }
  }
}

export async function deleteResource(
  tableName: TableName,
  redirectPath: string,
  id: string
) {
  const supabase = createServerActionClient<Database>({ cookies })
  
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    revalidatePath(redirectPath)
    return { success: true }
  } catch (error) {
    console.error(`Failed to delete ${tableName}:`, error)
    return { 
      success: false, 
      error: `Failed to delete ${tableName}` 
    }
  }
} 