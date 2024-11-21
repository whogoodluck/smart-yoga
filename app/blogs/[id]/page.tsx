import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogDetails } from '@/services/blog-service'

import BlogTags from '@/components/blogs/blog-tags'

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const id = (await params).id

  const blog = await getBlogDetails(id)
  return {
    title: blog?.title || 'Blog'
  }
}

type BlogDetailsPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function BlogDetailsPage({
  params
}: BlogDetailsPageProps) {
  const { id } = await params
  const blog = await getBlogDetails(id)
  if (!blog) return notFound()

  return (
    <div className='container mx-auto w-[90%] py-12 lg:py-20'>
      <h1 className='text-3xl font-bold text-black'>{blog.title}</h1>

      {blog.image && (
        <div className='mt-6 h-96 w-full'>
          <Image
            src={blog.image}
            alt={blog.title}
            width={500}
            height={500}
            className='h-full w-full rounded-lg bg-white object-cover shadow-sm'
          />
        </div>
      )}

      <div className='mt-8 flex items-center justify-between text-sm text-foreground/90'>
        <div className='space-y-2'>
          <p>
            Written by{' '}
            <span className='font-semibold'>
              {blog.author.firstName} {blog.author.lastName}
            </span>
          </p>
          <p>Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <article className='prose lg:prose-xl mt-8 max-w-none text-gray-800'>
        {blog.content}
      </article>

      <div className='mt-12'>
        <h3 className='mb-3 text-lg font-semibold'>Tags</h3>
        <BlogTags tags={blog.tags} />
      </div>

      <div className='mt-12'>
        <Link
          href='/blogs'
          className='font-medium text-primary underline-offset-4 hover:underline'
        >
          &larr; Back to Blogs
        </Link>
      </div>
    </div>
  )
}
