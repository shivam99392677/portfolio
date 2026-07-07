"use client";

import { motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { duration, stagger, spring, easing } from "@/lib/motion-tokens";

export interface HeroProps {
  name: string;
  headline: string;
  subline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
}

const wordStagger = 0.6;

export function Hero({
  name,
  headline,
  subline,
  primaryCtaLabel,
  primaryCtaHref,
}: HeroProps) {
  const reducedMotion = useReducedMotion();
  const words = headline.split(" ");
  const headlineDelay =
    stagger.handoff + Math.max(words.length - 1, 0) * stagger.loose + wordStagger;
  const sublineDelay = headlineDelay + 0.1;
  const ctaDelay = sublineDelay + 0.1;

  if (reducedMotion) {
    return (
      <Section
        variant="full-bleed"
        background="canvas"
        as="header"
        ariaLabel="Introduction"
        containerClassName="flex min-h-[100vh] flex-col items-start justify-center gap-6"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.micro, ease: easing.outStandard }}
          className="font-mono text-mono-meta text-text-tertiary"
        >
          {name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.micro, ease: easing.outStandard }}
          className="text-display text-text-primary"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.micro, ease: easing.outStandard }}
          className="text-body-lg text-text-secondary"
        >
          {subline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.micro, ease: easing.outStandard }}
        >
          <Button variant="primary" label={primaryCtaLabel} href={primaryCtaHref} />
        </motion.div>
      </Section>
    );
  }

  return (
    <Section
      variant="full-bleed"
      background="canvas"
      as="header"
      ariaLabel="Introduction"
      containerClassName="flex min-h-[100vh] flex-col items-start justify-center gap-6"
    >
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.reveal, ease: easing.outStandard }}
        className="font-mono text-mono-meta text-text-tertiary"
      >
        {name}
      </motion.p>
      <h1 className="text-display text-text-primary">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...spring.gentle,
              delay: stagger.handoff + index * stagger.loose,
            }}
            className="inline-block"
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.gentle, delay: sublineDelay }}
        className="text-body-lg text-text-secondary"
      >
        {subline}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.gentle, delay: ctaDelay }}
      >
        <Button variant="primary" label={primaryCtaLabel} href={primaryCtaHref} />
      </motion.div>
    </Section>
  );
}
