const features = [
  {
    title: 'AI caller in your voice',
    description:
      'Trained on your best calls. The AI real estate caller sounds like your team on their best day — not a generic AI assistant.',
  },
  {
    title: 'Follows your script',
    description:
      'Your qualifying questions, your objection responses, your close language. No script drift, no off-brand calls.',
  },
  {
    title: 'Lead qualification, automated',
    description:
      'Surfaces the hot leads. Your best agents stop burning time on the manual cold-lead grind and focus on real conversations.',
  },
  {
    title: 'Appointment setting',
    description:
      'Qualified leads get a booked appointment on your calendar. Automated reminders cut no-show rates.',
  },
  {
    title: 'CRM logging & sync',
    description:
      'Every call logged with a transcript, outcome, status, and lead source — automatically written to your CRM.',
  },
  {
    title: 'After-hours coverage',
    description:
      'No weekend gap. No 10:30 p.m. lead sitting until Monday. Every online inquiry handled 24/7, regardless of the clock.',
  },
]

function FeatureIcon({ index }: { index: number }) {
  const icons = [
    <path key={0} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />,
    <path key={1} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    <path key={2} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    <path key={3} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    <path key={4} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
    <path key={5} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
  ]

  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[index]}
    </svg>
  )
}

export default function FeaturesSection() {
  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 text-[11px] font-semibold text-stone-400 uppercase tracking-[0.12em]">
          Real Estate Lead Conversion Software
        </div>
        <h2 className="font-display text-4xl lg:text-5xl font-medium text-stone-900 mb-16 max-w-xl text-balance leading-[1.1]">
          Everything between the online lead and the booked appointment.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-stone-50 rounded-2xl p-7 border border-stone-100 hover:bg-stone-900 hover:border-stone-900 transition-all duration-300 cursor-default"
            >
              <div className="w-9 h-9 rounded-xl bg-stone-200 group-hover:bg-stone-700 transition-colors mb-5 flex items-center justify-center text-stone-500 group-hover:text-stone-300">
                <FeatureIcon index={i} />
              </div>
              <h3 className="font-sans font-semibold text-stone-900 group-hover:text-white transition-colors mb-2 text-base">
                {feature.title}
              </h3>
              <p className="text-stone-500 group-hover:text-stone-400 transition-colors text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
