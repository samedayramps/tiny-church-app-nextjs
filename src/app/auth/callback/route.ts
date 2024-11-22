import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as 'recovery' | 'email' | null
  const next = requestUrl.searchParams.get('next') ?? '/'

  const supabase = await createClient()

  // Handle OTP verification (for password reset)
  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    })
    
    if (!error && data.session) {
      // Successfully verified OTP and got a session
      return NextResponse.redirect(new URL('/update-password', requestUrl.origin))
    }

    // If verification failed, redirect to error page
    console.error('Verification error:', error)
    return NextResponse.redirect(new URL('/error', requestUrl.origin))
  }

  // Handle code exchange (for other auth flows)
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth error:', error)
      return NextResponse.redirect(new URL('/error', requestUrl.origin))
    }

    if (data.session) {
      return NextResponse.redirect(new URL(next, requestUrl.origin))
    }
  }

  // If no code or token_hash, redirect to error page
  return NextResponse.redirect(new URL('/error', requestUrl.origin))
} 