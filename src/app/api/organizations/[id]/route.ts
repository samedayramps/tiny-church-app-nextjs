import { createServerClient } from '@/utils/supabase/server'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient()
  const { id } = params

  try {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error

    if (!data) {
      return errorResponse(null, 'Organization not found', 404)
    }

    return successResponse(data)
  } catch (error) {
    return errorResponse(error, 'Error fetching organization')
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient()
  const { id } = params
  
  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from('organizations')
      .update(body)
      .eq('id', id)
      .select()
      .single()
      
    if (error) throw error

    if (!data) {
      return errorResponse(null, 'Organization not found', 404)
    }

    return successResponse(data)
  } catch (error) {
    return errorResponse(error, 'Error updating organization')
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient()
  const { id } = params

  try {
    const { error } = await supabase
      .from('organizations')
      .delete()
      .eq('id', id)
      
    if (error) throw error

    return successResponse({ message: 'Organization deleted successfully' })
  } catch (error) {
    return errorResponse(error, 'Error deleting organization')
  }
} 