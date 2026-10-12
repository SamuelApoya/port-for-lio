"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked: the address is still visible and selectable
    }
  }

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-5">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-space-fg/60">Email</p>
        <p className="mt-1 select-all truncate text-lg font-medium sm:text-2xl">
          {email}
        </p>
      </div>

      <button
        onClick={copy}
        aria-label="Copy email address"
        title="Copy email address"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/20 text-space-fg/80 transition-colors hover:border-space-accent hover:text-space-accent"
      >
        {copied ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>

      <span aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </div>
  );
}