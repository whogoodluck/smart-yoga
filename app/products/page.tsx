import { Metadata } from 'next'
import { getProducts } from '@/services/product-service'

import ProductCard from '@/components/product-card'

export const metadata: Metadata = {
  title: 'Products'
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className='container mx-auto w-[90%] py-12'>
      <h1 className='text-center text-3xl font-bold text-black'>
        Our Smart Yoga Products
      </h1>

      <div className='mt-12 grid gap-8 md:grid-cols-3 lg:grid-cols-4'>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
