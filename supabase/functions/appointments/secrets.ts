// Vault-backed secret reader for the booking function.
//
// Same shape as the helper in webinar-sms, but it calls `get_booking_secret`,
// which has its own allow-list — get_sms_secret would return null for these names.

import type { SupabaseClient } from "npm:@supabase/supabase-js@2";

const ENV_FALLBACK: Record<string, string | undefined> = {
  google_sa_email: Deno.env.get("GOOGLE_SA_EMAIL"),
  google_sa_private_key: Deno.env.get("GOOGLE_SA_PRIVATE_KEY"),
  google_calendar_id: Deno.env.get("GOOGLE_CALENDAR_ID"),
  resend_api_key: Deno.env.get("RESEND_API_KEY"),
};

const cache = new Map<string, string>();

export async function getSecret(
  supabase: SupabaseClient,
  name: string
): Promise<string | null> {
  const cached = cache.get(name);
  if (cached) return cached;

  const { data, error } = await supabase.rpc("get_booking_secret", {
    secret_name: name,
  });

  if (error) {
    console.error(`vault read failed for ${name}:`, error.message);
  }

  const value =
    (typeof data === "string" ? data : null) ?? ENV_FALLBACK[name] ?? null;
  if (value) cache.set(name, value);
  return value;
}
