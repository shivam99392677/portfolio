"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { SkillBadge } from "@/components/primitives/SkillBadge";
import { ProjectCard } from "@/components/composites/ProjectCard";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { spring } from "@/lib/motion-tokens";
import { projects } from "@/content/projects";

/**
 * Work Archive — architecture.md §6.2. Every project, denser than the
 * homepage's curated grid, filterable by tag. Grid re-flow on filter change
 * uses Motion's `layout` animation (the FLIP technique animations.md P-9
 * calls for), not a hand-measured transition.
 */

const ALL_FILTER = "All";

export default function WorkArchivePage() {
  const reducedMotion = useReducedMotion();
  const [activeTag, setActiveTag] = useState(ALL_FILTER);

  const tags = useMemo(() => {
    const unique = new Set<string>();
    projects.forEach((project) => project.tags.forEach((tag) => unique.add(tag)));
    return [ALL_FILTER, ...Array.from(unique)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeTag === ALL_FILTER) return projects;
    return projects.filter((project) => project.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <main id="main-content">
      <Section variant="standard" background="canvas" ariaLabel="Work archive">
        <h1 className="text-h1 text-text-primary">Work</h1>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {tags.map((tag) => (
            <SkillBadge
              key={tag}
              label={tag}
              interactive
              active={activeTag === tag}
              onToggle={() => setActiveTag(tag)}
            />
          ))}
        </div>

        <motion.div
          layout={!reducedMotion}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout={!reducedMotion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={reducedMotion ? { duration: 0.15 } : spring.snappy}
              >
                <ProjectCard project={project} variant="compact" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </main>
  );
}
