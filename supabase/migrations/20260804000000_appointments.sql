-- Self-hosted appointment scheduling.
--
-- Availability is the intersection of three things:
--   1. availability_rules      — your recurring weekly hours (wall clock, your timezone)
--   2. Google Calendar freeBusy — checked live by the `appointments` Edge Function
--   3. availability_blackouts  — one-off blocks that aren't on Google Calendar
--
-- Nothing here is reachable from the browser. RLS is on with no policies, so only
-- the service role (the Edge Function) can read or write. Same posture as sms_messages.

-- Required for the overlap exclusion constraint below: btree_gist lets a GiST index
-- mix the range operator (&&) with plain equality columns.
create extension if not exists btree_gist;

-- Recurring weekly windows, stored as wall-clock time in the owner's timezone
-- (BOOKING.ownerTimeZone in the Edge Function config). Storing local time rather
-- than UTC is deliberate: "1pm on Tuesdays" should stay 1pm across a DST boundary.
create table public.availability_rules (
  id uuid primary key default gen_random_uuid(),
  weekday smallint not null check (weekday between 0 and 6), -- 0 = Sunday, matches JS getDay()
  start_time time not null,
  end_time time not null,
  active boolean not null default true,
  check (start_time < end_time)
);

comment on table public.availability_rules is
  'Recurring bookable hours as wall-clock time in the owner timezone. Edit from the Table Editor; no redeploy needed.';

-- Vacations and one-off blocks. Absolute instants, so no timezone ambiguity.
create table public.availability_blackouts (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  check (ends_at > starts_at)
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  meeting_mode text not null check (meeting_mode in ('video', 'phone')),
  topic text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  -- Bearer token for the cancel/reschedule link. 24 random bytes as hex = 48 chars.
  manage_token text not null unique default encode(gen_random_bytes(24), 'hex'),
  google_event_id text,
  google_sync_error text,
  email_status text,
  check (ends_at > starts_at),
  -- A phone call needs a number to call.
  check (meeting_mode <> 'phone' or (phone is not null and length(trim(phone)) >= 7))
);

-- THE double-booking lock.
--
-- Postgres refuses to commit a second confirmed row whose time range overlaps an
-- existing one, atomically and under any amount of concurrency. A read-then-write
-- check in application code cannot do this — two requests can both read "free"
-- before either writes. Violations surface as SQLSTATE 23P01, which the Edge
-- Function translates into a `slot_taken` response.
--
-- '[)' bounds mean a 2:00-2:30 appointment does not collide with 2:30-3:00.
alter table public.appointments
  add constraint appointments_no_overlap
  exclude using gist (tstzrange(starts_at, ends_at, '[)') with &&)
  where (status = 'confirmed');

create index appointments_starts_at_idx on public.appointments (starts_at);
create index appointments_email_created_idx on public.appointments (email, created_at desc);

alter table public.availability_rules enable row level security;
alter table public.availability_blackouts enable row level security;
alter table public.appointments enable row level security;

-- Vault access for the booking Edge Function.
--
-- This mirrors get_sms_secret rather than reusing it: that function hard-codes an
-- allow-list of the four Twilio/webhook secret names and would return null for
-- anything here. Keeping a separate allow-list means a bug in one feature can't
-- read the other's credentials.
create or replace function public.get_booking_secret(secret_name text)
returns text
language sql
security definer
set search_path = public
as $$
  select decrypted_secret
  from vault.decrypted_secrets
  where name = secret_name
    and secret_name in (
      'google_sa_email',
      'google_sa_private_key',
      'google_calendar_id',
      'resend_api_key'
    )
  limit 1;
$$;

revoke all on function public.get_booking_secret(text) from public;
revoke all on function public.get_booking_secret(text) from anon;
revoke all on function public.get_booking_secret(text) from authenticated;
grant execute on function public.get_booking_secret(text) to service_role;

-- Starter hours — Tuesday and Thursday afternoons. Change these to your real
-- availability in Table Editor → availability_rules.
insert into public.availability_rules (weekday, start_time, end_time) values
  (2, '13:00', '17:00'),  -- Tuesday
  (4, '13:00', '17:00');  -- Thursday
