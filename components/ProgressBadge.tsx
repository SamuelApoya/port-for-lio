"use client";

import { motion } from "framer-motion";

export default function ProgressBadge({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-space-fg/70 mb-1">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-space-accent"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}