import { NextResponse } from 'next/server';

export function handleError(error: unknown, message: string) {
  if (error instanceof Error) {
    console.error(message, error.message);
  } else {
    console.error(message, error);
  }
  return NextResponse.json({ error: message }, { status: 500 });
} 