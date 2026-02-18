export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "ai-news" | "tutorial" | "opinion" | "webinar-recap";
  date: string;
  readTime: string;
  featured?: boolean;
}

export const CATEGORIES: Record<BlogPost["category"], { label: string; color: string }> = {
  "ai-news": { label: "AI News", color: "bg-blue-100 text-blue-700" },
  tutorial: { label: "Tutorial", color: "bg-green-100 text-green-700" },
  opinion: { label: "My Take", color: "bg-purple-100 text-purple-700" },
  "webinar-recap": { label: "Webinar Recap", color: "bg-amber-100 text-amber-700" },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "openai-gpt5-what-it-means",
    title: "GPT-5 Is Here — What It Actually Means for Everyday Users",
    excerpt:
      "OpenAI's latest model is making headlines. But beyond the hype, what does it change for people who aren't developers? Here's my honest breakdown.",
    content: `
## The Headlines vs. Reality

Every major AI release comes with a wave of breathless headlines. GPT-5 is no different. You'll see claims about it being "nearly human" or "revolutionary." Let me cut through that.

**What actually improved:**
GPT-5 is significantly better at understanding context over long conversations, following complex instructions, and reasoning through multi-step problems. For everyday users, this means fewer moments where the AI "forgets" what you asked or gives you an off-topic answer.

**What didn't change:**
AI still doesn't "understand" anything the way humans do. It still makes confident-sounding mistakes. It still needs you to be specific about what you want.

## What This Means for You

If you're already using AI tools at work or in your personal life, GPT-5 makes those tools more reliable. Think of it like upgrading from a decent calculator to a better one — it doesn't change what math is, but it makes fewer errors.

If you haven't started using AI yet, this is actually a good time to begin. The tools are getting easier to use, and the gap between "AI expert" and "AI beginner" is shrinking.

## My Recommendation

Don't chase every new model release. Instead, focus on building good habits with whatever AI tool you're currently using. Learn to write clear prompts, verify outputs, and understand the limitations.

The best AI user isn't the one with the newest model — it's the one who knows how to ask good questions.
    `.trim(),
    category: "ai-news",
    date: "February 10, 2026",
    readTime: "4 min read",
    featured: true,
  },
  {
    slug: "ai-tools-you-can-use-today",
    title: "5 AI Tools You Can Start Using Today (No Tech Skills Needed)",
    excerpt:
      "You don't need to be a programmer to benefit from AI. Here are five tools that are free, beginner-friendly, and immediately useful.",
    content: `
## Why Most People Haven't Started Yet

The biggest barrier to using AI isn't access — it's overwhelm. There are hundreds of AI tools, and most articles about them assume you already know what you're doing.

This post is different. These five tools require zero technical background, and each one solves a real problem.

## 1. ChatGPT (Free Tier)

**What it does:** Answers questions, helps you write, brainstorms ideas, explains concepts.

**Start here:** Open chat.openai.com, create a free account, and ask it to "explain [something you're curious about] like I'm a complete beginner."

## 2. Claude by Anthropic

**What it does:** Similar to ChatGPT, but tends to be more thoughtful and careful in its responses. Great for longer documents and analysis.

**Start here:** Go to claude.ai and try asking it to review something you've written — an email, a report, or even a social media post.

## 3. Canva Magic Write

**What it does:** Generates text for presentations, social media posts, and marketing materials directly inside Canva's design tool.

**Start here:** If you already use Canva, click the "Magic Write" button next time you're working on a design.

## 4. Otter.ai

**What it does:** Transcribes meetings and conversations in real-time. Generates summaries and action items automatically.

**Start here:** Install it before your next meeting and let it run in the background. Review the summary afterward.

## 5. Notion AI

**What it does:** Helps you organize notes, summarize documents, and generate content inside your Notion workspace.

**Start here:** If you use Notion, activate the AI feature and ask it to summarize your last week of notes.

## The Pattern

Notice something? Every tool on this list works alongside something you probably already do. That's the key — don't try to change your workflow. Enhance it.
    `.trim(),
    category: "tutorial",
    date: "February 17, 2026",
    readTime: "5 min read",
  },
  {
    slug: "stop-fearing-ai-start-learning",
    title: "Stop Fearing AI. Start Learning It.",
    excerpt:
      "Fear of AI comes from not understanding it. And that's fixable. Here's why the best time to start learning is right now.",
    content: `
## Where the Fear Comes From

Most fear around AI falls into two buckets: "it's going to take my job" and "I don't understand it." Both are valid feelings. Neither is a reason to avoid it.

The job displacement concern is real but nuanced. AI isn't replacing entire jobs overnight — it's changing what certain tasks look like. The people who will be most affected are those who refuse to learn how AI fits into their work.

The "I don't understand it" concern is even more straightforward to address. You can fix that in an afternoon.

## What Learning AI Actually Looks Like

You don't need to:
- Learn to code
- Understand machine learning algorithms
- Read research papers
- Get a certification

You do need to:
- Try using one AI tool for a real task
- Notice what it does well and where it falls short
- Build a habit of experimenting

That's it. That's the entire learning plan.

## Why Now

Six months from now, AI tools will be even more embedded in the software you already use. Email clients, word processors, spreadsheets, project management tools — they're all adding AI features.

If you start learning now, you'll be comfortable when those features arrive. If you wait, you'll feel even more behind.

## My Offer

This is exactly why I host free webinars. No sales pitch, no technical jargon, no pressure. Just a clear hour of learning that gives you a foundation to build on.

If this resonates, check out my upcoming webinar or browse the past sessions on this site. The goal is always the same: less confusion, more confidence.
    `.trim(),
    category: "opinion",
    date: "January 28, 2026",
    readTime: "3 min read",
  },
  {
    slug: "webinar-1-recap-understand-ai",
    title: "Webinar Recap: Understand AI Without the Confusion",
    excerpt:
      "A look back at our first webinar — what we covered, what people asked, and the key takeaways that stuck with attendees.",
    content: `
## What We Covered

Our first webinar, "Understand AI Without the Confusion," was held on February 14, 2025. Over 50 people joined live, and the recording has been shared with dozens more since.

The session was structured around four key questions:

**1. What is AI, really?**
We broke down the difference between AI as a concept, machine learning as a method, and tools like ChatGPT as products. Most people conflate all three, and separating them is the first step to real understanding.

**2. How does AI show up in everyday life?**
From Netflix recommendations to email spam filters to Google Maps routing — AI is already everywhere. We walked through specific examples so attendees could connect the abstract concept to their daily experience.

**3. What are the biggest misconceptions?**
We tackled the idea that AI "thinks," that it's always right, that it will replace all jobs, and that you need to be technical to use it. Every one of these is either false or far more nuanced than headlines suggest.

**4. Where do you go from here?**
We closed with a practical roadmap: try one tool, build one habit, and stay curious. No 10-step program, no course to buy.

## The Most-Asked Questions

- "Is AI safe to use for work?" — Yes, with caveats about not sharing sensitive data and always reviewing outputs.
- "What's the difference between ChatGPT and AI?" — ChatGPT is one AI product. AI is the broader technology.
- "Will AI take my job?" — It will change your job. Learning to work with AI is the best defense.

## What's Next

Webinar #2 is in the works: "AI Tools You Can Start Using Today." It builds directly on the foundation we set in the first session, with hands-on demonstrations and practical workflows.

Stay tuned — registration opens soon.
    `.trim(),
    category: "webinar-recap",
    date: "February 16, 2026",
    readTime: "4 min read",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
