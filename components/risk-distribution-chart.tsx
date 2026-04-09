import type { DashboardSnapshot } from "@/lib/types";

const segmentColors = {
  High: "#ba4d2c",
  Medium: "#b58a1e",
  Low: "#3e725f",
};

export function RiskDistributionChart({
  distribution,
}: {
  distribution: DashboardSnapshot["distribution"];
}) {
  const total = Object.values(distribution).reduce((sum, value) => sum + value, 0);
  const levels: Array<keyof typeof distribution> = ["High", "Medium", "Low"];
  let cursor = 0;
  const gradientSegments = levels.map((level) => {
    const count = distribution[level];
    const start = cursor;
    cursor += (count / total) * 100;
    return `${segmentColors[level]} ${start}% ${cursor}%`;
  });

  const chartStyle = {
    backgroundImage: `conic-gradient(${gradientSegments.join(", ")})`,
  };

  return (
    <div className="grid gap-8 border border-line bg-surface px-6 py-8 shadow-[0_24px_52px_rgba(27,28,26,0.05)] lg:grid-cols-[260px_1fr] lg:items-center">
      <div className="mx-auto flex w-full max-w-[240px] items-center justify-center">
        <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-line/70 bg-surface-low" style={chartStyle}>
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border border-line bg-surface text-center">
            <span className="font-label text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">Tracked</span>
            <span className="mt-2 font-headline text-5xl font-semibold tracking-[-0.06em] text-foreground">{total}</span>
            <span className="mt-1 text-sm text-muted">entities</span>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <p className="max-w-3xl text-sm leading-7 text-muted">
          A high-risk label does not mean a project is failing today. It means a post-quantum migration
          would likely be coordination-heavy, operationally expensive, or deeply coupled to Ethereum base-layer
          assumptions.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {levels.map((level) => (
            <div key={level} className="border border-line bg-surface-low p-5">
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: segmentColors[level] }}
                  aria-hidden="true"
                />
                <span className="font-label text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">
                  {level} risk
                </span>
              </div>
              <p className="mt-4 font-headline text-4xl font-semibold tracking-[-0.05em] text-foreground">
                {distribution[level]}
              </p>
              <p className="mt-1 text-sm text-muted">
                {Math.round((distribution[level] / total) * 100)}% of tracked entities
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
