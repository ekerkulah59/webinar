-- Move the existing reminder jobs to the September 10, 2026 workshop.
-- 8:00 PM America/New_York = 00:00 UTC on September 11, 2026.

select cron.unschedule(jobid)
from cron.job
where jobname in ('webinar-sms-day-before', 'webinar-sms-hour-before');

-- 24 hours before: September 10 at 00:00 UTC.
select cron.schedule(
  'webinar-sms-day-before',
  '0 0 10 9 *',
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

-- One hour before: September 10 at 23:00 UTC.
select cron.schedule(
  'webinar-sms-hour-before',
  '0 23 10 9 *',
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
