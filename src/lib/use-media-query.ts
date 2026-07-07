"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** Generic reactive media query — backs pointer/breakpoint checks used by
 * Cursor (pointer: fine), Timeline (forced-vertical breakpoint), etc.
 * `useSyncExternalStore` subscribes directly to matchMedia — SSR-safe
 * (false on the server) with no setState-in-effect re-render lag. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => subscribe(query, onChange),
    () => window.matchMedia(query).matches,
    () => false
  );
}
