import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Process } from "@/components/sections/Process";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { timelineEntries } from "@/content/timeline";
import { skills } from "@/content/skills";
import { testimonials } from "@/content/testimonials";

/**
 * Homepage — architecture.md §1.2, §4. Single-scroll page composing every
 * section in the breathe-in/breathe-out order the doc specifies. Each
 * section owns its own animation; this file only wires content to props.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Hero
        name={site.name}
        headline={site.heroHeadline}
        subline={site.heroSubline}
        primaryCtaLabel="View Work"
        primaryCtaHref="/#selected-work"
      />
      <Intro paragraph={site.introParagraph} moreHref="/about" />
      <SelectedWork projects={projects} />
      <Process statement={site.processStatement} steps={site.processSteps} />
      <Experience entries={timelineEntries} resumeUrl={site.resumeUrl} />
      <Skills skills={skills} />
      <Testimonials testimonials={testimonials} />
      <ContactCTA
        statement={site.contactStatement}
        ctaLabel="Say hello"
        ctaHref="/contact"
      />
    </main>
  );
}
