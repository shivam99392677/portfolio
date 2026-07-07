"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { Card } from "@/components/primitives/Card";
import { duration as durationTokens, easing } from "@/lib/motion-tokens";
import type { TimelineEntry as TimelineEntryData } from "@/content/types";

/**
 * Timeline — components.md §8.
 * Renders the Experience/Journey section (architecture.md §4.6). Rail
 * draw-in is scroll-tied and purely decorative (aria-hidden, disabled under
 * reduced motion per RM-2). Below the laptop breakpoint (1024px), the
 * component forces vertical orientation regardless of the `orientation`
 * prop — a hard override, not a suggestion.
 */

export type TimelineOrientation = "vertical" | "horizontal";

export interface TimelineProps {
  entries: TimelineEntryData[];
  orientation?: TimelineOrientation;
  defaultExpandedId?: string;
}

export function Timeline({ entries, orientation = "vertical", defaultExpandedId }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isLaptopUp = useMediaQuery("(min-width: 1024px)");
  const effectiveOrientation: TimelineOrientation =
    orientation === "horizontal" && isLaptopUp ? "horizontal" : "vertical";
  const isHorizontal = effectiveOrientation === "horizontal";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const railFill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", isHorizontal ? "flex gap-12" : "flex flex-col")}
    >
      {/* Decorative rail — animations.md §6.9, aria-hidden per RM-2 */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute bg-border-default",
          isHorizontal ? "left-0 top-4 h-px w-full origin-left" : "left-[5px] top-0 h-full w-px origin-top"
        )}
      >
        {reducedMotion ? (
          <div className="absolute inset-0 bg-accent-solid" />
        ) : (
          <motion.div
            className="absolute inset-0 bg-accent-solid"
            style={isHorizontal ? { scaleX: railFill } : { scaleY: railFill }}
          />
        )}
      </div>

      <ol className={cn("relative", isHorizontal ? "flex gap-12" : "flex flex-col gap-8")}>
        {entries.map((entry) => (
          <TimelineEntryItem
            key={entry.id}
            entry={entry}
            defaultExpanded={entry.id === defaultExpandedId}
            reducedMotion={reducedMotion}
          />
        ))}
      </ol>
    </div>
  );
}

function TimelineEntryItem({
  entry,
  defaultExpanded,
  reducedMotion,
}: {
  entry: TimelineEntryData;
  defaultExpanded: boolean;
  reducedMotion: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasDetail = Boolean(entry.expandedDetail);
  const panelId = `timeline-detail-${entry.id}`;
  const transitionDuration = reducedMotion ? 0.01 : durationTokens.standard;

  return (
    <li className="relative pl-10">
      {/* Node — animations.md §6.10 */}
      <motion.span
        aria-hidden="true"
        className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full bg-accent-solid"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: durationTokens.standard }}
      />

      <div className="flex flex-wrap items-baseline gap-2 font-mono text-mono-meta text-text-tertiary">
        <span>{entry.role}</span>
        <span aria-hidden="true">·</span>
        <span>{entry.company}</span>
        <span aria-hidden="true">·</span>
        <span>
          {entry.startDate} – {entry.endDate}
        </span>
      </div>
      <p className="mt-1 text-body text-text-primary">{entry.outcomeLine}</p>

      {hasDetail && (
        <>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((value) => !value)}
            className="mt-2 text-body text-accent-solid underline-offset-4 hover:underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id={panelId}
                key="detail"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: transitionDuration, ease: easing.inOutStandard }}
                className="overflow-hidden"
              >
                <Card variant="flat" padding="sm" className="mt-3">
                  <p className="text-body text-text-secondary">{entry.expandedDetail}</p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </li>
  );
}
