export interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  type: "free" | "paid";
  price?: string;
  priceAmount?: number;
  duration: string;
  modules: string[];
  status: "coming-soon" | "available";
  audience?: string;
  featured?: boolean;
  enrollUrl?: string;
  whoIsItFor: string[];
  whatYouWillLeave: string[];
}

export const courses: Course[] = [
  {
    id: 1,
    slug: "ai-101-understand-ai",
    title: "AI 101: Understand AI Without the Confusion",
    description:
      "A clear, grounded introduction to what AI is, how it appears in everyday life, and how to decide what you want to learn next.",
    longDescription:
      "If AI explanations have felt technical, rushed, or disconnected from daily life, this free one-hour course offers a clearer starting point. It explains what AI is, what it is not, and where you may already encounter it so you can choose your next step with more confidence.",
    type: "free",
    duration: "1 hour",
    modules: [
      "What AI actually is (and what it's not)",
      "How AI shows up in your everyday life",
      "The biggest misconceptions — debunked",
      "Your roadmap for getting started",
    ],
    status: "available",
    enrollUrl:
      "https://easeintoai.gumroad.com/l/UnderstandAIWithouttheConfusion",
    whoIsItFor: [
      "People who want a clear starting point when AI comes up",
      "Professionals who want to understand AI without learning to code",
      "Anyone who's curious but doesn't know where to start",
    ],
    whatYouWillLeave: [
      "A clear mental model of how AI works",
      "Confidence to explore AI tools on your own",
      "A clearer understanding of commonly used AI terms",
      "A personal roadmap for the next step in your AI learning",
    ],
  },
  {
    id: 2,
    slug: "ai-foundations-from-curious-to-confident",
    title: "AI Foundations: From Curious to Confident",
    description:
      "Five structured modules that move from understanding AI to prompting, fact-checking, and building a workflow you can adapt to your own needs.",
    longDescription:
      "This self-paced course brings the core EaseIntoAI webinar topics into one structured sequence. Move from a clear explanation of AI into tools, prompting, workflow design, and fact-checking, then decide which practices are genuinely useful in your role or routine.",
    type: "paid",
    price: "$39",
    priceAmount: 39,
    duration: "5+ hours",
    modules: [
      "Module 1 — Understanding AI Without the Confusion",
      "Module 2 — AI Tools You Can Start Using Today",
      "Module 3 — Prompt Engineering: Get Better Results",
      "Module 4 — Build Your AI Workflow",
      "Module 5 — Hallucinations & Fact-Checking",
      "Bonus: Prompt templates & cheat sheets",
    ],
    status: "available",
    enrollUrl:
      "https://easeintoai.gumroad.com/l/ai-foundations-curious-to-confident",
    whoIsItFor: [
      "Beginners who want a structured, end-to-end AI education",
      "Professionals looking to integrate AI into their daily work",
      "Anyone who attended the webinar series and wants to go deeper",
    ],
    whatYouWillLeave: [
      "A practical AI toolkit you can adapt to your routine",
      "Prompt-writing habits for clearer, more relevant first drafts",
      "The ability to fact-check AI output and catch hallucinations",
      "A draft AI workflow built around your specific role",
      "A library of ready-to-use prompt templates",
    ],
  },
  {
    id: 3,
    slug: "prompt-engineering-masterclass",
    title: "Prompt Engineering Masterclass",
    description:
      "Learn how context, examples, constraints, and clear requests can produce more relevant AI responses—and how to revise when they do not.",
    longDescription:
      "This planned two-hour masterclass focuses on communicating clearly with AI tools. It goes beyond formulas to explain why context, examples, constraints, and output formats matter, with practice diagnosing prompts that are not working.",
    type: "paid",
    price: "$19",
    priceAmount: 19,
    duration: "2 hours",
    modules: [
      "Why most prompts fail (and how to fix them)",
      "The structure of a great prompt",
      "Using context, examples, and formatting",
      "Live rewrites: before vs. after",
      "20 ready-to-use prompt templates",
    ],
    status: "coming-soon",
    enrollUrl: undefined,
    whoIsItFor: [
      "AI users who want better, more consistent results",
      "Writers, marketers, and professionals who use AI for content",
      "Anyone frustrated that AI doesn't \"get\" what they're asking for",
    ],
    whatYouWillLeave: [
      "A repeatable framework for writing any prompt",
      "20 prompt templates you can use immediately",
      "The ability to diagnose and fix prompts that aren't working",
      "A sharper understanding of how AI interprets instructions",
    ],
  },
  {
    id: 4,
    slug: "ai-at-work",
    title: "AI at Work: Using AI in Your Job Confidently",
    description:
      "Built for professionals. Explore common workplace use cases, what may be unsafe to share, and how to review AI output without cutting corners.",
    longDescription:
      "AI at work brings data privacy, professional standards, and workplace policies into the picture. This planned two-hour course helps professionals identify appropriate tasks, protect sensitive information, and review AI-assisted work with those responsibilities in mind.",
    type: "paid",
    price: "$19",
    priceAmount: 19,
    duration: "2 hours",
    modules: [
      "What's safe to share with AI at work — and what's not",
      "AI for emails, reports & meeting summaries",
      "Using AI output responsibly in your role",
      "Build your personal AI policy",
      "Live demo: real workplace workflows",
    ],
    status: "coming-soon",
    enrollUrl: undefined,
    whoIsItFor: [
      "Professionals who want to use AI at work but aren't sure where to start",
      "Managers who want to understand what AI can (and can't) do for their team",
      "Anyone navigating workplace policies around AI tools",
    ],
    whatYouWillLeave: [
      "A clear understanding of what's safe to share with AI tools",
      "Practical workflows for emails, reports, and meeting summaries",
      "A personal AI usage policy you can actually follow",
      "Confidence to use AI in your role without second-guessing yourself",
    ],
  },
  {
    id: 5,
    slug: "ai-basics-for-teachers",
    title: "AI Basics for Teachers",
    description:
      "A planned six-module course for educators exploring AI-assisted lesson planning, classroom resources, feedback, communication, and repeated administrative work.",
    longDescription:
      "Educators need AI guidance that accounts for classroom context, student information, school policies, and professional judgment. This planned course uses familiar teaching tasks to explore where AI may help, what requires careful review, and what should remain with the educator.",
    type: "paid",
    price: "$49",
    priceAmount: 49,
    duration: "6 modules",
    audience: "Teachers & Educators",
    featured: false,
    modules: [
      "Module 1 — AI Basics for Teachers",
      "Module 2 — Lesson Planning with AI",
      "Module 3 — Worksheets, Assessments & Differentiation",
      "Module 4 — Grading, Feedback & Parent Communication",
      "Module 5 — Presentations, Visuals & Classroom Resources",
      "Module 6 — Automation & Advanced Time-Saving Systems",
    ],
    status: "coming-soon",
    enrollUrl: undefined,
    whoIsItFor: [
      "K–12 teachers at any tech comfort level",
      "Higher-ed educators looking to save time on admin work",
      "Teachers who've heard about AI but aren't sure how it applies to their classroom",
    ],
    whatYouWillLeave: [
      "A repeatable starting process for lesson planning",
      "Worksheet and assessment templates you can adapt and review",
      "A parent-communication drafting process that preserves your judgment",
      "Ideas for educator-reviewed grading and feedback support",
      "Presentation and visual creation skills using free AI tools",
      "A personal automation system for your most time-consuming tasks",
    ],
  },
  {
    id: 6,
    slug: "ai-for-women-entrepreneurs",
    title: "AI for Women Entrepreneurs & Small Business Owners",
    description:
      "A planned program for women growing beauty, wellness, event, rental, coaching, creative, local-service, and product businesses who want to apply AI to real work in plain language.",
    longDescription:
      "You're running a business—not a tech company. Between full-time work, clients, bookings, products, events, content, and the work only you can do, AI can feel like one more thing to learn. This course is built for women growing salons, spas, event and rental businesses, coaching practices, creative platforms, boutiques, and other local or product-based businesses. Six focused modules show you how to apply AI to the business you already have, in plain language, while you remain in control.",
    type: "paid",
    price: "$49",
    priceAmount: 49,
    duration: "6 modules",
    audience: "Women Entrepreneurs & Small Business Owners",
    featured: true,
    modules: [
      "Module 1 — AI Basics for Business Owners (No Tech Background Needed)",
      "Module 2 — Content That Sounds Like You: Planning, Posts & Promotions",
      "Module 3 — Customer Experience: Inquiries, Bookings & Preparation",
      "Module 4 — Offers & Operations: Services, Packages, Quotes & Checklists",
      "Module 5 — Reusable Processes: FAQs, Follow-Ups & Business Procedures",
      "Module 6 — The SAFE Check: Using AI Responsibly with Client Information",
    ],
    status: "coming-soon",
    enrollUrl: undefined,
    whoIsItFor: [
      "Beauty, wellness, event, rental, coaching, writing, and content businesses",
      "Owners of local-service, boutique, and product-based businesses",
      "Women who feel behind on AI and don't have time to learn it by trial and error",
    ],
    whatYouWillLeave: [
      "Reusable processes for the repetitive work around your expertise",
      "A system for turning one idea into useful content and promotions",
      "Customer-response, quote, service-description, and follow-up drafts you can revise into your own voice",
      "Clear packages and offers shaped with AI as a thinking partner",
      "Practical workflows for bookings, FAQs, checklists, and business procedures",
      "The SAFE Check habit for anything AI writes under your business's name",
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(c => c.slug === slug);
}
