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
  metadataBase: new URL('https://cadence.example.com'),
  title: 'Cadence — AI Real Estate Lead Follow-Up Automation',
  description:
    'Cadence is AI real estate lead response that calls every online lead back in under 2 minutes. Automated lead follow-up that qualifies Zillow and online leads, books appointments 24/7, and logs every call to your CRM.',
  keywords: [
    'real estate lead follow-up automation',
    'AI real estate lead response',
    'real estate appointment setting software',
    'Zillow lead follow-up automation',
    'after-hours lead response for agents',
    'speed-to-lead for real estate',
    'AI caller for real estate leads',
    'lead qualification software for agents',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Cadence — AI Real Estate Lead Follow-Up Automation',
    description:
      'AI that calls real estate leads in under 2 minutes, qualifies online and Zillow leads, and books appointments 24/7 — with full CRM logging.',
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
