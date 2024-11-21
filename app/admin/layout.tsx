import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import Sidebar from './sidebar'

export const metadata: Metadata = {
  title: 'Admin'
}

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)
  if (session?.user.role !== Role.ADMIN) redirect('/products')

  return (
    <div className='container mx-auto flex w-[90%]'>
      <Sidebar />
      <section className='mx-auto py-8 pl-6'>{children}</section>
    </div>
  )
}
