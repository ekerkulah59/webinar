-- Webinar registrations now require a phone number (used for text confirmation + reminder)

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
      or (
        name is not null and length(trim(name)) >= 1
        and phone is not null and length(trim(phone)) >= 7
      )
    )
  );
