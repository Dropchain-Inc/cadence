export default function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-stone-50 blueprint-grid" id="demo">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold text-amber-700">Limited onboarding spots available each month</span>
        </div>
        <h2 className="font-display text-5xl lg:text-6xl font-medium text-stone-900 mb-6 text-balance leading-[1.05]">
          Stop losing real estate leads to slow follow-up.
        </h2>
        <p className="text-stone-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Put real estate lead follow-up automation to work: a fast, professional first call on every
          online lead, 24/7 — without hiring another ISA.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white font-semibold rounded-full hover:bg-stone-800 transition-colors text-[15px]"
          >
            Book a Free 20-Min Demo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="/calculator"
            className="inline-flex items-center gap-2 px-8 py-4 text-stone-600 font-medium rounded-full border border-stone-200 hover:bg-stone-100 transition-colors text-[15px]"
          >
            Calculate Your Follow-Up Leak
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 text-xs text-stone-400 flex-wrap">
          <span>30-minute call</span>
          <span>·</span>
          <span>No long-term contract to start</span>
          <span>·</span>
          <span>Setup in 48 hours</span>
        </div>

        <div className="mt-14 pt-14 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {[
            { label: 'No long-term contract to start', sub: 'Begin with a defined pilot.' },
            { label: 'Fully managed setup', sub: 'We build it. You approve it.' },
            { label: 'Works on your existing stack', sub: 'Your CRM, your lead sources.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1 w-4 h-4 rounded-full bg-stone-900 flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-base font-semibold text-stone-900 mb-0.5">{item.label}</div>
                <div className="text-sm text-stone-500">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
