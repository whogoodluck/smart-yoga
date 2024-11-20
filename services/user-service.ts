'use server'

import { RegisterForm } from '@/validators/auth-schema'

import prisma from '@/lib/prisma'

export async function createUser(user: RegisterForm) {
  const isExisting = await prisma.user.findFirst({
    where: { email: user.email }
  })
  if (isExisting) throw new Error('User already exists')

  return await prisma.user.create({
    data: user
  })
}
