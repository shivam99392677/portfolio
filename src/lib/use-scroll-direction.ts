"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mobile nav hide-on-scroll-down / reveal-on-scroll-up (animations.md §5.3).
 * A passive, rAF-throttled listener comparing two scroll positions — not
 * the per-element position math P-2 warns against, so it's an acceptable
 * minimal exception for direction-only detection.
 */
export function useScrollDirection(): "up" | "down" {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setDirection(currentY > lastY.current ? "down" : "up");
        lastY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return direction;
}
