import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/database.types'

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies })

  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('payment_date', { ascending: false })
    
    if (error) throw error

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Error fetching payments' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  
  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from('payments')
      .insert(body)
      .select()
      
    if (error) throw error

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Error creating payment' }, { status: 500 })
  }
} 