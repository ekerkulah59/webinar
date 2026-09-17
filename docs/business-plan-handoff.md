# EaseIntoAI business-plan implementation

Development branch: `codex/finalized-business-plan`. Changes are local and have not been deployed.

## Current offer presentation

At the owner’s request, pricing, format, duration, and enrollment placeholders have been removed. The Pilot now uses a practical “Let’s start with your business” conversation panel and a working **Discuss a Pilot** link to `/book`. Home and Offers show no Pilot price. No price, delivery format, or duration has been invented. Pricing and delivery details can be published later once agreed.

Additional TODOs:

- `Pilot.tsx`: add structured offer pricing only after the actual price and enrollment details are approved.
- `Results.tsx`: fill `SESSION_RECAPS` and `CASE_STUDIES` only with confirmed work and permission to share. They remain empty.
- `PastWebinars.tsx`: verify attendance records before restoring attendance figures. Existing historical session descriptions remain; they have not been independently verified.
- `CustomAIAssistant.tsx`: confirm scope and price before publishing specific project packages. Existing general service descriptions remain.
- `Resources.tsx`: add approved guides/checklists and working download links later. No fake downloads or entries exist.

## Changes by file

Paths below are relative to the repository root.

| File | Change |
| --- | --- |
| `client/src/pages/Home.tsx` | Owner-first hero, clearly labeled example task, one offer ladder, shared EASE steps, forthcoming proof structure, exact Esther testimonial, local founder introduction, and one quiet organization line. Removed competing workshop/article sections from the main conversion path. |
| `client/src/pages/Pilot.tsx` | Focused paid offer, fit and outcome, a practical next-step conversation panel, EASE, SAFE link, sponsorship explanation, honest discussion action while enrollment is unresolved, and Service structured data without price claims. Retains the old done-for-you anchor as a pointer to Offers. |
| `client/src/pages/Offers.tsx` (new) | Three-rung ladder plus four project services: AI receptionist, AI-powered website + Google Business Profile, lead follow-up automation, and content systems. |
| `client/src/pages/HowItWorks.tsx` | Concrete EASE and SAFE explanation, practical distinction from self-paced courses, and matching HowTo structured data. |
| `client/src/pages/ForOrganizations.tsx` | Simplified partnership page: host a session or sponsor a cohort; one request action leading to organization-qualified booking. |
| `client/src/pages/IndividualLearning.tsx` (new) | Supporting learning page with existing workshop registration, self-paced courses, SAFE, and a next step to the paid Pilot. |
| `client/src/pages/About.tsx` (new) | Dedicated founder page grounded in Emmanuel Kerkulah and Smyrna, Delaware. |
| `client/src/pages/Resources.tsx` (new) | Clearly forthcoming resource structure with useful links to existing SAFE and Insights content. |
| `client/src/pages/Results.tsx` | Retains empty typed recap/case-study structures and the existing testimonial verbatim; simplifies copy and removes the webinar-count proof claim. |
| `client/src/pages/BookAppointment.tsx` | Refines the shared owner/partner booking introduction; avoids a hard-coded duration claim in the eyebrow. Existing scheduling integration remains. |
| `client/src/pages/Courses.tsx` | Identifies the catalog as individual learning; existing course availability, pricing, and enrollment links remain. |
| `client/src/pages/CustomAIAssistant.tsx` | Aligns metadata with project-based implementation for business owners. |
| `client/src/pages/PastWebinars.tsx` | Removes aggregate and per-session attendance figures from the UI pending confirmation. |
| `client/src/components/OfferLadder.tsx` (new) | Reusable ordered ladder shared by Home and Offers; emphasizes the paid Pilot without duplicating offer copy. |
| `client/src/components/PageLayout.tsx` (new) | Shared accessible page structure, navigation, footer, headings, and per-page metadata for the new/reworked pages. |
| `client/src/components/WorkshopSection.tsx` (new) | Preserves the existing September 10 workshop details and lead-form integration on the learning page; switches to future-workshop messaging after the scheduled start. Carries forward Event structured data. Removes the per-second countdown. |
| `client/src/components/Navigation.tsx` | Four core owner links plus Pilot action; active-page semantics, skip link, scrollable mobile menu, supporting mobile links, and a larger close target. |
| `client/src/components/Footer.tsx` | Groups links into Work together, Explore, and EaseIntoAI; separates newsletter signup; clarifies Smyrna location and improves muted text visibility. |
| `client/src/components/ProcessInfographicSection.tsx` | Reuses the existing design vocabulary for the exact EASE sequence, shared by Home, Pilot, and How It Works. |
| `client/src/components/SafeCheckSection.tsx` | Keeps the four SAFE definitions; replaces fear/timing claims with calm instructions, includes protection before tool input, and supports anchored navigation. |
| `client/src/components/AboutSection.tsx` | Practical founder copy, Smyrna location, existing photo with a more useful CSS crop, and contact link. |
| `client/src/components/ChatWidget.tsx` | Removes the continuous pulsing ring so the assistant does not compete for attention with the main action. |
| `client/src/components/booking/BookingForm.tsx` | Owner/organization selection, organization-link default, qualification carried through the existing topic field, clearer prompt, and accessible validation messages. Topic input limit leaves room for the role prefix within the form’s previous 500-character allowance. |
| `client/src/lib/offerData.ts` (new) | Central source for the Pilot name, booking link, and EASE steps. |
| `client/src/lib/appointments.ts` | Replaces developer configuration instructions in the public error message with an actionable contact fallback. |
| `client/src/App.tsx` | Registers new routes, provides consistent skip targets, respects reduced motion during anchor scrolling, and preserves `/#upcoming` links by forwarding them to `/individual-learning#upcoming`. |
| `client/src/hooks/useSEO.ts` | Owner-focused default title. |
| `client/index.html` | Owner-focused metadata and organization description, Smyrna structured address, existing-logo favicon, and removal of the mobile zoom restriction. |
| `client/public/sitemap.xml` | Adds Offers, Individual Learning, About, Resources, and booking routes. |
| `client/public/llms.txt` | Updates the page directory, EASE definition, service ladder, location, and the booking next step. |
| `docs/business-plan-handoff.md` (new) | This file-by-file handoff and remaining business decisions. |

