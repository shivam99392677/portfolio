import type { Project } from "./types";

/**
 * heroMedia/solutionMedia use real product screenshots from public/images/.
 * Every fact, stack, and outcome below is real, drawn from the résumé and
 * project details, not invented.
 */
export const projects: Project[] = [
  {
    name: "Pocket Bot",
    slug: "pocket-bot",
    oneLiner:
      "An AI-powered financial wellness platform with expense tracking, forecasting, and burnout prediction.",
    tags: ["React.js", "FastAPI", "LangChain", "AI/ML"],
    heroMedia: {
      type: "image",
      src: "/images/pocket-bot/cover.png",
      alt: "Pocket Bot dashboard showing weekly spend, daily average, burnout score, and quick actions",
    },
    facts: {
      role: "Full-Stack & AI Developer",
      timeframe: "2026",
      stack: "React.js, FastAPI, Python, LangChain, Firebase, Scikit-Learn",
      status: "Amazon HackOn Season 6.0",
    },
    challenge:
      "Students juggling limited, irregular income need more than a basic expense tracker — they need a system that can flag financial and mental stress risk before it compounds, and offer guidance that's actually personalized instead of generic budgeting tips. Pocket Bot set out to combine expense tracking, forecasting, and burnout prediction into one AI-powered platform built specifically for that problem.",
    processBlocks: [
      {
        type: "text",
        heading: "Architecture",
        body: "The platform's REST API layer runs on FastAPI, backed by Firebase for auth and data storage, with the React frontend consuming endpoints for financial analytics, wellness monitoring, and recommendations.",
      },
      {
        type: "text",
        heading: "Burnout prediction engine",
        body: "A hybrid burnout prediction engine combines rule-based logic with Scikit-Learn models to identify financial and mental stress risk from spending and usage patterns.",
      },
      {
        type: "text",
        heading: "AI-driven guidance",
        body: "LangChain orchestrates LLMs to turn raw financial data into personalized, conversational guidance rather than a static dashboard of numbers.",
      },
    ],
    solutionMedia: [
      {
        type: "image",
        src: "/images/pocket-bot/cover.png",
        alt: "Pocket Bot dashboard showing weekly spend, daily average, burnout score, and quick actions",
      },
    ],
    outcomeMetrics: [
      { value: "Top 30", label: "of 70,000+ teams — Amazon HackOn Season 6.0" },
      { value: "4", label: "AI-driven modules: tracking, forecasting, burnout prediction, recommendations" },
    ],
    outcomeReflection:
      "Pocket Bot was selected among the Top 30 teams out of 70,000+ participants in Amazon HackOn Season 6.0, validating the hybrid rule-based-plus-ML approach to a problem most finance apps treat as a simple dashboard.",
    featured: true,
  },
  {
    name: "Anwesha IIT Patna",
    slug: "anwesha-iit-patna",
    oneLiner: "The official cultural fest website of IIT Patna, built for real user workflows at scale.",
    tags: ["Next.js", "React.js", "Firebase", "Tailwind CSS"],
    heroMedia: {
      type: "image",
      src: "/images/anwesha/cover.png",
      alt: "Anwesha IIT Patna landing page with animated festival island artwork and a Register call to action",
    },
    facts: {
      role: "Web Development Sub-Coordinator",
      timeframe: "2025 — Present",
      stack: "React.js, Next.js, Firebase, Tailwind CSS",
      status: "Live",
    },
    challenge:
      "Anwesha, IIT Patna's official cultural fest, needed a public-facing website that could handle real user workflows — authentication, event information, and updates — while being built and maintained by a multi-member student team working under fest deadlines.",
    processBlocks: [
      {
        type: "text",
        heading: "Frontend",
        body: "Built responsive user interfaces in React.js and Next.js, styled with Tailwind CSS, covering the fest's core pages and user flows.",
      },
      {
        type: "text",
        heading: "Auth & data",
        body: "Integrated Firebase Authentication and backend REST APIs to support secure user workflows.",
      },
      {
        type: "text",
        heading: "Team workflow",
        body: "Collaborated within a multi-member development team using Git and GitHub for version control and deployment.",
      },
    ],
    solutionMedia: [
      {
        type: "image",
        src: "/images/anwesha/cover.png",
        alt: "Anwesha IIT Patna landing page with animated festival island artwork and a Register call to action",
      },
    ],
    outcomeMetrics: [{ value: "Live", label: "Official cultural fest website, IIT Patna" }],
    outcomeReflection:
      "The site shipped as the official web presence for Anwesha IIT Patna, with the collaborative Git workflow becoming the standard the team used for coordinating ongoing feature work.",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
