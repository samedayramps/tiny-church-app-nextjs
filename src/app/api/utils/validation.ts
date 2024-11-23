import { z } from 'zod'
import { NextResponse } from 'next/server'
import { createApiResponse, ERROR_MESSAGES, STATUS_CODES } from '../index'

export async function validateRequest<T>(
  req: Request,
  schema: z.Schema<T>
): Promise<{ data: T; error?: never } | { data?: never; error: NextResponse }> {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    return { data }
  } catch {
    return {
      error: NextResponse.json(
        createApiResponse(
          undefined,
          ERROR_MESSAGES.VALIDATION_ERROR,
          STATUS_CODES.BAD_REQUEST
        )
      ),
    }
  }
} 