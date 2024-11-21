import { Metadata } from 'next'
import { getBlogs } from '@/services/blog-service'

import BlogCard from '@/components/blogs/blog-card'

export const metadata: Metadata = {
  title: 'Blogs'
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <div className='container mx-auto w-[90%] py-12'>
      <h1 className='text-center text-3xl font-bold text-black'>
        Yoga Essentials
      </h1>

      <div className='mt-12 grid gap-8 md:grid-cols-3 lg:grid-cols-4'>
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}
