"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { ViewTransition, projectTransitionName } from "@/lib/view-transition";
import type { Project } from "@/content/types";
import { SkillBadge } from "@/components/primitives/SkillBadge";

/**
 * ProjectCard — components.md §6.
 * Extends Card (Elevated). Entirely data-driven off the Project content
 * model — no per-project custom markup. The whole card is ONE `<a>`; a
 * Button is never nested inside it (one interactive target per card).
 */

export type ProjectCardVariant = "standard" | "featured" | "compact";

export interface ProjectCardProps {
  project: Project;
  variant?: ProjectCardVariant;
}

export function ProjectCard({ project, variant = "standard" }: ProjectCardProps) {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const isTabletUp = useMediaQuery("(min-width: 640px)");

  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const showVideoPreview =
    project.heroMedia.type === "video" && hovered && !reducedMotion;
  // Desktop gets the full shared-element morph (§5.7); mobile simplifies to
  // a plain cross-fade by not sharing a view-transition name (§5.8).
  const transitionName = isTabletUp ? projectTransitionName(project.slug) : undefined;

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group block rounded-card border border-[var(--border-highlight)] bg-surface",
        "shadow-[var(--shadow-elevated)] overflow-hidden",
        "transition-[transform,box-shadow,border-color] duration-150 ease-out",
        "hover:border-border-default hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated-hover)]",
        isFeatured && "md:col-span-2"
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-surface-hover",
          isFeatured ? "aspect-video" : "aspect-[4/3]"
        )}
      >
        {!mediaLoaded && <div className="absolute inset-0 animate-pulse bg-surface-active" />}

        <ViewTransition name={transitionName}>
          {project.heroMedia.type === "image" || !showVideoPreview ? (
            <Image
              src={project.heroMedia.src}
              alt={project.heroMedia.alt}
              fill
              onLoad={() => setMediaLoaded(true)}
              className="object-cover"
            />
          ) : (
            <video
              src={project.heroMedia.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </ViewTransition>
      </div>

      <div className={cn(isCompact ? "p-4" : "p-6")}>
        <h3 className={cn("text-h3 text-text-primary", isCompact && "text-body-lg")}>
          {project.name}
        </h3>
        <p className="mt-2 text-body text-text-secondary">{project.oneLiner}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 2).map((tag) => (
            <SkillBadge key={tag} label={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
