"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export interface IntroProps {
  paragraph: string;
  moreHref?: string;
}

export function Intro({ paragraph, moreHref }: IntroProps) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <Section
      variant="standard"
      background="canvas"
      ariaLabel="About"
      containerClassName="max-w-[65ch] mx-auto text-center sm:text-left"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={
          reducedMotion
            ? { duration: 0.15 }
            : { type: "spring", stiffness: 120, damping: 20, mass: 1 }
        }
      >
        <p className="text-body-lg text-text-secondary">
          {paragraph}
          {moreHref ? (
            <>
              {" "}
              <Link
                href={moreHref}
                className="text-body-lg text-accent-solid underline-offset-4 hover:underline"
              >
                more about me →
              </Link>
            </>
          ) : null}
        </p>
      </motion.div>
    </Section>
  );
}
