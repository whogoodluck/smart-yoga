'use client'

import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'

export default function AddToCartBtn({ name }: { name: string }) {
  return (
    <Button
      variant='secondary'
      size='lg'
      className='mt-7 w-full lg:w-1/2'
      onClick={() => toast.success(`${name} added to the cart`)}
    >
      Add to Cart
    </Button>
  )
}
