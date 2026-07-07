"use client";

import { motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { duration, easing } from "@/lib/motion-tokens";

/**
 * Custom 404 — architecture.md §6.4. Deliberately the simplest entrance on
 * the site (animations.md §8.5) — this page shouldn't feel like it
 * invested heavily in itself.
 */
export default function NotFound() {
  const reducedMotion = useReducedMotion();

  return (
    <main id="main-content">
      <Section
        variant="standard"
        background="canvas"
        ariaLabel="Page not found"
        containerClassName="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? duration.micro : duration.standard, ease: easing.outStandard }}
          className="flex flex-col items-center gap-6"
        >
          <p className="font-mono text-mono-meta text-text-tertiary">404</p>
          <h1 className="text-h2 text-text-primary">This page wandered off.</h1>
          <p className="max-w-[45ch] text-body-lg text-text-secondary">
            Let&rsquo;s get you back to somewhere that exists.
          </p>
          <Button variant="primary" label="Back to home" href="/" />
        </motion.div>
      </Section>
    </main>
  );
}
