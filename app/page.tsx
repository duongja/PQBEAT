/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BlogNewsletterSignup } from "@/components/blog-newsletter-signup";
import { Icon } from "@/components/icon";
import { QuantumHeroField } from "@/components/quantum-hero-field";
import { SiteNavbar } from "@/components/site-navbar";
import {
  benchmarkEntries,
  dashboardSnapshot,
  layerBriefs,
  primarySources,
  reviewDate,
  scoredEntities,
} from "@/lib/data";

const heroTexture =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuABxhRTIPwXnGZz7KVFE6COUM3wuQVWW_RXtiIBkRQ_vL-2Ve7-ruCfUn4OGreWn_3TN93Y0uE8ZwcxQWbvzO6ZqacsBDySzowiEGbRjbd_6H2cLX1iurGaSnNm8jP8OLm-db4_Ya73QTUiOoNh8l5W2clgKPJfCoiW2_ipxSaz7wSICbDj0-MWF9jSxHOQv-b1-NaCmngTS822allVXiMa2GwnOzOywCK7hlzbA9qFBF7YVZjsRoV3VZowWuoLigUH-iQBMQIoW5E";
const collaborationImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCEOq-V5btAwvEL_2jfdbsnLE_sA3lh4MOrYsDt-Yjv7-FRbZ3kLkQ3KDTralm7rH_6ikNuiv1o7nzr1Gxiwy7PnSxK-mWrBwvDJwUzJc9qgyEC6rlJw5CEjuHX-_4iOfnG-xrvG7c1mDs9d3TbUmZiMjTO7rxgnRGKquu_oevc0wamlz8yV40XRDvrYxrpRK-Y7rE39YCetxcK7hOHMZ3flyEB5Yo_4FuRNXjKCWpCqBMzbJC6OZsoIVHT2n4Zae0q6dDSpSuUS6Y";
const insightsImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuClUwsv4J6E5zVugKK283VhG2m2Gt_APDRyxkAH-ZWN0rJmGiY3To_exp7RjBRe4dFckilMULRV6bdTb2LzQjpEjIAQP8pS8Pc_pND7KCvuIq6VkWS_psFlSFfFSsNJPHogfzvQN5r1P-6uKfgXdWv9JmqN7hwsYdX9k8XDHb2syfS4R9xOdJxqXpuAHJF-UNoW0K1qBXH3Vsqgce9EllJj1Ngz_kxxu2JHv_VMsc7BUM2n_NkOreOD6cgf17dYNXa5PxVqdfVX3Kw";

const ecosystemCards = [
  {
    label: "01 / Infrastructure",
    title: "Execution Accounts",
    description: layerBriefs[0].description,
    width: "15%",
  },
  {
    label: "02 / Consensus",
    title: "Validators",
    description: layerBriefs[1].description,
    width: "28%",
  },
  {
    label: "03 / Scaling",
    title: "Rollups",
    description: layerBriefs[2].description,
    width: "64%",
  },
  {
    label: "04 / Connectivity",
    title: "Smart-Account Wallets",
    description: layerBriefs[3].description,
    width: "39%",
  },
] as const;

const footerColumns = [
  {
    heading: "Framework",
    links: ["Methodology", "Peer Review"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Contact"],
  },
  {
    heading: "Social",
    links: ["Twitter / X", "GitHub"],
  },
] as const;

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));
}

function statusTone(status: "primary" | "secondary" | "tertiary") {
  if (status === "secondary") {
    return "bg-secondary/10 text-secondary";
  }

  if (status === "tertiary") {
    return "bg-tertiary/10 text-tertiary";
  }

  return "bg-primary/10 text-primary";
}

