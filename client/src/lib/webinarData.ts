export interface Webinar {
  id: number;
  title: string;
  date: string;
  attendees: string;
  duration: string;
  description: string;
  outcomes: string[];
  status: "completed";
}

export const pastWebinars: Webinar[] = [
  {
    id: 1,
    title: "Understand AI Without the Confusion",
    date: "February 14, 2025",
    attendees: "50+",
    duration: "1 hour",
    description:
      "A practical introduction to artificial intelligence designed for people who are curious but unsure where to start. No technical background required.",
    outcomes: [
      "What AI actually is and what it is not",
      "How AI works in everyday life",
      "Common misconceptions vs reality",
      "A roadmap for continued learning",
    ],
    status: "completed",
  },
  {
    id: 2,
    title: "AI Tools You Can Start Using Today",
    date: "February 28, 2026",
    attendees: "75+",
    duration: "1 hour",
    description:
      "Hands-on walkthrough of real AI tools — ChatGPT, Claude, Canva AI, and more — with live demos and practical workflows you can apply immediately.",
    outcomes: [
      "Hands-on AI tool demonstrations",
      "Practical workflows you can use today",
      "Live Q&A with real-time answers",
      "Resources to continue learning",
    ],
    status: "completed",
  },
  {
    id: 3,
    title: "Prompt Engineering: Get Better Results From AI",
    date: "March 14, 2026",
    attendees: "100+",
    duration: "1 hour",
    description:
      "A hands-on session on writing prompts that actually work. We covered structure, clarity, context, and common mistakes — so attendees can get better results from ChatGPT, Claude, and any AI assistant.",
    outcomes: [
      "How to structure prompts for clarity and consistency",
      "Using examples and context to improve outputs",
      "Common mistakes and how to avoid them",
      "Live Q&A and practice prompts together",
    ],
    status: "completed",
  },
  {
    id: 4,
    title: "Build Your AI Workflow: Make AI Part of Your Daily Life",
    date: "March 28, 2026",
    attendees: "100+",
    duration: "1 hour",
    description:
      "A hands-on session on turning occasional AI use into a reliable daily habit — mapping your week, identifying where AI saves real time, and building prompt templates you'll actually use.",
    outcomes: [
      "Map your week — spot where AI saves you real time",
      "Build a simple morning or weekly AI routine",
      "Combine ChatGPT, Claude & Canva AI on one real project",
      "Walk away with ready-to-save prompt templates",
    ],
    status: "completed",
  },
  {
    id: 5,
    title: "Hallucinations & Fact-Checking: When AI Gets It Wrong",
    date: "April 11, 2026",
    attendees: "100+",
    duration: "1 hour",
    description:
      "AI can sound confident and still be completely wrong. This session broke down what hallucinations are, why they happen, and how to build simple habits to verify AI output — so you can use AI more effectively without being misled.",
    outcomes: [
      "What AI hallucinations are and why they happen",
      "How to spot unreliable or fabricated AI output",
      "Simple fact-checking habits to verify AI responses",
      "Tools and strategies for safer AI use",
    ],
    status: "completed",
  },
];
