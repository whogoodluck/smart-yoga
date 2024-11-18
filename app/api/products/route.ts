import { NextRequest, NextResponse } from 'next/server'
import { selectGetProducts } from '@/services/select'

import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const take = searchParams.get('take')

    const products = await prisma.product.findMany({
      take: take ? parseInt(take) : undefined,
      select: selectGetProducts
    })
    return NextResponse.json(products)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
