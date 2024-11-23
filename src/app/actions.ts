'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/database.types'

export async function downloadFile(fileId: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const { data: file, error } = await supabase
      .from('files')
      .select('*')
      .eq('id', fileId)
      .single()
    
    if (error) throw error
    
    // Get file from storage using file_url instead of path
    const { data, error: storageError } = await supabase
      .storage
      .from('files')
      .download(file.file_url)
      
    if (storageError) throw storageError
    
    return data
  } catch (error) {
    console.error('Download error:', error)
    throw new Error('Failed to download file')
  }
}

export async function deleteFile(fileId: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    // First get the file to get its URL
    const { data: file, error: fetchError } = await supabase
      .from('files')
      .select('*')
      .eq('id', fileId)
      .single()
    
    if (fetchError) throw fetchError

    // Delete from storage first using file_url
    const { error: storageError } = await supabase
      .storage
      .from('files')
      .remove([file.file_url])
    
    if (storageError) throw storageError

    // Then delete the database record
    const { error: dbError } = await supabase
      .from('files')
      .delete()
      .eq('id', fileId)
    
    if (dbError) throw dbError
    
    // Revalidate the files page to show updated list
    revalidatePath('/admin/files')
  } catch (error) {
    console.error('Delete error:', error)
    throw new Error('Failed to delete file')
  }
} 