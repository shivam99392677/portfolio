"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ProjectCard } from "@/components/composites/ProjectCard";
import { Section } from "@/components/primitives/Section";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import type { Project } from "@/content/types";

export interface SelectedWorkProps {
  projects: Project[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const featuredProjects = projects.filter((project) => project.featured);
  const remainingProjects = projects.filter((project) => !project.featured);
  const curatedProjects = [...featuredProjects, ...remainingProjects].slice(0, 3);
  const featuredIndex = curatedProjects.findIndex((project) => project.featured);

  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <section id="selected-work" aria-label="Selected work" className="bg-canvas">
      <Section as="div" variant="standard">
        <h2 className="text-h2 text-text-primary">Selected Work</h2>
        <div ref={ref} className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-8">
          {curatedProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={
                inView
                  ? reducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0 }
                  : {}
              }
              transition={
                reducedMotion
                  ? { duration: 0.15 }
                  : {
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                      mass: 1,
                      delay: index * 0.04,
                    }
              }
            >
              <ProjectCard
                project={project}
                variant={index === featuredIndex ? "featured" : "standard"}
              />
            </motion.div>
          ))}
        </div>
        <Link
          href="/work"
          className="mt-8 inline-block text-body text-accent-solid underline-offset-4 hover:underline"
        >
          View all work →
        </Link>
      </Section>
    </section>
  );
}
