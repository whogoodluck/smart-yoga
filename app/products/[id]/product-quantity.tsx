'use client'

import { useState } from 'react'
import { MinusIcon, PlusIcon } from 'lucide-react'

import { Product } from '@/types/product-type'
import { Button } from '@/components/ui/button'

type ProductQuantityProps = {
  product: Product
}

export default function ProductQuantity({ product }: ProductQuantityProps) {
  const [qty, setQty] = useState(1)

  return (
    <div>
      <h1 className='text-3xl font-bold text-black'>{product.name}</h1>
      <p className='mt-3'>{product.description}</p>
      <p className='mt-6 text-2xl font-semibold'>₹{product.price / 100}</p>

      <div className='mt-8'>
        <h2 className='text-xl font-bold text-black'>Quantity</h2>
        <div className='mt-2 flex items-center gap-2'>
          <Button
            size='sm'
            onClick={() => setQty(qty - 1)}
            disabled={qty <= 1}
            className='h-10 w-10'
          >
            <MinusIcon />
          </Button>
          <p className='w-8 text-center'>{qty}</p>
          <Button
            size='sm'
            onClick={() => setQty(qty + 1)}
            className='h-10 w-10'
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
