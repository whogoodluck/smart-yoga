import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCart } from '@/services/cart-service'
import { getProductDetails } from '@/services/product-service'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import AddToCartBtn from './add-to-cart-btn'
import ProductQuantity from './product-quantity'

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const id = (await params).id

  const product = await getProductDetails(id)
  return {
    title: product?.name || 'Product'
  }
}

type ProductDetailsPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductDetailsPage({
  params
}: ProductDetailsPageProps) {
  const { id } = await params
  const product = await getProductDetails(id)
  if (!product) return notFound()

  const session = await getServerSession(authOptions)
  let cart = null
  if (session) {
    cart = await getCart()
  }

  const cartItem = cart?.items.find(item => item.product.id === product.id)

  return (
    <div className='container mx-auto w-[90%] py-12 lg:py-20'>
      <div className='flex flex-col gap-12 lg:flex-row'>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          priority
          className='max-h-screen w-full rounded-lg object-cover lg:w-1/2'
        />

        <div>
          <h1 className='text-3xl font-bold text-black'>{product.name}</h1>
          <p className='mt-3'>{product.description}</p>
          <p className='mt-6 text-2xl font-semibold'>₹{product.price / 100}</p>

          {!!cartItem && (
            <div className='mt-8'>
              <h2 className='mb-2 text-xl font-bold text-black'>Quantity</h2>
              <ProductQuantity cartItem={cartItem} />
            </div>
          )}

          <div className='mt-6 space-y-2'>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Material:</strong> {product.material}
            </p>
            <p>
              <strong>Dimensions:</strong> {product.dimensions}
            </p>
            <p>
              <strong>Weight:</strong> {product.weight}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Rating:</strong> {product.rating} ⭐
            </p>
          </div>
          <AddToCartBtn product={product} cart={cart} />
        </div>
      </div>
    </div>
  )
}
