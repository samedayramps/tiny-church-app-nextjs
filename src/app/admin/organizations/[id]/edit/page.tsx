import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { OrganizationForm } from '../../components/organization-form'
import { editOrganization } from '../../actions'
import { ResourceLayout } from '@/components/admin/resource-layout'
import { Separator } from '@/components/ui/separator'
import type { Database } from '@/types/database.types'

interface PageProps {
  params: { id: string }
}

export default async function EditOrganizationPage({ params }: PageProps) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: organization } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', params.id)
    .single()

  return (
    <ResourceLayout title="Edit Organization">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Update organization details
          </p>
        </div>
        <Separator />
        <OrganizationForm 
          organization={organization}
          onSubmit={async (formData) => editOrganization(params.id, formData)}
        />
      </div>
    </ResourceLayout>
  )
} 