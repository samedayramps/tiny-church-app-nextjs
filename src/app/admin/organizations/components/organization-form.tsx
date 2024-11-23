'use client'

import { ResourceForm } from '@/components/admin/resource-form'
import { organizationSchema } from '../types'
import type { Organization, OrganizationFormValues } from '../types'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

// Define fields with literal type for name
const fields = [
  {
    name: 'name' as const, // Type assertion to match schema
    label: 'Organization Name',
    placeholder: 'Enter organization name',
    required: true,
  }
] satisfies { 
  name: keyof OrganizationFormValues
  label: string
  placeholder?: string
  required?: boolean 
}[]

interface OrganizationFormProps {
  organization?: Organization | null
  onSubmit: (formData: FormData) => Promise<{ success: boolean; error?: string }>
}

export function OrganizationForm({ organization, onSubmit }: OrganizationFormProps) {
  const router = useRouter()
  const defaultValues = organization ? {
    name: organization.name,
    created_at: organization.created_at || undefined
  } : undefined

  const handleSubmit = async (values: OrganizationFormValues) => {
    const formData = new FormData()
    formData.append('name', values.name)
    if (values.created_at) {
      formData.append('created_at', values.created_at)
    }

    const result = await onSubmit(formData)
    
    if (result.success) {
      toast({
        title: "Success",
        description: organization ? "Organization updated successfully" : "Organization created successfully"
      })
      router.push('/admin/organizations')
    } else {
      toast({
        title: "Error",
        description: result.error || "Something went wrong",
        variant: "destructive"
      })
    }
  }

  return (
    <ResourceForm
      schema={organizationSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      fields={fields}
    />
  )
} 