import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { ContextSection } from "@/components/case-study/ContextSection";
import { ProcessCraft } from "@/components/case-study/ProcessCraft";
import { SolutionShowcase } from "@/components/case-study/SolutionShowcase";
import { OutcomeImpact } from "@/components/case-study/OutcomeImpact";
import { NextProject } from "@/components/case-study/NextProject";
import { projects, getProjectBySlug } from "@/content/projects";

/**
 * Case Study page template — architecture.md §5. Context → Process →
 * Outcome, one self-contained three-act story per project.
 */

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.oneLiner,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main id="main-content">
      <CaseStudyHero project={project} />
      <ContextSection challenge={project.challenge} />
      <ProcessCraft blocks={project.processBlocks} />
      <SolutionShowcase media={project.solutionMedia} />
      <OutcomeImpact metrics={project.outcomeMetrics} reflection={project.outcomeReflection} />
      <NextProject project={nextProject} />
    </main>
  );
}
