import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { OrganizationForm } from '../../components/organization-form'
import { Separator } from '@/components/ui/separator'
import type { Database } from '@/types/database.types'

async function getOrganization(id: string) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ 
    cookies: () => cookieStore 
  })
  
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', id)
    .single()
    
  if (error) throw error
  return data
}

export default async function EditOrganizationPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const organization = await getOrganization(params.id)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Edit Organization</h3>
        <p className="text-sm text-muted-foreground">
          Update organization details
        </p>
      </div>
      <Separator />
      <OrganizationForm organization={organization} />
    </div>
  )
} 