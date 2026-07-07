"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion, useMotionValue, type PanInfo } from "motion/react";
import Image from "next/image";
import { Section } from "@/components/primitives/Section";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { spring } from "@/lib/motion-tokens";
import type { ContentBlock, Media } from "@/content/types";

/**
 * ProcessCraft — architecture.md §5.3 (Process & Craft).
 * A flexible sequence of text, image, comparison and quote blocks, ordered
 * to mirror the actual build process. Each block reveals independently on
 * its own scroll position (animations.md §7.4) — never a shared stagger
 * group, mirroring the `StepItem` pattern in `Process.tsx`.
 */

export interface ProcessCraftProps {
  blocks: ContentBlock[];
}

export function ProcessCraft({ blocks }: ProcessCraftProps) {
  return (
    <Section variant="standard" background="surface" ariaLabel="Process and craft">
      <div className="flex flex-col gap-16 md:gap-24">
        {blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    </Section>
  );
}

function Block({ block }: { block: ContentBlock }) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={reducedMotion ? { duration: 0.15 } : spring.gentle}
    >
      {block.type === "text" && <TextBlock block={block} />}
      {block.type === "image" && <ImageBlock block={block} />}
      {block.type === "comparison" && <ComparisonBlock block={block} inView={inView} />}
      {block.type === "quote" && <QuoteBlock block={block} />}
    </motion.div>
  );
}

function TextBlock({ block }: { block: { heading?: string; body: string } }) {
  return (
    <div>
      {block.heading && <h3 className="text-h3 text-text-primary">{block.heading}</h3>}
      <p className="text-body text-text-secondary mt-2">{block.body}</p>
    </div>
  );
}

function ImageBlock({ block }: { block: { media: Media; caption?: string } }) {
  return (
    <div>
      <div className="relative aspect-video w-full">
        <Image
          src={block.media.src}
          alt={block.media.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {block.caption && (
        <p className="mt-2 font-mono text-mono-meta text-text-tertiary">{block.caption}</p>
      )}
    </div>
  );
}

function QuoteBlock({ block }: { block: { quote: string; attribution?: string } }) {
  return (
    <div>
      <blockquote className="text-h3 text-text-primary border-l-2 border-accent-solid pl-6">
        &ldquo;{block.quote}&rdquo;
      </blockquote>
      {block.attribution && (
        <p className="mt-3 pl-6 font-mono text-mono-meta text-text-tertiary">
          {block.attribution}
        </p>
      )}
    </div>
  );
}

function ComparisonBlock({
  block,
  inView,
}: {
  block: { before: Media; after: Media; caption?: string };
  inView: boolean;
}) {
  return (
    <div>
      <BeforeAfterSlider before={block.before} after={block.after} inView={inView} />
      {block.caption && (
        <p className="mt-2 font-mono text-mono-meta text-text-tertiary">{block.caption}</p>
      )}
    </div>
  );
}

function BeforeAfterSlider({
  before,
  after,
  inView,
}: {
  before: Media;
  after: Media;
  inView: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return <DesktopSlider before={before} after={after} inView={inView} />;
  }

  return <MobileToggle before={before} after={after} />;
}

function DesktopSlider({
  before,
  after,
  inView,
}: {
  before: Media;
  after: Media;
  inView: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [position, setPosition] = useState(50);
  const [introDone, setIntroDone] = useState(false);

  const updatePositionFromClientX = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const relative = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, relative)));
  };

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    updatePositionFromClientX(info.point.x);
    x.set(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((current) => Math.max(0, current - 5));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((current) => Math.min(100, current + 5));
    }
  };

  const target = inView ? position : reducedMotion ? position : 35;
  const introTransition = !introDone && inView ? (reducedMotion ? { duration: 0 } : spring.elastic) : { duration: 0 };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full select-none overflow-hidden"
    >
      <Image src={before.src} alt={before.alt} fill className="object-cover" sizes="100vw" />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={after.src} alt={after.alt} fill className="object-cover" sizes="100vw" />
      </div>
      <motion.div
        role="slider"
        tabIndex={0}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Comparison position"
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
        style={{ x, left: `${target}%` }}
        animate={{ left: `${target}%` }}
        transition={introTransition}
        onAnimationComplete={() => setIntroDone(true)}
        onDrag={handleDrag}
        onKeyDown={handleKeyDown}
        className="absolute top-0 h-full w-0.5 -translate-x-1/2 cursor-ew-resize bg-canvas outline-none focus-visible:ring-2 focus-visible:ring-accent-solid"
      >
        <span className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-canvas shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" />
      </motion.div>
    </div>
  );
}

function MobileToggle({ before, after }: { before: Media; after: Media }) {
  const [showAfter, setShowAfter] = useState(false);
  const active = showAfter ? after : before;

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowAfter((value) => !value)}
        aria-pressed={showAfter}
        aria-label="Tap to compare before and after"
        className="relative block aspect-video w-full outline-none focus-visible:ring-2 focus-visible:ring-accent-solid focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <Image src={active.src} alt={active.alt} fill className="object-cover" sizes="100vw" />
      </button>
      <p className="mt-2 font-mono text-mono-meta text-text-tertiary">Tap to compare</p>
    </div>
  );
}
