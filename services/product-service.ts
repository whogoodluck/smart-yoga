'use server'

import prisma from '@/lib/prisma'

import { selectGetProducts } from './select'

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
