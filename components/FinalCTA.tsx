import BookingWidget from './BookingWidget'

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-stone-50 blueprint-grid" id="demo">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-amber-700">Limited onboarding spots available each month</span>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-medium text-stone-900 mb-6 text-balance leading-[1.05]">
            Stop losing real estate leads to slow follow-up.
          </h2>
          <p className="text-stone-500 text-lg mb-0 max-w-lg mx-auto leading-relaxed">
            Pick a time below — we&apos;ll show you the full flow live. 20 minutes, no hard sell.
          </p>
        </div>

        <BookingWidget />

        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-stone-400 flex-wrap">
          <span>20-minute call</span>
          <span>·</span>
          <span>No long-term contract to start</span>
          <span>·</span>
          <span>Setup in 48 hours</span>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/calculator"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            Calculate your revenue leak first
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
