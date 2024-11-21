import {
  getBlogTagsDistribution,
  getMonthlyBlogCount,
  getTotalBlogs
} from '@/services/blog-service'
import { getCartActivity } from '@/services/cart-service'
import {
  getMonthlyProductCount,
  getTopSellingProducts,
  getTotalProducts
} from '@/services/product-service'
import {
  getTotalUsers,
  getUserRegistrationCount
} from '@/services/user-service'

import AdminDashboard from './admin-dashboard'

export default async function AdminPage() {
  const [totalProducts, totalBlogs, totalUsers] = await Promise.all([
    getTotalProducts(),
    getTotalBlogs(),
    getTotalUsers()
  ])

  const [productData, blogData, userData, topProducts, blogTags, cartActivity] =
    await Promise.all([
      getMonthlyProductCount(),
      getMonthlyBlogCount(),
      getUserRegistrationCount(),
      getTopSellingProducts(),
      getBlogTagsDistribution(),
      getCartActivity()
    ])

  return (
    <div className='w-full py-8'>
      <h1 className='text-3xl font-bold text-black'>Analytics</h1>
      <AdminDashboard
        productData={productData}
        blogData={blogData}
        userData={userData}
        topProducts={topProducts}
        blogTags={blogTags}
        cartActivity={cartActivity}
        totalProducts={totalProducts}
        totalBlogs={totalBlogs}
        totalUsers={totalUsers}
      />
    </div>
  )
}
