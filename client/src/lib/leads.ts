import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export type LeadSource = "webinar" | "newsletter";

export type SubmitLeadInput = {
  source: LeadSource;
  email: string;
  name?: string;
  phone?: string;
  webinarSlug?: string;
};

export async function submitLead(input: SubmitLeadInput): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "We couldn’t save your details. Please try again or email hello@easeintoai.co."
    );
  }

  const email = input.email.trim().toLowerCase();
  const name = input.name?.trim() || null;
  const phone = input.phone?.trim() || null;
  const webinarSlug = input.webinarSlug?.trim() || null;

  const { error } = await getSupabase().from("leads").insert({
    source: input.source,
    email,
    name,
    phone,
    webinar_slug: webinarSlug,
  });

  if (error) {
    throw new Error(
      "We couldn’t save your details. Please try again or email hello@easeintoai.co."
    );
  }
}
