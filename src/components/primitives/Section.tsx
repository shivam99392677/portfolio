import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section — components.md §10.
 * The invisible layout primitive wrapping every page section — the one
 * place vertical rhythm, max-width, and side-margin rules live. Section
 * owns width/rhythm ONLY: it carries no animation and no content-specific
 * logic. Entrance/reveal behavior belongs to the content inside it
 * (animations.md §6–§7) — do not wrap Section's children in a blanket
 * reveal animation here.
 */

export type SectionVariant = "standard" | "full-bleed" | "tight";
export type SectionBackground = "canvas" | "surface" | "full-bleed-media";

export interface SectionProps {
  variant?: SectionVariant;
  background?: SectionBackground;
  as?: ElementType;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  /** Class applied to the inner max-width container, e.g. for custom grid setup. */
  containerClassName?: string;
  children: ReactNode;
}

const backgroundStyles: Record<SectionBackground, string> = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  "full-bleed-media": "",
};

const maxWidthByVariant: Record<SectionVariant, string> = {
  standard: "max-w-[var(--width-standard)]",
  tight: "max-w-[var(--width-standard)]",
  "full-bleed": "max-w-[var(--width-full-bleed)]",
};

const verticalPaddingByVariant: Record<SectionVariant, string> = {
  standard: "py-[var(--spacing-section-y-standard)]",
  tight: "py-[var(--spacing-section-y-tight)]",
  "full-bleed": "",
};

export function Section({
  variant = "standard",
  background = "canvas",
  as,
  ariaLabel,
  ariaLabelledBy,
  className,
  containerClassName,
  children,
}: SectionProps) {
  const Component = as ?? "section";

  return (
    <Component
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(backgroundStyles[background], className)}
    >
      <div
        className={cn(
          "mx-auto px-6 sm:px-10 md:px-16",
          maxWidthByVariant[variant],
          verticalPaddingByVariant[variant],
          containerClassName
        )}
      >
        {children}
      </div>
    </Component>
  );
}
