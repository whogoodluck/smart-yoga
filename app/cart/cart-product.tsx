import Image from 'next/image'
import Link from 'next/link'

import { CartItem } from '@/types/cart-type'
import ProductQuantity from '@/components/products/product-quantity'
import yogaBanner from '@/public/images/yoga-banner.jpg'

type CartProductProps = {
  cartItem: CartItem
}

export default function CartProduct({ cartItem }: CartProductProps) {
  return (
    <section className='flex flex-col items-start justify-between gap-8 border-t p-4 lg:flex-row lg:items-center'>
      <div className='flex items-center justify-between gap-4 lg:justify-center'>
        <Link href={`/products/${cartItem.product.id}`}>
          <Image
            src={cartItem.product.image || yogaBanner}
            alt={cartItem.product.name}
            width={96}
            height={96}
            className='h-24 w-24 rounded-lg object-cover'
            priority
          />
        </Link>
        <div>
          <Link
            className='font-semibold underline-offset-4 hover:underline'
            href={`/products/${cartItem.product.id}`}
          >
            {cartItem.product.name}
          </Link>
          <p className='mt-3 text-lg font-medium'>₹{cartItem.product.price}</p>
        </div>
      </div>

      <ProductQuantity cartItem={cartItem} />
    </section>
  )
}
