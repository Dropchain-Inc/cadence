const stats = [
  {
    value: '< 2 min',
    label: 'Response time',
    sub: 'Every lead. Every time.',
  },
  {
    value: '24/7',
    label: 'Coverage',
    sub: 'No after-hours gap.',
  },
  {
    value: '48%',
    label: 'Of buyer inquiries',
    sub: 'Never receive a response.',
  },
  {
    value: '1.5×',
    label: 'Avg. callback attempts',
    sub: 'Without a real system.',
  },
]

export default function StatsSection() {
  return (
    <section className="py-20 px-6 bg-stone-900" id="results">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`px-8 py-8 ${i !== 0 ? 'border-l border-stone-800' : ''}`}
            >
              <div className="font-display text-4xl lg:text-5xl font-light text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-stone-300 text-base font-medium mb-1">{stat.label}</div>
              <div className="text-stone-500 text-sm leading-relaxed">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-stone-500 text-sm leading-relaxed max-w-xl">
            48% no-response rate and 15.29-hour average response time from WAV Group Agent Responsiveness Study.
            MIT/InsideSales: 5-minute vs. 30-minute response = 100x higher contact odds, 21x higher qualification odds.
          </p>
          <a
            href="#demo"
            className="shrink-0 inline-flex items-center px-5 py-2.5 border border-stone-700 text-stone-300 text-base font-medium rounded-full hover:bg-stone-800 hover:text-white transition-colors"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  )
}
