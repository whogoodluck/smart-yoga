'use server'

import { revalidatePath } from 'next/cache'
import { CartItem } from '@prisma/client'
import { getServerSession } from 'next-auth'

import { selectGetCart } from '@/types/cart-type'
import { Product } from '@/types/product-type'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getCart() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  return await prisma.cart.findFirst({
    select: selectGetCart,
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createCartItem(cartId: string, product: Product) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  const createdCartItem = await prisma.cartItem.create({
    data: {
      product: { connect: { id: product.id } },
      quantity: 1,
      price: product.price * 1,
      cart: {
        connect: { id: cartId }
      }
    }
  })

  revalidatePath('/', 'layout')
  return createdCartItem
}

export async function updateCartItem(
  cartItemId: string,
  data: Partial<CartItem>
) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  const updatedCartItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data
  })

  revalidatePath('/', 'layout')
  return updatedCartItem
}

export async function removeCartItem(cartItemId: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  await prisma.cartItem.delete({
    where: { id: cartItemId }
  })

  revalidatePath('/', 'layout')
}

export async function clearCart(cartId: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  await prisma.cartItem.deleteMany({
    where: { cartId }
  })

  revalidatePath('/', 'layout')
}
