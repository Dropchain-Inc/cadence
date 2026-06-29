import { google } from 'googleapis'

const CALENDAR_IDS = [
  process.env.GOOGLE_CALENDAR_PERSONAL!,
  process.env.GOOGLE_CALENDAR_LEAN_MARKETING!,
  process.env.GOOGLE_CALENDAR_PARTNER!,
]

const BOOKING_CALENDAR_ID = process.env.GOOGLE_CALENDAR_BOOKING!

const SLOT_DURATION_MS = 20 * 60 * 1000   // 20-minute meetings
const SLOT_INTERVAL_MS = 30 * 60 * 1000   // slots offered every 30 min

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })
}

// Returns the UTC offset string for America/Chicago on a given date ("-05:00" or "-06:00")
function chicagoOffset(dateStr: string): string {
  // Sample noon UTC on that date and ask Chicago what hour it is
  const ref = new Date(`${dateStr}T18:00:00Z`)
  const ctHour = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    hour12: false,
  }).format(ref)
  // 18:00 UTC = 13:00 CST (UTC-6) or 14:00 CDT (UTC-5) — if CT says ≥14 we're in CDT
  return parseInt(ctHour) >= 14 ? '-05:00' : '-06:00'
}

export async function getAvailableSlots(dateStr: string): Promise<string[]> {
  const auth = getAuth()
  const calendar = google.calendar({ version: 'v3', auth })
  const offset = chicagoOffset(dateStr)

  const timeMin = `${dateStr}T09:00:00${offset}`
  const timeMax = `${dateStr}T17:00:00${offset}`

  const { data } = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: 'America/Chicago',
      items: CALENDAR_IDS.map((id) => ({ id })),
    },
  })

  const busyPeriods: { start: Date; end: Date }[] = []
  const cals = data.calendars ?? {}
  for (const id of CALENDAR_IDS) {
    for (const b of cals[id]?.busy ?? []) {
      if (b.start && b.end) {
        busyPeriods.push({ start: new Date(b.start), end: new Date(b.end) })
      }
    }
  }

  const slots: string[] = []
  let cursor = new Date(`${dateStr}T09:00:00${offset}`)
  const dayEnd = new Date(`${dateStr}T17:00:00${offset}`)

  while (cursor.getTime() + SLOT_DURATION_MS <= dayEnd.getTime()) {
    const slotEnd = new Date(cursor.getTime() + SLOT_DURATION_MS)
    const isBlocked = busyPeriods.some(
      (b) => cursor < b.end && slotEnd > b.start
    )
    if (!isBlocked) slots.push(cursor.toISOString())
    cursor = new Date(cursor.getTime() + SLOT_INTERVAL_MS)
  }

  return slots
}

export async function createBooking(
  slot: string,
  name: string,
  email: string,
  notes?: string
) {
  const auth = getAuth()
  const calendar = google.calendar({ version: 'v3', auth })

  const start = new Date(slot)
  const end = new Date(start.getTime() + SLOT_DURATION_MS)

  const { data } = await calendar.events.insert({
    calendarId: BOOKING_CALENDAR_ID,
    sendUpdates: 'all',
    requestBody: {
      summary: `Cadence Demo — ${name}`,
      description: [
        `Booked via cadenceleads.com`,
        notes ? `\nNotes: ${notes}` : '',
      ]
        .filter(Boolean)
        .join(''),
      start: { dateTime: start.toISOString(), timeZone: 'America/Chicago' },
      end: { dateTime: end.toISOString(), timeZone: 'America/Chicago' },
      attendees: [{ email, displayName: name }],
    },
  })

  return {
    eventId: data.id,
    start: data.start?.dateTime ?? slot,
    calendarLink: data.htmlLink ?? '',
  }
}
