import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProducts } from '@/services/product-service'

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
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className='rounded-lg bg-white'
          >
            <div className='relative h-60 w-full overflow-hidden rounded-t-lg'>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className='object-cover'
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
            <div className='p-6'>
              <h2 className='text-xl font-semibold'>{product.name}</h2>
              <p className='text-foreground/90 mt-2 text-sm'>
                {product.description}
              </p>
              <p className='mt-3 text-lg font-semibold'>Rs. {product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
