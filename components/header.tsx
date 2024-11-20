'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBagIcon } from '@heroicons/react/16/solid'
import { LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import appLogo from '@/public/images/app-logo.png'

import { Button, buttonVariants } from './ui/button'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className='h-24'>
      <div className='container mx-auto flex h-full w-[90%] items-center justify-between'>
        <Link href='/'>
          <Image src={appLogo} alt='App Logo' width={50} priority />
        </Link>

        <nav className='flex items-center gap-4'>
          <Link
            href='/products'
            className='underline-offset-4 hover:text-primary hover:underline'
          >
            Products
          </Link>
          <Link
            href='/blogs'
            className='underline-offset-4 hover:text-primary hover:underline'
          >
            Blogs
          </Link>
          {session ? (
            <>
              <Link href='/cart'>
                <ShoppingBagIcon className='h-6 w-6 hover:text-primary' />
              </Link>
              <Button onClick={() => signOut()} variant='destructive'>
                <LogOutIcon />
              </Button>
            </>
          ) : (
            <Link href='/signin' className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
