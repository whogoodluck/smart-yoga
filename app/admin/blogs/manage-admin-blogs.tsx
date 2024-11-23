'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { createBlog, updateBlog } from '@/services/blog-service'
import {
  AdminBlogForm,
  adminBlogFormSchema
} from '@/validators/admin-blogs-schema'
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

import 'react-quill-new/dist/quill.snow.css'

import { Blog } from '@/types/blog-type'

import AdminBlogCard from './admin-blogs-card'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

export default function ManageAdminBlogs({ blogs }: { blogs: Blog[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)

  const form = useForm<AdminBlogForm>({
    resolver: zodResolver(adminBlogFormSchema),
    defaultValues: {
      title: '',
      content: '',
      image: ''
    }
  })

  function handleEdit(blog: Blog) {
    form.reset({
      title: blog.title,
      content: blog.content,
      image: blog.image || ''
    })
    setEditingBlog(blog)
  }

  async function onSubmit(data: AdminBlogForm) {
    try {
      setIsSubmitting(true)
      if (editingBlog) {
        await updateBlog(editingBlog.id, data)
        toast.success('Blog updated!')
      } else {
        await createBlog(data)
        toast.success('Blog created!')
      }
      form.reset()
    } catch {
      toast.error('Failed to create/update')
    } finally {
      setEditingBlog(null)
      setIsSubmitting(false)
    }
  }

  return (
    <div className='w-full max-w-2xl py-8'>
      <h1 className='text-3xl font-bold text-black'>Write a New Blog</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-8 w-full space-y-4'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Enter blog title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder='Enter image URL' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <ReactQuill
                    {...field}
                    className='h-[50rem] rounded-lg pb-12'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-8 text-center lg:pt-4'>
            <LoadingButton
              type='submit'
              loading={isSubmitting}
              text={editingBlog ? 'Update' : 'Publish'}
              className='w-1/2'
            />
          </div>
        </form>
      </Form>
      <div className='mt-6 flex flex-col gap-8'>
        {blogs.map(blog => (
          <AdminBlogCard
            key={blog.id}
            blog={blog}
            onEdit={() => handleEdit(blog)}
          />
        ))}
      </div>
    </div>
  )
}
