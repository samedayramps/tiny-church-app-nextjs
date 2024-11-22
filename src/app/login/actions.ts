'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { authFormSchema } from './schema'
import type { AuthFormData } from './schema'

export async function login(formData: AuthFormData) {
  const validatedFields = authFormSchema.safeParse(formData)
  
  if (!validatedFields.success) {
    throw new Error("Invalid form data")
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: AuthFormData) {
  const validatedFields = authFormSchema.safeParse(formData)
  
  if (!validatedFields.success) {
    throw new Error("Invalid form data")
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return { message: "Check your email for a confirmation link." }
}

export async function resetPassword(formData: AuthFormData) {
  const validatedFields = authFormSchema.safeParse(formData)
  
  if (!validatedFields.success) {
    throw new Error("Invalid form data")
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/update-password`,
  })

  if (error) {
    throw new Error(error.message)
  }

  return { message: "Check your email for a password reset link." }
}