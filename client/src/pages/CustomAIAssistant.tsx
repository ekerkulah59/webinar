import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Handshake,
  Layers,
  MessageSquare,
  Search,
  Settings2,
  Shield,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";
import { JsonLd } from "@/components/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DISCOVERY_CALL_URL = (
  import.meta.env.VITE_DISCOVERY_CALL_URL ?? ""
).trim() ||
  "mailto:theaibootcamp09@gmail.com?subject=Discovery%20Call%20%E2%80%94%20Custom%20AI%20Assistant";

const CONTACT_EMAIL = "theaibootcamp09@gmail.com";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const useCaseCategories = [
  {
    icon: MessageSquare,
    title: "Customer communication",
    explanation:
      "Reply to clients faster and more consistently, in a voice that sounds like your business.",
    examples: [
      "Draft answers to common questions about your services, pricing, and availability",
      "Write first-pass replies to inquiry emails for you to review and send",
      "Turn a rough note into a polished, on-brand follow-up message",
    ],
  },
  {
    icon: BookOpen,
    title: "Internal operations",
    explanation:
      "Give your team a reliable place to look things up so the same questions stop landing on you.",
    examples: [
      "Answer 'how do we handle this?' from your own process notes and SOPs",
      "Help new hires or contractors find service details during onboarding",
      "Summarize a long document or thread into the key points your team needs",
    ],
  },
  {
    icon: FileText,
    title: "Admin & content support",
    explanation:
      "Take the repetitive writing and prep work off your plate while you stay in control of the final version.",
    examples: [
      "Draft social posts, newsletters, or proposals from your offers and examples",
      "Prepare meeting briefs, intake summaries, and recurring checklists",
      "Reformat or tidy up rough text into clean, ready-to-edit drafts",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "We start with a conversation",
    description:
      "A short, no-pressure call to understand your business, who'll use the assistant, and the tasks you'd like to make easier.",
    icon: Search,
  },
  {
    step: "02",
    title: "You share what makes you, you",
    description:
      "I give you a simple checklist of materials to send — services, FAQs, docs, and examples. No technical prep, just what you already have.",
    icon: Layers,
  },
  {
    step: "03",
    title: "I build it around your work",
    description:
      "I set up your assistant trained on your information and your tone — built for how your business actually runs, not a generic template.",
    icon: Wrench,
  },
  {
    step: "04",
    title: "We review it together",
    description:
      "You see it in action on real examples. We adjust answers and set clear boundaries together until it feels accurate and genuinely useful.",
    icon: Settings2,
  },
  {
    step: "05",
    title: "You're set up with confidence",
    description:
      "You get a plain-language walkthrough and simple tips, so you and your team can use it comfortably from day one — no jargon required.",
    icon: Handshake,
  },
];

const faqs = [
  {
    question: "What is a custom AI assistant?",
    answer:
      "It is a private AI helper built around your business — your services, FAQs, documents, and way of working. Instead of starting from scratch every time in a generic chat tool, you get responses grounded in what you actually offer and how you communicate.",
  },
  {
    question: "Do I need technical experience?",
    answer:
      "No. You do not need to code or manage complex systems. I handle the setup. You focus on sharing your business information and telling me what tasks you want help with. I explain everything in plain language.",
  },
  {
    question: "What businesses is this best for?",
    answer:
      "Service-based small businesses — coaches, consultants, creators, salons, studios, boutiques, agencies, and small teams who repeat similar work: client questions, content, onboarding, admin, and internal how-tos. It's built for the same audience as our webinars — women entrepreneurs and small business owners without a tech background. If you have clear offers and documented processes (even informal ones), you are a strong fit.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Typical inputs include your website copy, service descriptions, FAQs, email templates, SOPs, intake forms, and examples of messages you are proud of. We will agree on a simple list during discovery so nothing feels overwhelming.",
  },
  {
    question: "Can it be updated later?",
    answer:
      "Yes. Offers change, policies update, and new services launch. We can refresh your assistant when your business evolves so it stays aligned with how you work today.",
  },
  {
    question: "Will it replace my team?",
    answer:
      "No. The goal is to reduce repetitive work and give your people faster access to your business knowledge — not to replace judgment, relationships, or the work only humans should do.",
  },
  {
    question: "Do you only work with local businesses?",
    answer:
      "I'm based in Delaware and work with business owners across the Mid-Atlantic — New Jersey, Maryland, Pennsylvania, Virginia, New York, and the Washington, DC area — as well as nationwide. Everything is fully remote: the discovery call, setup, review, and walkthrough all happen over Zoom, so wherever you are, you're a fit.",
  },
  {
    question: "How do we start?",
    answer:
      "Book a discovery call. We will talk through your goals, whether a custom assistant is the right fit, and what the first version could look like. If it makes sense to move forward, I will outline next steps in plain language.",
  },
];

const whyPoints = [
  {
    icon: Award,
    title: "I teach it and I build it",
    text: "Most people either explain AI or install it. I do both — so you get a working assistant and actually understand how to use it, instead of a black box you're afraid to touch.",
  },
  {
    icon: Sparkles,
    title: "Everything explained in plain English",
    text: "The same beginner-friendly approach from the webinars carries into this work. No acronyms, no buzzwords — just clear answers to what it does and how to use it.",
  },
  {
    icon: Shield,
    title: "Honest about what AI can and can't do",
    text: "I'll tell you where AI genuinely saves time and where it shouldn't be trusted alone. If a custom assistant isn't the right fit for you, I'll say so.",
  },
  {
    icon: Building2,
    title: "Built around what saves you time",
    text: "This isn't about adopting AI for its own sake. We start from your repetitive work and clear boundaries — what should stay human-reviewed and what's safe to hand off.",
  },
];

export default function CustomAIAssistant() {
  useSEO({
    title: "Custom AI Assistant for Your Small Business",
    description:
      "A private AI assistant built on your business's services, FAQs, and brand voice. Based in Delaware — serving NJ, MD, PA, VA, NY, and the DC area, plus remote nationwide.",
    type: "website",
  });

  const discoveryLinkProps =
    DISCOVERY_CALL_URL.startsWith("mailto:")
      ? {}
      : { target: "_blank" as const, rel: "noopener noreferrer" };

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Custom AI Assistant Setup",
          serviceType:
            "Custom AI assistant setup and AI consulting for small businesses",
          description:
            "A private AI assistant built on a business's services, FAQs, documents, and brand voice — set up, reviewed together, and explained in plain language.",
          url: "https://easeintoai.co/custom-ai-assistant",
          provider: {
            "@type": "Organization",
            name: "EaseIntoAI",
            url: "https://easeintoai.co/",
          },
          areaServed: [
            "Delaware",
            "New Jersey",
            "Maryland",
            "Pennsylvania",
            "Virginia",
            "New York",
            "Washington, DC",
          ],
          availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: "https://easeintoai.co/custom-ai-assistant",
            availableLanguage: "English",
          },
        }}
      />
      <Navigation />

      {/* Hero */}
      <section
        id="hero"
        className="relative overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-8 right-0 w-[420px] h-[420px] bg-accent/8 rounded-full blur-[100px]" />
          <div className="absolute -bottom-16 -left-16 w-[360px] h-[360px] bg-accent/6 rounded-full blur-[90px]" />
        </div>

        <div className="container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-3xl mx-auto text-center md:text-left md:max-w-none md:mx-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium shadow-md mb-6">
                <Award className="w-4 h-4" aria-hidden />
                Implementation Services
              </div>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1] tracking-tight max-w-4xl"
              >
                Stop Explaining Your Business to Every AI Tool. 

