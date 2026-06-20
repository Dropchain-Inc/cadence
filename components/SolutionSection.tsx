const steps = [
  {
    number: '01',
    title: 'Lead comes in',
    description:
      'From Zillow, Realtor.com, your website, Facebook, or any source. Cadence receives it the moment it arrives — regardless of the time, day, or what your team is doing.',
  },
  {
    number: '02',
    title: 'AI calls in your voice',
    description:
      'Within two minutes. 24/7. Using your proven script, your qualifying questions, your objection responses, and your follow-up cadence. Not a generic bot. Your playbook.',
  },
  {
    number: '03',
    title: 'Qualified appointment on your calendar',
    description:
      'Hot leads get booked. Reminders reduce no-shows. Every call, transcript, outcome, and source logs to your CRM automatically. Your agents handle the relationship from there.',
  },
]

export default function SolutionSection() {
  return (
    <section className="py-28 px-6 bg-stone-50" id="product">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 text-[11px] font-semibold text-stone-400 uppercase tracking-[0.12em]">
          How It Works
        </div>
        <h2 className="font-display text-4xl lg:text-5xl font-medium text-stone-900 mb-4 max-w-2xl text-balance leading-[1.1]">
          Your best follow-up system, running 24/7.
        </h2>
        <p className="text-stone-500 mb-16 max-w-xl text-base lg:text-lg leading-relaxed">
          Cadence does not replace your agents. It replaces the part of the process that humans are
          worst at: instant, consistent first response across every lead, every source, every hour.
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
              <div className="font-mono text-[11px] text-stone-300 mb-7 tracking-widest">{step.number}</div>
              <h3 className="font-sans font-semibold text-stone-900 text-[17px] mb-3">{step.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Response time', value: 'Under 2 minutes' },
            { label: 'Coverage', value: '24/7, every day' },
            { label: 'Setup', value: 'Fully managed' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-2xl px-6 py-4 border border-stone-100">
              <div className="w-2 h-2 rounded-full bg-cadence-gold shrink-0" />
              <div>
                <div className="text-[11px] text-stone-400 mb-0.5">{item.label}</div>
                <div className="text-sm font-semibold text-stone-900">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
