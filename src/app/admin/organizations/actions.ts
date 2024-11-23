'use server'

import { revalidatePath } from 'next/cache'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { z } from 'zod'
import type { Database } from '@/types/database.types'

const organizationSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  })
})

export async function createOrganization(data: { name: string }) {
  const supabase = createServerActionClient<Database>({ cookies })
  
  try {
    const validated = organizationSchema.parse(data)
    
    const { error } = await supabase
      .from('organizations')
      .insert({
        name: validated.name
      })
    
    if (error) throw error
    
    revalidatePath('/admin/organizations')
    return { success: true }
  } catch (error) {
    console.error('Failed to create organization:', error)
    return { error: 'Failed to create organization' }
  }
}

export async function editOrganization(id: string, data: { name: string }) {
  const supabase = createServerActionClient<Database>({ cookies })
  
  try {
    const validated = organizationSchema.parse(data)
    
    const { error } = await supabase
      .from('organizations')
      .update({
        name: validated.name
      })
      .eq('id', id)
    
    if (error) throw error
    
    revalidatePath('/admin/organizations')
    return { success: true }
  } catch (error) {
    console.error('Failed to update organization:', error)
    return { error: 'Failed to update organization' }
  }
}

export async function deleteOrganization(id: string) {
  const supabase = createServerActionClient<Database>({ cookies })
  
  try {
    const { error } = await supabase
      .from('organizations')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    revalidatePath('/admin/organizations')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete organization:', error)
    return { error: 'Failed to delete organization' }
  }
} 