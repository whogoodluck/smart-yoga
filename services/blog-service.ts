'use server'

import { selectGetBlogs } from '@/types/blog-type'
import prisma from '@/lib/prisma'

export async function getBlogs() {
  return await prisma.blog.findMany({
    select: selectGetBlogs,
    orderBy: { createdAt: 'desc' }
  })
}
