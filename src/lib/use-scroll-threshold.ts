"use client";

import { useEffect, useState } from "react";

/**
 * Nav scrolled-state (animations.md §5.1). Reads a 1px sentinel placed at
 * `topPx` from the document top via IntersectionObserver — never a scroll
 * listener doing manual position math (P-2).
 */
export function useScrollThreshold(sentinelId: string): boolean {
  const [pastThreshold, setPastThreshold] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => setPastThreshold(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelId]);

  return pastThreshold;
}
