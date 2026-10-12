"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function SpotlightCard({
  children,
  className = "",
  tilt = 6,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const background = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, rgba(139,125,255,0.14), transparent 70%)`;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x);
    my.set(y);
    rotateX.set(-(y / r.height - 0.5) * tilt * 2);
    rotateY.set((x / r.width - 0.5) * tilt * 2);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-4 ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}