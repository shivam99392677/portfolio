"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useCopyEmail } from "@/lib/use-copy-email";
import { spring, stagger, duration } from "@/lib/motion-tokens";
import type { SocialLink } from "@/content/types";

/**
 * Footer — components.md §11 / architecture.md §3.4.
 * Singleton, three-zone staggered reveal (animations.md §5.9). The
 * copy-to-clipboard email pattern here is shared verbatim with /contact via
 * `useCopyEmail` (components.md §11, Composition).
 */

export interface FooterProps {
  closingStatement: string;
  email: string;
  socialLinks: SocialLink[];
  copyrightLine: string;
  creditLine: string;
}

export function Footer({ closingStatement, email, socialLinks, copyrightLine, creditLine }: FooterProps) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();
  const { copied, copy } = useCopyEmail(email);

  const zoneVariants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  const zoneTransition = (index: number) =>
    reducedMotion
      ? { duration: duration.micro }
      : { ...spring.gentle, delay: index * stagger.normal };

  return (
    <footer className="border-t border-border-subtle bg-canvas">
      <div
        ref={ref}
        className="mx-auto grid max-w-[var(--width-standard)] gap-12 px-6 py-24 sm:px-10 md:grid-cols-3 md:px-16"
      >
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={zoneVariants}
          transition={zoneTransition(0)}
        >
          <p className="text-h3 text-text-primary">{closingStatement}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={zoneVariants}
          transition={zoneTransition(1)}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="text-left text-body text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
            >
              {email}
            </button>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: duration.micro }}
                  className="font-mono text-mono-meta text-accent-solid"
                >
                  Copied
                </motion.span>
              )}
            </AnimatePresence>
            <span role="status" aria-live="polite" className="sr-only">
              {copied ? "Email copied to clipboard" : ""}
            </span>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={zoneVariants}
          transition={zoneTransition(2)}
          className="flex flex-col gap-1 font-mono text-mono-meta text-text-tertiary md:items-end md:text-right"
        >
          <span>{copyrightLine}</span>
          <span>{creditLine}</span>
        </motion.div>
      </div>
    </footer>
  );
}
