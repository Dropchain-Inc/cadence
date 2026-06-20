const steps = [
  {
    number: '01',
    title: 'Online lead comes in',
    description:
      'From Zillow, Realtor.com, your website, Facebook, or any source. Cadence handles online lead capture and routing the moment a lead arrives — regardless of the time, day, or what your team is doing.',
  },
  {
    number: '02',
    title: 'AI calls the real estate lead in your voice',
    description:
      'First response in under two minutes, 24/7. The AI caller uses your proven script, your qualifying questions, your objection responses, and your follow-up cadence. Not a generic bot — your playbook.',
  },
  {
    number: '03',
    title: 'Qualified appointment booked and logged to your CRM',
    description:
      'Qualified leads get a booked appointment on your calendar. Automated reminders reduce no-shows. Every call, transcript, outcome, and lead source syncs to your CRM automatically. Your agents take the relationship from there.',
  },
]

export default function SolutionSection() {
  return (
    <section className="py-28 px-6 bg-stone-50" id="product">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 text-xs font-semibold text-stone-400 uppercase tracking-[0.12em]">
          How It Works
        </div>
        <h2 className="font-display text-4xl lg:text-5xl font-medium text-stone-900 mb-4 max-w-2xl text-balance leading-[1.1]">
          Real estate lead follow-up automation, running 24/7.
        </h2>
        <p className="text-stone-500 mb-16 max-w-xl text-base lg:text-lg leading-relaxed">
          Cadence does not replace your agents. It automates the part of the process humans are worst
          at: instant, consistent speed-to-lead — first response across every online lead, every
          source, every hour.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-white rounded-3xl p-8 border border-stone-100"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {i < 2 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-stone-200 z-10" />
              )}
              <div className="font-mono text-xs text-stone-300 mb-7 tracking-widest">{step.number}</div>
              <h3 className="font-sans font-semibold text-stone-900 text-lg mb-3">{step.title}</h3>
              <p className="text-stone-500 text-base leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'First response time', value: 'Under 2 minutes' },
            { label: 'After-hours coverage', value: '24/7, every day' },
            { label: 'CRM logging', value: 'Fully automated' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-2xl px-6 py-4 border border-stone-100">
              <div className="w-2 h-2 rounded-full bg-cadence-gold shrink-0" />
              <div>
                <div className="text-sm text-stone-400 mb-0.5">{item.label}</div>
                <div className="text-base font-semibold text-stone-900">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
