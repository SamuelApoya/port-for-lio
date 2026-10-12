import { SITE } from "@/lib/site";

const icon = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

const LINKS = [
  {
    label: "Email",
    href: `mailto:${SITE.email}`,
    external: false,
    icon: (
      <svg {...icon} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: SITE.github,
    external: true,
    icon: (
      <svg {...icon} fill="currentColor">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    external: true,
    icon: (
      <svg {...icon} fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
];

export default function ContactLinks() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {LINKS.map((l) => (
        <a key={l.label} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noreferrer" : undefined} className="flex flex-col items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-8 text-base font-medium text-space-fg/80 transition-colors hover:border-space-accent hover:bg-white/[0.06] hover:text-space-accent">
          {l.icon}
          <span>{l.label}</span>
        </a>
      ))}
    </div>
  );
}