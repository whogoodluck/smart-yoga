import Image from 'next/image'
import Link from 'next/link'

import { CartItem } from '@/types/cart-type'
import yogaBanner from '@/public/images/yoga-banner.jpg'

import ProductQuantity from '../products/[id]/product-quantity'

type CartProductProps = {
  cartItem: CartItem
}

export default function CartProduct({ cartItem }: CartProductProps) {
  return (
    <section className='flex flex-col items-center justify-between gap-8 border-t p-4 lg:flex-row'>
      <div className='flex items-center justify-between gap-4 lg:justify-center'>
        <Image
          src={cartItem.product.image || yogaBanner}
          alt={cartItem.product.name}
          width={96}
          height={96}
          className='h-24 w-24 rounded-lg object-cover'
          priority
        />
        <div>
          <Link
            className='font-semibold underline-offset-4 hover:underline'
            href={`/products/${cartItem.product.id}`}
          >
            {cartItem.product.name}
          </Link>
          <p className='mt-3 text-lg font-medium'>
            ₹{cartItem.product.price}
          </p>
        </div>
      </div>

      <ProductQuantity cartItem={cartItem} />
    </section>
  )
}
