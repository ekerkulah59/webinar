# Twilio setup for webinar SMS

Use this once to enable automatic confirmation texts and reminders.

## 1. Create a Twilio account

1. Go to [twilio.com/try-twilio](https://www.twilio.com/try-twilio) and sign up.
2. Verify your email and phone number.
3. In the [Twilio Console](https://console.twilio.com/), note:
   - **Account SID** (starts with `AC`)
   - **Auth Token** (click to reveal)

## 2. Get a phone number

1. In Console → **Phone Numbers** → **Buy a number**.
2. Pick a US number with **SMS** capability.
3. Copy the number in E.164 format, e.g. `+15551234567`.

Trial accounts can only text **verified** recipient numbers until you upgrade.
Add your own phone under **Phone Numbers → Verified Caller IDs** to test.

## 3. Store credentials in Supabase Vault

In **Supabase Dashboard → SQL Editor**, run (replace placeholders):

```sql
select vault.create_secret('ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'twilio_account_sid');
select vault.create_secret('your_twilio_auth_token', 'twilio_auth_token');
select vault.create_secret('+15551234567', 'twilio_from_number');
```

Verify names only:

```sql
select name, created_at from vault.secrets
where name like 'twilio%' or name = 'sms_webhook_secret'
order by name;
```

## 4. Test a confirmation text

Register on the homepage with your real phone number, or run this in SQL Editor
(replace with your verified number):

```sql
select net.http_post(
  url := 'https://jtkreaiwtfikvriodojm.supabase.co/functions/v1/webinar-sms',
  headers := jsonb_build_object(
    'Content-Type', 'application/json',
    'x-webhook-secret',
    (select decrypted_secret from vault.decrypted_secrets where name = 'sms_webhook_secret')
  ),
  body := jsonb_build_object(
    'type', 'confirmation',
    'record', jsonb_build_object(
      'name', 'Your Name',
      'phone', '+1YOURNUMBER',
      'webinar_slug', 'ai-for-women-entrepreneurs-july-2026'
    )
  )
);
```

Check the send log:

```sql
select phone, kind, status, error, created_at
from sms_messages
order by created_at desc
limit 5;
```

`status = sent` means Twilio accepted the message.

## 5. What happens automatically

| When | Message |
|---|---|
| Someone registers on the homepage | Confirmation text immediately |
| July 27, 11:00 PM UTC (day before) | "Tomorrow" reminder to all registrants |
| July 28, 10:00 PM UTC (hour before) | "Starting in about an hour" reminder |

Each phone number gets each message type at most once (tracked in `sms_messages`).

## Troubleshooting

| `sms_messages.error` | Fix |
|---|---|
| `twilio_not_configured` | Run step 3 — Vault secrets missing |
| `twilio_error_401` | Wrong Account SID or Auth Token |
| `twilio_error_400` | Invalid from/to number, or trial account texting unverified number |
| `unauthorized` (in `net._http_response`) | `sms_webhook_secret` mismatch — contact support |