{" "}
                <span className="text-accent">This One Already Knows It.</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Most AI assistants make you do all the work re-explaining your services, your prices, your process, every single conversation. A custom AI assistant built on your documents, your knowledge, and your voice answers like someone who's been on your team for years. From the very first message.
              </p>

             

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button variant="primary" size="lg" className="px-8" asChild>
                  <a href={DISCOVERY_CALL_URL} {...discoveryLinkProps}>
                    Book a Discovery Call
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </a>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="px-8"
                  onClick={() => scrollToSection("process")}
                >
                  See How It Works
                  <ChevronDown className="w-4 h-4" aria-hidden />
                </Button>
              </div>

            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl -z-10" aria-hidden />
              <img
                src="/herocustom.png"
                alt="Custom AI Assistant dashboard showing a follow-up email drafted in the business's brand voice"
                className="w-full h-auto rounded-2xl border border-border shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Problem */}
      <section
        id="problem"
        className="py-16 md:py-20"
        aria-labelledby="problem-heading"
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
                The challenge
              </p>
              <h2
                id="problem-heading"
                className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight"
              >
               Here's the Real Problem No One Talks About
              </h2>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              You've tried ChatGPT. Maybe Claude. Maybe a few others. And they're impressive but not helpful until you actually need them to help a real customer with a real question about your business.
