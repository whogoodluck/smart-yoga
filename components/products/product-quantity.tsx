'use client'

import { useState } from 'react'
import { removeCartItem, updateCartItem } from '@/services/cart-service'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { CartItem } from '@/types/cart-type'
import LoadingButton from '@/components/loading-button'

type ProductQuantityProps = {
  cartItem: CartItem
}

export default function ProductQuantity({ cartItem }: ProductQuantityProps) {
  const { status } = useSession()
  const [isUpdatingCart, setIsUpdatingCart] = useState(false)

  async function handleIncreaseQty() {
    try {
      setIsUpdatingCart(true)
      await updateCartItem(cartItem.id, {
        quantity: cartItem.quantity + 1
      })
    } catch {
      toast.error('Failed to update quantity')
    } finally {
      setIsUpdatingCart(false)
    }
  }

  async function handleDecreaseQty() {
    setIsUpdatingCart(true)
    if (cartItem.quantity === 1) handleRemoveFromCart()
    await updateCartItem(cartItem.id, {
      quantity: cartItem.quantity - 1
    })
    setIsUpdatingCart(false)
  }

  async function handleRemoveFromCart() {
    if (!cartItem) return

    try {
      setIsUpdatingCart(true)
      await removeCartItem(cartItem.id)
      toast.success(`${cartItem.product.name} removed from the cart`)
    } catch {
      toast.success('Failed to remove from the cart')
    } finally {
      setIsUpdatingCart(false)
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <LoadingButton
        size='sm'
        onClick={handleDecreaseQty}
        disabled={
          cartItem.quantity <= 0 ||
          status === 'unauthenticated' ||
          isUpdatingCart
        }
        className='h-10 w-10'
        text={<MinusIcon />}
      />
      <p className='w-8 text-center'>{cartItem.quantity}</p>
      <LoadingButton
        size='sm'
        onClick={handleIncreaseQty}
        disabled={
          status === 'unauthenticated' ||
          isUpdatingCart ||
          cartItem.quantity === 0
        }
        className='h-10 w-10'
        text={<PlusIcon />}
      />
      {cartItem.quantity > 0 && (
        <LoadingButton
          size='sm'
          onClick={handleRemoveFromCart}
          disabled={status === 'unauthenticated' || isUpdatingCart}
          className='h-10 w-10'
          variant='ghost'
          text={<Trash2Icon className='text-destructive' />}
        />
      )}
    </div>
  )
}
