# Appointment scheduling setup

Your own booking page at `/book` — no Calendly, no subscription, no third-party
branding. It reads your real Google Calendar so your existing events block
times automatically, and writes each booking back as a calendar event.

Budget about 30 minutes for first-time setup. Nothing here is reversible-hard;
if you get stuck, the page fails gracefully with a "try again" message rather
than breaking the site.

---

## How it fits together

```
Visitor at /book
  └─ appointments Edge Function
       ├─ Google Calendar   your events block slots; bookings get written back
       ├─ Postgres          the booking record + the anti-double-booking lock
       └─ Resend            confirmation email to them, notification to you
```

Your recurring hours live in the `availability_rules` table, not in code — you
can change them from the Supabase dashboard any time without a deploy.

---

## 1. Run the migration

Supabase Dashboard → **SQL Editor**, paste the contents of:

`supabase/migrations/20260804000000_appointments.sql`

Or with the CLI:

```bash
supabase db push
```

This creates `availability_rules`, `availability_blackouts`, and `appointments`,
and seeds Tuesday/Thursday 1–5pm as starter hours.

## 2. Create a Google service account

We use a service account rather than "sign in with Google" on purpose. A normal
OAuth connection **stops working after 7 days** unless you push a verified app to
production. A service account never expires.

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → create a
   project (any name, e.g. "easeintoai-booking").
2. **APIs & Services → Library** → search "Google Calendar API" → **Enable**.
3. **APIs & Services → Credentials → Create Credentials → Service account**.
   Name it "booking". Skip the optional role/access steps.
4. Open the new service account → **Keys** tab → **Add Key → Create new key →
   JSON**. A `.json` file downloads. Keep it — you need two fields from it.

## 3. Share your calendar with it

This is the step that makes everything work. Without it, Google returns "not
found" for your calendar.

1. Open the downloaded JSON, copy the `client_email` value. It looks like
   `booking@your-project.iam.gserviceaccount.com`.
2. Go to [calendar.google.com](https://calendar.google.com) → hover your calendar
   in the left sidebar → **⋮ → Settings and sharing**.
3. Under **Share with specific people or groups** → **Add people** → paste that
   address.
4. Set permission to **"Make changes to events"** (not just "See all event
   details" — it needs write access to create bookings).
5. Save.

## 4. Set up Resend for confirmation emails

1. Sign up at [resend.com](https://resend.com) (free tier is plenty).
2. **Domains → Add Domain** → `easeintoai.co`, then add the DNS records it gives
   you at your domain registrar. Verification usually takes a few minutes.
3. **API Keys → Create API Key**. Copy it (starts with `re_`).

> To test before DNS is verified, set `fromEmail` in
> `supabase/functions/appointments/config.ts` to `onboarding@resend.dev`. Resend
> only lets that address send to your own account email, so switch to your real
> domain before going live.

## 5. Store the secrets

SQL Editor → run `supabase/setup-booking-secrets.sql` with your real values:

| Secret | Where it comes from |
|---|---|
| `google_sa_email` | `client_email` in the service account JSON |
| `google_sa_private_key` | `private_key` in the same JSON, including BEGIN/END lines |
| `google_calendar_id` | The calendar you shared — your Gmail address for your primary one |
| `resend_api_key` | Resend → API Keys |

## 6. Edit the config and deploy

Open `supabase/functions/appointments/config.ts` and set at minimum:

- `videoMeetingUrl` — your permanent Zoom/Meet room
- `ownerEmail` — where booking notifications go
- `fromEmail` — must be on your Resend-verified domain
- `siteUrl` — used to build the cancel/reschedule links in emails

Then deploy:

```bash
supabase functions deploy appointments
```

## 7. Set your real hours

Table Editor → `availability_rules`. One row per weekly window:

| weekday | start_time | end_time |
|---|---|---|
| 0 = Sunday … 6 = Saturday | `13:00` | `17:00` |

Times are **your local wall clock** (`ownerTimeZone` in config, currently
`America/New_York`). "1pm Tuesdays" stays 1pm across daylight saving — you don't
need to adjust anything twice a year.

Add multiple rows for split hours (e.g. 9–12 and 14–17 on the same weekday).

For vacations and one-off blocks, add rows to `availability_blackouts` — though
anything already on your Google Calendar blocks itself automatically.

---

## Checking it works

```bash
# Should return a list of slots
curl -X POST 'https://YOUR_PROJECT.supabase.co/functions/v1/appointments' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"action":"slots"}'
```

Then visit `/book`, make a test booking, and confirm:

- the event appears on your Google Calendar
- you get the notification email, and the booker address gets the confirmation
- the slot disappears from `/book`
- the cancel link in the email removes the Google event and frees the slot

## Monitoring

```sql
-- Every booking
select created_at, name, email, meeting_mode, starts_at, status
from appointments order by starts_at desc;

-- Anything that failed to reach Google or Resend
select id, name, starts_at, google_sync_error, email_status
from appointments
where google_sync_error is not null or email_status like 'error%';
```

A booking is **never** lost because Google or Resend failed. If either breaks,
the appointment is still saved and the error is recorded on the row — that
second query is where you'd find it.

---

## Things worth knowing

**You won't see the booker as a calendar "guest."** Google blocks service
accounts from inviting attendees unless you have a Google Workspace admin
(Domain-Wide Delegation), which personal Gmail accounts don't. That's why the
booker's name, email, and phone go in the event description instead, and why we
send the confirmation email ourselves with an .ics attached. Functionally it's
the same; it just looks slightly different in your calendar.

**Double-booking is prevented by the database, not by application code.** The
`appointments_no_overlap` exclusion constraint means two people clicking the same
slot at the same instant can't both succeed — Postgres rejects the second one and
the site tells them to pick again. Don't remove that constraint.

**Tuning knobs** in `config.ts`: `slotMinutes` (length), `bufferMinutes` (gap
around existing events), `minNoticeHours` (how far ahead someone must book),
`maxAdvanceDays` (how far out the calendar goes).

**Until the secrets are set**, `/book` shows a "something went wrong, try again"
message rather than a broken page. The rest of the site is unaffected.
