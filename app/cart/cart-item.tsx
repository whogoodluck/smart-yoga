import Image from 'next/image'
import Link from 'next/link'

import { Cart } from '@/types/cart-type'
import { Product } from '@/types/product-type'
import yogaBanner from '@/public/images/yoga-banner.jpg'

import ProductQuantity from '../products/[id]/product-quantity'

type CartItemProps = {
  product: Product
  cart: Cart
}

export default function CartItem({ product, cart }: CartItemProps) {
  return (
    <section className='flex items-center justify-between gap-8 border-t p-2'>
      <div className='flex items-center justify-center gap-4'>
        <Image
          src={product.image || yogaBanner}
          alt={product.name}
          width={96}
          height={96}
          className='h-24 w-24 rounded-lg object-cover'
          priority
        />
        <div>
          <Link className='font-semibold hover:underline underline-offset-4' href={`/products/${product.id}`}>
            {product.name}
          </Link>
          <p className='mt-3 text-lg font-medium'>₹{product.price}</p>
        </div>
      </div>

      <ProductQuantity product={product} cart={cart} />
    </section>
  )
}
