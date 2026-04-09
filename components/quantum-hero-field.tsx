"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

const particles = [
  { left: "14%", top: "18%", delay: "0s", duration: "9s" },
  { left: "21%", top: "63%", delay: "-1.4s", duration: "11s" },
  { left: "30%", top: "28%", delay: "-3.3s", duration: "10s" },
  { left: "41%", top: "76%", delay: "-2.1s", duration: "12s" },
  { left: "52%", top: "17%", delay: "-5.4s", duration: "9.5s" },
  { left: "60%", top: "61%", delay: "-4.2s", duration: "10.5s" },
  { left: "71%", top: "26%", delay: "-2.8s", duration: "8.8s" },
  { left: "78%", top: "70%", delay: "-6.2s", duration: "12.2s" },
  { left: "87%", top: "42%", delay: "-7.1s", duration: "9.8s" },
] as const;

const nodeAngles = [0, 70, 140, 210, 280];
const orbitDistances = {
  a: "clamp(6.8rem, 18vw, 9.6rem)",
  b: "clamp(6.2rem, 16vw, 8.8rem)",
  c: "clamp(5.6rem, 14vw, 7.8rem)",
} as const;
const shards = ["a", "b", "c", "d"] as const;

export function QuantumHeroField() {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * 18;
    const rotateX = (0.5 - y) * 18;

    element.style.setProperty("--quantum-tilt-x", `${rotateX.toFixed(2)}deg`);
    element.style.setProperty("--quantum-tilt-y", `${rotateY.toFixed(2)}deg`);
  };

  const resetTilt = () => {
    const element = ref.current;

    if (!element) {
      return;
    }

    element.style.setProperty("--quantum-tilt-x", "10deg");
    element.style.setProperty("--quantum-tilt-y", "-12deg");
  };

  return (
    <div className="quantum-stage">
      <div
        ref={ref}
        className="quantum-shell"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className="quantum-field">
          <div className="quantum-grid-frame" />
          <div className="quantum-plane quantum-plane-back" />
          <div className="quantum-plane quantum-plane-mid" />
          <div className="quantum-plane quantum-plane-front" />
          <div className="quantum-axis quantum-axis-a" />
          <div className="quantum-axis quantum-axis-b" />
          <div className="quantum-axis quantum-axis-c" />

          {shards.map((shard) => (
            <span key={shard} className={`quantum-shard quantum-shard-${shard}`} />
          ))}

          <div className="quantum-ring quantum-ring-a">
            {nodeAngles.map((angle) => (
              <span
                key={`a-${angle}`}
                className="quantum-node quantum-node-primary"
                style={{ transform: `rotate(${angle}deg) translateX(${orbitDistances.a})` }}
              />
            ))}
          </div>

          <div className="quantum-ring quantum-ring-b">
            {nodeAngles.map((angle) => (
              <span
                key={`b-${angle}`}
                className="quantum-node quantum-node-secondary"
                style={{ transform: `rotate(${angle}deg) translateX(${orbitDistances.b})` }}
              />
            ))}
          </div>

          <div className="quantum-ring quantum-ring-c">
            {nodeAngles.map((angle) => (
              <span
                key={`c-${angle}`}
                className="quantum-node quantum-node-neutral"
                style={{ transform: `rotate(${angle}deg) translateX(${orbitDistances.c})` }}
              />
            ))}
          </div>

          <div className="quantum-beam quantum-beam-vertical" />
          <div className="quantum-beam quantum-beam-horizontal" />

          {particles.map((particle) => (
            <span
              key={`${particle.left}-${particle.top}`}
              className="quantum-particle"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}

          <div className="quantum-core">
            <div className="quantum-core-pulse" />
            <div className="quantum-core-pulse quantum-core-pulse-secondary" />
            <div className="quantum-core-frame" />
            <div className="quantum-core-label">
              <div className="quantum-eth-mark" aria-hidden="true">
                <svg viewBox="0 0 120 180" className="h-20 w-14">
                  <polygon points="60,6 20,72 60,90 100,72" className="quantum-eth-upper" />
                  <polygon points="60,98 20,80 60,174 100,80" className="quantum-eth-lower" />
                  <polygon points="60,90 60,6 20,72" className="quantum-eth-side-left" />
                  <polygon points="60,90 60,6 100,72" className="quantum-eth-side-right" />
                </svg>
              </div>
              <span className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">Ethereum quantum field</span>
              <strong className="font-headline text-xl font-semibold italic text-foreground">Faceted migration core</strong>
            </div>
          </div>

          <div className="quantum-data-card quantum-data-card-left">
            <span className="font-label text-[9px] uppercase tracking-[0.24em] text-muted">ETH settlement</span>
            <strong className="font-label text-lg font-bold tracking-[-0.03em] text-primary">L1 anchor</strong>
          </div>

          <div className="quantum-data-card quantum-data-card-right">
            <span className="font-label text-[9px] uppercase tracking-[0.24em] text-muted">Transition mode</span>
            <strong className="font-label text-lg font-bold tracking-[-0.03em] text-secondary">Beacon hybrid</strong>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-outline-variant/40 pt-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="block font-label text-[10px] uppercase tracking-[0.24em] text-muted">ETH Quantum Object</span>
          <span className="hidden h-1 w-1 rounded-full bg-outline-variant/80 sm:block" />
          <p className="font-headline text-[1.02rem] italic leading-none text-on-surface-variant">
            Beacon lattice in motion.
          </p>
        </div>
        <div className="border border-outline-variant/60 bg-surface/80 px-3 py-2 font-label text-[10px] uppercase tracking-[0.22em] text-foreground">
          Live orbital study
        </div>
      </div>
    </div>
  );
}
