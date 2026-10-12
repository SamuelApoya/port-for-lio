"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type DriftKind = "nebula" | "blackhole" | "whitedwarf";

interface DriftObject {
  id: number;
  kind: DriftKind;
  startZ: number;
  y: number;
  speed: number;
  size: number;
}

const KIND_STYLES: Record<DriftKind, { color: string; opacity: number }> = {
  nebula: { color: "#8b7dff", opacity: 0.18 },
  blackhole: { color: "#151018", opacity: 0.35 },
  whitedwarf: { color: "#eaf2ff", opacity: 0.6 },
};

function DriftingBody({
  obj,
  onDone,
}: {
  obj: DriftObject;
  onDone: (id: number) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const z = useRef(obj.startZ);

  useFrame((_, delta) => {
    z.current += obj.speed * delta;
    if (ref.current) {
      ref.current.position.z = z.current;
      // gentle drift across x as it passes
      ref.current.position.x = (z.current - obj.startZ) * 0.15;
    }
    if (z.current > 8) onDone(obj.id);
  });

  const style = KIND_STYLES[obj.kind];

  return (
    <mesh ref={ref} position={[-4, obj.y, obj.startZ]}>
      {obj.kind === "blackhole" ? (
        <torusGeometry args={[obj.size, obj.size * 0.15, 16, 48]} />
      ) : (
        <sphereGeometry args={[obj.size, 24, 24]} />
      )}
      <meshBasicMaterial
        color={style.color}
        transparent
        opacity={style.opacity}
      />
    </mesh>
  );
}

function DriftField() {
  const [objects, setObjects] = useState<DriftObject[]>([]);
  const nextId = useRef(0);
  const nextSpawn = useRef(0);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (elapsed.current > nextSpawn.current) {
      const kinds: DriftKind[] = ["nebula", "blackhole", "whitedwarf"];
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      const newObj: DriftObject = {
        id: nextId.current++,
        kind,
        startZ: -40,
        y: (Math.random() - 0.5) * 12,
        speed: 1.2 + Math.random() * 0.8,
        size: kind === "whitedwarf" ? 0.15 : 1.2 + Math.random() * 1.5,
      };
      setObjects((prev) => [...prev, newObj]);
      // spawn roughly every 12–22s — infrequent, non-distracting
      nextSpawn.current = elapsed.current + 12 + Math.random() * 10;
    }
  });

  const removeObj = (id: number) =>
    setObjects((prev) => prev.filter((o) => o.id !== id));

  return (
    <>
      {objects.map((o) => (
        <DriftingBody key={o.id} obj={o} onDone={removeObj} />
      ))}
    </>
  );
}

export default function SpaceCanvas() {
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Stars
        radius={60}
        depth={30}
        count={reducedMotion ? 800 : 2500}
        factor={2}
        fade
        speed={reducedMotion ? 0 : 0.3}
      />
      {!reducedMotion && <DriftField />}
    </Canvas>
  );
}