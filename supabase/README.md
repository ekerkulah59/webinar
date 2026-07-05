# Supabase setup (form intake)

## 1. Create a project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create a project.
2. In **Project Settings → API**, copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 2. Run the migration

In the Supabase dashboard, open **SQL Editor** and run the contents of:

`supabase/migrations/20260521000000_create_leads.sql`

Or, with the [Supabase CLI](https://supabase.com/docs/guides/cli):

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

## 3. Configure the landing page

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Restart `pnpm dev`.

## 4. View signups

**Table Editor → `leads`** in the Supabase dashboard, or SQL:

```sql
select * from leads order by created_at desc;
```

## 5. SMS confirmation & reminders (Twilio)

Webinar registrations trigger an automatic text (confirmation on signup, plus a
day-before and hour-before reminder). The pieces:

- **Edge Function** `webinar-sms` (`supabase/functions/webinar-sms/`) — sends texts via Twilio
- **DB trigger** `leads_webinar_sms` — calls the function on each webinar registration
- **pg_cron jobs** `webinar-sms-day-before` / `webinar-sms-hour-before` — reminders (UTC schedule)
- **`sms_messages` table** — send log; guarantees each person gets each message at most once
- **Vault secrets** — webhook auth + Twilio credentials (never commit these)

### One-time setup

1. **Create a Twilio account** — see `supabase/TWILIO-SETUP.md` for the full walkthrough.
2. In **Dashboard → SQL Editor**, run `supabase/setup-sms-secrets.sql` with your real Twilio values:
   - `twilio_account_sid` — Account SID (starts with `AC`)
   - `twilio_auth_token` — Auth Token
   - `twilio_from_number` — your Twilio number in E.164 form, e.g. `+15551234567`
3. `sms_webhook_secret` is created automatically by the migration. The Edge Function reads it from Vault — no separate function secrets needed.

Until Twilio secrets are in Vault, registrations still save normally — the SMS call
logs `twilio_not_configured` in `sms_messages` and no text goes out.

### For a future webinar

Update the `WEBINAR` constant in `supabase/functions/webinar-sms/index.ts`,
redeploy the function, and reschedule the two cron jobs for the new date
(remember pg_cron runs in UTC).

### Monitoring

```sql
select * from sms_messages order by created_at desc; -- send log (status: pending/sent/error)
select * from net._http_response order by id desc;   -- raw function call results
```

## Security

- RLS allows **insert only** for anonymous users (no public read of emails).
- Never put the **service_role** key in the Vite app.
- Use the service role only in server-side scripts or Edge Functions if you add an admin export later.
- The `webinar-sms` function has JWT verification off; it authenticates callers
  with the `x-webhook-secret` header instead (value lives in Vault + function secrets).
