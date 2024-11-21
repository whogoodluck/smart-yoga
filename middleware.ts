import { NextRequest, NextResponse } from 'next/server'
import { Role } from '@prisma/client'
import { getToken, JWT } from 'next-auth/jwt'

import { User } from './types/user-type'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const url = req.nextUrl.clone()

  if (
    req.nextUrl.pathname === '/signin' ||
    req.nextUrl.pathname === '/signup'
  ) {
    if (token) {
      url.pathname = '/products'
      return NextResponse.redirect(url)
    }
  } else if (req.nextUrl.pathname.includes('/admin')) {
    if (!token || ((token as JWT).user as User).role !== Role.ADMIN) {
      url.pathname = '/products'
      return NextResponse.redirect(url)
    }
  } else if (!token && req.nextUrl.pathname === '/cart') {
    url.pathname = '/signin'
    url.searchParams.set('callbackUrl', req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cart', '/signin', '/signup', '/dashboard/admin']
}
