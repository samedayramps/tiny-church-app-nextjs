'use server'

import { createResource, editResource, deleteResource } from '@/lib/actions/resource'

const TABLE_NAME = 'organizations' as const
const REDIRECT_PATH = '/admin/organizations'

export async function createOrganization(formData: FormData) {
  return createResource(TABLE_NAME, REDIRECT_PATH, {
    name: formData.get('name') as string
  })
}

export async function editOrganization(id: string, formData: FormData) {
  return editResource(TABLE_NAME, REDIRECT_PATH, id, {
    name: formData.get('name') as string
  })
}

export async function deleteOrganization(id: string) {
  return deleteResource(TABLE_NAME, REDIRECT_PATH, id)
} 