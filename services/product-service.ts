'use server'

import prisma from '@/lib/prisma'

export async function getProducts() {
  return await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true
    }
  })
}
