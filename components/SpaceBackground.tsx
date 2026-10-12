"use client";

import dynamic from "next/dynamic";

const SpaceCanvas = dynamic(() => import("./SpaceCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <SpaceCanvas />
    </div>
  );
}