"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  /** IntersectionObserver threshold — animations.md §2.5 `on-scroll-enter` default. */
  threshold?: number;
  /** Reveal once and stop observing (default) vs. re-trigger every crossing. */
  once?: boolean;
}

/**
 * IntersectionObserver-backed `on-scroll-enter` trigger (animations.md P-2 —
 * never a manual scroll-position listener). Attach the returned ref to the
 * element whose entrance should be gated on visibility.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}
