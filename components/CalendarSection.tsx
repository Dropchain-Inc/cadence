const HOUR_HEIGHT = 60
const START_HOUR = 8
const END_HOUR = 17

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const dayLabels = ['Mon 16', 'Tue 17', 'Wed 18', 'Thu 19', 'Fri 20']
const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i)

type ApptType = 'showing' | 'consult' | 'listing' | 'internal'

interface Appointment {
  day: number
  start: number
  duration: number
  title: string
  sub: string
  type: ApptType
  cadence: boolean
}

const appointments: Appointment[] = [
  // Monday
  { day: 0, start: 8.5,  duration: 0.5, title: 'Lead Call',            sub: 'Overnight inquiry',    type: 'consult',  cadence: true  },
  { day: 0, start: 9,    duration: 1,   title: 'Buyer Showing',        sub: '2450 Oak St',          type: 'showing',  cadence: true  },
  { day: 0, start: 10.5, duration: 0.5, title: 'Lead Call',            sub: 'Zillow — pre-approved',type: 'consult',  cadence: true  },
  { day: 0, start: 11.5, duration: 1,   title: 'Buyer Showing',        sub: 'Kenwood Condo',        type: 'showing',  cadence: true  },
  { day: 0, start: 14,   duration: 1.5, title: 'Listing Consult',      sub: 'Maple Ave',            type: 'listing',  cadence: false },
  // Tuesday
  { day: 1, start: 8,    duration: 0.5, title: 'Lead Call',            sub: 'Morning inquiry',      type: 'consult',  cadence: true  },
  { day: 1, start: 9.5,  duration: 1,   title: 'Buyer Consult',        sub: 'Pre-approval review',  type: 'consult',  cadence: true  },
  { day: 1, start: 11,   duration: 1,   title: 'Showing',              sub: 'West Side Duplex',     type: 'showing',  cadence: true  },
  { day: 1, start: 13,   duration: 1,   title: 'Showing',              sub: '4bd Lake View',        type: 'showing',  cadence: true  },
  { day: 1, start: 14.5, duration: 0.5, title: 'Lead Call',            sub: 'Facebook inquiry',     type: 'consult',  cadence: true  },
  { day: 1, start: 15.5, duration: 0.5, title: 'Follow-up Call',       sub: 'Qualified lead',       type: 'consult',  cadence: true  },
  // Wednesday
  { day: 2, start: 8.5,  duration: 0.5, title: 'Lead Call',            sub: 'Realtor.com inquiry',  type: 'consult',  cadence: true  },
  { day: 2, start: 9,    duration: 0.5, title: 'Lead Booked',          sub: 'Zillow inquiry',       type: 'consult',  cadence: true  },
  { day: 2, start: 10.5, duration: 1,   title: 'Showing',              sub: 'Downtown Loft',        type: 'showing',  cadence: true  },
  { day: 2, start: 12,   duration: 1,   title: 'Listing Consult',      sub: 'Plymouth, MN',         type: 'listing',  cadence: false },
  { day: 2, start: 14,   duration: 1,   title: 'Team Meeting',         sub: 'Weekly sync',          type: 'internal', cadence: false },
  { day: 2, start: 15.5, duration: 1,   title: 'Buyer Showing',        sub: 'New Construction',     type: 'showing',  cadence: true  },
  // Thursday
  { day: 3, start: 9,    duration: 1.5, title: 'Listing Presentation', sub: 'Edina, MN',            type: 'listing',  cadence: false },
  { day: 3, start: 11,   duration: 1,   title: 'Buyer Consult',        sub: 'Investment buyer',     type: 'consult',  cadence: true  },
  { day: 3, start: 12.5, duration: 0.5, title: 'Lead Call',            sub: 'Realtor.com',          type: 'consult',  cadence: true  },
  { day: 3, start: 13.5, duration: 1,   title: 'Buyer Showing',        sub: '3bd Summit Ave',       type: 'showing',  cadence: true  },
  { day: 3, start: 15,   duration: 0.5, title: 'Lead Call',            sub: 'Facebook inquiry',     type: 'consult',  cadence: true  },
  { day: 3, start: 16,   duration: 0.5, title: 'Follow-up Call',       sub: 'Qualified — ready now',type: 'consult',  cadence: true  },
  // Friday
  { day: 4, start: 8.5,  duration: 0.5, title: 'Lead Call',            sub: 'Overnight inquiry',    type: 'consult',  cadence: true  },
  { day: 4, start: 10,   duration: 1,   title: 'Buyer Consult',        sub: 'Relocation buyer',     type: 'consult',  cadence: true  },
  { day: 4, start: 11.5, duration: 1,   title: 'Showing',              sub: 'Minnetonka Home',      type: 'showing',  cadence: true  },
  { day: 4, start: 13,   duration: 0.5, title: 'Lead Call',            sub: 'Realtor.com',          type: 'consult',  cadence: true  },
  { day: 4, start: 14,   duration: 1,   title: 'Buyer Consult',        sub: 'First-time buyer',     type: 'consult',  cadence: true  },
  { day: 4, start: 15.5, duration: 1,   title: 'Showing',              sub: 'Wayzata Home',         type: 'showing',  cadence: true  },
]

