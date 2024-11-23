import { createServerClient } from '@/utils/supabase/server'
import { successResponse, errorResponse } from '@/utils/api-response'

export const dynamic = 'force-dynamic' // Opt out of caching

export async function GET() {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error

    return successResponse(data)
  } catch (error) {
    return errorResponse(error, 'Error fetching API keys')
  }
}

export async function POST(request: Request) {
  const supabase = createServerClient()
  
  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from('api_keys')
      .insert(body)
      .select()
      
    if (error) throw error

    return successResponse(data, 201)
  } catch (error) {
    return errorResponse(error, 'Error creating API key')
  }
} 