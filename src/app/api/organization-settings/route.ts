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
      .from('organization_settings')
      .select('*, organization:organizations(*)')
      .order('updated_at', { ascending: false })
    
    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching organization settings:', error)
    return NextResponse.json(
      { error: 'Error fetching organization settings' }, 
      { status: 500 }
    )
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
      .from('organization_settings')
      .insert(body)
      .select()
      
    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating organization settings:', error)
    return NextResponse.json(
      { error: 'Error creating organization settings' }, 
      { status: 500 }
    )
  }
} 