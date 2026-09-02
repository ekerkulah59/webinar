-- One-time booking setup: store Google + Resend credentials in Vault.
-- Run in Supabase Dashboard → SQL Editor (replace the placeholder values).
--
-- See supabase/BOOKING-SETUP.md for where each of these comes from.
-- Never commit the real values.

-- 1. From the service account JSON key file, the "client_email" field.
--    Looks like: booking@your-project.iam.gserviceaccount.com
select vault.create_secret(
  'booking@your-project.iam.gserviceaccount.com',
  'google_sa_email'
);

-- 2. From the same JSON file, the "private_key" field — the WHOLE thing,
--    including the BEGIN/END lines. Paste it exactly as it appears; the
--    function handles both real newlines and literal \n escapes.
select vault.create_secret(
  '-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhki...replace...with...your...actual...key
-----END PRIVATE KEY-----
',
  'google_sa_private_key'
);

-- 3. The calendar you shared with the service account. For your primary
--    personal calendar this is just your Gmail address.
select vault.create_secret('you@gmail.com', 'google_calendar_id');

-- 4. From resend.com → API Keys. Starts with "re_".
select vault.create_secret('re_xxxxxxxxxxxxxxxxxxxx', 'resend_api_key');

-- Verify (names only — values stay hidden):
select name, created_at from vault.secrets
where name in (
  'google_sa_email',
  'google_sa_private_key',
  'google_calendar_id',
  'resend_api_key'
)
order by name;

-- To change a value later, update rather than re-create:
-- select vault.update_secret(
--   (select id from vault.secrets where name = 'resend_api_key'),
--   're_new_value'
-- );
