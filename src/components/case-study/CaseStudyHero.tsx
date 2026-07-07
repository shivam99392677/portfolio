"use client";

import Image from "next/image";
import { GlassCard } from "@/components/composites/GlassCard";
import { Button } from "@/components/primitives/Button";
import { ViewTransition, projectTransitionName } from "@/lib/view-transition";
import { useMediaQuery } from "@/lib/use-media-query";
import type { Project } from "@/content/types";

export interface CaseStudyHeroProps {
  project: Project;
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const isTabletUp = useMediaQuery("(min-width: 640px)");
  const transitionName = isTabletUp ? projectTransitionName(project.slug) : undefined;

  const facts: { label: string; value: string }[] = [
    { label: "Role", value: project.facts.role },
    { label: "Timeline", value: project.facts.timeframe },
    { label: "Stack", value: project.facts.stack },
    { label: "Status", value: project.facts.status },
  ];

  return (
    <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-surface-hover">
      <ViewTransition name={transitionName}>
        {project.heroMedia.type === "video" ? (
          <video
            src={project.heroMedia.src}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={project.heroMedia.src}
            alt={project.heroMedia.alt}
            fill
            priority
            className="object-cover"
          />
        )}
      </ViewTransition>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-40 sm:px-10 sm:pb-36 md:px-16 md:pb-32">
        <h1 className="text-display text-white">{project.name}</h1>
        <p className="mt-3 max-w-2xl text-body-lg text-white/80">{project.oneLiner}</p>
      </div>

      <GlassCard
        tone="dark"
        className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-auto md:left-16"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
          {facts.map((fact) => (
            <div key={fact.label}>
              <span className="font-mono text-mono-meta uppercase text-white/60">
                {fact.label}
              </span>
              <p className="mt-1 font-mono text-mono-meta text-white">{fact.value}</p>
            </div>
          ))}
          {project.facts.liveUrl ? (
            <Button
              variant="secondary"
              size="compact"
              label="Visit live site ↗"
              href={project.facts.liveUrl}
              external
              className="border-white/40 text-white hover:bg-white/10"
            />
          ) : null}
        </div>
      </GlassCard>
    </div>
  );
}
