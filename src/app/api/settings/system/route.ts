import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/database.types'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  
  try {
    const settings = await request.json()
    const { data, error } = await supabase
      .from('system_settings')
      .upsert({
        site_name: settings.siteName,
        site_description: settings.siteDescription,
        maintenance_mode: settings.maintenanceMode,
        support_email: settings.supportEmail,
        max_upload_size: settings.maxUploadSize,
        allowed_file_types: settings.allowedFileTypes,
        enable_audit_logs: settings.enableAuditLogs,
        retention_period: settings.retentionPeriod,
      })
      .select()
      .single()
      
    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error saving system settings:', error)
    return NextResponse.json(
      { error: 'Error saving system settings' }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  
  try {
    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .single()
      
    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching system settings:', error)
    return NextResponse.json(
      { error: 'Error fetching system settings' }, 
      { status: 500 }
    )
  }
} 