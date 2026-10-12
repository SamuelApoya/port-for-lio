"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const REST_RING = "rgba(230,233,240,0.45)";
const HOVER_RING = "rgba(168,159,255,0.9)";
const REST_DOT = "rgba(230,233,240,0.9)";
const HOVER_DOT = "rgba(168,159,255,1)";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as Element | null;
      setHovering(!!t?.closest("a, button, [data-cursor]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          className="-ml-5 -mt-5 h-10 w-10 rounded-full border"
          initial={false}
          animate={{
            scale: hovering ? 1.5 : 0.7,
            borderColor: hovering ? HOVER_RING : REST_RING,
            backgroundColor: hovering
              ? "rgba(168,159,255,0.15)"
              : "rgba(168,159,255,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        />
      </motion.div>

      {/* exact-position dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full"
        style={{ x, y }}
        initial={false}
        animate={{ backgroundColor: hovering ? HOVER_DOT : REST_DOT }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}