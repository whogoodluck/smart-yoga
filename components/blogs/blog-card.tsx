import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { Blog } from '@/types/blog-type'
import yogaBanner from '@/public/images/yoga-banner.jpg'

import BlogTags from './blog-tags'

type BlogCardProps = {
  blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString()

  return (
    <Link
      href={`/blogs/${blog.id}`}
      className='rounded-lg bg-white hover:shadow'
    >
      <div className='relative h-60 w-full overflow-hidden rounded-t-lg'>
        <Image
          src={blog.image || yogaBanner}
          alt={blog.title}
          fill
          className='object-cover'
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='p-6'>
        <h2 className='line-clamp-2 text-xl font-semibold underline-offset-4 hover:underline'>
          {blog.title}
        </h2>
        <p className='mb-4 mt-2 text-sm font-medium text-foreground/70'>
          By {blog.author.firstName} {blog.author.lastName} • {formattedDate}
        </p>
        <BlogTags tags={blog.tags} />
        <div className='mt-5 line-clamp-3 text-sm'>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>
    </Link>
  )
}
