import type { BenchmarkEntry } from "@/lib/types";

export function BenchmarkTable({ entries }: { entries: BenchmarkEntry[] }) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-line bg-panel">
      <div className="border-b border-line px-6 py-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">PQ algorithm snapshot</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">What the transaction layer might feel</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-paper/80 text-left text-xs font-semibold tracking-[0.16em] text-muted uppercase">
              <th className="px-6 py-4">Algorithm</th>
              <th className="px-6 py-4">Signature size</th>
              <th className="px-6 py-4">Performance</th>
              <th className="px-6 py-4">Ethereum impact</th>
              <th className="px-6 py-4">Readiness note</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.algorithm} className={index === entries.length - 1 ? "" : "border-b border-line"}>
                <td className="px-6 py-5 font-semibold text-foreground">{entry.algorithm}</td>
                <td className="px-6 py-5 font-mono text-sm text-foreground">{entry.signatureSize}</td>
                <td className="px-6 py-5 text-sm leading-7 text-muted">{entry.performanceNote}</td>
                <td className="px-6 py-5 text-sm leading-7 text-muted">{entry.ethereumImpact}</td>
                <td className="px-6 py-5 text-sm leading-7 text-muted">{entry.maturityNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
