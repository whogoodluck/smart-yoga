import type { Metadata } from 'next'

import { poppins } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import './globals.css'

import { PropsWithChildren } from 'react'
import { getServerSession } from 'next-auth'
import { Toaster } from 'react-hot-toast'

import { authOptions } from '@/lib/auth'
import AuthProvider from '@/contexts/auth-provider'
import Header from '@/components/header'

export const metadata: Metadata = {
  title: {
    template: '%s | Smart Yoga',
    default: 'Home | Smart Yoga'
  }
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)

  return (
    <html suppressHydrationWarning lang='en'>
      <body
        suppressHydrationWarning
        className={cn(poppins.variable, 'font-sans antialiased')}
      >
        <AuthProvider session={session}>
          <Header />
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
