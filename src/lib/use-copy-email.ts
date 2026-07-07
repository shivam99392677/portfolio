"use client";

import { useState } from "react";

/**
 * Copy-to-clipboard pattern shared verbatim by Footer and /contact
 * (components.md §11 — "implemented once, reused, not rebuilt per page").
 * Confirmation is announced via `aria-live` by the caller (animations.md
 * §5.10), not implied by this hook alone.
 */
export function useCopyEmail(email: string) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
}
