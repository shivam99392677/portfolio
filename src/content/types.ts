/**
 * Content model — architecture.md §8. Shape-only; actual data lives in the
 * sibling *.ts files in this directory (site.ts, projects.ts, timeline.ts,
 * skills.ts, testimonials.ts).
 */

export interface Media {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface ProjectFacts {
  role: string;
  timeframe: string;
  stack: string;
  status: string;
  liveUrl?: string;
}

export type ContentBlock =
  | { type: "text"; heading?: string; body: string }
  | { type: "image"; media: Media; caption?: string }
  | { type: "comparison"; before: Media; after: Media; caption?: string }
  | { type: "quote"; quote: string; attribution?: string };

export interface OutcomeMetric {
  value: string;
  label: string;
}

export interface Project {
  name: string;
  slug: string;
  oneLiner: string;
  tags: string[];
  heroMedia: Media;
  facts: ProjectFacts;
  /** Context & Challenge section body (architecture.md §5.2). */
  challenge: string;
  /** Process & Craft section content blocks (architecture.md §5.3). */
  processBlocks: ContentBlock[];
  /** Solution Showcase media (architecture.md §5.4). */
  solutionMedia: Media[];
  outcomeMetrics: OutcomeMetric[];
  outcomeReflection: string;
  featured: boolean;
}

export interface TimelineEntry {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  outcomeLine: string;
  expandedDetail?: string;
}

export interface Skill {
  name: string;
  category: "design" | "engineering" | "tools";
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  linkedProjectSlug?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
}

export interface SiteContent {
  name: string;
  role: string;
  navLinks: { label: string; href: string; matches: string }[];
  heroHeadline: string;
  heroSubline: string;
  introParagraph: string;
  processStatement: string;
  processSteps: { title: string; detail: string }[];
  contactStatement: string;
  aboutBio: string;
  email: string;
  phone?: string;
  socialLinks: SocialLink[];
  resumeUrl?: string;
  footerClosingStatement: string;
  copyrightLine: string;
  creditLine: string;
}
