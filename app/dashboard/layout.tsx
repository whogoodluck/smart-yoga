import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)

  if (session?.user.role !== Role.ADMIN) redirect('/products')
  return <section className='container mx-auto w-[90%]'>{children}</section>
}
