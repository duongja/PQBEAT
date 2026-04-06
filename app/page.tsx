import Link from "next/link";
import { BenchmarkTable } from "@/components/benchmark-table";
import { KpiCard } from "@/components/kpi-card";
import { RiskBadge } from "@/components/risk-badge";
import { RiskDistributionChart } from "@/components/risk-distribution-chart";
import { SectionHeading } from "@/components/section-heading";
import {
  benchmarkEntries,
  dashboardSnapshot,
  layerBriefs,
  primarySources,
  reviewDate,
} from "@/lib/data";
import { rubricRows } from "@/lib/scoring";

export default function Home() {
  const kpis = [
    {
      label: "Tracked systems",
      value: String(dashboardSnapshot.entitiesTracked),
      hint: "Coverage spans Ethereum execution, consensus, rollups, smart-account wallets, and transaction infrastructure.",
    },
    {
      label: "Medium or high risk",
      value: `${dashboardSnapshot.quantumVulnerablePct}%`,
      hint: "Share of the registry whose current cryptography or migration burden still looks materially exposed.",
    },
    {
      label: "High-risk systems",
      value: String(dashboardSnapshot.highRiskCount),
      hint: "Systems where a future post-quantum migration likely requires protocol coordination or broad ecosystem change.",
    },
    {
      label: "Coverage buckets",
      value: String(dashboardSnapshot.trackedCategories),
      hint: "L1, consensus, L2, wallet, and infrastructure views in the same public index.",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-10 lg:px-10 lg:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-start">
        <div className="rounded-[40px] border border-line bg-surface p-8 shadow-[0_20px_60px_rgba(22,24,29,0.05)] sm:p-10">
          <span className="inline-flex rounded-full border border-line bg-paper px-4 py-2 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            Research-backed public index
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Track quantum readiness across the Ethereum stack.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            PQBEAT maps where Ethereum is still locked into quantum-vulnerable cryptography, where smart-account
            design creates migration leverage, and where rollups and infrastructure still inherit L1 constraints.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/registry"
              className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-medium text-paper shadow-[0_12px_30px_rgba(139,112,65,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(139,112,65,0.24)]"
            >
              Explore the registry
            </Link>
            <Link
              href="/learn/quantum-risk-in-ethereum"
              className="inline-flex items-center justify-center rounded-full border border-line bg-paper px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              Read the deep dive
            </Link>
          </div>
        </div>

        <aside className="space-y-4 rounded-[36px] border border-line bg-panel p-6">
          <div className="rounded-[28px] border border-line bg-paper p-5">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Assessment policy</p>
            <p className="mt-4 text-lg font-medium leading-8 text-foreground">
              Scores are PQBEAT assessments inferred from official docs, EIPs, and product materials. They are not project self-ratings.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[28px] border border-line bg-paper p-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Latest review</p>
              <p className="mt-3 font-mono text-sm text-foreground">{reviewDate}</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                This release focuses on execution accounts, validator keys, major Ethereum rollups, smart-account stacks, and transaction infrastructure.
              </p>
            </div>
            <div className="rounded-[28px] border border-line bg-paper p-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Interpretation</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                High risk does not mean immediate breakage. It means the current signature path is still non-PQ and the migration burden is large.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} hint={kpi.hint} />
        ))}
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Affected layers"
          title="Where quantum-readiness pressure is concentrated"
          description="The biggest story is not one protocol or one wallet. It is the way execution, consensus, rollups, smart accounts, and infra all interact when Ethereum has to change cryptographic assumptions."
        />
        <div className="grid gap-4 lg:grid-cols-5">
          {layerBriefs.map((layer) => (
            <article key={layer.layer} className="rounded-[30px] border border-line bg-panel p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{layer.posture}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{layer.layer}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{layer.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Global risk dashboard"
          title="A quick read on the stack today"
          description="Ethereum execution and validator layers still drive the highest raw exposure. Smart-account systems look directionally better because they create policy and signer flexibility, not because they are already post-quantum."
        />
        <RiskDistributionChart distribution={dashboardSnapshot.distribution} />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[36px] border border-line bg-panel p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Methodology</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">How PQBEAT scores readiness</h2>
          <div className="mt-8 space-y-4">
            {rubricRows.map((row) => (
              <div key={row.label} className="rounded-[26px] border border-line bg-paper p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-foreground">{row.label}</h3>
                  <span className="font-mono text-sm text-muted">{row.weight}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">{row.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[36px] border border-line bg-panel p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Current watchlist</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Where coordination burden is highest</h2>
          <div className="mt-8 space-y-4">
            {dashboardSnapshot.watchlist.map((entity) => (
              <article key={entity.slug} className="rounded-[26px] border border-line bg-paper p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                      {entity.category} • {entity.affectedLayer}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{entity.name}</h3>
                  </div>
                  <RiskBadge level={entity.risk.level} score={entity.risk.score} />
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">{entity.notes}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Cryptography tradeoffs"
          title="Post-quantum signatures change transaction economics too"
          description="Even before Ethereum chooses a path, signature-size and verification tradeoffs make it clear that post-quantum migration is also a UX, bandwidth, and gas problem."
        />
        <BenchmarkTable entries={benchmarkEntries} />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[36px] border border-line bg-panel p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Primary sources used</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">What this release is grounded in</h2>
          <div className="mt-8 grid gap-3">
            {primarySources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-[22px] border border-line bg-paper px-4 py-4 text-sm text-foreground transition hover:border-accent hover:text-accent"
              >
                <span>{source.label}</span>
                <span className="font-mono text-xs text-muted">Open</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <Link
            href="/registry"
            className="rounded-[36px] border border-line bg-panel p-8 transition hover:-translate-y-0.5 hover:border-accent"
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Registry</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">Inspect the stack entity by entity</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
              Filter by category, inspect the affected layer, and open any row for source-linked readiness signals and score breakdowns.
            </p>
          </Link>

          <Link
            href="/learn/quantum-risk-in-ethereum"
            className="rounded-[36px] border border-line bg-panel p-8 transition hover:-translate-y-0.5 hover:border-accent"
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Deep dive</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              Read the layer-by-layer research synthesis
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
              The explainer walks through execution accounts, validators, rollups, smart accounts, and infrastructure in one narrative.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
