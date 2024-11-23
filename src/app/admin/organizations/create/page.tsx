import { OrganizationForm } from "../components/organization-form"
import { Separator } from "@/components/ui/separator"

export default function CreateOrganizationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Create Organization</h3>
        <p className="text-sm text-muted-foreground">
          Add a new organization to your system
        </p>
      </div>
      <Separator />
      <OrganizationForm />
    </div>
  )
} 