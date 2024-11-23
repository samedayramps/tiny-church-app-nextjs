import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/database.types'

export async function GET() {
  const cookieStore = await cookies()
  const supabase = createRouteHandlerClient<Database>({ 
    cookies: () => cookieStore 
  })

  try {
    const { data, error } = await supabase
      .from('invitations')
      .select('*, inviter:members(*), role:roles(*)')
      .order('created_at', { ascending: false })
    
    if (error) throw error

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Error fetching invitations' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const supabase = createRouteHandlerClient<Database>({ 
    cookies: () => cookieStore 
  })
  
  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from('invitations')
      .insert(body)
      .select()
      
    if (error) throw error

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Error creating invitation' }, { status: 500 })
  }
} 