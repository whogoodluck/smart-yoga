import { getProducts } from '@/services/product-service'

import ManageAdminProducts from './manage-admin-products'

export default async function AdminProductsPage() {
  const products = await getProducts()
  return <ManageAdminProducts products={products} />
}
