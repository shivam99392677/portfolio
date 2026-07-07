/// <reference types="react/canary" />
// The triple-slash directive above loads the `react/canary` type
// declarations (a TS-only construct, erased at compile time — safe for
// bundlers, unlike a real `import {} from "react/canary"`). It gives
// `ViewTransition` (an experimental export Next.js vendors internally for
// the App Router) a type, since the stable `react` .d.ts doesn't declare
// it yet. See docs/animations.md §5.7/§5.8; components.md §6.
import { ViewTransition } from "react";

export { ViewTransition };

/** Shared identity used by both ProjectCard and CaseStudyHero so React can find the pair. */
export function projectTransitionName(slug: string) {
  return `project-${slug}`;
}
