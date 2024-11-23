import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/database.types'
import type { User } from '@supabase/supabase-js'

type RouteHandler = (
  req: Request,
  context: { params: { id?: string }, user: User }
) => Promise<Response>

export function withAuth(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Pass the authenticated user to the handler
    return handler(req, { ...context, user: session.user })
  }
} 