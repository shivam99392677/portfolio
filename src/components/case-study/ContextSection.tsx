"use client";

import { motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export interface ContextSectionProps {
  challenge: string;
}

export function ContextSection({ challenge }: ContextSectionProps) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <Section variant="standard" background="canvas" ariaLabel="The challenge">
      <motion.div
        ref={ref}
        className="max-w-[65ch]"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={
          reducedMotion
            ? { duration: 0.15 }
            : { type: "spring", stiffness: 120, damping: 20, mass: 1 }
        }
      >
        <p className="font-mono text-mono-meta text-text-tertiary uppercase">
          The Challenge
        </p>
        <p className="mt-3 text-body-lg text-text-secondary">{challenge}</p>
      </motion.div>
    </Section>
  );
}
