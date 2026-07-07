"use client";

import { motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { duration, stagger, spring, easing } from "@/lib/motion-tokens";

export interface ContactCTAProps {
  statement: string;
  ctaLabel: string;
  ctaHref: string;
}

export function ContactCTA({ statement, ctaLabel, ctaHref }: ContactCTAProps) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const words = statement.split(" ");
  const ctaDelay = Math.max(words.length - 1, 0) * stagger.loose + 0.4;

  if (reducedMotion) {
    return (
      <Section
        variant="standard"
        background="canvas"
        ariaLabel="Contact"
        containerClassName="py-32 flex flex-col items-center text-center gap-8"
      >
        <motion.h2
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: duration.micro, ease: easing.outStandard }}
          className="text-display text-text-primary"
        >
          {statement}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: duration.micro, ease: easing.outStandard }}
        >
          <Button variant="primary" size="default" label={ctaLabel} href={ctaHref} />
        </motion.div>
      </Section>
    );
  }

  return (
    <Section
      variant="standard"
      background="canvas"
      ariaLabel="Contact"
      containerClassName="py-32 flex flex-col items-center text-center gap-8"
    >
      <h2 ref={ref} className="text-display text-text-primary">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              ...spring.gentle,
              delay: index * stagger.loose,
            }}
            className="inline-block"
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring.gentle, delay: ctaDelay }}
      >
        <Button variant="primary" size="default" label={ctaLabel} href={ctaHref} />
      </motion.div>
    </Section>
  );
}
