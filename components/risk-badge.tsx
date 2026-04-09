import type { RiskLevel } from "@/lib/types";

const toneMap: Record<RiskLevel, string> = {
  High: "border-risk-high/30 bg-risk-high/10 text-risk-high",
  Medium: "border-risk-medium/35 bg-risk-medium/10 text-risk-medium",
  Low: "border-risk-low/30 bg-risk-low/10 text-risk-low",
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
      className={`inline-flex items-center gap-2 border px-3 py-1.5 font-label text-[10px] font-semibold tracking-[0.22em] uppercase ${toneMap[level]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      <span>{level}</span>
      {typeof score === "number" ? <span className="border-l border-current/20 pl-2">{score}</span> : null}
    </span>
  );
}
