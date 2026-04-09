import type { RiskBreakdown } from "@/lib/types";

const breakdownMaxima: Record<keyof RiskBreakdown, number> = {
  signatureScheme: 40,
  publicKeyExposure: 25,
  upgradeability: 20,
  l1Dependency: 15,
};

const breakdownLabels: Record<keyof RiskBreakdown, string> = {
  signatureScheme: "Signature scheme",
  publicKeyExposure: "Public key exposure",
  upgradeability: "Upgrade flexibility",
  l1Dependency: "L1 dependency",
};

export function ScoreBreakdown({ breakdown }: { breakdown: RiskBreakdown }) {
  return (
    <div className="space-y-5">
      {(Object.entries(breakdown) as Array<[keyof RiskBreakdown, number]>).map(([key, value]) => (
        <div key={key} className="space-y-3">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-medium text-foreground">{breakdownLabels[key]}</span>
            <span className="font-label text-[11px] tracking-[0.18em] text-muted uppercase">
              {value}/{breakdownMaxima[key]}
            </span>
          </div>
          <div className="h-2 bg-surface-high">
            <div
              className="h-full bg-gradient-to-r from-accent to-copper"
              style={{ width: `${(value / breakdownMaxima[key]) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
