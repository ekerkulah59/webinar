-- Leads: webinar registrations and newsletter signups
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null check (source in ('webinar', 'newsletter')),
  name text,
  email text not null,
  phone text,
  webinar_slug text,
  constraint leads_email_format check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$')
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_source_idx on public.leads (source);
create index leads_webinar_slug_idx on public.leads (webinar_slug) where webinar_slug is not null;

alter table public.leads enable row level security;

-- Public can submit only; no read/update/delete for anonymous users
create policy "anon_insert_leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (
    source in ('webinar', 'newsletter')
    and length(trim(email)) >= 5
    and (
      source = 'newsletter'
      or (name is not null and length(trim(name)) >= 1)
    )
  );

grant insert on table public.leads to anon;
grant insert on table public.leads to authenticated;
