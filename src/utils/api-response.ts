import { NextResponse } from 'next/server'

type ApiResponse<T = unknown> = {
  data?: T
  error?: string
  message?: string
}

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ data }, { status })
}

export function errorResponse(error: unknown, message: string, status = 500) {
  console.error(`API Error: ${message}`, error)
  return NextResponse.json<ApiResponse>(
    { error: message },
    { status }
  )
} 