## Decisions and uncertainties

- Retained Inter and existing CSS tokens. The logo contains `#6366F1`, while button styling uses the existing accent token. No global palette or font change was made.
- The exact Esther / House Of Zion testimonial was already in the repository and remains unchanged.
- No specific Delaware/OpenAI or library certificate claims were added. The site expresses the adoption-gap positioning without relying on unverified partnership or certification language.
- Historical articles and course records remain available. This work is not an independent verification of historical claims or external course checkout availability.
- The configured Supabase appointment hostname failed DNS resolution during local browser QA. The email fallback works. Confirm the current Supabase project/configuration before relying on live scheduling. Newsletter and workshop delivery use the existing lead integration and were not submitted to a live service.
- The assistant’s remote knowledge base was not changed; it should be reviewed separately if it is expected to answer questions about this finalized offer.
- The two pre-existing missing imports (`AIChatBox` in the unrouted showcase and the deleted Drizzle schema export) have been removed. `pnpm check` and the production build pass. The existing large-bundle warning remains.

## Follow-up: remove the detailed services section

Removed the “We build it around your business” section from Offers at the owner’s request, including the four service cards and section CTA. Removed unused service data. The existing ladder remains; its done-for-you action and the Pilot’s related link now lead directly to `/book` instead of the removed section. This supersedes the detailed-service-section descriptions above.

## Launch preparation — September 10, 2026

Status: local launch fixes completed and tested; **not yet ready for a public launch**. No production or preview deployment was made. Existing production domain and remote databases were not changed.

### Completed locally

