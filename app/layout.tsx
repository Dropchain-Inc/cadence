import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cadence — AI Voice Follow-Up for Real Estate',
  description: 'Call every real estate lead back in under 2 minutes. Cadence is the managed AI voice ISA that qualifies online leads and books appointments 24/7.',
  openGraph: {
    title: 'Cadence — AI Voice Follow-Up for Real Estate',
    description: 'Recover the deals your follow-up system is losing.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full antialiased bg-stone-50 text-stone-900">
        {children}
      </body>
    </html>
  )
}
