"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Reactive `prefers-reduced-motion` read (animations.md RM-6 — live, not
 * load-time only). Every animated component branches on this to swap its
 * spring/duration entrance for the RM-1 opacity-only fallback.
 * `useSyncExternalStore` subscribes directly to matchMedia — SSR-safe
 * (false on the server) with no setState-in-effect re-render lag.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
