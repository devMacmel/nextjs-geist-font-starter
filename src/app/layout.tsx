import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Video Game Event Ticket Generator',
  description: 'Generate your personalized video game event tickets with unique serial numbers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
