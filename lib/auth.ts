import { NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from './prisma'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null
          const response = await prisma.user.findFirst({
            where: { email: credentials.email, password: credentials.password }
          })
          if (!response) return null
          const { password: _, ...user } = response
          return user
        } catch {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as Session['user']
      return session
    },
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    }
  }
}
