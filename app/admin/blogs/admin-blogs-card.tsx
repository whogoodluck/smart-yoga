import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { deleteBlog } from '@/services/blog-service'

import { Blog } from '@/types/blog-type'
import { Button } from '@/components/ui/button'

function AdminBlogCard({ blog, onEdit }: { blog: Blog; onEdit: () => void }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async (blogId: string) => {
    try {
      setIsDeleting(true)
      await deleteBlog(blogId)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <li className='flex w-full flex-col gap-4 border-b py-8 lg:flex-row lg:items-center'>
      <Link href={`/blogs/${blog.id}`}>
        <Image
          src={blog.image!}
          width={128}
          height={128}
          alt={blog.title || 'blog-img'}
          className='h-32 w-40 rounded-xl object-cover'
          priority
        />
      </Link>
      <div className='lg:w-2/3'>
        <Link
          href={`/blogs/${blog.id}`}
          className='text-lg font-medium underline-offset-4 hover:underline'
        >
          {blog.title}
        </Link>
        <p className='mt-1 text-sm text-muted-foreground'>{blog.content}</p>
      </div>
      <div className='flex space-x-2 lg:ml-auto'>
        <Button variant='secondary' onClick={onEdit}>
          Edit
        </Button>
        <Button
          variant='destructive'
          onClick={() => handleDelete(blog.id)}
          disabled={isDeleting}
        >
          Delete
        </Button>
      </div>
    </li>
  )
}

export default AdminBlogCard
