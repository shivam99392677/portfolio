"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useCopyEmail } from "@/lib/use-copy-email";
import { duration, stagger, spring, easing } from "@/lib/motion-tokens";
import { site } from "@/content/site";

/**
 * /contact — architecture.md §6.3. "Structurally, Act 3 in isolation" —
 * the headline reuses the exact same staggered-word treatment as Hero and
 * the homepage ContactCTA (animations.md §8.4), but triggers on load since
 * this page is a direct destination, not something scrolled to.
 */
export default function ContactPage() {
  const reducedMotion = useReducedMotion();
  const { copied, copy } = useCopyEmail(site.email);
  const words = site.contactStatement.split(" ");

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name || "your site"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main id="main-content">
      <Section
        variant="standard"
        background="canvas"
        ariaLabel="Contact"
        containerClassName="flex flex-col items-center gap-10 py-32 text-center"
      >
        {reducedMotion ? (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.micro, ease: easing.outStandard }}
            className="text-display text-text-primary"
          >
            {site.contactStatement}
          </motion.h1>
        ) : (
          <h1 className="text-display text-text-primary">
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.gentle, delay: index * stagger.loose }}
                className="inline-block"
              >
                {word}
                {index < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </h1>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={copy}
            className="text-body-lg text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
            aria-label="Copy email address"
          >
            {site.email}
          </button>
          {copied && (
            <span className="font-mono text-mono-meta text-accent-solid">Copied</span>
          )}
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? "Email copied to clipboard" : ""}
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex w-full max-w-md flex-col gap-4 text-left"
        >
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-mono-meta text-text-tertiary">Name</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
              className="h-12 rounded-input border border-border-default bg-canvas px-4 text-body text-text-primary outline-none focus-visible:border-accent-solid focus-visible:ring-2 focus-visible:ring-accent-solid"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-mono-meta text-text-tertiary">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((f) => ({ ...f, email: event.target.value }))}
              className="h-12 rounded-input border border-border-default bg-canvas px-4 text-body text-text-primary outline-none focus-visible:border-accent-solid focus-visible:ring-2 focus-visible:ring-accent-solid"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-mono-meta text-text-tertiary">Message</span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(event) => setForm((f) => ({ ...f, message: event.target.value }))}
              className="rounded-input border border-border-default bg-canvas px-4 py-3 text-body text-text-primary outline-none focus-visible:border-accent-solid focus-visible:ring-2 focus-visible:ring-accent-solid"
            />
          </label>
          <Button type="submit" variant="primary" label="Send message" fullWidth />
        </form>
      </Section>
    </main>
  );
}
