import Image from "next/image";
import type { Metadata } from "next";
import { Section } from "@/components/primitives/Section";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { site } from "@/content/site";

/**
 * /about — architecture.md §6.1. The calmest, most text-forward page on
 * the site. Closing CTA reuses the homepage ContactCTA component verbatim
 * (same headline-reveal treatment, per spec's "matching §4.9" instruction).
 */

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: site.aboutBio,
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <Section variant="standard" background="canvas" ariaLabel="About">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,320px)_1fr]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card">
            <Image
              src="/images/portrait.jpeg"
              alt={`Portrait of ${site.name}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="max-w-[65ch]">
            <h1 className="text-h1 text-text-primary">About</h1>
            <p className="mt-6 text-body-lg text-text-secondary whitespace-pre-line">
              {site.aboutBio}
            </p>
          </div>
        </div>
      </Section>

      <ContactCTA
        statement={site.contactStatement}
        ctaLabel="Say hello"
        ctaHref="/contact"
      />
    </main>
  );
}
