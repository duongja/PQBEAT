"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";
import { BlogNewsletterSignup } from "@/components/blog-newsletter-signup";
import { EntityLogo } from "@/components/entity-logo";
import { Icon } from "@/components/icon";
import { SiteNavbar } from "@/components/site-navbar";
import type { Category, RiskLevel, ScoredEntity } from "@/lib/types";

const riskOptions: Array<RiskLevel | "All"> = ["All", "High", "Medium", "Low"];
const categoryOptions: Array<Category | "All"> = ["All", "L1", "Consensus", "L2", "Wallet", "Infrastructure"];
const pageTexture =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDCbaujWDtTpX3JJMoz-4vfZIwGsIxSQM6bS2Fh_ZrV4UoxKEkde509G_QGGQ-q_cSZRQJYeMolN_xHyL09qOeLu7f8xOKSUQoJdSzvt1x-RjM8hvw5mYWNzmwewRThV20cWcool71x1KG2hZIPm2eeV6wetO_8BLmD7Y27PQwETITOzxW9wgxCXvnasGbRI6H69zgy6PZ6bjVynVjclCIEdWaUK2q06Q8UCHJcXzsMjtNZYdv-lGgzzuVlyD1YDqvcCyJZ6bGBIaQ";
const railImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3lzNK88JeVnbMac6_lgk7afvLTnRCRMnI1nPBj8Jfu1qHFlkoYgoqSJznWIRiLGVQJsPs_0-DOuWFFR1kDAeFy8X5hMKzoQygfD5mBnWEpfDyS2PZ4upcjF16gs9FvbsJZeima-Td336vckR3m1yT0FaYKLxEHc9vpqyZo4rm-fV1Sfj_8ECvEzu7U5N1t6srAgIXRaQZjoME7jjOVJ1pE-bq4AgiBuXMn1K0d_a9nVhHpw03H2nuHHb-PYMooX_337qcmrk4z7U";

type SortMode = "score" | "name" | "category";

function getReadinessScore(entity: ScoredEntity) {
  return Math.max(0, 100 - entity.risk.score);
}

function getRiskPillTone(level: RiskLevel) {
  if (level === "High") {
    return "bg-[#ba1a1a] text-white";
  }

  if (level === "Medium") {
    return "bg-secondary text-white";
  }

  return "bg-surface-container-high text-on-surface-variant";
}

function getScoreTone(level: RiskLevel) {
  if (level === "High") {
    return "text-secondary";
  }

  if (level === "Medium") {
    return "text-primary";
  }

  return "text-primary";
}

function getBarTone(level: RiskLevel) {
  if (level === "High") {
    return "bg-secondary";
  }

  if (level === "Medium") {
    return "bg-primary";
  }

  return "bg-primary";
}

function getCategoryLabel(option: Category | "All") {
  if (option === "All") {
    return "All Registries";
  }

  if (option === "L1") {
    return "L1 Protocols";
  }

  if (option === "L2") {
    return "L2 Systems";
  }

  if (option === "Consensus") {
    return "Consensus";
  }

  if (option === "Wallet") {
    return "Wallets";
  }

  return "Infrastructure";
}

