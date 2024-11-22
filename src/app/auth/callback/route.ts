import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/'
  const type = requestUrl.searchParams.get('type')

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)

    // For password reset flow, always redirect to update-password
    if (type === 'recovery') {
      return NextResponse.redirect(requestUrl.origin + '/update-password')
    }

    // For other auth flows, use the next parameter
    return NextResponse.redirect(requestUrl.origin + next)
  }

  // If no code, redirect to an error page
  return NextResponse.redirect(requestUrl.origin + '/error')
} 