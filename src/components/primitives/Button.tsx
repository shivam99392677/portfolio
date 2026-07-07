"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { duration, easing } from "@/lib/motion-tokens";

/**
 * Button — components.md §3.
 * The site's single primitive for triggering an action. Renders a real
 * `<a>` when given `href`, otherwise a real `<button>` — never a styled
 * `<div>`. Press/hover/focus timing is curve-based, not spring-based
 * (animations.md §9.1/§9.3 — springs are reserved for things that "arrive").
 */

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "icon";
export type ButtonSize = "default" | "compact";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Visible label. Required unless variant="icon". */
  label?: string;
  /** Accessible name. Required when variant="icon" (no visible label). */
  ariaLabel?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  /** Renders as a navigating `<a>` via next/link instead of a `<button>`. */
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  id?: string;
}

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-12 px-6 gap-2", // 48px — design-system §9
  compact: "h-11 px-4 gap-1.5", // 44px — accessibility floor, design-system §10
};

const iconSizeStyles: Record<ButtonSize, string> = {
  default: "h-12 w-12",
  compact: "h-11 w-11",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-solid text-white hover:bg-accent-hover",
  secondary:
    "bg-transparent text-text-primary border border-border-default hover:bg-surface-hover",
  tertiary: "bg-transparent text-text-primary underline-offset-4 hover:underline px-1",
  icon: "bg-transparent text-text-primary hover:bg-surface-hover",
};

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function Button({
  variant = "secondary",
  size = "default",
  label,
  ariaLabel,
  leadingIcon,
  trailingIcon,
  disabled = false,
  loading = false,
  fullWidth = false,
  href,
  external = false,
  onClick,
  className,
  type = "button",
  id,
}: ButtonProps) {
  if (process.env.NODE_ENV !== "production" && variant === "icon" && !ariaLabel) {
    console.warn('Button: variant="icon" requires `ariaLabel` (components.md §3, Accessibility).');
  }

  const isDisabled = disabled || loading;
  const isIcon = variant === "icon";

  const sharedClassName = cn(
    "inline-flex items-center justify-center rounded-button font-medium",
    "transition-colors duration-150 ease-out",
    isIcon ? iconSizeStyles[size] : sizeStyles[size],
    variantStyles[variant],
    fullWidth && "w-full",
    isDisabled && "opacity-40 pointer-events-none",
    className
  );

  const content = (
    <>
      {loading ? <Spinner /> : leadingIcon}
      {!isIcon && label}
      {!loading && trailingIcon}
    </>
  );

  const tapTransition = { duration: duration.micro, ease: easing.outStandard };

  if (href && !isDisabled) {
    return (
      <motion.span className="inline-block" whileTap={{ scale: 0.97 }} transition={tapTransition}>
        <Link
          href={href}
          id={id}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={isIcon ? ariaLabel : undefined}
          className={sharedClassName}
        >
          {content}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      type={type}
      id={id}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-label={isIcon ? ariaLabel : undefined}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      transition={tapTransition}
      className={sharedClassName}
    >
      {content}
    </motion.button>
  );
}
