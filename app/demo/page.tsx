import type { Metadata } from 'next'
import Header from '@/components/Header'
import BookingWidget from '@/components/BookingWidget'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Book a Demo — Cadence AI Real Estate Lead Follow-Up',
  description:
    'See Cadence answer a real lead, live. Pick a time that works — 20 minutes, no fluff.',
}

export default function DemoPage() {
  return (
    <main>
      <Header />
      <section className="min-h-screen pt-32 pb-24 px-6 bg-stone-50 blueprint-grid">
        <div className="max-w-2xl mx-auto">
          <div className="mb-3 text-xs font-semibold text-stone-400 uppercase tracking-[0.12em]">
            Free 20-Minute Demo
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-medium text-stone-900 mb-4 text-balance leading-[1.1]">
            See Cadence answer a real lead — live.
          </h1>
          <p className="text-stone-500 text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
            We walk through the full flow: lead comes in, Cadence calls, appointment booked.
            20 minutes, no hard sell.
          </p>

          <BookingWidget />

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-stone-400 flex-wrap">
            <span>No contract to start</span>
            <span>·</span>
            <span>Setup in 48 hours</span>
            <span>·</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
