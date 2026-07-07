"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import { useScrollThreshold } from "@/lib/use-scroll-threshold";
import { useScrollDirection } from "@/lib/use-scroll-direction";
import { useMediaQuery } from "@/lib/use-media-query";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { spring, stagger, duration, easing } from "@/lib/motion-tokens";
import { Button } from "@/components/primitives/Button";

/**
 * Navbar — components.md §9 / architecture.md §3.1.
 * Singleton, state-driven only (no visual variant). Mounted once in the
 * root layout. `SCROLL_SENTINEL_ID` must match the sentinel rendered in
 * layout.tsx just before this component.
 */

export const SCROLL_SENTINEL_ID = "nav-scroll-sentinel";

export interface NavLink {
  label: string;
  href: string;
  /** Section id (homepage scrollspy) or route path (other pages). */
  matches: string;
}

export interface NavbarProps {
  logo: string;
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}

export function Navbar({ logo, links, ctaLabel, ctaHref }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMobile = useMediaQuery("(max-width: 639px)");
  const reducedMotion = useReducedMotion();

  const scrolled = useScrollThreshold(SCROLL_SENTINEL_ID);
  const scrollDirection = useScrollDirection();
  const sectionIds = isHome ? links.filter((l) => l.href.startsWith("/#")).map((l) => l.matches) : [];
  const activeSectionId = useScrollSpy(sectionIds);

  const [mobileOpen, setMobileOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const MENU_TRIGGER_ID = "nav-mobile-menu-trigger";

  const isActive = (link: NavLink) => {
    if (isHome && link.href.startsWith("/#")) return activeSectionId === link.matches;
    return pathname === link.href;
  };

  // Mobile hide-on-scroll-down / reveal-on-scroll-up (§5.3) — never while the overlay is open.
  const hiddenOnMobile = isMobile && scrollDirection === "down" && scrolled && !mobileOpen;

  useEffect(() => {
    if (!mobileOpen) return;

    const firstLink = overlayRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        document.getElementById(MENU_TRIGGER_ID)?.focus();
        return;
      }
      if (event.key !== "Tab" || !overlayRef.current) return;

      const focusable = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>("a, button")
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        aria-label="Primary"
        style={{ viewTransitionName: "site-header" }}
        animate={{ y: hiddenOnMobile ? "-100%" : "0%" }}
        transition={{ duration: duration.standard, ease: easing.inOutStandard }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-out",
          scrolled ? "border-b border-border-subtle bg-canvas/90 backdrop-blur-sm" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[var(--width-standard)] items-center justify-between px-6 py-4 sm:px-10 md:px-16">
          <Link href="/" className="font-mono text-mono-meta font-medium text-text-primary">
            {logo}
          </Link>

          <ul className="hidden items-center gap-6 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link) ? (isHome ? "true" : "page") : undefined}
                  className={cn(
                    "relative py-2 text-body transition-colors duration-150 ease-out",
                    isActive(link) ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                  {isActive(link) && (
                    <motion.span
                      layoutId={reducedMotion ? undefined : "nav-underline"}
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-accent-solid"
                      transition={spring.snappy}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden sm:block">
            <Button variant="primary" size="compact" label={ctaLabel} href={ctaHref} />
          </div>

          <Button
            variant="icon"
            size="compact"
            ariaLabel={mobileOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
            id={MENU_TRIGGER_ID}
            onClick={() => setMobileOpen((open) => !open)}
            leadingIcon={<MenuIcon open={mobileOpen} />}
          />
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.standard }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-canvas sm:hidden"
          >
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...spring.gentle,
                  delay: reducedMotion ? 0 : index * stagger.normal,
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-h3 text-text-primary"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.gentle, delay: reducedMotion ? 0 : links.length * stagger.normal }}
            >
              <Button variant="primary" label={ctaLabel} href={ctaHref} onClick={() => setMobileOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      {open ? (
        <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M2 5H16M2 13H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}
