'use client'

import { useTransition } from 'react'
import { useFormState } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createTenant, updateTenant, redirectToTenants } from '@/lib/actions/tenant'
import type { TenantWithRelations } from '@/types/tenant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TenantFormProps {
  tenant?: TenantWithRelations
}

const initialState = {
  message: null,
  errors: {}
}

// Based on common timezone standards
const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
]

// Based on common currency standards
const CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
]

export function TenantForm({ tenant }: TenantFormProps) {
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useFormState(
    tenant ? 
      (prevState: any, formData: FormData) => updateTenant(tenant.id, formData) :
      createTenant,
    initialState
  )

  return (
    <form action={formAction} className="space-y-6">
      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Organization Name
            </label>
            <Input
              id="name"
              name="name"
              defaultValue={tenant?.name}
              required
              className="mt-1"
              aria-describedby="name-error"
            />
            {state?.errors?.name && (
              <div id="name-error" className="mt-1 text-sm text-red-500">
                {state.errors.name.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Organization Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium">
              Timezone
            </label>
            <Select name="timezone" defaultValue={tenant?.settings?.timezone || 'UTC'}>
              <SelectTrigger className="mt-1" aria-describedby="timezone-error">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium">
              Currency
            </label>
            <Select name="currency" defaultValue={tenant?.settings?.currency || 'USD'}>
              <SelectTrigger className="mt-1" aria-describedby="currency-error">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="additional_settings" className="block text-sm font-medium">
              Additional Settings (JSON)
            </label>
            <Input
              id="additional_settings"
              name="additional_settings"
              type="text"
              defaultValue={tenant?.settings?.additional_settings ? 
                JSON.stringify(tenant.settings.additional_settings) : 
                ''}
              className="mt-1"
              placeholder="{}"
            />
          </div>
        </CardContent>
      </Card>

      {state?.message && (
        <div className="mt-2 text-sm text-red-500" role="alert">
          {state.message}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => startTransition(() => redirectToTenants())}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : tenant ? 'Update Organization' : 'Create Organization'}
        </Button>
      </div>
    </form>
  )
} 