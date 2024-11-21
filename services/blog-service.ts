'use server'

import { revalidatePath } from 'next/cache'
import { AdminBlogForm } from '@/validators/admin-blogs-schema'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'

import { selectGetBlogDetails, selectGetBlogs } from '@/types/blog-type'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getBlogs() {
  return await prisma.blog.findMany({
    select: selectGetBlogs,
    orderBy: { updatedAt: 'desc' }
  })
}

export async function getFourBlogs() {
  return await prisma.blog.findMany({
    take: 4,
    select: selectGetBlogs,
    orderBy: { updatedAt: 'desc' }
  })
}

export async function createBlog(blog: AdminBlogForm) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== Role.ADMIN) {
    throw new Error('Unauthorized')
  }

  const createdBlog = await prisma.blog.create({
    data: { ...blog, authorId: session.user.id }
  })

  revalidatePath('/', 'layout')
  return createdBlog
}

export async function getBlogDetails(blogId: string) {
  return await prisma.blog.findUnique({
    where: { id: blogId },
    select: selectGetBlogDetails
  })
}

export async function getMonthlyBlogCount() {
  const data = await prisma.blog.groupBy({
    by: ['createdAt'],
    _count: {
      id: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  return data.map(item => ({
    month: item.createdAt.toLocaleString('default', { month: 'short' }),
    count: item._count.id
  }))
}
export async function getBlogTagsDistribution() {
  const blogs = await prisma.blog.findMany({ select: { tags: true } })
  const tagCounts: Record<string, number> = {}

  blogs.forEach(blog => {
    blog.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  return Object.entries(tagCounts).map(([tag, count]) => ({
    tag,
    count
  }))
}

export async function getTotalBlogs() {
  const count = await prisma.blog.count()
  return count
}
