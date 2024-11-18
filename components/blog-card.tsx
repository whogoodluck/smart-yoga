import Image from 'next/image'
import Link from 'next/link'

import { Blog } from '@/types/blog-type'
import yogaBanner from '@/public/images/yoga-banner.jpg'

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
        <p className='mt-2 text-sm font-medium text-foreground/70'>
          By {blog.author} • {formattedDate}
        </p>
        <div className='mt-4 flex flex-wrap gap-2'>
          {blog.tags.map(tag => (
            <div key={tag} className='rounded-full bg-secondary px-3 py-1'>
              <p className='text-xs font-semibold'>{tag}</p>
            </div>
          ))}
        </div>
        <p className='mt-5 line-clamp-3 text-sm'>{blog.content}</p>
      </div>
    </Link>
  )
}
