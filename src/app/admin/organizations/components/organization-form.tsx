'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { createOrganization, editOrganization } from "../actions"
import { useRouter } from "next/navigation"
import type { Organization } from "../types"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  })
})

interface OrganizationFormProps {
  organization?: Organization
}

export function OrganizationForm({ organization }: OrganizationFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organization?.name || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let result;
      
      if (organization) {
        result = await editOrganization(organization.id, values)
      } else {
        result = await createOrganization(values)
      }

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        })
        return
      }
      
      toast({
        title: "Success",
        description: organization 
          ? "Organization updated successfully."
          : "Organization created successfully.",
      })
      router.push('/admin/organizations')
    } catch (error) {
      console.error('Error saving organization:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter organization name" {...field} />
              </FormControl>
              <FormDescription>
                This is your organization&apos;s displayed name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button type="submit">
            {organization ? 'Update' : 'Create'} Organization
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.push('/admin/organizations')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
} 