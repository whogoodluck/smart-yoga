'use client'

import { useState } from 'react'
import { createProduct, updateProduct } from '@/services/product-service'
import {
  AdminProductForm,
  adminProductFormSchema
} from '@/validators/admin-products-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Product } from '@/types/product-type'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import LoadingButton from '@/components/loading-button'

import AdminProductItem from './admin-product-item'

type ManageAdminProductsProps = {
  products: Product[]
}

export default function ManageAdminProducts({
  products
}: ManageAdminProductsProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AdminProductForm>({
    resolver: zodResolver(adminProductFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      image: ''
    }
  })

  async function onSubmit(data: AdminProductForm) {
    setIsSubmitting(true)
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data)
        toast.success(`${data.name} updated!`)
      } else {
        await createProduct(data)
        toast.success(`${data.name} added!`)
      }
      form.reset()
    } catch {
      toast.error(`Failed to add/update ${data.name}`)
    } finally {
      setEditingProduct(null)
      setIsSubmitting(false)
    }
  }

  function handleEdit(product: Product) {
    window.scrollTo(0, 0)
    form.reset({ ...product, price: product.price.toString() })
    setEditingProduct(product)
  }

  return (
    <div className='max-w-2xl py-8'>
      <h1 className='text-3xl font-bold text-black'>Manage Products</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-8 w-full space-y-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter product description'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product price' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder='Enter image URL' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-4 text-center'>
            <LoadingButton
              type='submit'
              loading={isSubmitting}
              text={editingProduct ? 'Update Product' : 'Add Product'}
              className='w-1/2'
            />
          </div>
        </form>
      </Form>

      <h2 className='mt-16 text-2xl font-bold'>Products</h2>

      <ul className='mt-6 space-y-4'>
        {products.map(product => (
          <AdminProductItem
            key={product.id}
            product={product}
            onEdit={() => handleEdit(product)}
          />
        ))}
      </ul>
    </div>
  )
}
