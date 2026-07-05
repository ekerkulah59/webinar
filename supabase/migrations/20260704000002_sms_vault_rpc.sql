-- Allow the webinar-sms Edge Function to read secrets from Vault via RPC.
-- PostgREST does not expose the vault schema directly, so we use a
-- security-definer function callable only by the service role.

create or replace function public.get_sms_secret(secret_name text)
returns text
language sql
security definer
set search_path = public
as $$
  select decrypted_secret
  from vault.decrypted_secrets
  where name = secret_name
    and secret_name in (
      'sms_webhook_secret',
      'twilio_account_sid',
      'twilio_auth_token',
      'twilio_from_number'
    )
  limit 1;
$$;

revoke all on function public.get_sms_secret(text) from public;
revoke all on function public.get_sms_secret(text) from anon;
revoke all on function public.get_sms_secret(text) from authenticated;
grant execute on function public.get_sms_secret(text) to service_role;
