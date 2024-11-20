import { Prisma } from '@prisma/client'

export const selectGetCartItem = {
  id: true,
  product: true,
  quantity: true
}

export const selectGetCart = {
  id: true,
  items: {
    select: selectGetCartItem
  },
  createdAt: true
}

export type Cart = Prisma.CartGetPayload<{
  select: typeof selectGetCart
}>

export type CartItem = Prisma.CartItemGetPayload<{
  select: typeof selectGetCartItem
}>
