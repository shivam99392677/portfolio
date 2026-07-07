"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { stagger, easing } from "@/lib/motion-tokens";
import type { OutcomeMetric } from "@/content/types";

/**
 * OutcomeImpact — architecture.md §5.5 / animations.md §7.9.
 * Metrics count up on scroll-enter. Under reduced motion (RM-4), the final
 * value renders immediately and completely — no count-up, no scroll gate.
 */

export interface OutcomeImpactProps {
  metrics: OutcomeMetric[];
  reflection: string;
}

const NUMERIC_PATTERN = /^(-?\d+(?:\.\d+)?)(.*)$/;

export function OutcomeImpact({ metrics, reflection }: OutcomeImpactProps) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <Section variant="standard" background="canvas" ariaLabel="Outcome and impact">
      <div ref={ref} className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricItem
            key={metric.label}
            metric={metric}
            index={index}
            inView={inView}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
      <p className="mt-12 max-w-[65ch] text-body-lg text-text-secondary">{reflection}</p>
    </Section>
  );
}

interface MetricItemProps {
  metric: OutcomeMetric;
  index: number;
  inView: boolean;
  reducedMotion: boolean;
}

function MetricItem({ metric, index, inView, reducedMotion }: MetricItemProps) {
  const match = metric.value.match(NUMERIC_PATTERN);

  if (!match) {
    return (
      <div className={`transition-opacity duration-300 ${inView ? "opacity-100" : "opacity-0"}`}>
        <p className="text-display text-text-primary">{metric.value}</p>
        <p className="mt-2 font-mono text-mono-meta text-text-tertiary">{metric.label}</p>
      </div>
    );
  }

  const numericPart = parseFloat(match[1]);
  const suffix = match[2];
  const decimalPlaces = match[1].includes(".") ? match[1].split(".")[1].length : 0;

  if (reducedMotion) {
    return (
      <div>
        <p className="text-display text-text-primary">{metric.value}</p>
        <p className="mt-2 font-mono text-mono-meta text-text-tertiary">{metric.label}</p>
      </div>
    );
  }

  return (
    <AnimatedNumericMetric
      numericPart={numericPart}
      suffix={suffix}
      decimalPlaces={decimalPlaces}
      label={metric.label}
      index={index}
      inView={inView}
    />
  );
}

interface AnimatedNumericMetricProps {
  numericPart: number;
  suffix: string;
  decimalPlaces: number;
  label: string;
  index: number;
  inView: boolean;
}

function AnimatedNumericMetric({
  numericPart,
  suffix,
  decimalPlaces,
  label,
  index,
  inView,
}: AnimatedNumericMetricProps) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(() => formatCount(0, suffix, decimalPlaces));

  useEffect(() => {
    if (!inView) return;

    const controls = animate(count, numericPart, {
      duration: 0.8,
      ease: easing.outStandard,
      delay: index * stagger.tight,
      onUpdate: (latest) => setDisplay(formatCount(latest, suffix, decimalPlaces)),
    });

    return () => controls.stop();
  }, [inView, count, numericPart, suffix, decimalPlaces, index]);

  return (
    <motion.div>
      <p className="text-display text-text-primary">{display}</p>
      <p className="mt-2 font-mono text-mono-meta text-text-tertiary">{label}</p>
    </motion.div>
  );
}

function formatCount(latest: number, suffix: string, decimalPlaces: number): string {
  return `${latest.toFixed(decimalPlaces)}${suffix}`;
}
