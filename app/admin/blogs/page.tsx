import { getBlogs } from '@/services/blog-service'

import ManageAdminBlogs from './manage-admin-blogs'

export default async function AdminBlogsPage() {
  const blogs = await getBlogs()

  return <ManageAdminBlogs blogs={blogs} />
}
