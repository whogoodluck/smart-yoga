import { Prisma } from '@prisma/client'

export const selectGetProducts = {
  id: true,
  name: true,
  description: true,
  price: true,
  image: true
}

export type Product = Prisma.ProductGetPayload<{
  select: typeof selectGetProducts
}>

export const selectGetProductDetails = {
  id: true,
  name: true,
  description: true,
  price: true,
  image: true,
  category: true,
  material: true,
  dimensions: true,
  weight: true,
  brand: true,
  rating: true
}

export type ProductDetails = Prisma.ProductGetPayload<{
  select: typeof selectGetProductDetails
}>
