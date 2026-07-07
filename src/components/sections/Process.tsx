"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { spring } from "@/lib/motion-tokens";
import { cn } from "@/lib/cn";

/**
 * Process — architecture.md §4.5 (Act 2: The How).
 * A quiet, high-impact section: a calm statement followed by a 3–4 step
 * sequence. Each step reveals independently on its own scroll position
 * (animations.md §6.7) — never a shared stagger group — and discloses one
 * supporting sentence on hover/focus (desktop) or tap (touch), per
 * animations.md §6.8.
 */

export interface ProcessStep {
  title: string;
  detail: string;
}

export interface ProcessProps {
  statement: string;
  steps: ProcessStep[];
}

export function Process({ statement, steps }: ProcessProps) {
  return (
    <Section variant="standard" background="canvas" ariaLabel="How I work">
      <h2 className="text-h2 text-text-primary">{statement}</h2>
      <div className="mt-12 flex flex-col gap-8 md:flex-row md:gap-6">
        {steps.map((step, index) => (
          <StepItem key={step.title} step={step} index={index} />
        ))}
      </div>
    </Section>
  );
}

function StepItem({ step, index }: { step: ProcessStep; index: number }) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const hasHover = useMediaQuery("(hover: hover)");
  const [revealed, setRevealed] = useState(false);

  const hoverHandlers = hasHover
    ? {
        onMouseEnter: () => setRevealed(true),
        onMouseLeave: () => setRevealed(false),
      }
    : {
        onClick: () => setRevealed((value) => !value),
      };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={reducedMotion ? { duration: 0.15 } : spring.gentle}
      className="flex-1"
    >
      <div
        tabIndex={0}
        className="outline-none focus-visible:ring-2 focus-visible:ring-accent-solid focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        onFocus={() => setRevealed(true)}
        onBlur={() => setRevealed(false)}
        {...hoverHandlers}
      >
        <span className="font-mono text-mono-meta text-text-tertiary">0{index + 1}</span>
        <h3 className="text-h3 text-text-primary mt-2">{step.title}</h3>
        <p
          className={cn(
            "text-body text-text-secondary mt-2 md:transition-opacity md:duration-200",
            "opacity-100",
            "md:opacity-0",
            revealed && "md:opacity-100"
          )}
        >
          {step.detail}
        </p>
      </div>
    </motion.div>
  );
}
