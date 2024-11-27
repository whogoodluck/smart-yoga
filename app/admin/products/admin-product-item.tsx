import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { deleteProduct } from '@/services/product-service'
import toast from 'react-hot-toast'

import { Product } from '@/types/product-type'
import { Button } from '@/components/ui/button'

type AdminProductItemProps = {
  product: Product
  onEdit: () => void
}

export default function AdminProductItem({
  product,
  onEdit
}: AdminProductItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete(id: string, name: string) {
    try {
      setIsDeleting(true)
      await deleteProduct(id)
      toast.success(`${name} deleted!`)
    } catch {
      toast.error(`Failed to delete ${name}`)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <li className='flex flex-col gap-4 border-b py-8 lg:flex-row lg:items-center'>
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image}
          width={128}
          height={128}
          alt={product.name}
          className='h-32 rounded-xl object-cover'
          priority
        />
      </Link>
      <div>
        <Link
          href={`/products/${product.id}`}
          className='text-lg font-medium underline-offset-4 hover:underline'
        >
          {product.name}
        </Link>
        <p className='mt-1 text-sm text-muted-foreground'>
          {product.description}
        </p>
        <p className='mt-4 text-sm font-semibold'>₹{product.price / 100}</p>
      </div>
      <div className='flex space-x-2 lg:ml-auto'>
        <Button variant='secondary' onClick={onEdit}>
          Edit
        </Button>
        <Button
          variant='destructive'
          onClick={() => handleDelete(product.id, product.name)}
          disabled={isDeleting}
        >
          Delete
        </Button>
      </div>
    </li>
  )
}
