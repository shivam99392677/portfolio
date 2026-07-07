"use client";

import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Card — components.md §4.
 * The base surface primitive underneath every "raised content" pattern on
 * the site. Nothing renders a one-off bordered/shadowed box — it extends
 * this component's variant set instead (see GlassCard, ProjectCard, and any
 * Timeline entry's expanded detail panel).
 */

export type CardVariant = "flat" | "elevated" | "outlined";
export type CardPadding = "none" | "sm" | "default";

export interface CardProps {
  variant?: CardVariant;
  /** Gates hover/press/focus affordances — a purely display card must not
   * carry interactive cues it can't back up with real behavior. */
  interactive?: boolean;
  padding?: CardPadding;
  href?: string;
  as?: ElementType;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  flat: "bg-surface border border-border-default",
  elevated:
    "bg-surface border border-[var(--border-highlight)] shadow-[var(--shadow-elevated)]",
  outlined: "bg-transparent border border-border-default",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  default: "p-6 md:p-8",
};

export function Card({
  variant = "elevated",
  interactive = false,
  padding = "default",
  href,
  as,
  className,
  children,
  onClick,
}: CardProps) {
  const sharedClassName = cn(
    "block rounded-card",
    variantStyles[variant],
    paddingStyles[padding],
    interactive &&
      cn(
        "transition-[transform,box-shadow,border-color] duration-150 ease-out",
        "hover:border-border-default hover:-translate-y-1.5",
        variant === "elevated" && "hover:shadow-[var(--shadow-elevated-hover)]"
      ),
    className
  );

  if (href) {
    return (
      <Link href={href} className={sharedClassName} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const Component = as ?? "div";
  return (
    <Component className={sharedClassName} onClick={onClick}>
      {children}
    </Component>
  );
}
