import { Prisma } from '@prisma/client'

export const selectGetCart = {
  id: true,
  items: {
    select: {
      id: true,
      product: true,
      quantity: true
    }
  },
  createdAt: true
}

export type Cart = Prisma.CartGetPayload<{
  select: typeof selectGetCart
}>
