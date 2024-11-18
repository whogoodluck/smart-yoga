'use server'

import {
  selectGetProductDetails,
  selectGetProducts
} from '@/types/product-type'
import prisma from '@/lib/prisma'

export async function getProducts() {
  return await prisma.product.findMany({
    select: selectGetProducts
  })
}

export async function getFourProducts() {
  return await prisma.product.findMany({
    take: 4,
    select: selectGetProducts
  })
}

export async function getProductDetails(productId: string) {
  return await prisma.product.findUnique({
    where: { id: productId },
    select: selectGetProductDetails
  })
}
