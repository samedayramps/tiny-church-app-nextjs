import { OrganizationForm } from '../components/organization-form'
import { createOrganization } from '../actions'
import { ResourceLayout } from '@/components/admin/resource-layout'
import { Separator } from '@/components/ui/separator'

export default function CreateOrganizationPage() {
  return (
    <ResourceLayout title="Create Organization">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Add a new organization to your system
          </p>
        </div>
        <Separator />
        <OrganizationForm onSubmit={createOrganization} />
      </div>
    </ResourceLayout>
  )
} 