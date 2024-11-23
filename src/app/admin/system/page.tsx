import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card } from '@/components/ui/card'
import type { Database } from '@/types/supabase-types'

export default async function SystemPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  // Fetch system stats
  const { data: stats } = await supabase
    .from('system_stats')
    .select('*')
    .single()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Information</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Database Size
          </h3>
          <p className="text-2xl font-bold mt-2">
            {stats?.db_size || '0'} GB
          </p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Storage Used
          </h3>
          <p className="text-2xl font-bold mt-2">
            {stats?.storage_used || '0'} GB
          </p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            API Requests (24h)
          </h3>
          <p className="text-2xl font-bold mt-2">
            {stats?.api_requests_24h || '0'}
          </p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Active Connections
          </h3>
          <p className="text-2xl font-bold mt-2">
            {stats?.active_connections || '0'}
          </p>
        </Card>
      </div>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Configuration</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Database Version
              </h4>
              <p className="mt-1">{stats?.db_version || 'Unknown'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Last Backup
              </h4>
              <p className="mt-1">
                {stats?.last_backup 
                  ? new Date(stats.last_backup).toLocaleString()
                  : 'Never'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 