"use client";

import { motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { SkillBadge } from "@/components/primitives/SkillBadge";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { Skill } from "@/content/types";

export interface SkillsProps {
  skills: Skill[];
}

const CATEGORY_ORDER: { key: Skill["category"]; label: string }[] = [
  { key: "design", label: "Design" },
  { key: "engineering", label: "Engineering" },
  { key: "tools", label: "Tools" },
];

export function Skills({ skills }: SkillsProps) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  const groupedByCategory = CATEGORY_ORDER.map(({ key, label }) => ({
    key,
    label,
    items: skills.filter((skill) => skill.category === key),
  })).filter((cluster) => cluster.items.length > 0);

  const flatOrder = groupedByCategory.flatMap((cluster) => cluster.items);
  const clusters = groupedByCategory.map((cluster) => ({
    ...cluster,
    items: cluster.items.map((skill) => ({ skill, flatIndex: flatOrder.indexOf(skill) })),
  }));

  return (
    <Section variant="standard" background="canvas" ariaLabel="Skills and tools">
      <h2 className="text-h2 text-text-primary">Skills & Tools</h2>
      <div ref={ref} className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {clusters.map((cluster) => (
          <div key={cluster.key}>
            <h3 className="font-mono text-mono-meta text-text-tertiary uppercase">
              {cluster.label}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {cluster.items.map(({ skill, flatIndex: currentIndex }) => {
                return (
                  <motion.span
                    key={skill.name}
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={
                      reducedMotion
                        ? { duration: 0.15 }
                        : {
                            type: "spring",
                            stiffness: 120,
                            damping: 20,
                            mass: 1,
                            delay: currentIndex * 0.04,
                          }
                    }
                  >
                    <SkillBadge label={skill.name} />
                  </motion.span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
