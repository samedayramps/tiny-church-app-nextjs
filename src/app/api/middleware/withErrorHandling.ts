import { NextResponse } from 'next/server'
import { handleDatabaseError, handleServerError } from '../index'
import { PostgrestError } from '@supabase/supabase-js'

type RouteHandler = (
  req: Request,
  context: { params: { id?: string } }
) => Promise<NextResponse>

export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    try {
      return await handler(req, context)
    } catch (error) {
      console.error('Route error:', error)
      
      if ((error as PostgrestError).code) {
        return NextResponse.json(handleDatabaseError(error as PostgrestError))
      }
      
      return NextResponse.json(handleServerError(error as Error))
    }
  }
} 