-- SMS notifications: confirmation text on webinar registration + scheduled reminders.
-- Sends are handled by the `webinar-sms` Edge Function (supabase/functions/webinar-sms).
-- The shared webhook secret lives in Vault under 'sms_webhook_secret' — create it with
-- `select vault.create_secret('<value>', 'sms_webhook_secret');` (never commit the value).

create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron;

-- Log of every SMS attempt; the unique constraint guarantees at-most-once per phone/kind/webinar
create table public.sms_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  phone text not null,
  kind text not null check (kind in ('confirmation', 'day_before', 'hour_before')),
  webinar_slug text,
  status text not null default 'pending' check (status in ('pending', 'sent', 'error')),
  error text,
  unique (phone, kind, webinar_slug)
);

-- No policies on purpose: only the service role (Edge Function) can touch this table
alter table public.sms_messages enable row level security;

-- Fire-and-forget call to the Edge Function whenever a webinar registration lands
create or replace function public.notify_webinar_lead_sms()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  webhook_secret text;
begin
  select decrypted_secret into webhook_secret
  from vault.decrypted_secrets
  where name = 'sms_webhook_secret';

  if webhook_secret is null then
    raise warning 'sms_webhook_secret missing from Vault; skipping SMS for lead %', new.id;
    return new;
  end if;

  perform net.http_post(
    url := 'https://jtkreaiwtfikvriodojm.supabase.co/functions/v1/webinar-sms',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', webhook_secret
    ),
    body := jsonb_build_object('type', 'confirmation', 'record', to_jsonb(new))
  );
  return new;
end;
$$;

create trigger leads_webinar_sms
  after insert on public.leads
  for each row
  when (new.source = 'webinar' and new.phone is not null)
  execute function public.notify_webinar_lead_sms();

-- Reminder schedule for the July 22, 2026 webinar.
-- 12:00 PM New York Time = 16:00 UTC, and pg_cron runs in UTC.
-- The Edge Function verifies the webinar is actually ~24h / ~1h away before
-- sending, so these jobs are harmless if they fire on the wrong year.
select cron.schedule(
  'webinar-sms-day-before',
  '0 16 21 7 *',
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
  '0 15 22 7 *',
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
