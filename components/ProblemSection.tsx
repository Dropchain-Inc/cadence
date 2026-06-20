const problems = [
  {
    stat: '917 min',
    statLabel: 'Average real estate lead response time',
    title: 'Slow Response',
    description:
      'By the time your team calls, the lead has already spoken to someone else. 47% of buyers hire the first agent they speak with. Speed is not a best practice. It is where the deal is won or lost.',
  },
  {
    stat: '48%',
    statLabel: 'Of buyer inquiries never receive a response',
    title: 'Missed Calls',
    description:
      'Showings, listing appointments, family time, sleep. The lead comes in at 9:30 p.m. and nobody calls until Monday. By then it is gone — to an agent who had a system that could answer.',
  },
  {
    stat: '1.5×',
    statLabel: 'Average callback attempts before giving up',
    title: 'Inconsistent Follow-Up',
    description:
      'One call. Maybe two. Then the lead gets written off as junk. The real problem was not lead quality. It was the system that stopped trying after one attempt and no answer.',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-28 px-6 bg-white" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 text-[11px] font-semibold text-stone-400 uppercase tracking-[0.12em]">
          The Problem
        </div>
        <h2 className="font-display text-4xl lg:text-5xl font-medium text-stone-900 mb-16 max-w-lg text-balance leading-[1.1]">
          Online leads go cold fast.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <div
              key={i}
              className="bg-stone-50 rounded-3xl p-8 border border-stone-100 flex flex-col"
            >
              <div className="font-display text-4xl font-light text-stone-900 mb-1 tracking-tight">
                {p.stat}
              </div>
              <div className="text-[11px] text-stone-400 mb-7 leading-relaxed">{p.statLabel}</div>
              <div className="h-px bg-stone-200 mb-7" />
              <h3 className="font-sans font-semibold text-stone-900 mb-3 text-[15px]">{p.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-stone-900 px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-stone-300 text-sm leading-relaxed flex-1">
            Source: WAV Group Agent Responsiveness Study. Research proves the size of the problem. Cadence performance data will be added as customers report results.
          </p>
          <a
            href="#demo"
            className="shrink-0 inline-flex items-center px-5 py-2.5 bg-white text-stone-900 text-sm font-medium rounded-full hover:bg-stone-100 transition-colors"
          >
            Calculate Your Leak
          </a>
        </div>
      </div>
    </section>
  )
}
