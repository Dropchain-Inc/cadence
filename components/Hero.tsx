import Image from 'next/image'

function LeadCard() {
  return (
    <div
      className="bg-white rounded-2xl p-4 w-56"
      style={{ boxShadow: 'var(--shadow-float)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">New Lead</div>
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
      </div>
      <div className="font-sans font-semibold text-stone-900 text-sm mb-0.5">Sarah Mitchell</div>
      <div className="text-[11px] text-stone-400 mb-3">via Zillow Premier Agent</div>
      <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Response in 1m 47s
      </div>
    </div>
  )
}

function AppointmentCard() {
  return (
    <div
      className="bg-white rounded-2xl p-4 w-52"
      style={{ boxShadow: 'var(--shadow-float)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">Appointment Booked</div>
      </div>
      <div className="font-sans font-semibold text-stone-900 text-sm mb-0.5">Showing — 4bd Lake View</div>
      <div className="text-[11px] text-stone-400 mb-0.5">Thursday, 2:30 PM</div>
      <div className="text-[11px] text-stone-300">via Cadence AI</div>
    </div>
  )
}

function TranscriptCard() {
  return (
    <div
      className="bg-stone-900 rounded-2xl p-4 w-60"
      style={{ boxShadow: 'var(--shadow-float)' }}
    >
      <div className="text-[10px] text-stone-400 mb-3 font-semibold uppercase tracking-widest">Call Summary</div>
      <div className="space-y-2.5 mb-3">
        <div className="flex gap-2 items-start">
          <div className="w-5 h-5 rounded-full bg-stone-700 shrink-0 flex items-center justify-center mt-0.5">
            <span className="text-[8px] text-stone-300 font-bold">AI</span>
          </div>
          <div className="text-[11px] text-stone-300 leading-relaxed">
            "Hi, I'm following up on your Zillow inquiry from earlier today..."
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="w-5 h-5 rounded-full bg-stone-600 shrink-0 flex items-center justify-center mt-0.5">
            <span className="text-[8px] text-stone-300 font-bold">SM</span>
          </div>
          <div className="text-[11px] text-stone-400 leading-relaxed">
            "Yes — we're ready to move within 60 days, pre-approved..."
          </div>
        </div>
      </div>
      <div className="border-t border-stone-700 pt-3 flex items-center justify-between">
        <span className="text-[10px] text-stone-500">Lead status</span>
        <span className="text-[10px] text-emerald-400 font-semibold">Qualified</span>
      </div>
    </div>
  )
}

const avatars = [
  { initials: 'JT', color: '#C4A882' },
  { initials: 'MR', color: '#8B7355' },
  { initials: 'SK', color: '#D4B896' },
  { initials: 'AK', color: '#A0856A' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-12">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid" />

      {/* Radial vignette to anchor the card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(250,250,250,0.6) 100%)',
        }}
      />

      {/* Floating background cards */}
      <div className="absolute top-[22%] left-[5%] -rotate-6 animate-float hidden xl:block z-10">
        <LeadCard />
      </div>
      <div className="absolute top-[28%] right-[4%] rotate-4 animate-float-slow hidden xl:block z-10">
        <TranscriptCard />
      </div>
      <div className="absolute bottom-[18%] right-[6%] -rotate-3 animate-float-delayed hidden xl:block z-10">
        <AppointmentCard />
      </div>

      {/* Main hero card */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4">
        <div
          className="bg-white overflow-hidden"
          style={{
            borderRadius: '2rem',
            boxShadow: 'var(--shadow-hero)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left: Content */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">

              {/* Flag */}
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-cadence-gold" />
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-[0.12em]">
                  AI Real Estate Lead Response
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-[2.8rem] lg:text-[3.6rem] leading-[1.05] font-semibold text-stone-900 mb-5 text-balance">
                Real Estate Lead Follow-Up, Automated in Under 2 Minutes
              </h1>

              {/* Subheadline */}
              <p className="text-stone-500 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
                Cadence is the AI caller that responds to every online and Zillow lead in your voice
                and your script — qualifying leads, booking appointments 24/7, and logging every call
                to your CRM. Speed-to-lead, fully automated.
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href="#demo"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-stone-900 text-white text-sm font-semibold rounded-full hover:bg-stone-800 transition-colors"
                  >
                    Book a Free 20-Min Demo
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="#product"
                    className="inline-flex items-center gap-2 px-6 py-3 text-stone-600 text-sm font-medium rounded-full border border-stone-200 hover:bg-stone-50 transition-colors"
                  >
                    See How It Works
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                <div className="text-xs text-stone-400">
                  No contract to start · Setup in 48 hours · Cancel anytime
                </div>
              </div>

            </div>

            {/* Right: Dark panel with home image */}
            <div className="relative hidden lg:block min-h-[480px] bg-stone-950">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury real estate home represented by Cadence AI lead follow-up"
                fill
                className="object-cover opacity-40"
                priority
                sizes="50vw"
              />

              {/* Layered overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/30 to-transparent" />

              {/* Status markers */}
              <div className="absolute top-8 right-8 flex flex-col gap-2.5">
                {[
                  { dot: 'bg-amber-400 animate-pulse', label: 'New Lead' },
                  { dot: 'bg-blue-400', label: 'Qualified' },
                  { dot: 'bg-emerald-400', label: 'Appointment Booked' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2"
                  >
                    <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                    <span className="text-[11px] text-white font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Response time badge */}
              <div className="absolute bottom-8 left-8 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <div className="text-[10px] text-stone-400 mb-1.5 uppercase tracking-widest">Response Time</div>
                <div className="font-display text-3xl font-light text-white leading-none mb-1.5">1m 47s</div>
                <div className="text-[11px] text-emerald-400 font-medium">Within 2-minute window</div>
              </div>

              {/* Lead count */}
              <div className="absolute top-8 left-8 bg-white/8 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                <div className="text-[10px] text-stone-400 mb-1 uppercase tracking-widest">Today</div>
                <div className="font-display text-2xl font-light text-white">14</div>
                <div className="text-[11px] text-stone-400">leads called</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof below card */}
        <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
          {[
            { stat: '48%', label: 'of buyer inquiries never get a response (WAV Group)' },
            { stat: '< 2 min', label: 'first response, every lead' },
            { stat: '24/7', label: 'after-hours coverage, no gaps' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-sans font-semibold text-stone-700 text-sm">{item.stat}</span>
              <span className="text-stone-400 text-sm">{item.label}</span>
              {i < 2 && <span className="text-stone-300 text-sm ml-4">·</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