export default function Home() {
  const totalEntities = dashboardSnapshot.entitiesTracked;
  const averageRisk =
    Math.round(
      (scoredEntities.reduce((sum, entity) => sum + entity.risk.score, 0) / Math.max(scoredEntities.length, 1)) * 10,
    ) / 10;
  const networkSecurity =
    Math.round((dashboardSnapshot.distribution.Low / Math.max(dashboardSnapshot.entitiesTracked, 1)) * 1000) / 10;
  const riskPercentages = {
    High: Math.round((dashboardSnapshot.distribution.High / totalEntities) * 100),
    Medium: Math.round((dashboardSnapshot.distribution.Medium / totalEntities) * 100),
    Low: Math.round((dashboardSnapshot.distribution.Low / totalEntities) * 100),
  };
  const formattedReviewDate = formatReviewDate(reviewDate);

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        backgroundColor: "#faf9f5",
        backgroundImage: `url(${heroTexture})`,
      }}
    >
      <SiteNavbar />

      <main className="mx-auto max-w-screen-2xl px-8 pb-24 pt-[7.5rem]">
        <section className="mb-24">
          <div className="grid items-start gap-y-10 gap-x-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(21rem,29.75rem)] xl:grid-cols-[minmax(0,1fr)_30rem] xl:gap-x-16">
            <div className="max-w-4xl lg:pr-4">
              <span className="mb-4 block font-label text-[11px] uppercase tracking-[0.3em] text-secondary">
                Archive Intelligence v2.4
              </span>
              <h1 className="mb-8 font-headline text-6xl font-semibold leading-[0.92] tracking-[-0.09em] sm:text-7xl">
                Tracking <span className="italic">Quantum Readiness</span> Across the Ethereum Stack
              </h1>
              <p className="mb-12 max-w-2xl text-[1.15rem] leading-8 text-on-surface-variant">
                An editorial deep-dive into the cryptographic vulnerabilities of blockchain infrastructure. We catalog
                the transition from classical Ethereum signatures to credible post-quantum migration paths across
                execution layers, validators, rollups, wallets, and infrastructure.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/registry"
                  className="inline-flex items-center justify-center bg-primary px-8 py-4 font-label text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-[#004f4f]"
                >
                  Explore the Registry
                </Link>
                <Link
                  href="/learn/quantum-risk-in-ethereum"
                  className="inline-flex items-center justify-center border-2 border-primary px-8 py-4 font-label text-[11px] uppercase tracking-[0.24em] text-primary transition-colors hover:bg-surface-container-low"
                >
                  Read the Deep Dive
                </Link>
              </div>
            </div>

            <div className="w-full max-w-[30rem] justify-self-center lg:justify-self-end lg:self-start lg:pt-6 xl:pt-8">
              <QuantumHeroField />
            </div>
          </div>
        </section>

        <section className="mb-24 grid grid-cols-1 bg-surface-container-low md:grid-cols-4">
          <div className="border-outline-variant/20 p-8 md:border-r">
            <span className="mb-2 block font-label text-[10px] uppercase tracking-[0.22em] text-tertiary">
              Total Entities Tracked
            </span>
            <div className="font-label text-4xl font-bold tracking-[-0.05em]">{dashboardSnapshot.entitiesTracked}</div>
            <div className="mt-4 flex items-center text-xs font-label text-primary">
              <Icon name="analytics" className="mr-1 h-3.5 w-3.5" />
              Source-backed coverage
            </div>
          </div>
          <div className="border-outline-variant/20 p-8 md:border-r">
            <span className="mb-2 block font-label text-[10px] uppercase tracking-[0.22em] text-tertiary">
              Avg. Risk Score
            </span>
            <div className="font-label text-4xl font-bold tracking-[-0.05em]">
              {averageRisk}
              <span className="ml-1 text-lg text-tertiary">/100</span>
            </div>
            <div className="mt-4 flex items-center text-xs font-label text-error">
              <Icon name="warning" className="mr-1 h-3.5 w-3.5" />
              Migration pressure
            </div>
          </div>
          <div className="border-outline-variant/20 p-8 md:border-r">
            <span className="mb-2 block font-label text-[10px] uppercase tracking-[0.22em] text-tertiary">
              Network Security %
            </span>
            <div className="font-label text-4xl font-bold tracking-[-0.05em]">{networkSecurity}%</div>
            <div className="mt-4 flex items-center text-xs font-label text-secondary">
              <Icon name="shield" className="mr-1 h-3.5 w-3.5" />
              Low-risk cohort
            </div>
          </div>
          <div className="p-8">
            <span className="mb-2 block font-label text-[10px] uppercase tracking-[0.22em] text-tertiary">
              Research Updates
            </span>
            <div className="font-label text-4xl font-bold tracking-[-0.05em]">{primarySources.length}</div>
            <div className="mt-4 flex items-center text-xs font-label text-primary">
              <Icon name="history" className="mr-1 h-3.5 w-3.5" />
              Current reference set
            </div>
          </div>
        </section>

        <div className="grid gap-16 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-16">
          <div className="space-y-32">
            <section>
              <div className="mb-12 flex items-baseline justify-between gap-6">
                <h2 className="font-headline text-4xl font-semibold italic">Ecosystem Breakdown</h2>
                <div className="h-px flex-1 bg-outline-variant/30" />
                <span className="font-label text-xs uppercase text-tertiary">Layer Distribution</span>
              </div>
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                {ecosystemCards.map((card) => (
                  <div
                    key={card.title}
                    className="bg-surface-container-low p-10 transition-colors hover:bg-surface-container-high"
                  >
                    <span className="mb-4 block font-label text-[10px] tracking-[0.22em] text-primary">
                      {card.label}
                    </span>
                    <h3 className="mb-4 font-headline text-2xl font-semibold">{card.title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-tertiary">{card.description}</p>
                    <div className="h-1 w-full bg-surface-container-highest">
                      <div className="h-full bg-primary" style={{ width: card.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-on-surface p-10 text-background sm:p-16">
              <div className="mb-16 max-w-xl">
                <span className="mb-4 block font-label text-[10px] uppercase tracking-[0.24em] text-secondary-container">
                  Intelligence Insight
                </span>
                <h2 className="mb-6 font-headline text-5xl font-semibold">Risk Indicators</h2>
                <p className="text-surface-container-highest/70">
                  A qualitative mapping of cryptographic surface-area vulnerabilities relative to the estimated arrival
                  of practical quantum attacks against today&apos;s signature assumptions.
                </p>
              </div>
              <div className="space-y-8">
                {[
                  {
                    label: "High Probability / Classical ECDSA",
                    value: `${riskPercentages.High}% Exposure`,
                    tone: "bg-error",
                  },
                  {
                    label: "Medium Probability / Hybrid Transition Layers",
                    value: `${riskPercentages.Medium}% Exposure`,
                    tone: "bg-secondary-container",
                  },
                  {
                    label: "Low Probability / Programmable Migration Surfaces",
                    value: `${riskPercentages.Low}% Exposure`,
                    tone: "bg-primary",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center">
                    <div className={`mr-6 h-4 w-4 ${item.tone}`} />
                    <div className="flex-grow">
                      <div className="mb-2 flex justify-between gap-4">
                        <span className="font-label text-xs uppercase tracking-[0.22em]">{item.label}</span>
                        <span className="font-label text-xs">{item.value}</span>
                      </div>
                      <div className="h-px bg-surface-container-highest/20" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-12">
                <h2 className="mb-4 font-headline text-4xl font-semibold">Algorithm Benchmark</h2>
                <p className="text-sm text-tertiary">
                  Tracking NIST-selected candidate performance on Ethereum-oriented execution targets.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-surface-container text-left">
                      <th className="p-6 font-label text-[10px] font-bold uppercase tracking-[0.24em]">Algorithm</th>
                      <th className="p-6 font-label text-[10px] font-bold uppercase tracking-[0.24em]">PubKey Size (B)</th>
                      <th className="p-6 font-label text-[10px] font-bold uppercase tracking-[0.24em]">Sig Size (B)</th>
                      <th className="p-6 font-label text-[10px] font-bold uppercase tracking-[0.24em]">Gas Cost Est.</th>
                      <th className="p-6 font-label text-[10px] font-bold uppercase tracking-[0.24em]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {benchmarkEntries.map((entry, index) => (
                      <tr key={entry.algorithm} className="bg-surface transition-colors hover:bg-surface-container-low">
                        <td className={`p-6 font-label text-[15px] font-bold tracking-[0.01em] ${index < benchmarkEntries.length - 1 ? "border-b border-outline-variant/10" : ""}`}>
                          {entry.algorithm}
                        </td>
                        <td className={`p-6 ${index < benchmarkEntries.length - 1 ? "border-b border-outline-variant/10" : ""}`}>
                          {entry.publicKeySize}
                        </td>
                        <td className={`p-6 ${index < benchmarkEntries.length - 1 ? "border-b border-outline-variant/10" : ""}`}>
                          {entry.signatureSize}
                        </td>
                        <td
                          className={`p-6 font-label text-primary ${index < benchmarkEntries.length - 1 ? "border-b border-outline-variant/10" : ""}`}
                        >
                          {entry.gasCostEstimate}
                        </td>
                        <td className={`p-6 ${index < benchmarkEntries.length - 1 ? "border-b border-outline-variant/10" : ""}`}>
                          <span
                            className={`px-3 py-1 font-label text-[10px] uppercase ${statusTone(entry.statusTone)}`}
                          >
                            {entry.statusLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="space-y-12">
            <div className="bg-surface-container-high p-8">
              <span className="mb-4 block font-label text-[10px] uppercase tracking-[0.22em] text-secondary">
                Latest Review
              </span>
              <div className="mb-2 font-label text-3xl font-bold tracking-[-0.04em]">{formattedReviewDate}</div>
              <p className="mb-6 text-xs leading-relaxed text-tertiary">
                Current snapshot includes execution accounts, validator keys, major rollups, smart-account stacks, and
                transaction infrastructure.
              </p>
              <div className="mb-6 h-px bg-outline-variant/30" />
              <div className="flex items-center text-xs font-label uppercase tracking-[0.22em] text-primary">
                <Icon name="check-circle" className="mr-2 h-3.5 w-3.5" />
                Source-Backed Snapshot
              </div>
            </div>

            <div className="border-l-2 border-primary p-8">
              <h4 className="mb-4 font-label text-[10px] uppercase tracking-[0.22em] text-primary">Assessment Policy</h4>
              <p className="mb-6 font-headline text-xl font-medium italic leading-relaxed">
                &quot;Our methodology favors data integrity over speed. Every entity is vetted through public source
                material before release.&quot;
              </p>
              <Link href="/learn/quantum-risk-in-ethereum" className="border-b border-primary pb-1 text-xs font-label">
                Read Full Protocol
              </Link>
            </div>

            <div className="space-y-8">
              <h4 className="font-label text-[10px] uppercase tracking-[0.22em] text-tertiary">Priority Watchlist</h4>
              <div className="space-y-6">
                {dashboardSnapshot.watchlist.slice(0, 2).map((entity) => (
                  <div key={entity.slug} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold">{entity.name}</div>
                      <div
                        className={`font-label text-[10px] uppercase ${
                          entity.risk.level === "High" ? "text-error" : "text-secondary"
                        }`}
                      >
                        {entity.risk.level === "High" ? "Critical vulnerability" : "Staged migration"}
                      </div>
                    </div>
                    {entity.risk.level === "High" ? (
                      <Icon name="shield-alert" className="h-5 w-5 text-error" />
                    ) : (
                      <Icon name="clock" className="h-5 w-5 text-secondary" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-low p-8">
              <h4 className="mb-6 font-label text-[10px] uppercase tracking-[0.22em] text-tertiary">
                Source Intelligence
              </h4>
              <ul className="space-y-4 text-xs text-tertiary">
                {primarySources.slice(0, 4).map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
                      • {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="mt-32 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Link
            href="/registry"
            className="group relative aspect-[16/7] overflow-hidden bg-secondary p-10 text-white sm:p-16"
          >
            <div className="relative z-10 max-w-[30rem] [text-shadow:0_2px_14px_rgba(0,0,0,0.72)]">
              <span className="mb-4 block font-label text-xs font-bold uppercase tracking-[0.22em] text-[#fff6ea] opacity-95">
                Community Collaboration
              </span>
              <h3 className="mb-6 font-headline text-4xl font-semibold text-[#fffdf8] sm:text-[2.7rem]">
                Contribute to the Registry
              </h3>
              <div className="flex w-fit items-center border-b border-white/90 pb-1 font-label text-sm font-bold uppercase tracking-[0.22em] text-white">
                Submit Research <Icon name="arrow-right" className="ml-2 h-3.5 w-3.5" />
              </div>
            </div>
            <div className="absolute inset-0">
              <img
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover grayscale opacity-22 transition-transform duration-700 group-hover:scale-105"
                src={collaborationImage}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.42)_100%)]" />
            </div>
          </Link>

          <Link
            href="/learn/quantum-risk-in-ethereum"
            className="group relative aspect-[16/7] overflow-hidden bg-primary p-10 text-white sm:p-16"
          >
            <div className="relative z-10 max-w-[30rem] [text-shadow:0_2px_14px_rgba(0,0,0,0.72)]">
              <span className="mb-4 block font-label text-xs font-bold uppercase tracking-[0.22em] text-[#efffff] opacity-95">
                Knowledge Base
              </span>
              <h3 className="mb-6 font-headline text-4xl font-semibold text-[#fbfffe] sm:text-[2.7rem]">
                Read Research Article
              </h3>
              <div className="flex w-fit items-center border-b border-white/90 pb-1 font-label text-sm font-bold uppercase tracking-[0.22em] text-white">
                Explore Insights <Icon name="arrow-right" className="ml-2 h-3.5 w-3.5" />
              </div>
            </div>
            <div className="absolute inset-0">
              <img
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover grayscale opacity-18 transition-transform duration-700 group-hover:scale-105"
                src={insightsImage}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.56)_42%,rgba(0,0,0,0.34)_100%)]" />
            </div>
          </Link>
        </section>
      </main>

      <footer className="bg-[#1b1c1a] text-stone-300">
        <div className="mx-auto w-full max-w-screen-2xl px-8 pt-12">
          <div className="max-w-3xl">
            <BlogNewsletterSignup
              compact
              title="Get the weekly PQBEAT note."
              description="A short weekly email when we publish a new brief or materially update registry coverage."
            />
          </div>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-screen-2xl flex-col items-center justify-between gap-8 border-t border-white/10 px-8 py-12 md:flex-row md:items-end">
          <div>
            <div className="mb-2 font-headline text-xl italic text-[#faf9f5]">PQBEAT</div>
            <p className="max-w-xs text-xs leading-relaxed opacity-80">
              © 2026 PQBEAT Research Analytics. Independently maintained, source-backed, and continuously reviewed.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            {footerColumns.map((column) => (
              <div key={column.heading} className="flex flex-col space-y-4 text-xs">
                <span className="font-label text-[10px] uppercase tracking-[0.22em] text-stone-300">{column.heading}</span>
                {column.links.map((link) => (
                  <span key={link} className="transition-colors hover:text-white">
                    {link}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="text-right">
            <div className="mb-2 font-label text-[10px] uppercase tracking-[0.22em] text-[#b87333]">Network Status</div>
            <div className="flex items-center justify-end">
              <span className="mr-2 h-2 w-2 bg-primary" />
              <span className="text-[#faf9f5]">Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
