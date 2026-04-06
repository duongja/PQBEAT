import type { RiskLevel } from "@/lib/types";

const toneMap: Record<RiskLevel, string> = {
  High: "border-risk-high/30 bg-risk-high/12 text-risk-high",
  Medium: "border-risk-medium/40 bg-risk-medium/12 text-risk-medium",
  Low: "border-risk-low/30 bg-risk-low/12 text-risk-low",
};

export function RiskBadge({
  level,
  score,
}: {
  level: RiskLevel;
  score?: number;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase ${toneMap[level]}`}
    >
      <span>{level}</span>
      {typeof score === "number" ? <span className="font-mono text-[11px]">{score}</span> : null}
    </span>
  );
}
