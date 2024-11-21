'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileTextIcon, HomeIcon, PackageIcon, ShareIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Products', href: '/admin/products', icon: PackageIcon },
  { name: 'Blogs', href: '/admin/blogs', icon: FileTextIcon },
  { name: 'Social Media', href: '/admin/social', icon: ShareIcon }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className='h-full w-12 lg:w-48'>
      <nav className='mt-8 space-y-4'>
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center justify-center rounded-full py-2 font-medium transition lg:justify-start lg:px-6',
              pathname === href
                ? 'bg-white text-black'
                : 'text-gray-600 hover:bg-gray-200 hover:text-black'
            )}
          >
            <Icon className='h-5 w-5' />
            <span className='hidden lg:ml-4 lg:block'>{name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
