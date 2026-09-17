import PageLayout from "@/components/PageLayout";

export default function Privacy() {
  return (
    <PageLayout
      title="Privacy"
      eyebrow="Your information"
      heading="Privacy at EaseIntoAI"
      description="How information submitted through this website is used, and how to contact us about it."
    >
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl space-y-8 text-base leading-relaxed text-muted-foreground">
          <p className="text-sm">Updated September 10, 2026</p>
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              Information you provide
            </h2>
            <p>
              Newsletter signup asks for your email address. Workshop
              registration asks for your name, email, and phone number. Booking
              asks for your name, email, preferred time, and whether you are a
              business owner or an organization partner. A phone call also
              requires your phone number. You can choose to include a short
              description of what you want to discuss.
            </p>
            <p>
              Please leave passwords, financial account details, customer
              records, and other sensitive information out of forms and booking
              notes.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              How it is used
            </h2>
            <p>
              We use submitted details to respond to you, manage registrations
              and appointments, and send the updates you request. Workshop phone
              numbers support event reminders. Booking details support
              scheduling, confirmation emails, and calendar entries.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              Services that support the website
            </h2>
            <p>
              The site is hosted on Vercel. Forms and scheduling use Supabase;
              appointment emails use Resend and scheduling uses Google Calendar.
              Workshop reminders use Twilio. These services
              process information needed for their respective functions. Hosting
              services may process technical request information, such as an IP
              address, to operate and protect the site.
            </p>
            <p>
              Course purchase links take you to Gumroad, which handles its own
              checkout and privacy practices. External meeting, video, and
              course services have their own privacy notices. Fonts are loaded
              from Google Fonts.
            </p>
            {import.meta.env.VITE_ANALYTICS_ENABLED === "true" && (
              <p>
                We use Vercel Web Analytics to understand visits to public
                pages. Our integration excludes appointment management pages and
                removes query strings and URL fragments from page addresses
                before sending analytics events.
              </p>
            )}
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              Your choices and questions
            </h2>
            <p>
              To ask about information you submitted, request a correction or
              deletion, or stop receiving updates, email{" "}
              <a
                className="font-medium text-accent underline underline-offset-4"
                href="mailto:hello@easeintoai.co"
              >
                hello@easeintoai.co
              </a>
              . Include the email address you used and the request you want us
              to handle.
            </p>
            <p>
              Keep your appointment management link private: anyone with that
              link can view and manage the appointment.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
