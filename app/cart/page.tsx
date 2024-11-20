import { Metadata } from 'next'
import { getCart } from '@/services/cart-service'

import CartEmpty from './cart-empty'
import CartItem from './cart-item'
import PlaceOrderBtn from './place-order-btn'

export const metadata: Metadata = {
  title: 'Cart'
}

export default async function CartPage() {
  const cart = await getCart()

  if (!cart?.items.length) return <CartEmpty />

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const discountPercent = 10
  const discount = (subtotal * discountPercent) / 100
  const total = subtotal - discount

  return (
    <div className='container mx-auto w-[90%] py-12'>
      <h1 className='text-center text-3xl font-bold text-black'>
        Shopping Cart
      </h1>

      <div className='flex w-full flex-1 justify-center gap-12'>
        <div className='mt-12 flex max-w-3xl flex-1 flex-col'>
          {cart.items.map(item => (
            <CartItem key={item.id} product={item.product} cart={cart} />
          ))}
        </div>

        <div className='mt-8 min-w-64 max-w-2xl'>
          <div className='mt-8 flex w-full justify-between'>
            <h3 className='font-bold'>Subtotal</h3>
            <p className='text-lg font-medium'>{subtotal}</p>
          </div>

          <div className='mt-8 flex justify-between'>
            <h3 className='font-bold'>Total</h3>
            <p className='text-lg font-medium'>{total}</p>
          </div>

          <PlaceOrderBtn total={total} cartId={cart.id} />
        </div>
      </div>
    </div>
  )
}
