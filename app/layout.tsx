import type { Metadata } from 'next'

import { poppins } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Smart Yoga',
    default: 'Home | Smart Yoga'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body
        suppressHydrationWarning
        className={cn(poppins.variable, 'font-sans antialiased')}
      >
        <main>{children}</main>
      </body>
    </html>
  )
}
