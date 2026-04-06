"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";
import { RiskBadge } from "@/components/risk-badge";
import { ScoreBreakdown } from "@/components/score-breakdown";
import type { Category, RiskLevel, ScoredEntity } from "@/lib/types";

const riskOptions: Array<RiskLevel | "All"> = ["All", "High", "Medium", "Low"];

type SortMode = "score" | "name" | "category";

export function RegistryClient({ entities }: { entities: ScoredEntity[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [riskLevel, setRiskLevel] = useState<RiskLevel | "All">("All");
  const [sortMode, setSortMode] = useState<SortMode>("score");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);
  const categoryOptions: Array<Category | "All"> = [
    "All",
    ...(Array.from(new Set(entities.map((entity) => entity.category))) as Category[]),
  ];

  const filteredEntities = entities
    .filter((entity) => {
      const matchesQuery =
        deferredQuery.trim().length === 0 ||
        [
          entity.name,
          entity.category,
          entity.affectedLayer,
          entity.signatureScheme,
          entity.notes,
          ...entity.readinessSignals,
        ].some((value) => value.toLowerCase().includes(deferredQuery.toLowerCase()));

      const matchesCategory = category === "All" || entity.category === category;
      const matchesRisk = riskLevel === "All" || entity.risk.level === riskLevel;

      return matchesQuery && matchesCategory && matchesRisk;
    })
    .sort((left, right) => {
      if (sortMode === "name") {
        return left.name.localeCompare(right.name);
      }

      if (sortMode === "category") {
        return left.category.localeCompare(right.category) || right.risk.score - left.risk.score;
      }

      return right.risk.score - left.risk.score || left.name.localeCompare(right.name);
    });

  const selectedEntity = filteredEntities.find((entity) => entity.slug === selectedSlug) ?? null;

  useEffect(() => {
    if (!selectedEntity) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedSlug(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEntity]);

  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-4 rounded-[32px] border border-line bg-panel p-6 lg:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))]">
          <label className="space-y-2">
            <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="validator, rollup, smart account, bundler..."
              className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-foreground outline-none ring-0 placeholder:text-muted/70 focus:border-accent"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as Category | "All")}
              className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Risk</span>
            <select
              value={riskLevel}
              onChange={(event) => setRiskLevel(event.target.value as RiskLevel | "All")}
              className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
            >
              {riskOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Sort</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
            >
              <option value="score">Highest score first</option>
              <option value="name">Alphabetical</option>
              <option value="category">Category</option>
            </select>
          </label>
        </div>

        <div className="rounded-[32px] border border-line bg-panel">
          <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Registry view</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {filteredEntities.length} entities in the current view
              </h2>
            </div>
            <p className="hidden max-w-md text-right text-sm leading-7 text-muted lg:block">
              Select any entity to inspect the layer it affects, the build-time risk breakdown, and the official materials used in PQBEAT&apos;s assessment.
            </p>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                  <th className="px-6 py-4">Entity</th>
                  <th className="px-6 py-4">Layer</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Risk</th>
                  <th className="px-6 py-4">Upgrade path</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {filteredEntities.length > 0 ? (
                  filteredEntities.map((entity) => (
                    <tr key={entity.slug} className="border-t border-line/70">
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-foreground">{entity.name}</p>
                          <p className="mt-1 text-sm text-muted">{entity.notes}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-muted">{entity.affectedLayer}</td>
                      <td className="px-6 py-5 text-sm text-muted">{entity.category}</td>
                      <td className="px-6 py-5">
                        <RiskBadge level={entity.risk.level} score={entity.risk.score} />
                      </td>
                      <td className="px-6 py-5 text-sm text-muted">{entity.upgradeability}</td>
                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedSlug(entity.slug)}
                          className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-muted">
                      No entities match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 p-4 md:hidden">
            {filteredEntities.length > 0 ? (
              filteredEntities.map((entity) => (
                <article key={entity.slug} className="rounded-[28px] border border-line bg-paper p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                        {entity.category} • {entity.affectedLayer}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-foreground">{entity.name}</h3>
                    </div>
                    <RiskBadge level={entity.risk.level} score={entity.risk.score} />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">{entity.notes}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedSlug(entity.slug)}
                    className="mt-5 rounded-full border border-line px-4 py-2 text-sm font-medium text-foreground"
                  >
                    View details
                  </button>
                </article>
              ))
            ) : (
              <div className="rounded-[28px] border border-line bg-paper p-5 text-sm text-muted">
                No entities match the current filters.
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedEntity ? (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close entity details"
            className="absolute inset-0 bg-foreground/20 backdrop-blur-[2px]"
            onClick={() => setSelectedSlug(null)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="entity-drawer-title"
            className="relative h-full w-full max-w-2xl overflow-y-auto border-l border-line bg-paper p-6 shadow-[0_24px_80px_rgba(22,24,29,0.18)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{selectedEntity.category}</p>
                <h2 id="entity-drawer-title" className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  {selectedEntity.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSlug(null)}
                className="rounded-full border border-line px-4 py-2 text-sm font-medium text-foreground"
              >
                Close
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <RiskBadge level={selectedEntity.risk.level} score={selectedEntity.risk.score} />
              <span className="rounded-full border border-line bg-panel px-3 py-1 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                Confidence: {selectedEntity.confidence}
              </span>
              <span className="rounded-full border border-line bg-panel px-3 py-1 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                Reviewed: {selectedEntity.lastReviewed}
              </span>
            </div>

            <p className="mt-6 text-base leading-8 text-muted">{selectedEntity.notes}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <DetailCard label="Affected layer" value={selectedEntity.affectedLayer} />
              <DetailCard label="Signature scheme" value={selectedEntity.signatureScheme} />
              <DetailCard label="Public key exposure" value={selectedEntity.publicKeyExposure} />
              <DetailCard label="Upgradeability" value={selectedEntity.upgradeability} />
              <DetailCard label="L1 dependency" value={selectedEntity.l1Dependency} />
            </div>

            <section className="mt-10 rounded-[28px] border border-line bg-panel p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Readiness signals</p>
              <div className="mt-5 space-y-3">
                {selectedEntity.readinessSignals.map((signal) => (
                  <div key={signal} className="rounded-[20px] border border-line bg-paper p-4 text-sm leading-7 text-muted">
                    {signal}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-[28px] border border-line bg-panel p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Build-time score</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Factor breakdown</h3>
                </div>
                <Link
                  href="/learn/quantum-risk-in-ethereum"
                  className="hidden rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent sm:inline-flex"
                >
                  Read methodology
                </Link>
              </div>
              <div className="mt-6">
                <ScoreBreakdown breakdown={selectedEntity.risk.breakdown} />
              </div>
            </section>

            <section className="mt-10 rounded-[28px] border border-line bg-panel p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Sources</p>
              <div className="mt-5 space-y-3">
                {selectedEntity.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper px-4 py-4 text-sm text-foreground transition hover:border-accent hover:text-accent"
                  >
                    <span>{source.label}</span>
                    <span className="font-mono text-xs text-muted">Open</span>
                  </a>
                ))}
              </div>
            </section>
          </aside>
        </div>
      ) : null}
    </>
  );
}

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-line bg-paper p-5">
      <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{label}</p>
      <p className="mt-3 text-sm leading-7 text-foreground">{value}</p>
    </div>
  );
}
