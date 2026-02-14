import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LinkPe - One Link. Infinite Possibilities.',
  description: 'Create your personalized link-in-bio page in seconds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
