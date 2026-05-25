-- Run this if form submits fail with "row-level security policy" (42501)

alter table public.leads enable row level security;

drop policy if exists "anon_insert_leads" on public.leads;

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
