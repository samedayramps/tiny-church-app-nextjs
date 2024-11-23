'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/supabase-types'

export async function downloadFile(fileId: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const { data: file, error } = await supabase
      .from('files')
      .select('file_url')
      .eq('id', fileId)
      .single()
    
    if (error) throw error
    
    const { data, error: storageError } = await supabase
      .storage
      .from('files')
      .createSignedUrl(file.file_url, 60) // 60 seconds expiry
      
    if (storageError) throw storageError
    
    return data.signedUrl
  } catch (error) {
    console.error('Download error:', error)
    throw new Error('Failed to download file')
  }
}

export async function deleteFile(fileId: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const { data: file, error: fetchError } = await supabase
      .from('files')
      .select('file_url')
      .eq('id', fileId)
      .single()
    
    if (fetchError) throw fetchError

    // Delete from storage first
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
    
    revalidatePath('/admin/files')
    return { success: true }
  } catch (error) {
    console.error('Delete error:', error)
    throw new Error('Failed to delete file')
  }
} 