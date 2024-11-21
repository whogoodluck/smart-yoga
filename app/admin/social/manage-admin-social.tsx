'use client'

import { useState } from 'react'
import { updateSocialMediaLinks } from '@/services/social-service'
import {
  AdminSocialMediaLinksForm,
  adminSocialMediaLinksFormSchema
} from '@/validators/admin-social-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/loading-button'

export default function UpdateSocialMediaLinks() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AdminSocialMediaLinksForm>({
    resolver: zodResolver(adminSocialMediaLinksFormSchema),
    defaultValues: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  })

  async function onSubmit(data: AdminSocialMediaLinksForm) {
    try {
      setIsSubmitting(true)
      await updateSocialMediaLinks(data)
      toast.success('Social media links updated successfully!')
    } catch {
      toast.error('Failed to update social media links')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='w-full max-w-2xl py-8'>
      <h1 className='text-3xl font-bold text-black'>
        Update Social Media Links
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-4'>
          <FormField
            control={form.control}
            name='facebook'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Facebook URL' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='instagram'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Instagram URL' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='twitter'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Twitter URL' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-4 text-center'>
            <LoadingButton
              type='submit'
              loading={isSubmitting}
              text='Update Links'
              className='w-1/2'
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
