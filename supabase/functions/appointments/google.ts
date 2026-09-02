// Google Calendar access via a service account — no OAuth consent screen, no
// refresh tokens, nothing that expires after 7 days.
//
// Setup contract (see supabase/BOOKING-SETUP.md): you share your personal Google
// Calendar with the service account's ...iam.gserviceaccount.com address and grant
// it "Make changes to events". The service account then reads freeBusy and writes
// events on that calendar.
//
// HARD LIMIT: a service account cannot add `attendees` to an event without
// Domain-Wide Delegation, which requires a Google Workspace admin. On a personal
// Gmail account that is simply unavailable — Google rejects the request with
// "Service accounts cannot invite attendees without Domain-Wide Delegation of
// Authority". So events are created with no attendees, the booker's details go in
// the description, and we send the confirmation email ourselves (see email.ts).

import type { SupabaseClient } from "npm:@supabase/supabase-js@2";
import { getSecret } from "./secrets.ts";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";
const API_BASE = "https://www.googleapis.com/calendar/v3";

export type BusyRange = { start: string; end: string };

let tokenCache: { token: string; expiresAt: number } | null = null;

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlEncodeJson(value: unknown): string {
  return base64UrlEncode(new TextEncoder().encode(JSON.stringify(value)));
}

/** PEM → DER. Handles keys stored with literal \n escapes (common in env vars). */
function pemToDer(pem: string): Uint8Array {
  const normalized = pem.replace(/\\n/g, "\n");
  const body = normalized
    .replace(/-----BEGIN [^-]+-----/, "")
    .replace(/-----END [^-]+-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  const der = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) der[i] = binary.charCodeAt(i);
  return der;
}

/**
 * Mints a Google access token by signing a JWT assertion with the service
 * account key (RS256), then exchanging it at the token endpoint.
 * Cached in module scope until shortly before expiry.
 */
async function getAccessToken(supabase: SupabaseClient): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const email = await getSecret(supabase, "google_sa_email");
  const privateKey = await getSecret(supabase, "google_sa_private_key");
  if (!email || !privateKey) {
    throw new Error("google_not_configured");
  }

  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: email,
    scope: CALENDAR_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const signingInput = `${base64UrlEncodeJson({ alg: "RS256", typ: "JWT" })}.${base64UrlEncodeJson(claims)}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToDer(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput)
  );

  const assertion = `${signingInput}.${base64UrlEncode(new Uint8Array(signature))}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) {
    throw new Error(`google_token_error_${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache = {
    token: data.access_token,
    // Refresh a minute early so a token never expires mid-request.
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return data.access_token;
}

async function calendarId(supabase: SupabaseClient): Promise<string> {
  const id = await getSecret(supabase, "google_calendar_id");
  if (!id) throw new Error("google_not_configured");
  return id;
}

/** Busy ranges on the owner's calendar between two instants. */
export async function getBusy(
  supabase: SupabaseClient,
  timeMin: Date,
  timeMax: Date
): Promise<BusyRange[]> {
  const token = await getAccessToken(supabase);
  const id = await calendarId(supabase);

  const res = await fetch(`${API_BASE}/freeBusy`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id }],
    }),
  });

  if (!res.ok) {
    throw new Error(`google_freebusy_error_${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const calendar = data?.calendars?.[id];
  if (calendar?.errors?.length) {
    // Almost always means the calendar isn't shared with the service account.
    throw new Error(`google_calendar_error: ${JSON.stringify(calendar.errors)}`);
  }
  return (calendar?.busy ?? []) as BusyRange[];
}

export type EventInput = {
  summary: string;
  description: string;
  location: string;
  startsAt: Date;
  endsAt: Date;
};

/** Creates the booking on the owner's calendar. Returns the Google event id. */
export async function createEvent(
  supabase: SupabaseClient,
  input: EventInput
): Promise<string> {
  const token = await getAccessToken(supabase);
  const id = await calendarId(supabase);

  const res = await fetch(
    `${API_BASE}/calendars/${encodeURIComponent(id)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // No `attendees` — see the Domain-Wide Delegation note at the top of this file.
      body: JSON.stringify({
        summary: input.summary,
        description: input.description,
        location: input.location,
        start: { dateTime: input.startsAt.toISOString() },
        end: { dateTime: input.endsAt.toISOString() },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`google_event_error_${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return data.id as string;
}

export async function deleteEvent(
  supabase: SupabaseClient,
  eventId: string
): Promise<void> {
  const token = await getAccessToken(supabase);
  const id = await calendarId(supabase);

  const res = await fetch(
    `${API_BASE}/calendars/${encodeURIComponent(id)}/events/${encodeURIComponent(eventId)}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
  );

  // 410 Gone means it was already deleted — that's the state we wanted anyway.
  if (!res.ok && res.status !== 404 && res.status !== 410) {
    throw new Error(`google_delete_error_${res.status}: ${await res.text()}`);
  }
}
