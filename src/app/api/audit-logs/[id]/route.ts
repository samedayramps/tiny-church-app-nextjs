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
      .from('audit_logs')
      .select('*, user:members(*)')
      .eq('id', id)
      .single()
    
    if (error) throw error

    if (!data) {
      return errorResponse(null, 'Audit log not found', 404)
    }

    return successResponse(data)
  } catch (error) {
    return errorResponse(error, 'Error fetching audit log')
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
      .from('audit_logs')
      .delete()
      .eq('id', id)
      
    if (error) throw error

    return successResponse({ message: 'Audit log deleted successfully' })
  } catch (error) {
    return errorResponse(error, 'Error deleting audit log')
  }
} 