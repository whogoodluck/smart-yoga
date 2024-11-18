import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductDetails } from '@/services/product-service'
import { MinusIcon, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Product'
}

type ProductDetailsPageProps = {
  params: {
    id: string
  }
}

export default async function ProductDetailsPage({
  params
}: ProductDetailsPageProps) {
  const product = await getProductDetails((await params).id)

  if (!product) return notFound()

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

          <div className='mt-8'>
            <h2 className='text-xl font-bold text-black'>Quantity</h2>
            <div className='mt-2 flex items-center gap-2'>
              <Button
                size='sm'
                className='h-10 w-10'
                // disabled={quantity <= 0 || isCombo}
                // onClick={handleDecreaseQuantity}
              >
                <MinusIcon />
              </Button>
              <p className='w-8 text-center'>2</p>
              <Button size='sm' className='h-10 w-10'>
                <PlusIcon />
              </Button>
            </div>
          </div>

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

          <Button
            variant='secondary'
            size='lg'
            className='mt-7 w-full lg:w-1/2'
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
