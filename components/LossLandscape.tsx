'use client';

import {
  contours,
  type ContourMultiPolygon,
  type ContourPolygon,
  type ContourRing,
  type ContourPoint,
} from 'd3-contour';
import { startTransition, useEffect, useMemo, useRef, useState } from 'react';

type LossLandscapeProps = {
  className?: string;
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

type RidgeSeed = {
  x: number;
  y: number;
  amplitude: number;
  radius: number;
  driftX: number;
  driftY: number;
  phase: number;
  frequency: number;
};

type ContourPath = {
  d: string;
  opacity: number;
  strokeWidth: number;
};

const INITIAL_POINTER: PointerState = {
  x: 0.5,
  y: 0.5,
  active: false,
};

const GRID_SIZE = 20;
const UPDATE_INTERVAL_MS = 72;
const BASELINE = 0.52;
const THRESHOLDS = [0.28, 0.38, 0.48, 0.58, 0.68, 0.78];
const OVERLAY_MASK =
  'radial-gradient(ellipse 72% 76% at center, transparent 0%, transparent 34%, black 64%, black 100%)';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function createRidgeSeeds(count: number, seed: number): RidgeSeed[] {
  let value = seed;

  function next() {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  }

  return Array.from({ length: count }, () => ({
    x: 0.12 + next() * 0.76,
    y: 0.1 + next() * 0.8,
    amplitude: (next() * 0.9 - 0.3) * (next() > 0.35 ? 1 : -1),
    radius: 0.11 + next() * 0.17,
    driftX: 0.018 + next() * 0.035,
    driftY: 0.018 + next() * 0.035,
    phase: next() * Math.PI * 2,
    frequency: 0.32 + next() * 0.62,
  }));
}

const RIDGE_SEEDS = createRidgeSeeds(7, 4129);

function contourToPath(contour: ContourMultiPolygon): string {
  return contour.coordinates
    .map((polygon: ContourPolygon) =>
      polygon
        .map((ring: ContourRing) =>
          ring
            .map(
              ([x, y]: ContourPoint, index: number) =>
                `${index === 0 ? 'M' : 'L'} ${x.toFixed(3)} ${y.toFixed(3)}`
            )
            .join(' ') + ' Z'
        )
        .join(' ')
    )
    .join(' ');
}

function buildGrid(phase: number, pointer: PointerState): number[] {
  const values: number[] = [];

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const nx = x / (GRID_SIZE - 1);
      const ny = y / (GRID_SIZE - 1);

      let cell =
        BASELINE +
        Math.sin(nx * 4.8 + phase * 1.12) * 0.08 +
        Math.cos(ny * 3.6 - phase * 0.87) * 0.07 +
        Math.sin((nx + ny) * 5.1 + phase * 0.54) * 0.04;

      for (const ridge of RIDGE_SEEDS) {
        const cx = clamp(
          ridge.x + Math.sin(phase * ridge.frequency + ridge.phase) * ridge.driftX,
          0.04,
          0.96
        );
        const cy = clamp(
          ridge.y + Math.cos(phase * (ridge.frequency + 0.18) + ridge.phase) * ridge.driftY,
          0.04,
          0.96
        );
        const dx = nx - cx;
        const dy = ny - cy;
        const influence = Math.exp(-((dx * dx + dy * dy) / (ridge.radius * ridge.radius)));
        cell += ridge.amplitude * influence * 0.32;
      }

      if (pointer.active) {
        const dx = nx - pointer.x;
        const dy = ny - pointer.y;
        const hill = Math.exp(-((dx * dx + dy * dy) / 0.018)) * 0.22;
        const slip = Math.exp(-((dx * dx + (dy + 0.07) * (dy + 0.07)) / 0.05)) * -0.1;
        cell += hill + slip;
      }

      values.push(clamp(cell, 0, 1));
    }
  }

  return values;
}

export default function LossLandscape({ className }: LossLandscapeProps) {
  const pointerRef = useRef<PointerState>(INITIAL_POINTER);
  const reduceMotionRef = useRef(false);
  const [grid, setGrid] = useState<number[]>(() => buildGrid(0, INITIAL_POINTER));

  const contourGenerator = useMemo(
    () => contours().size([GRID_SIZE, GRID_SIZE]).thresholds(THRESHOLDS),
    []
  );

  const contourPaths = useMemo<ContourPath[]>(() => {
    const generatedContours = contourGenerator(grid);

    return generatedContours
      .map((contour: ContourMultiPolygon, index: number) => ({
        d: contourToPath(contour),
        opacity: 0.08 + index * 0.018,
        strokeWidth: index % 2 === 0 ? 0.08 : 0.06,
      }))
      .filter((contour: ContourPath) => contour.d.length > 0);
  }, [contourGenerator, grid]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncMotionPreference = () => {
      reduceMotionRef.current = mediaQuery.matches;
    };

    syncMotionPreference();
    mediaQuery.addEventListener('change', syncMotionPreference);

    let frameId = 0;
    let lastTick = 0;

    const updatePointer = (event: PointerEvent) => {
      const x = clamp(event.clientX / window.innerWidth, 0, 1);
      const y = clamp(event.clientY / window.innerHeight, 0, 1);

      pointerRef.current = {
        x,
        y,
        active: true,
      };
    };

    const clearPointer = () => {
      pointerRef.current = {
        x: pointerRef.current.x,
        y: pointerRef.current.y,
        active: false,
      };
    };

    const loop = (time: number) => {
      if (time - lastTick >= (reduceMotionRef.current ? 220 : UPDATE_INTERVAL_MS)) {
        const phase = time * 0.00012;
        const nextGrid = buildGrid(phase, pointerRef.current);
        startTransition(() => {
          setGrid(nextGrid);
        });
        lastTick = time;
      }

      frameId = window.requestAnimationFrame(loop);
    };

    frameId = window.requestAnimationFrame(loop);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('blur', clearPointer);

    return () => {
      mediaQuery.removeEventListener('change', syncMotionPreference);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('blur', clearPointer);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (contourPaths.length === 0) {
    return null;
  }

  return (
    <div
      className={className ?? "fixed inset-0 w-screen h-screen -z-10 overflow-hidden"}
      aria-hidden="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 left-[-10%] w-[42%] rounded-full bg-[radial-gradient(circle_at_left_center,rgba(231,229,228,0.9),transparent_66%)] blur-3xl dark:bg-[radial-gradient(circle_at_left_center,rgba(41,37,36,0.75),transparent_68%)]" />
        <div className="absolute inset-y-0 right-[-12%] w-[46%] rounded-full bg-[radial-gradient(circle_at_right_center,rgba(214,211,209,0.7),transparent_72%)] blur-3xl dark:bg-[radial-gradient(circle_at_right_center,rgba(28,25,23,0.82),transparent_72%)]" />
        <svg
          viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}
          preserveAspectRatio="none"
          className="pointer-events-none h-full w-full"
          style={{
            mixBlendMode: 'multiply',
            maskImage: OVERLAY_MASK,
            WebkitMaskImage: OVERLAY_MASK,
          }}
        >
          {contourPaths.map((contour, index) => (
            <path
              key={`${index}-${contour.d.slice(0, 24)}`}
              d={contour.d}
              fill="none"
              stroke="rgba(26, 24, 20, 0.4)"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{
                opacity: contour.opacity,
                strokeWidth: 0.05,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
