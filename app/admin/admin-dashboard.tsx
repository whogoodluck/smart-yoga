'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

type AnalyticsProps = {
  productData: { month: string; count: number }[]
  blogData: { month: string; count: number }[]
  userData: { month: string; count: number }[]
  topProducts: { productId: string; quantity: number | null }[]
  blogTags: { tag: string; count: number }[]
  cartActivity: { month: string; count: number }[]
  totalProducts: number
  totalBlogs: number
  totalUsers: number
}

export default function EnhancedAnalytics({
  productData,
  blogData,
  userData,
  topProducts,
  blogTags,
  cartActivity,
  totalProducts = 100,
  totalBlogs = 100,
  totalUsers = 100
}: AnalyticsProps) {
  return (
    <div>
      <div className='my-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <div className='space-y-2 rounded-lg bg-white p-8'>
          <h3 className='text-lg font-semibold'>Total Products</h3>
          <p className='text-2xl font-bold'>{totalProducts}</p>
        </div>
        <div className='space-y-2 rounded-lg bg-white p-8'>
          <h3 className='text-lg font-semibold'>Total Blog Articles</h3>
          <p className='text-2xl font-bold'>{totalBlogs}</p>
        </div>
        <div className='space-y-2 rounded-lg bg-white p-8'>
          <h3 className='text-lg font-semibold'>Total Users</h3>
          <p className='text-2xl font-bold'>{totalUsers}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-24 lg:grid-cols-2 xl:grid-cols-3'>
        <div className='h-96 w-full'>
          <h2 className='mb-4 text-xl font-semibold'>Product Growth</h2>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={productData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='count' stroke='#8884d8' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='h-96 w-full'>
          <h2 className='mb-4 text-xl font-semibold'>Blog Growth</h2>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={blogData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='count' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='h-96 w-full'>
          <h2 className='mb-4 text-xl font-semibold'>User Registrations</h2>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='count' stroke='#ff7300' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='h-96 w-full'>
          <h2 className='mb-4 text-xl font-semibold'>Top Selling Products</h2>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='product' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='quantity' fill='#8884d8' />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='h-96 w-full'>
          <h2 className='mb-4 text-xl font-semibold'>Blog Tags Distribution</h2>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={blogTags}
                dataKey='count'
                nameKey='tag'
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#3984d8'
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='h-96 w-full'>
          <h2 className='mb-4 text-xl font-semibold'>Cart Activity</h2>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={cartActivity}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='count' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
