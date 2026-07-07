import type { TimelineEntry } from "@/content/types";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { Timeline } from "@/components/composites/Timeline";

export interface ExperienceProps {
  entries: TimelineEntry[];
  resumeUrl?: string;
}

export function Experience({ entries, resumeUrl }: ExperienceProps) {
  return (
    <Section variant="standard" background="surface" ariaLabel="Experience">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-h2 text-text-primary">Experience</h2>
        {resumeUrl && (
          <Button
            variant="secondary"
            size="compact"
            label="View résumé"
            href={resumeUrl}
            external
          />
        )}
      </div>
      <div className="mt-12">
        <Timeline entries={entries} orientation="vertical" />
      </div>
    </Section>
  );
}
