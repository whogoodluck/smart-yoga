'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCartItem } from '@/services/cart-service'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { Cart } from '@/types/cart-type'
import { Product } from '@/types/product-type'
import LoadingButton from '@/components/loading-button'

type AddToCartBtnProps = {
  product: Product
  cart: Cart | null
}

export default function AddToCartBtn({ product, cart }: AddToCartBtnProps) {
  const { status } = useSession()
  const router = useRouter()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const isProductInCart = !!cart?.items.find(
    item => item.product.id === product.id
  )

  async function handleAdd() {
    setIsAddingToCart(true)
    if (status === 'unauthenticated') {
      router.push(
        `/signin?callbackUrl=${encodeURIComponent(window.location.href)}`
      )
      return
    }

    if (!cart) return

    if (!isProductInCart) {
      await createCartItem(cart.id, product)
      toast.success(`${product.name} added to the cart`)
    }

    router.push('/cart')
    setIsAddingToCart(false)
  }

  return (
    <LoadingButton
      variant='secondary'
      size='lg'
      className='mt-7 w-full lg:w-1/2'
      onClick={handleAdd}
      loading={isAddingToCart}
      text={isProductInCart ? 'Go to Cart' : 'Add to Cart'}
    />
  )
}
