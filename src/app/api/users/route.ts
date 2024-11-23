import { createServiceClient } from '@/utils/supabase/service'
import { successResponse, errorResponse } from '@/utils/api-response'
import { withAuth } from '../middleware/withAuth'
import type { User } from '@supabase/supabase-js'

type HandlerContext = {
  params: { id?: string }
  user: User
}

async function GETHandler(
  request: Request,
  { user }: HandlerContext
) {
  const { searchParams } = new URL(request.url)
  const supabase = createServiceClient()

  try {
    // Check admin permission
    if (!user.app_metadata?.roles?.includes('admin')) {
      return errorResponse(null, 'Unauthorized access', 403)
    }

    // Handle pagination
    const page = Number(searchParams.get('page')) || 1
    const limit = 10
    
    // Get users with pagination
    const { data: { users }, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: limit
    })
    
    if (error) throw error

    return successResponse({
      data: users,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalCount: users?.length || 0,
        hasMore: (users?.length || 0) === limit
      }
    })
  } catch (error) {
    return errorResponse(error, 'Error fetching users')
  }
}

async function POSTHandler(
  request: Request,
  { user }: HandlerContext
) {
  const supabase = createServiceClient()
  
  try {
    // Check admin permission
    if (!user.app_metadata?.roles?.includes('admin')) {
      return errorResponse(null, 'Unauthorized to create users', 403)
    }

    const body = await request.json()
    const { email, password, role = 'user', ...userData } = body

    // Validate required fields
    if (!email || !password) {
      return errorResponse(
        null, 
        'Email and password are required', 
        400
      )
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      role,
      user_metadata: userData
    })

    if (error) throw error

    return successResponse(data, 201)
  } catch (error) {
    return errorResponse(error, 'Error creating user')
  }
}

// Apply middleware
export const GET = withAuth(GETHandler)
export const POST = withAuth(POSTHandler) 