Suddenly you're typing out your pricing again. Explaining your process again. Correcting answers that were close but just... wrong enough to erode trust.
The AI isn't broken. It just doesn't know you. <br /> <br /> 
And every time a customer gets a generic answer, a slow response, or no response at all  that's a lead getting colder. A sale walking away. A client quietly deciding to look elsewhere.
You didn't build your business by being generic. Your AI shouldn't be either.
              </p>
            </div>
            <img
              src="/custom.png"
              alt="Side-by-side comparison of a generic AI tool versus a custom AI assistant built for your business"
              className="w-full h-auto rounded-2xl border border-border shadow-lg"
              loading="lazy"
            />
          </div>

          <p className="mt-10 text-base md:text-lg text-foreground font-medium max-w-3xl leading-relaxed">
            You don&apos;t need a smarter chatbot — you need one that
            understands your business. That gap is exactly what a custom
            assistant is built to close.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Solution */}
      <section
        id="solution"
        className="py-16 md:py-20 bg-secondary/40"
        aria-labelledby="solution-heading"
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
                The solution
              </p>
              <h2
                id="solution-heading"
                className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight"
              >
                An Assistant That Already Knows Your Answers
              </h2>
              <div className="mt-6 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Instead of opening a blank chat and re-explaining your
                  business every time, you get an assistant that has already
                  read your materials — your services, documents, FAQs,
                  examples, and the tasks you do over and over. It starts the
                  conversation already up to speed.
                </p>
                <p>
                  It speaks in your tone and uses your terminology, so drafts
                  and answers sound like they came from your business. Think of
                  it as a well-briefed helper for drafting, quick lookups, and
                  repeat work in your brand voice — with clear lines around the
                  things that should still get a human review before they go
                  out.
                </p>
              </div>
            </div>

            <Card className="p-8 md:p-10 border-border/60 shadow-sm">
               
            <img
              src="/custmgpt.png"
              alt="What your AI assistant can be trained on: services and packages, FAQs, SOPs, templates, brand voice, and repeated tasks"
              className="w-full h-auto rounded-2xl border border-border shadow-lg bg-card"
              loading="lazy"
            />
            </Card>
          </div>

           

          <div className="mt-10 max-w-5xl rounded-xl border border-accent/25 bg-accent/[0.06] p-7 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent" aria-hidden />
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                A real example
              </span>
            </div>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Say you run a small skincare studio. A prospect emails asking
              what&apos;s included in your signature facial package and how
              booking works. You ask your assistant to draft a reply in your
              brand voice — and because it already knows your services, your
              pricing, and the way you explain your booking policy, it writes a
              clear, on-brand response in seconds. You read it over, adjust one
              line, and send. The repetitive part is done for you; the final
              call is still yours.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Use cases */}
      <section
        id="use-cases"
        className="py-16 md:py-20"
        aria-labelledby="use-cases-heading"
      >
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Use cases
            </p>
            <h2
              id="use-cases-heading"
              className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight"
            >
              Where a Custom Assistant Helps Day to Day
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              Most service businesses lose hours to the same handful of tasks.
              Here&apos;s where a custom assistant tends to help first, grouped
              by the part of your business it supports.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {useCaseCategories.map(({ icon: Icon, title, explanation, examples }) => (
              <article key={title} className="area-card p-7 flex flex-col">
                <div className="area-card-icon-chip mb-4">
                  <Icon className="w-5 h-5" aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {explanation}
                </p>
                <ul className="mt-5 space-y-3 border-t border-border/70 pt-5">
                  {examples.map((example) => (
                    <li key={example} className="flex gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-accent shrink-0 mt-0.5"
                        aria-hidden
                      />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {example}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted-foreground max-w-3xl">
            The assistant speeds up the repetitive parts and keeps your team
            focused on the work that needs a human — it doesn&apos;t replace
            the people who run your business.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Process */}
      <section
        id="process"
        className="py-16 md:py-20 bg-secondary/40"
        aria-labelledby="process-heading"
      >
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2
              id="process-heading"
              className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight"
            >
             From "I Have No Idea Where to Start" to "This Thing Knows My Business" in Four Steps
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              You don&apos;t need to know anything technical to get started.
              We work through it together, one clear step at a time, and you
              always know exactly what happens next.
            </p>
          </div>

          <div className="mb-12">
            <img
              src="/howitwork.png"
              alt="How it works flow: your documents, assistant setup, testing and refinement, then team use"
              className="w-full h-auto rounded-2xl border border-border shadow-lg bg-card"
              loading="lazy"
            />
          </div>

  


        </div>
      </section>

      <div className="section-divider" />

      {/* Why EaseIntoAI */}
      {/* <section
        id="why-easeintoai"
        className="py-16 md:py-20"
        aria-labelledby="why-heading"
      >
        <div className="container">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
                Why EaseIntoAI
              </p>
              <h2
                id="why-heading"
                className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight max-w-2xl"
              >
                An Educator Who Also Builds from Not Just a Consultant
              </h2>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                EaseIntoAI started by teaching everyday people how AI really
                works from practical webinars, courses, and plain-language
                guidance. That teaching background is exactly what makes the
                building part different: I don&apos;t just hand you a tool, I
                make sure you understand it and feel confident using it. You get
                both sides the explanation and the implementation  from one
                person who speaks human, not jargon.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {whyPoints.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-lg bg-accent/[0.06] pl-5 pr-5 py-5 border-l-4 border-l-accent surface-card surface-card-hover"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-accent" aria-hidden />
                      <p className="text-sm font-bold text-foreground">{title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-xl border border-border bg-card p-6 surface-card lg:sticky lg:top-28">
              <p className="text-sm font-semibold text-foreground">
                Already know EaseIntoAI?
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                If you&apos;ve sat in on a webinar or taken a course, you already
                know how this goes: patient, practical, and free of hype. This
                service is the natural next step from the same approach, now applied
                directly inside your business instead of in a classroom.
              </p>
              <Button variant="primary" className="w-full mt-6" asChild>
                <a href={DISCOVERY_CALL_URL} {...discoveryLinkProps}>
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </a>
              </Button>
            </aside>
          </div>
        </div>
      </section> */}

      <div className="section-divider" />

      {/* FAQ */}
      <section
        id="faq"
        className="py-16 md:py-20 bg-secondary/40"
        aria-labelledby="faq-heading"
      >
        <div className="container max-w-3xl">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight"
          >
            Common Questions
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed mb-8">
            Straight answers — the same way we handle questions in webinars and
            courses.
          </p>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <div className="section-divider" />

      {/* Final CTA */}
      <section
        id="contact"
        className="py-16 md:py-24"
        aria-labelledby="cta-heading"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-accent/25 bg-accent/[0.06] px-6 py-12 md:px-12 md:py-16">
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight"
            >
              Your Business Is One-of-a-Kind. Your AI Should Be Too.
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            In 30 minutes, we'll map out exactly what a custom AI assistant could do for your specific business what it would know, how it would respond, and what that means for your time and revenue.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="px-8" asChild>
                <a href={DISCOVERY_CALL_URL} {...discoveryLinkProps}>
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </a>
              </Button>
              <Button variant="secondary" size="lg" className="px-8" asChild>
                <a href={`mailto:${CONTACT_EMAIL}?subject=Custom%20AI%20Assistant%20%E2%80%94%20Question`}>
                  Email Me Instead
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Prefer email?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent font-medium hover:text-accent/80 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Based in Delaware · Serving business owners in New Jersey,
              Maryland, Pennsylvania, Virginia, New York, and the Washington,
              DC area · All services fully remote, available nationwide
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
