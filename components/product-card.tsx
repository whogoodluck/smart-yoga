import Image from 'next/image'
import Link from 'next/link'
import { selectGetProducts } from '@/services/select'
import { Prisma } from '@prisma/client'

type ProductCardProps = {
  product: Prisma.ProductGetPayload<{ select: typeof selectGetProducts }>
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className='rounded-lg bg-white'>
      <div className='relative h-60 w-full overflow-hidden rounded-t-lg'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className='object-cover'
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='p-6'>
        <h2 className='text-xl font-semibold'>{product.name}</h2>
        <p className='mt-2 text-sm text-foreground/90'>{product.description}</p>
        <p className='mt-3 text-lg font-semibold'>Rs. {product.price}</p>
      </div>
    </Link>
  )
}
