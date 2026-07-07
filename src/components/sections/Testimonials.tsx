"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { easing } from "@/lib/motion-tokens";
import type { Testimonial } from "@/content/types";

export interface TestimonialsProps {
  testimonials: Testimonial[];
}

const AUTO_ADVANCE_MS = 5000;

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (testimonials.length <= 1 || paused || reducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, [testimonials.length, paused, reducedMotion]);

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[index];

  const goToPrevious = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <Section variant="standard" background="canvas" ariaLabel="Testimonials">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="flex flex-col items-center gap-8 text-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.3, ease: easing.inOutStandard }}
          >
            <blockquote className="text-h3 text-text-primary">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <p className="mt-4 font-mono text-mono-meta text-text-tertiary">
              {current.authorName} — {current.authorRole}
            </p>
          </motion.div>
        </AnimatePresence>

        {testimonials.length > 1 && (
          <div className="flex items-center gap-4">
            <Button
              variant="icon"
              ariaLabel="Previous testimonial"
              onClick={goToPrevious}
              leadingIcon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <Button
              variant="icon"
              ariaLabel="Next testimonial"
              onClick={goToNext}
              leadingIcon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>
        )}
      </div>
    </Section>
  );
}
