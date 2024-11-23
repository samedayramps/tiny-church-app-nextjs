import { createServerClient } from '@/utils/supabase/server'
import { successResponse, errorResponse } from '@/utils/api-response'

export const dynamic = 'force-dynamic' // Opt out of caching

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient()
  const { id } = params

  try {
    const { data, error } = await supabase
      .from('roles')
      .select('*, member_roles(*, member:members(*))')
      .eq('id', id)
      .single()
    
    if (error) throw error

    if (!data) {
      return errorResponse(null, 'Role not found', 404)
    }

    return successResponse(data)
  } catch (error) {
    return errorResponse(error, 'Error fetching role')
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
      .from('roles')
      .update(body)
      .eq('id', id)
      .select()
      .single()
      
    if (error) throw error

    if (!data) {
      return errorResponse(null, 'Role not found', 404)
    }

    return successResponse(data)
  } catch (error) {
    return errorResponse(error, 'Error updating role')
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
      .from('roles')
      .delete()
      .eq('id', id)
      
    if (error) throw error

    return successResponse({ message: 'Role deleted successfully' })
  } catch (error) {
    return errorResponse(error, 'Error deleting role')
  }
} 