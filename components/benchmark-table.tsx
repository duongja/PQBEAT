import type { BenchmarkEntry } from "@/lib/types";

export function BenchmarkTable({ entries }: { entries: BenchmarkEntry[] }) {
  return (
    <div className="overflow-hidden border border-line bg-surface shadow-[0_24px_52px_rgba(27,28,26,0.05)]">
      <div className="grid gap-6 border-b border-line px-6 py-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
        <div>
          <p className="font-label text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            PQ algorithm snapshot
          </p>
          <h3 className="mt-3 font-headline text-4xl font-semibold tracking-[-0.05em] text-foreground">
            What the transaction layer might feel like
          </h3>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-muted">
          Signature size, verification costs, and implementation maturity all shape what a future Ethereum account
          path could ask of users, wallets, and infrastructure.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-surface-low text-left font-label text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">
              <th className="px-6 py-4">Algorithm</th>
              <th className="px-6 py-4">Signature size</th>
              <th className="px-6 py-4">Performance</th>
              <th className="px-6 py-4">Ethereum impact</th>
              <th className="px-6 py-4">Readiness note</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr
                key={entry.algorithm}
                className={index === entries.length - 1 ? "" : "border-b border-line"}
              >
                <td className="px-6 py-5 font-semibold text-foreground">{entry.algorithm}</td>
                <td className="px-6 py-5 font-label text-sm tracking-[0.08em] text-foreground">{entry.signatureSize}</td>
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