const typeStyles: Record<ApptType, { card: string; dot: string }> = {
  showing:  { card: 'bg-blue-50 border-l-[3px] border-blue-400 text-blue-900',      dot: 'bg-blue-400'    },
  consult:  { card: 'bg-amber-50 border-l-[3px] border-amber-400 text-amber-900',   dot: 'bg-amber-400'   },
  listing:  { card: 'bg-emerald-50 border-l-[3px] border-emerald-400 text-emerald-900', dot: 'bg-emerald-400' },
  internal: { card: 'bg-stone-100 border-l-[3px] border-stone-300 text-stone-500',  dot: 'bg-stone-400'   },
}

function formatHour(h: number) {
  if (h === 12) return '12pm'
  if (h > 12) return `${h - 12}pm`
  return `${h}am`
}

export default function CalendarSection() {
  const gridHeight = (END_HOUR - START_HOUR) * HOUR_HEIGHT

  return (
    <section className="py-28 px-6 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 text-xs font-semibold text-stone-400 uppercase tracking-[0.12em]">
          The Result
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-stone-900 max-w-md text-balance leading-[1.1]">
            A calendar that fills itself.
          </h2>
          <p className="text-stone-500 text-base lg:text-lg leading-relaxed lg:max-w-xs">
            Every qualified lead lands as a booked appointment — no chasing, no gaps.
          </p>
        </div>

        {/* Calendar widget */}
        <div
          className="rounded-3xl border border-stone-200 overflow-hidden bg-white"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <span className="font-sans font-semibold text-stone-900 text-base">June 2025</span>
              <div className="flex items-center gap-1">
                {['M15 19l-7-7 7-7', 'M9 5l7 7-7 7'].map((d, i) => (
                  <div key={i} className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-cadence-gold" />
                <span className="text-xs text-white font-medium">23 booked via Cadence</span>
              </div>
              <span className="hidden sm:block text-xs text-stone-400 font-medium px-2.5 py-1.5 border border-stone-200 rounded-full">
                Week view
              </span>
            </div>
          </div>

          {/* Day headers */}
          <div
            className="grid border-b border-stone-100"
            style={{ gridTemplateColumns: '52px repeat(5, 1fr)' }}
          >
            <div className="border-r border-stone-100" />
            {dayLabels.map((d, i) => {
              const [day, num] = d.split(' ')
              const isToday = i === 1
              return (
                <div
                  key={i}
                  className={`px-3 py-3 text-center border-r border-stone-100 last:border-r-0 ${isToday ? 'bg-stone-50' : ''}`}
                >
                  <div className="text-xs text-stone-400 font-medium">{day}</div>
                  <div
                    className={`mx-auto mt-1 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isToday ? 'bg-stone-900 text-white' : 'text-stone-400'
                    }`}
                  >
                    {num}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Time grid */}
          <div className="flex overflow-x-auto">
            {/* Time labels */}
            <div className="shrink-0 w-[52px] border-r border-stone-100 relative" style={{ height: gridHeight }}>
              {hours.map((h) => (
                <div key={h} className="absolute w-full" style={{ top: (h - START_HOUR) * HOUR_HEIGHT }}>
                  {h > START_HOUR && h < END_HOUR && (
                    <span className="block text-center text-[10px] text-stone-300 -translate-y-2.5">
                      {formatHour(h)}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Day columns */}
            <div className="flex-1 grid min-w-0" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
              {days.map((_, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`relative border-r border-stone-100 last:border-r-0 ${dayIndex === 1 ? 'bg-stone-50/60' : ''}`}
                  style={{ height: gridHeight }}
                >
                  {/* Hour lines */}
                  {hours.slice(0, -1).map((h) => (
                    <div
                      key={h}
                      className="absolute left-0 right-0 border-t border-stone-100"
                      style={{ top: (h - START_HOUR) * HOUR_HEIGHT }}
                    />
                  ))}

                  {/* Appointments */}
                  {appointments
                    .filter((a) => a.day === dayIndex)
                    .map((appt, i) => {
                      const top = (appt.start - START_HOUR) * HOUR_HEIGHT
                      const height = appt.duration * HOUR_HEIGHT
                      const styles = typeStyles[appt.type]
                      return (
                        <div
                          key={i}
                          className={`absolute left-1 right-1 rounded-lg px-2 py-1.5 overflow-hidden ${styles.card}`}
                          style={{ top: top + 2, height: height - 4 }}
                        >
                          <div className="text-[11px] font-semibold leading-tight truncate">
                            {appt.title}
                          </div>
                          {height > 42 && (
                            <div className="text-[10px] opacity-60 leading-tight truncate mt-0.5">
                              {appt.sub}
                            </div>
                          )}
                          {appt.cadence && height > 56 && (
                            <div className="mt-1 flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-cadence-gold" />
                              <span className="text-[9px] opacity-50 font-semibold uppercase tracking-wide">Cadence</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats below calendar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: '23', label: 'Appointments booked by Cadence this week', color: 'bg-cadence-gold' },
            { value: '2',  label: 'Booked manually by your team',             color: 'bg-stone-400'   },
            { value: '0',  label: 'Leads left without a callback',            color: 'bg-emerald-400' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white px-6 py-4">
              <div className={`w-2 h-2 rounded-full shrink-0 ${stat.color}`} />
              <div>
                <div className="font-display text-3xl font-light text-stone-900 leading-none">{stat.value}</div>
                <div className="text-sm text-stone-400 mt-1 leading-relaxed">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
