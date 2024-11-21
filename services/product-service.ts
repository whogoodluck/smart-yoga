'use server'

import { revalidatePath } from 'next/cache'
import { AdminProductForm } from '@/validators/admin-products-schema'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'

import {
  selectGetProductDetails,
  selectGetProducts
} from '@/types/product-type'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getProducts() {
  return await prisma.product.findMany({
    select: selectGetProducts,
    orderBy: { updatedAt: 'desc' }
  })
}

export async function getFourProducts() {
  return await prisma.product.findMany({
    take: 4,
    select: selectGetProducts,
    orderBy: { updatedAt: 'desc' }
  })
}

export async function getProductDetails(productId: string) {
  return await prisma.product.findUnique({
    where: { id: productId },
    select: selectGetProductDetails
  })
}

export async function deleteProduct(productId: string) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== Role.ADMIN) {
    throw new Error('Unauthorized')
  }

  await prisma.product.delete({
    where: { id: productId }
  })

  revalidatePath('/', 'layout')
}

export async function createProduct(product: AdminProductForm) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== Role.ADMIN) {
    throw new Error('Unauthorized')
  }

  const createdProduct = await prisma.product.create({
    data: { ...product, price: parseInt(product.price) }
  })

  revalidatePath('/', 'layout')
  return createdProduct
}

export async function updateProduct(
  productId: string,
  product: AdminProductForm
) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== Role.ADMIN) {
    throw new Error('Unauthorized')
  }

  const createdProduct = await prisma.product.update({
    where: { id: productId },
    data: { ...product, price: parseInt(product.price) }
  })

  revalidatePath('/', 'layout')
  return createdProduct
}

export async function getMonthlyProductCount() {
  const data = await prisma.product.groupBy({
    by: ['createdAt'],
    _count: {
      id: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  return data.map(item => ({
    month: item.createdAt.toLocaleString('default', { month: 'short' }),
    count: item._count.id
  }))
}

export async function getTopSellingProducts() {
  const data = await prisma.cartItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5
  })

  return data.map(item => ({
    productId: item.productId,
    quantity: item._sum.quantity
  }))
}

export async function getTotalProducts() {
  const count = await prisma.product.count()
  return count
}
