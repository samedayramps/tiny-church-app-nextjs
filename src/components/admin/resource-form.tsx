'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import type { z } from 'zod'
import type { Path } from 'react-hook-form'

interface ResourceFormProps<T extends z.ZodType> {
  schema: T
  defaultValues?: z.infer<T>
  onSubmit: (values: z.infer<T>) => Promise<void>
  fields: {
    name: Path<z.infer<T>>
    label: string
    type?: string
    placeholder?: string
    required?: boolean
  }[]
}

export function ResourceForm<T extends z.ZodType>({
  schema,
  defaultValues,
  onSubmit,
  fields
}: ResourceFormProps<T>) {
  const router = useRouter()
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  async function handleSubmit(values: z.infer<T>) {
    try {
      await onSubmit(values)
      toast({
        title: 'Success',
        description: 'Resource saved successfully.',
      })
      router.back()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={String(field.name)}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    required={field.required}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        
        <div className="flex gap-4">
          <Button type="submit">
            {defaultValues ? 'Update' : 'Create'}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
} 