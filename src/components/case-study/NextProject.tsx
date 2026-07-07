"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { ProjectCard } from "@/components/composites/ProjectCard";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { spring } from "@/lib/motion-tokens";
import type { Project } from "@/content/types";

/**
 * NextProject — architecture.md §5.6.
 * Deliberately reuses ProjectCard at the same weight as a homepage work
 * card (per spec) rather than a bespoke "next up" component — this IS a
 * work card, just placed at the end of a case study.
 */

export interface NextProjectProps {
  project: Project;
}

export function NextProject({ project }: NextProjectProps) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <Section variant="standard" background="canvas" ariaLabel="Next project">
      <p className="font-mono text-mono-meta text-text-tertiary uppercase">Next project</p>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={reducedMotion ? { duration: 0.15 } : spring.gentle}
        className="mt-4"
      >
        <ProjectCard project={project} variant="standard" />
      </motion.div>
      <Link
        href="/work"
        className="mt-8 inline-block text-body text-accent-solid underline-offset-4 hover:underline"
      >
        ← Back to all work
      </Link>
    </Section>
  );
}
