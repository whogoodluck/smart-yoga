'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileTextIcon, HomeIcon, PackageIcon, ShareIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Products', href: '/admin/products', icon: PackageIcon },
  { name: 'Blogs', href: '/admin/blogs', icon: FileTextIcon },
  { name: 'Social Media', href: '/admin/social-media', icon: ShareIcon }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className='h-full w-16 lg:w-48'>
      <nav className='mt-8 space-y-4'>
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center rounded-md px-4 py-2 font-medium transition',
              pathname === href
                ? 'bg-white text-black'
                : 'text-gray-600 hover:bg-gray-200 hover:text-black'
            )}
          >
            <Icon className='h-5 w-5' />
            <span className='ml-4 hidden lg:block'>{name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
