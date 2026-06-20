const faqs = [
  {
    q: 'How fast should you respond to real estate leads?',
    a: 'As fast as possible — ideally under 5 minutes, and under 2 minutes is better. MIT/InsideSales research shows that responding within 5 minutes versus 30 minutes makes you up to 100x more likely to contact the lead and 21x more likely to qualify it. Cadence delivers a first response in under 2 minutes on every online lead, 24/7, so your speed-to-lead never depends on who is free to call.',
  },
  {
    q: 'What is speed-to-lead in real estate?',
    a: 'Speed-to-lead is how quickly you respond to a new online lead after they inquire. In real estate it is one of the highest-leverage factors in lead conversion, because 47% of buyers hire the first agent they speak with. Cadence automates speed-to-lead by calling every lead back in under 2 minutes, before a competitor does.',
  },
  {
    q: 'Does AI lead follow-up work for Zillow leads?',
    a: 'Yes. Cadence connects to Zillow Premier Agent, Realtor.com, Facebook, your website, and any other source. The moment a Zillow lead comes in, Cadence handles online lead capture and calls the lead back in your voice — automated Zillow lead follow-up that runs around the clock.',
  },
  {
    q: 'Can Cadence respond to leads after hours and on weekends?',
    a: 'Yes. After-hours lead response is the core of what Cadence does. A 9:30 p.m. or weekend inquiry gets an immediate, professional callback instead of sitting until Monday — so no online lead goes cold because of the clock.',
  },
  {
    q: 'Does Cadence log calls to my CRM?',
    a: 'Yes. Every call is logged with a full transcript, outcome, lead status, and source, and synced to your CRM automatically. Your team gets clean records and call summaries without manual data entry.',
  },
  {
    q: 'Will the AI caller use my script and my voice?',
    a: 'Yes. Cadence is trained on your best calls and runs your script — your qualifying questions, objection responses, and follow-up cadence. It sounds like your team on their best day, not a generic AI assistant or off-brand bot.',
  },
  {
    q: 'Who is Cadence for?',
    a: 'Cadence is built for real estate agents, teams, and brokerages that depend on online leads and need consistent, instant follow-up. It is ideal for anyone losing deals to slow response, missed calls, or inconsistent callback attempts.',
  },
  {
    q: 'How is Cadence different from an auto-dialer or chatbot?',
    a: 'Cadence is a fully managed AI voice caller for real estate lead qualification, not a dialer or a text chatbot. It holds a real phone conversation in your voice, qualifies the lead, books the appointment on your calendar, and logs everything to your CRM — end to end.',
  },
]

export default function FAQSection() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="py-28 px-6 bg-white" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 text-xs font-semibold text-stone-400 uppercase tracking-[0.12em]">
          FAQ
        </div>
        <h2 className="font-display text-4xl lg:text-5xl font-medium text-stone-900 mb-12 max-w-xl text-balance leading-[1.1]">
          Real estate lead follow-up, answered.
        </h2>

        <div className="divide-y divide-stone-200 border-t border-stone-200">
          {faqs.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                <h3 className="font-sans font-semibold text-stone-900 text-lg leading-snug">
                  {f.q}
                </h3>
                <span className="mt-1 shrink-0 w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 transition-transform group-open:rotate-45">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="text-stone-500 text-base leading-relaxed mt-4 max-w-2xl">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
