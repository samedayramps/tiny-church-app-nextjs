import { createServiceClient } from '@/utils/supabase/service'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServiceClient()
  const { id } = params

  try {
    const { data: { user }, error } = await supabase.auth.admin.getUserById(id)
    
    if (error) throw error

    if (!user) {
      return errorResponse(null, 'User not found', 404)
    }

    return successResponse(user)
  } catch (error) {
    return errorResponse(error, 'Error fetching user')
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServiceClient()
  const { id } = params
  
  try {
    const body = await request.json()
    const { data: { user }, error } = await supabase.auth.admin.updateUserById(
      id,
      body
    )
      
    if (error) throw error

    if (!user) {
      return errorResponse(null, 'User not found', 404)
    }

    return successResponse(user)
  } catch (error) {
    return errorResponse(error, 'Error updating user')
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServiceClient()
  const { id } = params

  try {
    const { error } = await supabase.auth.admin.deleteUser(id)
      
    if (error) throw error

    return successResponse({ message: 'User deleted successfully' })
  } catch (error) {
    return errorResponse(error, 'Error deleting user')
  }
} 