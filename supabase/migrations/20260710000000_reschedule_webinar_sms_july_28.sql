-- The July webinar moved from July 22, 12:00 PM to July 28, 7:00 PM New York Time.
-- Reschedule the SMS reminder cron jobs accordingly.
-- 7:00 PM New York Time (EDT) = 23:00 UTC, and pg_cron runs in UTC.
-- The Edge Function still verifies the webinar is actually ~24h / ~1h away
-- before sending, so these jobs are harmless if they fire on the wrong year.

select cron.unschedule('webinar-sms-day-before');
select cron.unschedule('webinar-sms-hour-before');

select cron.schedule(
  'webinar-sms-day-before',
  '0 23 27 7 *',
  $$
  select net.http_post(
    url := 'https://jtkreaiwtfikvriodojm.supabase.co/functions/v1/webinar-sms',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret',
      (select decrypted_secret from vault.decrypted_secrets where name = 'sms_webhook_secret')
    ),
    body := '{"type":"reminder","kind":"day_before"}'::jsonb
  );
  $$
);

select cron.schedule(
  'webinar-sms-hour-before',
  '0 22 28 7 *',
  $$
  select net.http_post(
    url := 'https://jtkreaiwtfikvriodojm.supabase.co/functions/v1/webinar-sms',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret',
      (select decrypted_secret from vault.decrypted_secrets where name = 'sms_webhook_secret')
    ),
    body := '{"type":"reminder","kind":"hour_before"}'::jsonb
  );
  $$
);
