import { createServerClient as createSSRClient } from '@supabase/ssr'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'
import type { CookieOptions } from '@supabase/ssr'

export function createClient() {
  return createSSRClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookies().set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          cookies().set(name, '', options)
        },
      },
    }
  )
}

// For API routes and Server Actions
export function createServerClient() {
  return createRouteHandlerClient<Database>({ cookies })
}

// For backward compatibility
export { createClient as createSSRClient } 