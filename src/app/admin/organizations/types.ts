import type { Database } from '@/types/database.types'
import { z } from 'zod'

export type Organization = Database['public']['Tables']['organizations']['Row']
export type OrganizationInsert = Database['public']['Tables']['organizations']['Insert']
export type OrganizationUpdate = Database['public']['Tables']['organizations']['Update']

export const organizationSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  created_at: z.string().optional(),
})

export type OrganizationFormValues = z.infer<typeof organizationSchema> 