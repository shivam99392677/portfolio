"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * SkillBadge — components.md §7.
 * Static face: a display-only tag/label (Project Card tags, Skills grid).
 * Interactive face ("Filter Chip"): a real toggle button (Work Archive
 * filters). Same primitive, two modes — do not build a second chip
 * component for either use case.
 */

export interface SkillBadgeProps {
  label: string;
  /** Skills-section tool logo only — omitted in tag-chip contexts to stay quiet. */
  icon?: ReactNode;
  interactive?: boolean;
  /** Only meaningful when interactive. */
  active?: boolean;
  onToggle?: () => void;
  className?: string;
}

const baseStyles =
  "inline-flex items-center gap-1.5 rounded-input px-2 py-1 font-mono text-mono-meta";

export function SkillBadge({
  label,
  icon,
  interactive = false,
  active = false,
  onToggle,
  className,
}: SkillBadgeProps) {
  if (!interactive) {
    return (
      <span className={cn(baseStyles, "bg-surface text-text-secondary", className)}>
        {icon}
        {label}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      className={cn(
        baseStyles,
        "border transition-colors duration-150 ease-out",
        active
          ? "bg-accent-solid border-accent-solid text-white"
          : "bg-transparent border-border-default text-text-secondary hover:bg-surface-hover hover:text-text-primary",
        className
      )}
    >
      {icon}
      {label}
    </button>
  );
}
