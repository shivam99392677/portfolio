"use client";

import dynamic from "next/dynamic";

/**
 * Client-only wrapper so `ssr: false` can be used (next/dynamic forbids it
 * directly inside a Server Component). Keeps Cursor's code out of the
 * initial bundle entirely (animations.md P-6).
 */
const Cursor = dynamic(() => import("./Cursor").then((mod) => mod.Cursor), {
  ssr: false,
});

export function CursorLoader() {
  return <Cursor />;
}