function getCategoryIcon(option: Category | "All") {
  if (option === "All") {
    return "archive";
  }

  if (option === "L1") {
    return "globe";
  }

  if (option === "Consensus") {
    return "shield";
  }

  if (option === "L2") {
    return "share";
  }

  if (option === "Wallet") {
    return "user";
  }

  return "server";
}

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`)).toUpperCase();
}

function getInspectorIconTone(level: RiskLevel) {
  if (level === "High") {
    return "bg-[#fee7e5] text-error";
  }

  if (level === "Medium") {
    return "bg-secondary-fixed text-secondary";
  }

  return "bg-primary-fixed text-primary";
}

function isConcerningSignal(signal: string) {
  return /(no\b|not\b|lack|still|depend|require|legacy|vulnerab|expos|constraint|today\b)/i.test(signal);
}

export function RegistryClient({ entities }: { entities: ScoredEntity[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [riskLevel, setRiskLevel] = useState<RiskLevel | "All">("All");
  const [sortMode, setSortMode] = useState<SortMode>("score");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(entities[0]?.slug ?? null);
  const [mobileDetailSlug, setMobileDetailSlug] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const baseVisibleEntities = entities.filter((entity) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [
        entity.name,
        entity.category,
        entity.affectedLayer,
        entity.signatureScheme,
        entity.notes,
        ...entity.readinessSignals,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));

    const matchesRisk = riskLevel === "All" || entity.risk.level === riskLevel;

    return matchesQuery && matchesRisk;
  });

  const categoryCounts = {
    All: baseVisibleEntities.length,
    L1: baseVisibleEntities.filter((entity) => entity.category === "L1").length,
    Consensus: baseVisibleEntities.filter((entity) => entity.category === "Consensus").length,
    L2: baseVisibleEntities.filter((entity) => entity.category === "L2").length,
    Wallet: baseVisibleEntities.filter((entity) => entity.category === "Wallet").length,
    Infrastructure: baseVisibleEntities.filter((entity) => entity.category === "Infrastructure").length,
  } as const;

  const filteredEntities = baseVisibleEntities
    .filter((entity) => category === "All" || entity.category === category)
    .sort((left, right) => {
      if (sortMode === "name") {
        return left.name.localeCompare(right.name);
      }

      if (sortMode === "category") {
        return left.category.localeCompare(right.category) || left.name.localeCompare(right.name);
      }

      return right.risk.score - left.risk.score || left.name.localeCompare(right.name);
    });

  const resolvedSelectedSlug =
    filteredEntities.find((entity) => entity.slug === selectedSlug)?.slug ?? filteredEntities[0]?.slug ?? null;
  const selectedEntity = filteredEntities.find((entity) => entity.slug === resolvedSelectedSlug) ?? null;
  const mobileDetailEntity =
    filteredEntities.find((entity) => entity.slug === mobileDetailSlug) ??
    entities.find((entity) => entity.slug === mobileDetailSlug) ??
    null;
  const highRiskVisible = filteredEntities.filter((entity) => entity.risk.level === "High").length;
  const visibleAverageReadiness =
    Math.round(
      (filteredEntities.reduce((sum, entity) => sum + getReadinessScore(entity), 0) / Math.max(filteredEntities.length, 1)) *
        10,
    ) / 10;

  useEffect(() => {
    if (!mobileDetailEntity) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileDetailSlug(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileDetailEntity]);

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        backgroundColor: "#faf9f5",
        backgroundImage: `url(${pageTexture})`,
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBc9HvkDuZ134yy5k127UlNn02P3rNCq6eTsWJ-qpWPfhfDv3o9dnCPc19nFVrUrCD7IALuvI38kKa26mnDV0ZM4j-3VK5Zi6Q7MlOqBvuIXLr_LXICTtdQ3FBVVqimnX7t0eoJDZtICF104B56Aw_nOLXXPkrdSPW7cH-zAW85K4jiHb9jr8tEYdTVTW8UPpGcbLpNUpl4nF11gRBX30XmtWlWOOM68PEjTFLB2DhEaexGQDjyQBLeGyX31JKO-s-CfLTfECqjVz8)",
        }}
      />

      <SiteNavbar />

      <div className="relative z-10 flex min-h-screen pt-[7.5rem]">
        <aside className="hidden w-[17.5rem] flex-shrink-0 flex-col border-r border-outline/10 bg-surface-container-low px-6 py-10 lg:flex">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center bg-primary text-white">
                <Icon name="shield" className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
                  Registry Filters
                </h3>
                <p className="mt-1 max-w-[13rem] text-sm leading-relaxed text-on-surface-variant">
                  Narrow the ledger by layer, risk posture, and named entity while keeping the evidence panel live.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-outline-variant/20 pt-5">
              <div className="bg-white px-3 py-3">
                <span className="block font-label text-[9px] uppercase tracking-[0.22em] text-outline">
                  Current scope
                </span>
                <span className="mt-2 block font-label text-xs font-bold tracking-[0.02em] text-on-surface">
                  {getCategoryLabel(category)}
                </span>
              </div>
              <div className="bg-white px-3 py-3">
                <span className="block font-label text-[9px] uppercase tracking-[0.22em] text-outline">
                  Mean readiness
                </span>
                <span className="mt-2 block font-label text-xs font-bold tracking-[0.02em] text-primary">
                  {visibleAverageReadiness}%
                </span>
              </div>
            </div>
          </div>

          <nav className="mt-8 flex-grow space-y-2">
            {categoryOptions.map((option) => {
              const active = category === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  aria-pressed={active}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-all ${
                    active
                      ? "bg-white font-bold text-primary shadow-[0_10px_24px_rgba(27,28,26,0.05)]"
                      : "text-on-surface/80 transition-colors duration-200 hover:bg-surface-container-high"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon name={getCategoryIcon(option)} className="h-4 w-4" />
                    <span className="font-label text-[11px] uppercase tracking-[0.22em]">
                      {getCategoryLabel(option)}
                    </span>
                  </div>
                  <span
                    className={`min-w-8 text-right font-label text-[10px] uppercase tracking-[0.18em] ${
                      active ? "text-primary" : "text-outline"
                    }`}
                  >
                    {categoryCounts[option]}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="space-y-3 border-t border-outline-variant/20 pt-6">
            <Link
              href="/learn/quantum-risk-in-ethereum"
              className="flex items-center justify-between bg-surface-container-high px-4 py-4 transition-colors hover:bg-white"
            >
              <div>
                <span className="block font-label text-[9px] uppercase tracking-[0.22em] text-outline">Research brief</span>
                <span className="mt-2 block font-headline text-lg italic text-on-surface">Ethereum migration overview</span>
              </div>
              <Icon name="arrow-right" className="h-4 w-4 text-primary" />
            </Link>

            <div className="bg-surface-container-high px-4 py-4">
              <span className="block font-label text-[9px] uppercase tracking-[0.22em] text-outline">High risk in view</span>
              <span className="mt-2 block font-label text-xs font-bold tracking-[0.02em] text-secondary">
                {highRiskVisible} protocols flagged
              </span>
            </div>
          </div>

          <Link
            href="/learn/quantum-risk-in-ethereum"
            className="mt-8 inline-flex items-center justify-between bg-secondary px-5 py-4 font-label text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#6d3a00]"
          >
            Review Methodology
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </aside>

        <main className="min-w-0 flex-grow overflow-y-auto bg-surface-container-low px-6 pb-16 pt-8 lg:px-12 lg:pt-10">
          <header className="mb-10 max-w-5xl">
            <div className="mb-2 flex items-center gap-4">
              <span className="font-label text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Registry Directory
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h1 className="mb-4 font-headline text-5xl font-semibold italic leading-[0.94] tracking-[-0.09em] text-on-surface sm:text-6xl">
              Post-Quantum Resilience Index
            </h1>
            <p className="max-w-2xl font-headline text-xl font-medium italic text-on-surface-variant opacity-90">
              A real-time comparative audit of Ethereum execution, consensus, rollups, wallets, and infrastructure
              against post-quantum migration pressure.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                {highRiskVisible} high-risk in view
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                Mean readiness {visibleAverageReadiness}%
              </span>
            </div>
          </header>

          <section className="mb-8 border border-outline-variant/30 bg-white/90 p-4 shadow-[0_20px_44px_rgba(27,28,26,0.06)] backdrop-blur-sm sm:p-5">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
              <label className="block bg-surface-container-low px-4 py-4 xl:min-w-[28rem]">
                <span className="mb-3 block font-label text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
                  Search Registry
                </span>
                <div className="flex items-center gap-3">
                  <Icon name="search" className="h-4 w-4 text-primary" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="validator, rollup, smart account, bundler..."
                    className="w-full border-none bg-transparent font-label text-[11px] uppercase tracking-[0.18em] outline-none placeholder:text-outline-variant"
                  />
                </div>
              </label>

              <div className="grid gap-3 sm:grid-cols-3">
                <label className="bg-surface-container-low px-4 py-4">
                  <span className="mb-2 block font-label text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
                    Risk
                  </span>
                  <select
                    aria-label="Risk"
                    value={riskLevel}
                    onChange={(event) => setRiskLevel(event.target.value as RiskLevel | "All")}
                    className="w-full border-none bg-transparent font-label text-[11px] uppercase tracking-[0.16em] outline-none"
                  >
                    {riskOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="bg-surface-container-low px-4 py-4">
                  <span className="mb-2 block font-label text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
                    Sort
                  </span>
                  <select
                    aria-label="Sort"
                    value={sortMode}
                    onChange={(event) => setSortMode(event.target.value as SortMode)}
                    className="w-full border-none bg-transparent font-label text-[11px] uppercase tracking-[0.16em] outline-none"
                  >
                    <option value="score">Score Desc</option>
                    <option value="name">Alphabetical</option>
                    <option value="category">Category</option>
                  </select>
                </label>

                <div className="flex flex-col justify-between bg-surface-container-low px-4 py-4">
                  <span className="block font-label text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
                    In View
                  </span>
                  <span className="mt-2 font-label text-2xl font-bold tracking-[-0.05em] text-primary">
                    {filteredEntities.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {categoryOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  aria-pressed={category === option}
                  className={`whitespace-nowrap px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.22em] ${
                    category === option
                      ? "bg-primary text-white"
                      : "bg-surface-container-low text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                  }`}
                >
                  {option === "All" ? "All Registries" : getCategoryLabel(option)}
                </button>
              ))}
            </div>
          </section>

          <div className="overflow-hidden border border-outline-variant/30 bg-white shadow-[0_24px_56px_rgba(27,28,26,0.06)]">
            <div className="hidden items-center justify-between border-b border-outline-variant/20 bg-surface-container-low px-6 py-4 lg:flex">
              <div>
                <span className="block font-label text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                  Registry Ledger
                </span>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Select a row to inspect source evidence, factor breakdowns, and migration constraints.
                </p>
              </div>
              <div className="font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                Source-backed ledger
              </div>
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="min-w-[60rem] w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-container-high">
                    <th className="px-6 py-4 font-label text-[10px] font-bold uppercase tracking-[0.24em] text-outline">
                      Protocol
                    </th>
                    <th className="px-6 py-4 font-label text-[10px] font-bold uppercase tracking-[0.24em] text-outline">
                      Readiness
                    </th>
                    <th className="px-6 py-4 font-label text-[10px] font-bold uppercase tracking-[0.24em] text-outline">
                      Risk
                    </th>
                    <th className="px-6 py-4 font-label text-[10px] font-bold uppercase tracking-[0.24em] text-outline">
                      Review Date
                    </th>
                    <th className="px-6 py-4 text-right font-label text-[10px] font-bold uppercase tracking-[0.24em] text-outline">
                      Layer
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {filteredEntities.length > 0 ? (
                    filteredEntities.map((entity) => {
                      const selected = entity.slug === selectedEntity?.slug;
                      const readinessScore = getReadinessScore(entity);

                      return (
                        <tr
                          key={entity.slug}
                          role="button"
                          tabIndex={0}
                          className={`cursor-pointer transition-colors ${
                            selected
                              ? "bg-[rgba(0,101,101,0.035)] shadow-[-3px_0_0_0_#006565_inset]"
                              : "bg-white hover:bg-surface-container-lowest"
                          }`}
                          onClick={() => setSelectedSlug(entity.slug)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setSelectedSlug(entity.slug);
                            }
                          }}
                        >
                        <td className="px-6 py-8">
                          <div className="flex items-center gap-4">
                            <EntityLogo slug={entity.slug} name={entity.name} />
                            <div>
                              <div className="font-headline text-[1.35rem] font-semibold tracking-[-0.05em]">
                                {entity.name}
                                </div>
                                <div className="font-label text-[9px] uppercase tracking-[0.2em] text-outline">
                                  {entity.affectedLayer} • {entity.confidence} confidence
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-8">
                            <div className="flex items-center gap-3">
                              <span
                                className={`font-label text-3xl font-bold tracking-[-0.05em] ${getScoreTone(entity.risk.level)}`}
                              >
                                {readinessScore}
                              </span>
                              <div className="h-1 w-24 bg-surface-container-highest">
                                <div
                                  className={`h-full ${getBarTone(entity.risk.level)}`}
                                  style={{ width: `${readinessScore}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-8">
                            <span
                              className={`px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.22em] ${getRiskPillTone(entity.risk.level)}`}
                            >
                              {entity.risk.level}
                            </span>
                          </td>
                          <td className="px-6 py-8">
                            <div className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                              {formatReviewDate(entity.lastReviewed)}
                            </div>
                          </td>
                          <td className="px-6 py-8 text-right">
                            <span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary">
                              {entity.category}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-sm text-on-surface-variant">
                        No entities match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="space-y-1 lg:hidden">
              {filteredEntities.length > 0 ? (
                filteredEntities.map((entity) => {
                  const readinessScore = getReadinessScore(entity);

                  return (
                    <article
                      key={entity.slug}
                      className={`p-6 transition-colors duration-300 ${
                        entity.slug === selectedEntity?.slug
                          ? "border-l-4 border-primary bg-surface-container-lowest shadow-[0_20px_40px_rgba(27,28,26,0.08)]"
                          : "bg-surface-container-low hover:bg-surface-container-highest"
                      }`}
                    >
                      <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <EntityLogo slug={entity.slug} name={entity.name} />
                          <div>
                            <h3 className="mb-1 font-headline text-2xl">{entity.name}</h3>
                            <div className="flex gap-3">
                              <span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary">
                                {entity.category}
                              </span>
                              <span className="font-label text-[10px] uppercase tracking-[0.22em] text-secondary">
                                {entity.affectedLayer}
                              </span>
                            </div>
                            <div className="mt-3 font-label text-[9px] uppercase tracking-[0.2em] text-outline">
                              Reviewed {formatReviewDate(entity.lastReviewed)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-label text-2xl font-bold leading-none tracking-[-0.04em] ${getScoreTone(entity.risk.level)}`}
                          >
                            {readinessScore}
                            <span className="ml-0.5 text-xs opacity-50">%</span>
                          </div>
                          <div className="mt-1 font-label text-[9px] uppercase tracking-tight text-outline">
                            Readiness
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-[2px] flex-1 overflow-hidden bg-surface-container-high">
                          <div className={`h-full ${getBarTone(entity.risk.level)}`} style={{ width: `${readinessScore}%` }} />
                        </div>
                        <span className="flex items-center gap-1 font-label text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">
                          Risk: <span className={getScoreTone(entity.risk.level)}>{entity.risk.level}</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMobileDetailSlug(entity.slug)}
                        className="mt-5 border border-outline-variant/30 px-4 py-2 font-label text-[10px] uppercase tracking-[0.22em] text-on-surface transition-colors hover:bg-white"
                      >
                        View details
                      </button>
                    </article>
                  );
                })
              ) : (
                <div className="bg-surface-container-low p-6 text-sm text-on-surface-variant">
                  No entities match the current filters.
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="group relative overflow-hidden bg-primary p-10 text-white sm:p-12">
              <div className="relative z-10">
                <span className="mb-4 block font-label text-[10px] uppercase tracking-[0.3em] text-primary-fixed">
                  Research Brief
                </span>
                <h2 className="mb-6 font-headline text-4xl font-semibold italic leading-tight">
                  Ethereum Migration Brief
                </h2>
                <p className="mb-8 max-w-md text-sm leading-relaxed opacity-90">
                  Execution accounts, validator keys, and rollup settlement remain the most coordination-heavy surfaces
                  in the Ethereum stack today.
                </p>
                <Link
                  href="/learn/quantum-risk-in-ethereum"
                  className="relative z-10 inline-flex items-center gap-4 border-b-2 border-white pb-1 font-label text-[10px] uppercase tracking-[0.22em] transition-all group-hover:gap-6"
                  style={{ color: "#ffffff" }}
                >
                  Read Ethereum Brief
                  <Icon name="arrow-right" className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 opacity-10 transition-opacity group-hover:opacity-20">
                <Icon name="analytics" className="h-40 w-40" />
              </div>
            </div>

            <div className="flex flex-col justify-center bg-surface-container-highest p-10 text-on-surface sm:p-12">
              <span className="mb-4 block font-label text-[10px] uppercase tracking-[0.3em] text-outline">
                Registry Snapshot
              </span>
              <div className="space-y-6">
                <div className="flex items-end justify-between border-b border-outline/10 pb-4">
                  <span className="font-headline text-lg italic">Active Scope</span>
                  <span className="font-label text-xs font-bold tracking-[0.08em] text-primary">
                    {getCategoryLabel(category)}
                  </span>
                </div>
                <div className="flex items-end justify-between border-b border-outline/10 pb-4">
                  <span className="font-headline text-lg italic">High-Risk Exposures</span>
                  <span className="font-label text-2xl font-bold tracking-[-0.04em] text-secondary">
                    {highRiskVisible}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-headline text-lg italic">Mean Readiness</span>
                  <span className="font-label text-2xl font-bold tracking-[-0.04em]">{visibleAverageReadiness}%</span>
                </div>
                <div className="flex items-end justify-between border-t border-outline/10 pt-4">
                  <span className="font-headline text-lg italic">Risk Pressure</span>
                  <span className="font-label text-xs font-bold tracking-[0.08em] text-outline">
                    {riskLevel === "All" ? "All levels" : `${riskLevel} only`}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 mt-4 border-t border-outline/10 pt-6">
              <div className="flex flex-wrap gap-6 font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                <Link href="/" className="transition-colors hover:text-primary">
                  Overview
                </Link>
                <Link href="/learn/quantum-risk-in-ethereum" className="transition-colors hover:text-primary">
                  Deep Dive
                </Link>
                <span>Source-backed registry</span>
              </div>

              <div className="mt-8 max-w-3xl">
                <BlogNewsletterSignup
                  compact
                  title="Get the weekly PQBEAT note."
                  description="A short weekly email when we publish a new brief or materially update registry coverage."
                />
              </div>
            </div>
          </div>
        </main>

        <aside
          aria-label="Selected entity evidence panel"
          className="hidden w-[22rem] flex-shrink-0 border-l border-outline/10 bg-white xl:flex 2xl:w-[26rem]"
        >
          {selectedEntity ? <InspectorPanel entity={selectedEntity} /> : <EmptyPanel />}
        </aside>
      </div>

      {mobileDetailEntity ? (
        <div className="fixed inset-0 z-50 flex justify-end xl:hidden">
          <button
            type="button"
            aria-label="Close entity details"
            className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm"
            onClick={() => setMobileDetailSlug(null)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="entity-drawer-title"
            className="relative h-full w-full max-w-lg overflow-y-auto bg-background px-6 pb-16 pt-6 shadow-[0_24px_80px_rgba(27,28,26,0.16)]"
          >
            <div className="mb-6 flex items-center justify-between border-b border-outline/10 pb-4">
              <span className="font-label text-[10px] uppercase tracking-[0.22em] text-outline">Evidence Dossier</span>
              <button
                type="button"
                onClick={() => setMobileDetailSlug(null)}
                className="font-label text-[10px] uppercase tracking-[0.22em] text-primary"
              >
                Close
              </button>
            </div>
            <InspectorPanel entity={mobileDetailEntity} mobile headingId="entity-drawer-title" />
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function InspectorPanel({
  entity,
  mobile = false,
  headingId,
}: {
  entity: ScoredEntity;
  mobile?: boolean;
  headingId?: string;
}) {
  const readinessScore = getReadinessScore(entity);

  return (
    <div className={mobile ? "space-y-8" : "flex h-full flex-col overflow-y-auto"}>
      <div className={mobile ? "" : "p-10"}>
        <div className="mb-8 flex items-start justify-between gap-6">
          <div className={`p-3 ${getInspectorIconTone(entity.risk.level)}`}>
            <EntityLogo slug={entity.slug} name={entity.name} size="lg" />
          </div>
          <div className="text-right">
            <span className="mb-1 block font-label text-[10px] uppercase tracking-[0.22em] text-outline">Status</span>
            <span
              className={`px-2 py-0.5 font-label text-[10px] font-bold uppercase tracking-[0.18em] ${getRiskPillTone(entity.risk.level)}`}
            >
              {entity.risk.level} Risk
            </span>
          </div>
        </div>

        <h2 id={headingId} className="mb-2 font-headline text-3xl font-semibold italic tracking-[-0.06em]">
          {entity.name}
        </h2>
        <div className="mb-5 flex flex-wrap gap-x-3 gap-y-1">
          <span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary">{entity.category}</span>
          <span className="font-label text-[10px] uppercase tracking-[0.22em] text-secondary">{entity.affectedLayer}</span>
        </div>
        <p className="mb-8 text-sm leading-relaxed text-on-surface-variant">{entity.notes}</p>

        <div className="mb-8 grid grid-cols-2 gap-4 border-y border-outline/10 py-6">
          <div className="bg-surface-container-low px-4 py-4">
            <div className="mb-1 font-label text-[9px] uppercase tracking-[0.22em] text-outline">Readiness</div>
            <div className={`font-label text-lg font-bold tracking-[-0.03em] ${getScoreTone(entity.risk.level)}`}>
              {readinessScore}%
            </div>
          </div>
          <div className="bg-surface-container-low px-4 py-4">
            <div className="mb-1 font-label text-[9px] uppercase tracking-[0.22em] text-outline">Confidence Score</div>
            <div className="font-label text-lg font-bold tracking-[-0.03em] text-on-surface">{entity.confidence}</div>
          </div>
          <div className="bg-surface-container-low px-4 py-4">
            <div className="mb-1 font-label text-[9px] uppercase tracking-[0.22em] text-outline">Signals</div>
            <div className="font-label text-lg font-bold tracking-[-0.03em] text-on-surface">
              {entity.readinessSignals.length}
            </div>
          </div>
          <div className="bg-surface-container-low px-4 py-4">
            <div className="mb-1 font-label text-[9px] uppercase tracking-[0.22em] text-outline">Sources</div>
            <div className="font-label text-lg font-bold tracking-[-0.03em] text-on-surface">{entity.sources.length}</div>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h3 className="mb-6 border-b border-primary/20 pb-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Technical Breakdown
            </h3>
            <div className="space-y-6">
              <MetricBar
                label="Signature Algorithm"
                value={entity.signatureScheme}
                width={Math.min(entity.risk.breakdown.signatureScheme * 2.2, 100)}
                tone="bg-secondary"
              />
              <MetricBar
                label="Public Key Exposure"
                value={entity.publicKeyExposure}
                width={Math.min(entity.risk.breakdown.publicKeyExposure * 4, 100)}
                tone="bg-primary"
              />
              <MetricBar
                label="Upgradeability Path"
                value={entity.upgradeability}
                width={Math.min(entity.risk.breakdown.upgradeability * 5, 100)}
                tone="bg-on-background"
              />
              <MetricBar
                label="L1 Dependency"
                value={entity.l1Dependency}
                width={Math.min(entity.risk.breakdown.l1Dependency * 5, 100)}
                tone="bg-primary"
              />
            </div>
          </section>

          <section>
            <h3 className="mb-6 border-b border-primary/20 pb-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Readiness Signals
            </h3>
            <div className="space-y-4">
              {entity.readinessSignals.map((signal) => (
                <div
                  key={signal}
                  className={`flex items-start gap-4 px-4 py-4 transition-colors ${
                    isConcerningSignal(signal)
                      ? "bg-surface-container hover:bg-secondary-fixed"
                      : "bg-surface-container hover:bg-primary-fixed"
                  }`}
                >
                  {isConcerningSignal(signal) ? (
                    <Icon name="warning" className="mt-0.5 h-4 w-4 text-secondary" />
                  ) : (
                    <Icon name="check-circle" className="mt-0.5 h-4 w-4 text-primary" />
                  )}
                  <div>
                    <p className="mb-1 font-headline text-sm font-semibold italic">
                      {isConcerningSignal(signal) ? "Migration Constraint" : "Supporting Signal"}
                    </p>
                    <p className="text-[11px] leading-relaxed opacity-70">{signal}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-6 border-b border-primary/20 pb-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Source Intelligence
            </h3>
            <div className="flex flex-col gap-2">
              {entity.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between bg-surface-container-low px-3 py-3 transition-colors hover:bg-primary-container"
                >
                  <span className="font-label text-[10px] uppercase tracking-[0.22em] group-hover:text-white">
                    {source.label}
                  </span>
                  <Icon name="arrow-up-right" className="h-3.5 w-3.5 group-hover:text-white" />
                </a>
              ))}
            </div>
          </section>

          <div className="pt-4">
            <Link
              href="/learn/quantum-risk-in-ethereum"
              className="relative z-10 inline-flex w-full items-center justify-center py-5 font-label text-xs font-bold uppercase tracking-[0.2em] shadow-[0_16px_30px_rgba(27,28,26,0.12)] transition-colors"
              style={{ backgroundColor: "#1b1c1a", color: "#faf9f5" }}
            >
              Read Ethereum Brief
            </Link>
          </div>
        </div>
      </div>

      {!mobile ? (
        <div className="mt-auto bg-surface-container-high p-10">
          <img alt="" aria-hidden="true" className="mb-6 h-48 w-full object-cover" src={railImage} />
          <p className="text-center font-headline text-sm italic text-on-surface-variant">
            &quot;Post-quantum readiness is not one upgrade. It is a map of every surface that must move together.&quot;
          </p>
        </div>
      ) : null}
    </div>
  );
}

function MetricBar({
  label,
  value,
  width,
  tone,
}: {
  label: string;
  value: string;
  width: number;
  tone: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-start justify-between gap-4 font-label text-[11px] uppercase tracking-[0.18em]">
        <span>{label}</span>
        <span className="max-w-44 text-right font-bold text-on-surface/70">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-surface-container-high">
        <div className={`h-full ${tone}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function EmptyPanel() {
  return (
    <div className="flex h-full items-center justify-center p-10 text-center">
      <div>
        <div className="font-label text-[10px] uppercase tracking-[0.22em] text-outline">No entities</div>
        <div className="mt-3 font-headline text-3xl italic">Adjust the filters to restore a live evidence panel</div>
      </div>
    </div>
  );
}
