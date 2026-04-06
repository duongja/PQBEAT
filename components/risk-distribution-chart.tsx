import type { DashboardSnapshot } from "@/lib/types";

const segmentColors = {
  High: "#f36f45",
  Medium: "#c5a646",
  Low: "#3b7f6e",
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
    <div className="grid gap-6 rounded-[32px] border border-line bg-panel p-6 lg:grid-cols-[220px_1fr] lg:items-center">
      <div className="mx-auto flex w-full max-w-[220px] items-center justify-center">
        <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-line/60" style={chartStyle}>
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border border-line bg-paper text-center shadow-[inset_0_0_0_1px_rgba(22,24,29,0.03)]">
            <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Tracked</span>
            <span className="mt-2 text-4xl font-semibold tracking-tight text-foreground">{total}</span>
            <span className="mt-1 text-sm text-muted">entities</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm leading-7 text-muted">
          A high-risk label does not mean a project is failing today. It means a post-quantum migration
          would likely be coordination-heavy, operationally expensive, or deeply coupled to Ethereum base-layer
          assumptions.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {levels.map((level) => (
            <div key={level} className="rounded-3xl border border-line bg-paper p-4">
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: segmentColors[level] }}
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{level} risk</span>
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{distribution[level]}</p>
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
