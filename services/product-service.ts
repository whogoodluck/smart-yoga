'use server'

import fetcher from '@/lib/fetcher'

export async function getProducts() {
  return await fetcher('/api/products')
}

export async function getFourProducts() {
  return await fetcher('/api/products?take=4')
}

export async function getProductDetails(productId: string) {
  return await fetcher(`/api/products/${productId}`)
}
