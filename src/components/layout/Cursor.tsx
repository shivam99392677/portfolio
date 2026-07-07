"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/use-media-query";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { spring } from "@/lib/motion-tokens";

/**
 * Cursor — components.md §9 / architecture.md §3.2.
 * The site's chosen signature-moment device (design-system §12). Desktop
 * (`pointer: fine`) only; fully disabled under touch or reduced motion
 * (animations.md RM-3, §5.5). Hoverable elements opt in via
 * `data-cursor="Label"`; form fields hide it entirely so typing feels
 * native. Mounted via next/dynamic with ssr:false (P-6) — see layout.tsx.
 */
export function Cursor() {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useReducedMotion();
  const active = isFinePointer && !reducedMotion;

  const [label, setLabel] = useState<string | null>(null);
  const [hiddenOverField, setHiddenOverField] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, spring.magnetic);
  const springY = useSpring(y, spring.magnetic);

  useEffect(() => {
    if (!active) return;

    document.body.style.cursor = "none";

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");
      const isFormField = target?.closest("input, textarea, select, [contenteditable='true']");

      setHiddenOverField(Boolean(isFormField));
      setLabel(cursorTarget?.dataset.cursor ?? null);
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.body.style.cursor = "";
    };
  }, [active, x, y]);

  if (!active) return null;

  const expanded = Boolean(label);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center whitespace-nowrap rounded-pill bg-accent-solid text-white"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: expanded ? "auto" : 10,
        height: expanded ? 40 : 10,
        paddingLeft: expanded ? 16 : 0,
        paddingRight: expanded ? 16 : 0,
        opacity: hiddenOverField ? 0 : 1,
      }}
      transition={spring.snappy}
    >
      {expanded && <span className="font-mono text-mono-meta">{label}</span>}
    </motion.div>
  );
}
