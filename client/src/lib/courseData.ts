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
      "The perfect starting point. No jargon, no hype — just a clear, honest introduction to what AI is, how it works in everyday life, and how to stop feeling overwhelmed by it.",
    longDescription:
      "Most people feel overwhelmed by AI because nobody has taken the time to explain it clearly. This free one-hour course changes that. We strip away the jargon, skip the hype, and give you a grounded, practical understanding of what AI actually is — and what it isn't. By the end, you'll have a foundation you can build on.",
    type: "free",
    duration: "1 hour",
    modules: [
      "What AI actually is (and what it's not)",
      "How AI shows up in your everyday life",
      "The biggest misconceptions — debunked",
      "Your roadmap for getting started",
    ],
    status: "available",
    enrollUrl: "https://easeintoai.gumroad.com/l/UnderstandAIWithouttheConfusion",
    whoIsItFor: [
      "Complete beginners who feel lost every time AI comes up",
      "Professionals who want to understand AI without learning to code",
      "Anyone who's curious but doesn't know where to start",
    ],
    whatYouWillLeave: [
      "A clear mental model of how AI works",
      "Confidence to explore AI tools on your own",
      "Zero confusion about the terms everyone keeps using",
      "A personal roadmap for the next step in your AI learning",
    ],
  },
  {
    id: 2,
    slug: "ai-foundations-from-curious-to-confident",
    title: "AI Foundations: From Curious to Confident",
    description:
      "The complete beginner-to-capable journey. Five structured modules covering everything from understanding AI to building a daily workflow — all in one place, at your own pace.",
    longDescription:
      "This is the most complete AI course for non-technical learners. Five modules, built in a logical sequence, that take you from \"I don't know where to start\" to \"I use AI every single day.\" Everything covered in the webinar series, packaged into a self-paced format you can work through on your schedule.",
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
    enrollUrl: "https://easeintoai.gumroad.com/l/ai-foundations-curious-to-confident",
    whoIsItFor: [
      "Beginners who want a structured, end-to-end AI education",
      "Professionals looking to integrate AI into their daily work",
      "Anyone who attended the webinar series and wants to go deeper",
    ],
    whatYouWillLeave: [
      "A working AI toolkit you actually use every day",
      "Prompt writing skills that get consistent, high-quality results",
      "The ability to fact-check AI output and catch hallucinations",
      "A personal AI workflow built around your specific role",
      "A library of ready-to-use prompt templates",
    ],
  },
  {
    id: 3,
    slug: "prompt-engineering-masterclass",
    title: "Prompt Engineering Masterclass",
    description:
      "Go deep on the skill that separates casual AI users from people who get real results. Learn how to write prompts that are clear, specific, and consistently effective.",
    longDescription:
      "Prompting is the most important skill you can develop as an AI user. This focused two-hour masterclass teaches you exactly how to communicate with AI tools so you get outputs you can actually use. We go beyond the basics — you'll understand why prompts work, not just what to type.",
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
      "Built for professionals. Learn what's safe to share with AI, the best workplace use cases, and how to use AI output responsibly — so you can move faster without cutting corners.",
    longDescription:
      "AI at work is different from AI at home. There are data privacy concerns, professional standards, and workplace policies to navigate. This two-hour course gives you the knowledge and practical skills to use AI confidently in a professional context — without putting your job or your company at risk.",
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
      "A practical, six-module course built specifically for educators. Learn how to use AI to plan lessons, create worksheets, give feedback, communicate with parents, build classroom resources, and automate time-consuming tasks.",
    longDescription:
      "Teachers are one of the professionals who stand to benefit most from AI — and one of the groups with the least time to figure it out on their own. This course was built specifically for educators. Six focused modules cover everything from the basics to advanced time-saving workflows, all in the context of real classroom situations. No tech background needed.",
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
      "The ability to plan a full lesson in minutes, not hours",
      "Worksheet and assessment templates you can customize instantly",
      "A parent communication system that sounds like you, not a robot",
      "Automated grading and feedback workflows",
      "Presentation and visual creation skills using free AI tools",
      "A personal automation system for your most time-consuming tasks",
    ],
  },
  {
    id: 6,
    slug: "ai-for-women-entrepreneurs",
    title: "AI for Women Entrepreneurs & Small Business Owners",
    description:
      "Built for coaches, consultants, creators, and local business owners. Learn how to use AI to create content, communicate with clients, shape offers, and set up simple automations — no tech background required.",
    longDescription:
      "You're running a business — not a tech company. Between marketing, content, client messages, bookings, and the actual work you do, AI can feel like one more thing you don't have time to learn. This course is built specifically for women entrepreneurs and small business owners: coaches, consultants, creators, and local business owners running salons, studios, boutiques, and food trucks. Six focused modules show you how to put AI to work in the business you already have — in plain language, with real examples from women-led businesses.",
    type: "paid",
    price: "$49",
    priceAmount: 49,
    duration: "6 modules",
    audience: "Women Entrepreneurs & Small Business Owners",
    featured: true,
    modules: [
      "Module 1 — AI Basics for Business Owners (No Tech Background Needed)",
      "Module 2 — Content That Sounds Like You: Social Media, Email & Captions",
      "Module 3 — Clients & Communication: Inquiries, Follow-Ups & No-Shows",
      "Module 4 — Offers & Pricing: Shape a Sellable Offer with AI",
      "Module 5 — Simple Automations: Booking Reminders, FAQs & Intake Forms",
      "Module 6 — The SAFE Check: Using AI Responsibly with Client Information",
    ],
    status: "coming-soon",
    enrollUrl: undefined,
    whoIsItFor: [
      "Coaches, consultants, creators, and online service providers",
      "Owners of local businesses — salons, studios, boutiques, food trucks, and other service businesses",
      "Women who feel behind on AI and don't have time to learn it by trial and error",
    ],
    whatYouWillLeave: [
      "Hours back every week on content, emails, and admin",
      "A system for turning one idea into a month of social media and email content",
      "Client communication drafts — inquiries, follow-ups, no-shows — that still sound like you",
      "A clear, well-priced offer shaped with AI as your thinking partner",
      "Simple automations: booking reminders, FAQ replies, intake forms",
      "The SAFE Check habit for anything AI writes under your business's name",
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
