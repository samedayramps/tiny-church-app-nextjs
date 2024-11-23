import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/database.types'
import { createApiResponse, ERROR_MESSAGES, STATUS_CODES } from '../index'
import { User } from '@supabase/supabase-js'

type RouteHandler = (
  req: Request,
  context: { params: { id?: string }; user: User }
) => Promise<NextResponse>

export function withAuth(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    // Check if user is authenticated
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session) {
      return NextResponse.json(
        createApiResponse(
          undefined,
          ERROR_MESSAGES.UNAUTHORIZED,
          STATUS_CODES.UNAUTHORIZED
        )
      )
    }

    // Check if user has required role (e.g., admin)
    const { data: userRoles, error: rolesError } = await supabase
      .from('member_roles')
      .select('role:roles(name)')
      .eq('member_id', session.user.id)
      .single()

    if (rolesError || !userRoles?.role?.name) {
      return NextResponse.json(
        createApiResponse(
          undefined,
          ERROR_MESSAGES.FORBIDDEN,
          STATUS_CODES.FORBIDDEN
        )
      )
    }

    // Pass the authenticated user to the handler
    return handler(req, { ...context, user: session.user })
  }
} 