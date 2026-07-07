/**
 * Motion primitives — transcribed verbatim from docs/animations.md §2.
 * Every animated component imports from here; no component may invent its
 * own duration/easing/spring value inline.
 */

/** animations.md §2.1 */
export const duration = {
  instant: 0.1,
  micro: 0.15,
  standard: 0.25,
  reveal: 0.5,
  transition: 0.65,
  signature: 1.0, // 900–1200ms range midpoint; tuned by feel per component
} as const;

/** animations.md §2.2 */
export const stagger = {
  tight: 0.04,
  normal: 0.06,
  loose: 0.08,
  none: 0,
  handoff: 0.1,
} as const;

/** animations.md §2.3 — cubic-bezier curves for state-bound (non-spring) motion */
export const easing = {
  outStandard: [0.16, 1, 0.3, 1] as const,
  inOutStandard: [0.65, 0, 0.35, 1] as const,
  inStandard: [0.4, 0, 1, 1] as const, // exits only, never entrances
  linear: "linear" as const,
};

/** animations.md §2.4 — stiffness/damping/mass, portable to Motion's spring type */
export const spring = {
  gentle: { type: "spring" as const, stiffness: 120, damping: 20, mass: 1 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 25, mass: 1 },
  magnetic: { type: "spring" as const, stiffness: 170, damping: 26, mass: 0.5 },
  elastic: { type: "spring" as const, stiffness: 400, damping: 30, mass: 1 },
  /** Reserved for the one signature moment (design-system §12) — never reused. */
  bouncy: { type: "spring" as const, stiffness: 260, damping: 18, mass: 1 },
};

/** animations.md RM-1 — the universal reduced-motion entrance fallback */
export const reducedMotionFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: duration.micro, ease: easing.outStandard },
};

/** animations.md §4, Exit Rule — exits run at ~60–70% of their entrance duration */
export function exitDuration(entranceDuration: number) {
  return entranceDuration * 0.65;
}
