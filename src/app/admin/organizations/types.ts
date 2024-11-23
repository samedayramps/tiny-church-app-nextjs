import type { Database } from '@/types/database.types'

// Get the organization type directly from the database
export type Organization = Database['public']['Tables']['organizations']['Row']

// Form data should match the Insert type
export type OrganizationFormData = Database['public']['Tables']['organizations']['Insert'] 