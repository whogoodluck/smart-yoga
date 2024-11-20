import { Role } from '@prisma/client'

export type User = {
  id: string
  firstName: string | null
  lastName: string | null
  email: string
  role: Role
  emailVerified: Date | null
  image: string | null
  createdAt: Date
  updatedAt: Date
}
