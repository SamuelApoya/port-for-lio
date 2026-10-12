"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Tabs, { TabItem } from "@/components/Tabs";
import AchievementToast from "@/components/AchievementToast";
import SpotlightCard from "@/components/SpotlightCard";
import HoverText from "@/components/HoverText";
import CountUp from "@/components/CountUp";
import CopyEmail from "@/components/CopyEmail";
import ContactLinks from "@/components/ContactLinks";
import { recordVisit, markSectionVisited, getState } from "@/lib/gamification";
import { SITE, ABOUT, STATS, RESEARCH, EXPERIENCE } from "@/lib/site";

const TABS: TabItem[] = [
  { id: "intro", label: "About" },
  { id: "research", label: "Research" },
  { id: "industry", label: "Industry" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const [active, setActive] = useState("intro");
  const [visitedCount, setVisitedCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    recordVisit();
    setVisitedCount(getState().visitedSections.length);
    handleTabVisit("intro");
  }, []);

  function handleTabVisit(id: string) {
    const { isNew, unlocked } = markSectionVisited(id);
    if (isNew) setVisitedCount((c) => c + 1);
    if (unlocked) {
      setToast("Explorer unlocked — you've seen it all!");
      setTimeout(() => setToast(null), 3500);
    }
  }

  function handleChange(id: string) {
    setActive(id);
    handleTabVisit(id);
  }

  const wide = active === "intro";

  return (
    <div>
      <Tabs
        tabs={TABS}
        active={active}
        onChange={handleChange}
        progress={visitedCount / TABS.length}
      />

      <div
        className={`mx-auto px-6 ${
          wide ? "max-w-none py-6" : "max-w-5xl py-12"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={wide ? "" : "min-h-[50vh]"}
          >
            {active === "intro" && (
              <section className="grid gap-6 md:h-[calc(100vh-7rem)] md:grid-cols-[9fr_11fr]">
                {/* photo: 2/3 width, nearly full height, square corners */}
                <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full">
                  <Image
                    src={SITE.photo}
                    alt="Portrait of Samuel Apoya"
                    fill
                    priority
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>

                {/* text + compact stats */}
                <div className="flex min-h-0 flex-col md:h-full">
                  <div className="min-h-0 md:overflow-y-auto md:pr-1">
                    <h1 className="mb-2 text-3xl font-semibold">
                      <HoverText text={SITE.name} />
                    </h1>
                    <p className="mb-5 text-sm text-space-fg/70">
                      PhD student · Computer Science · UMBC
                    </p>
                    <div className="space-y-4 text-sm leading-relaxed text-space-fg/80">
                      {ABOUT.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2 md:mt-auto md:pt-6">
                    {STATS.map((s) => (
                      <SpotlightCard
                        key={s.label}
                        tilt={3}
                        className="!px-3 !py-2"
                      >
                        <div className="text-xl font-semibold text-space-fg">
                          <CountUp to={s.to} suffix={s.suffix} />
                        </div>
                        <div className="text-[11px] leading-tight text-space-fg/70">
                          {s.label}
                        </div>
                      </SpotlightCard>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {active === "research" && (
              <section>
                <h2 className="mb-6 text-2xl font-semibold">
                  <HoverText text="Research" />
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {RESEARCH.map((r) => (
                    <SpotlightCard key={r.title}>
                      <h3 className="mb-1 font-medium">{r.title}</h3>
                      <p className="mb-2 text-xs text-space-fg/70">{r.venue}</p>
                      <p className="text-sm text-space-fg/70">{r.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {r.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-space-fg/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </section>
            )}

            {active === "industry" && (
            <section>
            <h2 className="mb-6 text-2xl font-semibold">
              <HoverText text="Industry Experience" />
            </h2>
            <div className="space-y-4">
              {EXPERIENCE.map((e, i) => (
                <SpotlightCard key={`${e.company}-${i}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-medium">
                      {e.role} · {e.company}
                    </h3>
                    <p className="text-xs text-space-fg/70">{e.dates}</p>
                  </div>
                  <p className="mb-3 text-xs text-space-fg/70">{e.location}</p>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-space-fg/70">
                    {e.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-space-fg/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              ))}
            </div>
            </section>
            )}

            {active === "projects" && (
              <section>
                <h2 className="mb-6 text-2xl font-semibold">
                  <HoverText text="Projects" />
                </h2>
                <div className="grid gap-4">
                  <SpotlightCard>
                    <h3 className="mb-1 font-medium">RiskLens</h3>
                    <p className="text-sm text-space-fg/70">
                      AI-powered portfolio risk analysis platform.
                    </p>
                  </SpotlightCard>
                </div>
              </section>
            )}

            {active === "contact" && (
              <section>
                <h2 className="mb-6 text-2xl font-semibold">
                  <HoverText text="Contact" />
                </h2>

                <div className="mx-auto max-w-3xl space-y-4">
                  <CopyEmail email={SITE.email} />
                  <ContactLinks />
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AchievementToast message={toast ?? ""} visible={!!toast} />
    </div>
  );
}