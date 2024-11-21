import { Prisma } from '@prisma/client'

const selectBlogAuthor = {
  id: true,
  firstName: true,
  lastName: true
}

export const selectGetBlogs = {
  id: true,
  title: true,
  content: true,
  image: true,
  author: {
    select: selectBlogAuthor
  },
  tags: true,
  createdAt: true
}

export type Blog = Prisma.BlogGetPayload<{
  select: typeof selectGetBlogs
}>
