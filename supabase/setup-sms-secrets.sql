-- One-time SMS setup: store Twilio credentials in Vault.
-- Run in Supabase Dashboard → SQL Editor (replace the placeholder values).
--
-- sms_webhook_secret should already exist from the webinar_sms_notifications migration.
-- If it does not, uncomment the line below and set a long random string:
-- select vault.create_secret('your-long-random-secret', 'sms_webhook_secret');

-- Replace placeholders, then run each line once.
select vault.create_secret('ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'twilio_account_sid');
select vault.create_secret('your_twilio_auth_token', 'twilio_auth_token');
select vault.create_secret('+15551234567', 'twilio_from_number');

-- Verify (names only — values stay hidden):
select name, created_at from vault.secrets
where name in ('sms_webhook_secret', 'twilio_account_sid', 'twilio_auth_token', 'twilio_from_number')
order by name;
