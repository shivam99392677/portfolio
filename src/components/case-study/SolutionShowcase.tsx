"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { spring } from "@/lib/motion-tokens";
import type { Media } from "@/content/types";

export interface SolutionShowcaseProps {
  media: Media[];
}

export function SolutionShowcase({ media }: SolutionShowcaseProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const closeButtonId = "solution-showcase-lightbox-close";

  useEffect(() => {
    if (openIndex === null) return;

    document.getElementById(closeButtonId)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex]);

  const openLightbox = (index: number) => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    setOpenIndex(index);
  };

  const closeLightbox = () => {
    setOpenIndex(null);
    previouslyFocused.current?.focus();
  };

  const activeMedia = openIndex !== null ? media[openIndex] : null;

  return (
    <Section variant="full-bleed" background="full-bleed-media" ariaLabel="The solution">
      <div className="flex flex-col gap-8 md:gap-12">
        {media.map((item, index) => (
          <ShowcaseItem key={item.src} item={item} onOpen={() => openLightbox(index)} />
        ))}
      </div>

      <AnimatePresence>
        {activeMedia && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
            transition={reducedMotion ? { duration: 0.15 } : spring.snappy}
          >
            <div className="relative h-full w-full max-h-[90vh] max-w-[90vw]">
              {activeMedia.type === "image" ? (
                <Image
                  src={activeMedia.src}
                  alt={activeMedia.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              ) : (
                <video
                  src={activeMedia.src}
                  className="h-full w-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={activeMedia.alt}
                />
              )}
            </div>
            <Button
              id={closeButtonId}
              variant="icon"
              ariaLabel="Close"
              onClick={closeLightbox}
              className="absolute top-4 right-4"
              leadingIcon={<CloseIcon />}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function ShowcaseItem({ item, onOpen }: { item: Media; onOpen: () => void }) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={reducedMotion ? { duration: 0.15 } : spring.gentle}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label="View larger"
        className="relative w-full aspect-[16/10] overflow-hidden rounded-card outline-none focus-visible:ring-2 focus-visible:ring-accent-solid focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <video
            src={item.src}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-label={item.alt}
          />
        )}
      </button>
    </motion.div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M1 1L15 15M15 1L1 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
