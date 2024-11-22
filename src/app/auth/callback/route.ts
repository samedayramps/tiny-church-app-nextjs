import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth error:', error)
      return NextResponse.redirect(new URL('/error', requestUrl.origin))
    }

    // For password reset flow
    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/update-password', requestUrl.origin))
    }

    // For other auth flows
    return NextResponse.redirect(new URL(next, requestUrl.origin))
  }

  // If no code, redirect to error page
  return NextResponse.redirect(new URL('/error', requestUrl.origin))
} 