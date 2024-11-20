import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

export default function CartEmpty() {
  return (
    <section className='flex h-[calc(100vh-6rem)] flex-col items-center justify-center gap-4 py-12 lg:py-20'>
      <h2 className='text-center text-3xl font-semibold text-black'>
        Cart Empty
      </h2>
      <Link href='/products' className={buttonVariants()}>
        Shop More
      </Link>
    </section>
  )
}
