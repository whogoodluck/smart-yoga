'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { removeCartItem, updateCartItem } from '@/services/cart-service'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { Cart } from '@/types/cart-type'
import { Product } from '@/types/product-type'
import LoadingButton from '@/components/loading-button'

type ProductQuantityProps = {
  product: Product
  cart: Cart | null
}

export default function ProductQuantity({
  product,
  cart
}: ProductQuantityProps) {
  const { status } = useSession()
  const router = useRouter()

  const [isUpdatingCart, setIsUpdatingCart] = useState(false)

  const productInCart = cart?.items.find(item => item.product.id === product.id)
  const quantity = productInCart?.quantity || 0

  async function handleIncreaseQty() {
    setIsUpdatingCart(true)
    if (status === 'unauthenticated') {
      handleUnauthenticated()
    }

    if (!productInCart) return

    await updateCartItem(productInCart.id, {
      quantity: productInCart.quantity + 1
    })
    setIsUpdatingCart(false)
  }

  async function handleDecreaseQty() {
    setIsUpdatingCart(true)
    if (status === 'unauthenticated') {
      handleUnauthenticated()
    }
    if (!productInCart) return
    await updateCartItem(productInCart.id, {
      quantity: productInCart.quantity - 1
    })
    setIsUpdatingCart(false)
  }

  async function handleRemoveFromCart() {
    setIsUpdatingCart(true)
    if (!productInCart) return
    await removeCartItem(productInCart.id)
    toast.success(`${product.name} removed from the cart`)
    setIsUpdatingCart(false)
  }

  function handleUnauthenticated() {
    router.push(
      `/signin?callbackUrl=${encodeURIComponent(window.location.href)}`
    )
    return
  }

  return (
    <div className='flex items-center gap-2'>
      <LoadingButton
        size='sm'
        onClick={handleDecreaseQty}
        disabled={
          quantity <= 1 || status === 'unauthenticated' || isUpdatingCart
        }
        className='h-10 w-10'
        text={<MinusIcon />}
      />
      <p className='w-8 text-center'>{quantity}</p>
      <LoadingButton
        size='sm'
        onClick={handleIncreaseQty}
        disabled={
          status === 'unauthenticated' || isUpdatingCart || quantity === 0
        }
        className='h-10 w-10'
        text={<PlusIcon />}
      />
      {quantity > 0 && (
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
