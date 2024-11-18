import Image from 'next/image'
import Link from 'next/link'

import appLogo from '@/public/images/app-logo.png'

export default function Header() {
  return (
    <header className='h-24'>
      <div className='container mx-auto flex h-full w-[90%] items-center justify-between'>
        <Link href='/'>
          <Image src={appLogo} alt='App Logo' width={50} priority />
        </Link>

        <nav className='flex items-center gap-4'>
          <Link href='/products' className='underline-offset-4 hover:underline'>
            Products
          </Link>
          <Link href='/blogs' className='underline-offset-4 hover:underline'>
            Blogs
          </Link>
        </nav>
      </div>
    </header>
  )
}
