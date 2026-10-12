"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import { SITE } from "@/lib/site";

export interface TabItem {
  id: string;
  label: string;
}

const svgBase = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

function LinkedInIcon() {
  return (
    <svg {...svgBase} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg {...svgBase} fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg
      {...svgBase}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

const EXTERNAL = [
  { label: "LinkedIn", href: SITE.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: SITE.github, Icon: GitHubIcon },
  { label: "Resume", href: SITE.resume, Icon: ResumeIcon },
];

export default function Tabs({
  tabs,
  active,
  onChange,
  progress = 0,
  logoSrc = "/logo.svg",
  logoFallback = "SA",
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  progress?: number;
  logoSrc?: string;
  logoFallback?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-space-bg/80 backdrop-blur-md">
      {/* exploration progress: thin neutral line along the top edge */}
      <motion.div
        aria-hidden
        className="absolute left-0 top-0 h-[2px] bg-space-fg/40"
        initial={false}
        animate={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <div className="flex w-full items-center gap-4 px-6 sm:gap-8">
        {/* logo in its own card */}
        <Magnetic strength={0.2}>
          <div className="my-2 flex h-9 items-center justify-center rounded-lg border border-white/10 bg-space-card px-3 transition-colors hover:border-space-accent/70">
            {imgFailed ? (
              <span className="text-sm font-semibold tracking-tight text-space-fg">
                {logoFallback}
              </span>
            ) : (
              <img
                src={logoSrc}
                alt="Logo"
                className="h-5 w-auto"
                onError={() => setImgFailed(true)}
              />
            )}
          </div>
        </Magnetic>

        <div className="flex gap-2 sm:gap-4">
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <Magnetic key={tab.id} strength={0.25}>
                <button
                  onClick={() => onChange(tab.id)}
                  className={`relative px-2 py-4 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-space-fg"
                      : "text-space-fg/60 hover:text-space-accent"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute -bottom-px left-0 right-0 h-[2px] bg-space-fg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </Magnetic>
            );
          })}
        </div>

        {/* right side: quiet links, icon-only on small screens */}
        <nav aria-label="External links" className="ml-auto flex items-center">
          {EXTERNAL.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex items-center gap-2 rounded-md px-2 py-4 text-sm text-space-fg/70 transition-colors hover:text-space-accent sm:px-3">
              <Icon />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}