'use client'

import { useState } from 'react'
import { clearCart } from '@/services/cart-service'
import toast from 'react-hot-toast'

import LoadingButton from '@/components/loading-button'

type PlaceOrderBtnProps = {
  total: number
  cartId: string
}

export default function PlaceOrderBtn({ total, cartId }: PlaceOrderBtnProps) {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  async function handlePlaceOrder() {
    try {
      setIsPlacingOrder(true)
      await clearCart(cartId)
      toast.success('Order placed successfully!')
    } catch {
      toast.success('Failed to place order')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  return (
    <LoadingButton
      onClick={handlePlaceOrder}
      text='Place Order'
      size='lg'
      className='mt-6 w-full'
      disabled={total === 0}
      loading={isPlacingOrder}
      variant='secondary'
    />
  )
}
