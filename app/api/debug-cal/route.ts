import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET() {
  const keyB64 = process.env.GOOGLE_PRIVATE_KEY_B64
  if (!keyB64) return NextResponse.json({ error: 'GOOGLE_PRIVATE_KEY_B64 not set' })

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: Buffer.from(keyB64, 'base64').toString('utf-8'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  const client = await auth.getClient()
  const calendar = google.calendar({ version: 'v3', auth: client as never })

  const calIds = {
    personal: process.env.GOOGLE_CALENDAR_PERSONAL ?? '(not set)',
    lean_marketing: process.env.GOOGLE_CALENDAR_LEAN_MARKETING ?? '(not set)',
    partner: process.env.GOOGLE_CALENDAR_PARTNER ?? '(not set)',
    booking: process.env.GOOGLE_CALENDAR_BOOKING ?? '(not set)',
  }

  // Query freebusy for tomorrow 9am-5pm CT
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dateStr = tomorrow.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' })

  const items = Object.values(calIds)
    .filter((id) => id !== '(not set)')
    .map((id) => ({ id }))

  let freebusyResult: unknown = null
  try {
    const { data } = await calendar.freebusy.query({
      requestBody: {
        timeMin: `${dateStr}T09:00:00-05:00`,
        timeMax: `${dateStr}T17:00:00-05:00`,
        timeZone: 'America/Chicago',
        items,
      },
    })
    freebusyResult = data
  } catch (e) {
    freebusyResult = { error: String(e) }
  }

  return NextResponse.json({ calIds, dateStr, freebusyResult })
}
