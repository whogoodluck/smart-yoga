import { Prisma } from '@prisma/client'

export const selectGetBlogs = {
  id: true,
  title: true,
  content: true,
  image: true,
  author: true,
  tags: true,
  createdAt: true
}

export type Blog = Prisma.BlogGetPayload<{
  select: typeof selectGetBlogs
}>
