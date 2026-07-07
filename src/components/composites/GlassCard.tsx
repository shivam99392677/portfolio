import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * GlassCard — components.md §5.
 * A Card variant with a translucent, blurred background — reserved for
 * content that must float legibly over rich imagery/video (a case-study
 * facts strip, a stat callout on a photo). The one sanctioned exception to
 * design-system §13's anti-glassmorphism rule: functional, never decorative.
 * Only ever render this over media — on a flat background, use Card.
 */

export interface GlassCardProps {
  tone?: "light" | "dark";
  padding?: "sm" | "default";
  className?: string;
  children: ReactNode;
}

const paddingStyles = {
  sm: "p-4",
  default: "p-6",
};

export function GlassCard({ tone = "dark", padding = "sm", children, className }: GlassCardProps) {
  return (
    <div
      data-tone={tone}
      className={cn("glass-card rounded-card", paddingStyles[padding], className)}
    >
      {children}
    </div>
  );
}