- Added `/privacy` and `/terms`, linked from the footer and relevant forms. The privacy notice describes the services in the code: Vercel, Supabase, Resend, Google Calendar, Twilio, Google Fonts, and external Gumroad checkout. Owner should confirm this reflects actual business practices before publishing; no retention period or pricing was invented.
- Newsletter failures now stay visible with a contact fallback. Lead and booking errors avoid internal configuration details. Confirmation copy does not claim an email was delivered merely because a database write succeeded.
- Hidden the assistant pending remote service/knowledge-base verification.
- Replaced the placeholder video room with an optional `BOOKING_VIDEO_URL` Edge Function variable. Frontend hides video without a valid HTTPS room; backend rejects unconfigured video bookings.
- Escaped submitted names, phone numbers, email addresses, and notes in transactional email HTML.
- Rescheduling now keeps the original appointment until the replacement time is saved. Failed availability checks and competing bookings no longer release the original appointment. Cancellation checks the database write before removing the calendar event.
- Appointment management pages use no-index/no-referrer metadata and omit access tokens from canonical/social URLs. Vercel response headers reinforce this on deployment.
- Installed `@vercel/analytics` and prepared public page analytics, **disabled by default**. Enable Web Analytics in the Vercel project, then set `VITE_ANALYTICS_ENABLED=true` for the intended deployment. The integration strips URL query strings/fragments and discards appointment management page events. No custom paid analytics events added.
- Added `.vercelignore` to keep local environment files, marketing data, and internal directories out of a future source deployment.
- The expired September 10 workshop automatically shows future-workshop messaging. No replacement date was invented.

### Verification

- `pnpm check`: pass.
- `pnpm test`: 15 tests pass, including unsafe video configuration, HTML escaping, failed rescheduling, slot conflicts, successful rescheduling, and cancellation write failure. External services are mocked.
- `pnpm build`: pass; main JavaScript remains approximately 989 kB / 283 kB gzip. Further route splitting is a performance follow-up.
- Browser smoke check: 16 routes at desktop 1440 px and mobile 390 px, no horizontal overflow, blank pages, runtime exceptions, or framework overlays. Pilot, partner, mobile navigation, SAFE anchor, and legacy workshop link flows pass.
- Mock booking: owner and organization qualification, validation, phone-only fallback, confirmations, empty slots, and service failure states pass. No real appointments created.
- Built-site check at `http://127.0.0.1:4173`: page rendering, expired workshop state, absence of placeholders/assistant, persistent newsletter errors, legal links, mobile booking fallback, and private-page metadata cleanup pass.
- Live apex domain redirects to `www.easeintoai.co`; the www site returns HTTPS 200. Both available Gumroad product URLs return 200, but checkout/payment was not tested.

### Required before publishing

1. **Restore Supabase:** configured project `jtkreaiwtfikvriodojm.supabase.co` fails DNS resolution even outside the local sandbox. Confirm the active project URL or restore the project, then configure the correct public URL/anon key in local and Vercel environments. Never put service-role keys in browser variables.
2. Deploy and verify the updated `appointments` Edge Function in that project. Verify availability rules, Google Calendar access, Resend configuration, and the actual meeting room (or launch phone-only).
3. Submit a clearly labeled real booking and registration to an owner-approved test recipient. Confirm database persistence, attendee/owner email, calendar entry, cancellation/reschedule, and event SMS if applicable. No real messages were sent during this work.
4. Sign in to Vercel and verify deployment protection for project `webinar` in `emmanuel-s-projects-eb807b09`. The CLI account exists, but the browser dashboard was signed out; private-preview protection has not been confirmed. Prepare a protected preview after confirmation, then review it before production promotion.
5. Confirm the privacy/terms content and actual newsletter handling. Enable analytics only after the dashboard is configured. Approve any future workshop date before restoring registration.

An automatic approval review rejected a script that would have read the Vercel CLI token and requested decrypted environment values. That script was not executed. The remaining configuration review requires normal authenticated dashboard access or owner-supplied configuration; no workaround was used to retrieve those secrets.
