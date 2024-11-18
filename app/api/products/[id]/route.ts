import { NextRequest, NextResponse } from 'next/server'
import { selectGetProductDetails } from '@/services/select'

import prisma from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: (await params).id },
      select: selectGetProductDetails
    })
    return NextResponse.json(product)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
