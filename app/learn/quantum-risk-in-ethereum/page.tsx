/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Icon } from "@/components/icon";
import { SiteNavbar } from "@/components/site-navbar";
import { primarySources, reviewDate } from "@/lib/data";
import { rubricRows } from "@/lib/scoring";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAUdjfOSTV5rJ5FlpQIF3Brd8Yh-EbxvSfj1OehYplmTLRUE5hP8zzZiChc4GDm3BnLjxHQOBXm7VKzssJFh1P5WmbhA_AFgM072LH_vOU1nT8zChSofUC3hX6_c3xuJ7yNMGFst5usj3yZwofnDVyCwB6B095nBuNm8aGFKMKqHHxnRksB1S9z59UU9yiOjy6N0FmN7RvK7oWfYhTRJvPFZmnR_K1AdV5tnAQgu1BKbATl1fOtfb0JyRtNgJIQ4NKILv50u17vdmA";
const validatorsImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCcvMMVI9IYO4rDO6vrtYSHgkMGzg3k7gxqo4lOlEMkCpn-gc017LOISz0ZPq2eOIlXjLISi_L6tgKAKq2QX1Fwoi8VVuRw_mKGZQCaXeFU7uMV-remwS_RjDd6X_lmQmbbStlH3rM8jCkyliXL3zzx-Xffl2fAzfWh2bLEfUNUsJS96miJcZruZ8R1flcoonpMxsCOjDUfzLQjW13ExPbKnt1HEb1iqKmPGrJReVSIy9LvPww1sl1vcIj1Rt2oUXfEYazNYTDdQac";
const ctaTexture =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDbN9EVAFfLeiDtq_Qm4E4u47jVzfZgOCmQXvW45Zo7hrT4cFDob8h9fqCB91Ik3Xi0LkJK5_eEJB8sh3mVHhKMtjh6uYi5E8hWD04yZa-9fwGvkEceBEPbqe32B8JQrZTTYQPbI3ZqAmxw3-J_drXMP0ADrxFaq-o7I731ZNeSdD7DUKBtWMntFpRm1aNGjuK5M-CQgjsNAZ1XVYLFN5-0xKIRgXViA_RsRkKEFNdT9cQI8J4vsl4CnJPw_PDiW73KoMu4W6KE8aY";

const chapterLinks = [
  { href: "#editorial-frame", label: "Editorial frame" },
  { href: "#execution-accounts", label: "Execution accounts" },
  { href: "#validators", label: "Validators" },
  { href: "#rollups", label: "Rollups & STARKs" },
  { href: "#smart-accounts", label: "Smart accounts" },
  { href: "#infrastructure", label: "Infrastructure" },
] as const;

const issueSignals = [
  {
    label: "Primary exposure",
    value: "Execution accounts",
    description: "Ethereum's default user path still inherits secp256k1 assumptions once accounts spend onchain.",
  },
  {
    label: "Migration lever",
    value: "Account abstraction",
    description: "Programmable verification gives Ethereum the clearest route to rotate signer logic without losing UX.",
  },
  {
    label: "Parallel track",
    value: "Validator cryptography",
    description: "Consensus keys are a separate migration problem and need different protocol work than user accounts.",
  },
] as const;

const futureArticles = [
  {
    state: "Planned brief",
    title: "Rollup Escape Hatches Under Post-Quantum Stress",
    description: "Forced inclusion, bridge latency, and how settlement dependencies reshape withdrawal guarantees.",
  },
  {
    state: "Planned brief",
    title: "Bundlers, Paymasters, and the Account Abstraction Migration Layer",
    description: "Where smart-account infrastructure can absorb signer changes and where classical assumptions still leak through.",
  },
  {
    state: "Research queue",
    title: "Ethereum Validator Key Rotation Beyond BLS",
    description: "Operational constraints, client coordination, and what consensus-safe migration could realistically require.",
  },
] as const;

const archiveColumns = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Overview" },
      { href: "/registry", label: "Registry" },
      { href: "/learn/quantum-risk-in-ethereum", label: "Featured Deep Dive" },
    ],
  },
  {
    heading: "Coverage Tracks",
    links: [
      { href: "#execution-accounts", label: "Execution accounts" },
      { href: "#validators", label: "Validators" },
      { href: "#rollups", label: "Rollups & STARKs" },
    ],
  },
] as const;

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));
}

export const metadata = {
  title: "PQBEAT Journal | Quantum Readiness Across Ethereum",
};

export default function QuantumRiskExplainerPage() {
  const formattedReviewDate = formatReviewDate(reviewDate);

  return (
    <div className="relative min-h-screen bg-background text-on-background">
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(https://lh3.googleusercontent.com/aida-public/AB6AXuCMuE71Y3O1zquCb2smbAJWk1oG13ARayvLuCd2fEDf1pw6d7jMtL9QV7UN2BZFMir59QjTSRvLwTPiaZjLzuoIwtENBa2cjiS3Yr47kedpQoVhcrvK2hBT7Z3LDvCzyW2auiSqMbjYopifUBuhPa3bT8jtU_ntnXYUaoLjKfUCXfdPostD5ZW8KyeR1eONzCXGd8zmw1TGYiRN5V4i-gtWkdkr4Wwpjh42Nfp1M2bMzQR9TuoXiFl6V32Qarkkfg6q8dC71gJasC0)",
        }}
      />

      <SiteNavbar />

      <main className="mx-auto max-w-screen-2xl px-6 pb-24 pt-28 sm:px-8 lg:px-10">
        <section className="mb-14 grid grid-cols-12 gap-8 border-b border-outline-variant/30 pb-14">
          <div className="col-span-12 lg:col-span-7">
            <div className="mb-6 flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.32em] text-primary">
              <span className="h-px w-8 bg-primary" />
              PQBEAT Journal / Issue 04
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              <span className="border border-outline-variant/40 bg-surface-container-lowest px-3 py-2 font-label text-[10px] uppercase tracking-[0.24em] text-on-surface">
                Featured dossier
              </span>
              <span className="border border-secondary/30 bg-secondary/8 px-3 py-2 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">
                Ethereum transition
              </span>
            </div>

            <h1 className="max-w-5xl font-headline text-5xl font-bold leading-[0.92] tracking-[-0.09em] text-on-surface sm:text-6xl lg:text-7xl">
              Post-Quantum Readiness: The Ethereum Transition
            </h1>

            <p className="mt-8 max-w-4xl border-l-[3px] border-secondary pl-6 font-headline text-xl font-medium italic leading-relaxed text-on-surface-variant sm:pl-8 sm:text-2xl">
              An inquiry into the cryptographic shift from ECDSA and BLS toward post-quantum migration paths and the
              architectural implications for the world&apos;s primary smart contract platform.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="border border-outline-variant/25 bg-surface-container-lowest p-5">
                <div className="mb-2 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">
                  Review window
                </div>
                <div className="font-label text-sm font-bold uppercase tracking-[0.12em] text-on-surface">
                  {formattedReviewDate}
                </div>
              </div>
              <div className="border border-outline-variant/25 bg-surface-container-lowest p-5">
                <div className="mb-2 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">
                  Reading length
                </div>
                <div className="font-label text-sm font-bold uppercase tracking-[0.12em] text-on-surface">11 min read</div>
              </div>
              <div className="border border-outline-variant/25 bg-surface-container-lowest p-5">
                <div className="mb-2 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">
                  Evidence set
                </div>
                <div className="font-label text-sm font-bold uppercase tracking-[0.12em] text-on-surface">
                  {primarySources.length} source references
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#editorial-frame"
                className="inline-flex items-center justify-center gap-3 border border-outline-variant/30 bg-surface-container-lowest px-6 py-3 font-label text-[11px] uppercase tracking-[0.24em] text-on-surface transition-colors hover:border-primary hover:text-primary"
              >
                Read the article
                <Icon name="arrow-right" className="h-4 w-4" />
              </a>
              <Link
                href="/registry"
                className="inline-flex items-center justify-center gap-3 bg-primary px-6 py-3 font-label text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-primary/90"
              >
                Open registry
                <Icon name="arrow-up-right" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="relative min-h-[29rem] overflow-hidden border border-outline-variant/30 bg-surface-container-lowest shadow-[0_28px_80px_rgba(27,28,26,0.08)]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at top left, rgba(0, 101, 101, 0.16), transparent 34%), radial-gradient(circle at bottom right, rgba(140, 79, 16, 0.14), transparent 30%)",
                }}
              />

              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-outline-variant/25 bg-background/92 px-5 py-4 backdrop-blur">
                <div>
                  <div className="font-label text-[10px] uppercase tracking-[0.24em] text-secondary">Editorial system</div>
                  <div className="mt-1 font-headline text-xl font-semibold tracking-[-0.04em] text-on-surface">
                    Journal issue cover
                  </div>
                </div>
                <div className="border border-outline-variant/35 px-3 py-2 font-label text-[10px] uppercase tracking-[0.22em] text-primary">
                  Lead feature
                </div>
              </div>

              <img
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-multiply"
                src={heroImage}
              />

              <div className="absolute left-5 top-24 z-10 max-w-[14rem] border border-outline-variant/30 bg-background/92 p-5 shadow-sm backdrop-blur">
                <div className="mb-3 font-label text-[10px] uppercase tracking-[0.24em] text-primary">In scope</div>
                <div className="space-y-3">
                  {["EOA signer exposure", "Validator key migration", "Rollup settlement inheritance", "Account abstraction levers"].map(
                    (item) => (
                      <div key={item} className="flex items-start gap-2 text-sm leading-5 text-on-surface">
                        <span className="mt-1 h-1.5 w-1.5 bg-secondary" />
                        <span>{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 border-t border-outline-variant/25 bg-background/94 p-6 backdrop-blur">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-label text-[10px] uppercase tracking-[0.24em] text-secondary">From the journal</div>
                    <div className="mt-1 font-headline text-xl font-semibold tracking-[-0.04em] text-on-surface">
                      Next research tracks
                    </div>
                  </div>
                  <Icon name="archive" className="h-5 w-5 text-primary" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {futureArticles.map((item) => (
                    <div key={item.title} className="border border-outline-variant/25 bg-surface-container-low px-4 py-3">
                      <div className="mb-2 font-label text-[9px] uppercase tracking-[0.24em] text-secondary">{item.state}</div>
                      <div className="font-headline text-[1.05rem] font-semibold leading-5 tracking-[-0.04em] text-on-surface">
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 grid gap-4 md:grid-cols-3">
          <div className="border border-outline-variant/25 bg-surface-container-lowest p-6">
            <div className="mb-4 flex items-center gap-3 text-primary">
              <Icon name="analytics" className="h-5 w-5" />
              <span className="font-label text-[10px] uppercase tracking-[0.24em]">Why this brief exists</span>
            </div>
            <p className="text-sm leading-6 text-on-surface-variant">
              The page now acts as a reusable research format: featured article up front, expandable issue framing, and
              a visible queue for upcoming Ethereum security briefs.
            </p>
          </div>
          <div className="border border-outline-variant/25 bg-surface-container-lowest p-6">
            <div className="mb-4 flex items-center gap-3 text-primary">
              <Icon name="history" className="h-5 w-5" />
              <span className="font-label text-[10px] uppercase tracking-[0.24em]">Editorial cadence</span>
            </div>
            <p className="text-sm leading-6 text-on-surface-variant">
              Each issue can carry one flagship analysis while still signaling what the next articles will cover across
              accounts, consensus, rollups, and service infrastructure.
            </p>
          </div>
          <div className="border border-outline-variant/25 bg-surface-container-lowest p-6">
            <div className="mb-4 flex items-center gap-3 text-primary">
              <Icon name="document" className="h-5 w-5" />
              <span className="font-label text-[10px] uppercase tracking-[0.24em]">Research posture</span>
            </div>
            <p className="text-sm leading-6 text-on-surface-variant">
              Claims stay source-backed and Ethereum-specific. The design gets more editorial, but the content remains
              grounded in live protocol and infrastructure references.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8 lg:gap-10">
          <aside className="col-span-12 lg:col-span-3">
            <div className="space-y-8 lg:sticky lg:top-28">
              <div className="border border-outline-variant/25 bg-surface-container-lowest p-6">
                <div className="mb-5 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">Article map</div>
                <div className="space-y-4">
                  {chapterLinks.map((chapter, index) => (
                    <a
                      key={chapter.href}
                      href={chapter.href}
                      className="flex items-center justify-between gap-4 border-b border-outline-variant/15 pb-3 text-sm transition-colors last:border-b-0 last:pb-0 hover:text-primary"
                    >
                      <span className="font-headline text-lg tracking-[-0.03em]">{chapter.label}</span>
                      <span className="font-label text-[10px] uppercase tracking-[0.22em] text-outline">0{index + 1}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="border border-outline-variant/25 bg-surface-container-lowest p-6">
                <div className="mb-6 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">Scoring pillars</div>
                <ul className="space-y-6">
                  {[
                    { label: rubricRows[0].label, status: "HIGH RISK", width: "85%", bar: "bg-primary", tone: "text-primary" },
                    { label: rubricRows[1].label, status: "MODERATE", width: "40%", bar: "bg-primary", tone: "text-primary" },
                    { label: rubricRows[2].label, status: "READY", width: "92%", bar: "bg-secondary", tone: "text-secondary" },
                  ].map((pillar) => (
                    <li key={pillar.label}>
                      <div className="mb-2 flex items-end justify-between gap-3">
                        <span className="text-sm font-semibold capitalize text-on-surface">{pillar.label}</span>
                        <span className={`font-label text-[10px] uppercase tracking-[0.18em] ${pillar.tone}`}>
                          {pillar.status}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container-high">
                        <div className={`h-full ${pillar.bar}`} style={{ width: pillar.width }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="source-intelligence" className="border border-outline-variant/25 bg-surface-container-lowest p-6">
                <div className="mb-5 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">Source intelligence</div>
                <div className="space-y-3">
                  {primarySources.slice(0, 6).map((source, index) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-3 text-sm leading-5 text-on-surface-variant transition-colors hover:text-primary"
                    >
                      {index % 2 === 0 ? (
                        <Icon name="document" className="mt-0.5 h-4 w-4 shrink-0" />
                      ) : (
                        <Icon name="database" className="mt-0.5 h-4 w-4 shrink-0" />
                      )}
                      <span>{source.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <article className="col-span-12 space-y-16 lg:col-span-6">
            <section id="editorial-frame" className="border border-outline-variant/25 bg-surface-container-lowest p-8 sm:p-10">
              <div className="mb-5 font-label text-[10px] uppercase tracking-[0.24em] text-primary">Editorial frame</div>
              <p className="max-w-3xl font-headline text-3xl leading-tight tracking-[-0.05em] text-on-surface">
                Ethereum is not being assessed as already quantum-safe. It is being assessed as a stack with enough
                programmable leverage to support a migration if the threat horizon becomes urgent.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {issueSignals.map((signal) => (
                  <div key={signal.label} className="border border-outline-variant/20 bg-surface-container-low p-5">
                    <div className="mb-2 font-label text-[10px] uppercase tracking-[0.22em] text-secondary">
                      {signal.label}
                    </div>
                    <div className="mb-3 font-headline text-xl font-semibold tracking-[-0.04em] text-on-surface">
                      {signal.value}
                    </div>
                    <p className="text-sm leading-6 text-on-surface-variant">{signal.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="execution-accounts" className="space-y-8">
              <div className="flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">
                <span className="h-px w-8 bg-secondary" />
                Systemic exposure layer
              </div>
              <div>
                <h2 className="font-headline text-4xl font-semibold tracking-[-0.05em] text-on-surface">
                  Execution Accounts: The Path to Abstraction
                </h2>
                <p className="mt-6 text-[1.04rem] leading-8 text-on-surface-variant">
                  Current externally owned accounts are fundamentally tied to secp256k1 and public-key exposure after
                  spending. In a post-quantum landscape, that makes the default account model the most systemically
                  exposed part of Ethereum&apos;s user layer.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
                <div className="border border-outline-variant/20 bg-surface-container-low p-8">
                  <div className="mb-4 font-label text-[10px] uppercase tracking-[0.24em] text-primary">
                    Comparative architecture
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <div className="mb-2 font-headline text-lg font-semibold tracking-[-0.03em] text-on-surface">
                        Legacy EOA
                      </div>
                      <p className="text-sm leading-6 text-on-surface-variant">
                        Hard-coded ECDSA verification in the protocol-default user path. Familiar, widespread, and
                        structurally difficult to rotate.
                      </p>
                    </div>
                    <div>
                      <div className="mb-2 font-headline text-lg font-semibold tracking-[-0.03em] text-on-surface">
                        PQC abstraction
                      </div>
                      <p className="text-sm leading-6 text-on-surface-variant">
                        Smart-account verification paths can eventually absorb new signer models without forcing every
                        transaction to remain permanently EOA-native.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-outline-variant/20 bg-surface-container-lowest p-8">
                  <div className="mb-4 flex items-center gap-3 text-primary">
                    <Icon name="warning" className="h-5 w-5" />
                    <span className="font-label text-[10px] uppercase tracking-[0.22em]">Key implication</span>
                  </div>
                  <p className="text-sm leading-6 text-on-surface-variant">
                    Ethereum&apos;s strongest near-term path is not replacing EOAs overnight. It is expanding account
                    models that can carry new verification logic while keeping identity, wallets, and transaction flows
                    usable.
                  </p>
                </div>
              </div>

              <p className="text-[1.04rem] leading-8 text-on-surface-variant">
                The transition relies on account abstraction to decouple verification logic from the protocol&apos;s
                legacy assumptions, giving Ethereum a path to rotate authentication logic without discarding identity
                and wallet UX wholesale.
              </p>
            </section>

            <section
              id="validators"
              className="overflow-hidden border border-outline-variant/20 bg-surface-container-lowest"
            >
              <div className="h-1 w-full bg-primary" />
              <div className="grid items-center gap-10 p-8 md:grid-cols-2 md:p-10">
                <div>
                  <div className="mb-4 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">
                    Consensus migration track
                  </div>
                  <h2 className="font-headline text-4xl font-semibold tracking-[-0.05em] text-on-surface">
                    Validators: BLS vs Lamport
                  </h2>
                  <p className="mt-6 text-[1.02rem] leading-8 text-on-surface-variant">
                    Ethereum&apos;s consensus layer already proves the protocol can support a second signature family,
                    but that family is still not post-quantum. Research around Lamport-style and Merkle-backed schemes
                    matters because validator migration would still require consensus work, client upgrades, and new
                    operational tooling across the staking ecosystem.
                  </p>
                </div>

                <div className="relative overflow-hidden border border-outline-variant/20 bg-surface-container-low p-8 shadow-sm">
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background:
                        "radial-gradient(circle at top right, rgba(0, 101, 101, 0.1), transparent 36%), radial-gradient(circle at bottom left, rgba(140, 79, 16, 0.12), transparent 26%)",
                    }}
                  />
                  <div className="relative flex aspect-square items-center justify-center border border-outline-variant/20 bg-surface-container-lowest p-6">
                    <img alt="" aria-hidden="true" className="h-full w-full object-contain" src={validatorsImage} />
                  </div>
                </div>
              </div>
            </section>

            <section id="rollups" className="space-y-8">
              <div className="flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">
                <span className="h-px w-8 bg-secondary" />
                Settlement and proving layer
              </div>
              <div>
                <h2 className="font-headline text-4xl font-semibold tracking-[-0.05em] text-on-surface">
                  Rollups &amp; ZK-STARK Systems
                </h2>
                <p className="mt-6 text-[1.04rem] leading-8 text-on-surface-variant">
                  Layer 2 systems can often evolve faster than Ethereum L1, and STARK-based proving systems remain
                  more structurally promising from a post-quantum perspective than elliptic-curve-heavy alternatives.
                  But settlement, exits, and user flows still keep Ethereum at the center of the trust model.
                </p>
              </div>

              <blockquote className="border-l-[3px] border-primary bg-surface-container-low px-6 py-5 sm:px-8">
                <p className="font-headline text-2xl italic leading-relaxed text-on-surface">
                  &quot;The healthiest near-term signal is not that Ethereum is already quantum-safe. It is that more of
                  the stack is becoming programmable enough to carry a future migration.&quot;
                </p>
                <cite className="mt-4 block font-label text-[10px] uppercase tracking-[0.22em] text-secondary">
                  Lead Researcher, PQBEAT
                </cite>
              </blockquote>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="border border-outline-variant/20 bg-surface-container-lowest p-6">
                  <div className="mb-2 font-label text-[10px] uppercase tracking-[0.22em] text-primary">Why STARKs matter</div>
                  <p className="text-sm leading-6 text-on-surface-variant">
                    Hash-based assumptions are more structurally aligned with post-quantum goals than curve-heavy
                    proof systems, even if full end-to-end Ethereum settlement still inherits L1 constraints.
                  </p>
                </div>
                <div className="border border-outline-variant/20 bg-surface-container-lowest p-6">
                  <div className="mb-2 font-label text-[10px] uppercase tracking-[0.22em] text-primary">Why rollups are not enough</div>
                  <p className="text-sm leading-6 text-on-surface-variant">
                    Faster-moving L2s can improve proving and account models, but bridging, exits, and final trust
                    assumptions still pull the analysis back toward Ethereum itself.
                  </p>
                </div>
              </div>
            </section>

            <section id="smart-accounts" className="space-y-8">
              <div className="flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">
                <span className="h-px w-8 bg-secondary" />
                User migration surface
              </div>
              <div>
                <h2 className="font-headline text-4xl font-semibold tracking-[-0.05em] text-on-surface">
                  Smart Accounts &amp; Programmable Validation
                </h2>
                <p className="mt-6 text-[1.04rem] leading-8 text-on-surface-variant">
                  Contract-mediated accounts give Ethereum its most practical migration surface today. They do not solve
                  cryptography on their own, but they create the execution path for newer signer policies as standards
                  and implementations mature.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="border border-outline-variant/20 bg-surface-container-lowest p-8">
                  <Icon name="check-circle" className="mb-5 h-9 w-9 text-secondary" />
                  <h3 className="mb-3 font-headline text-2xl font-semibold tracking-[-0.04em] text-on-surface">
                    ERC-4337 Compatibility
                  </h3>
                  <p className="text-sm leading-6 text-on-surface-variant">
                    Bundlers, paymasters, and contract-mediated validation give Ethereum the clearest migration
                    leverage available today. They do not solve the cryptography problem alone, but they create the
                    execution path for new authentication logic once standards mature.
                  </p>
                </div>

                <div className="border border-outline-variant/20 bg-surface-container-lowest p-8">
                  <Icon name="shield-heart" className="mb-5 h-9 w-9 text-primary" />
                  <h3 className="mb-3 font-headline text-2xl font-semibold tracking-[-0.04em] text-on-surface">
                    Identity Continuity
                  </h3>
                  <p className="text-sm leading-6 text-on-surface-variant">
                    The advantage of abstraction is continuity: users can preserve application relationships, signer
                    policies, and operational habits even as the underlying verification logic becomes more flexible.
                  </p>
                </div>
              </div>
            </section>

            <section id="infrastructure" className="space-y-8">
              <div className="flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">
                <span className="h-px w-8 bg-secondary" />
                Service and relay layer
              </div>
              <div>
                <h2 className="font-headline text-4xl font-semibold tracking-[-0.05em] text-on-surface">
                  Infrastructure: The Adoption Multiplier
                </h2>
                <p className="mt-6 text-[1.04rem] leading-8 text-on-surface-variant">
                  RPCs, wallet services, relays, and bundler networks sit one layer away from the signing risk, but
                  they will strongly shape how quickly new account models and signer policies can ship safely across the
                  Ethereum ecosystem.
                </p>
              </div>

              <div className="border border-outline-variant/20 bg-surface-container-low p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-3 flex items-center gap-3 text-primary">
                      <Icon name="flask" className="h-5 w-5" />
                      <span className="font-label text-[10px] uppercase tracking-[0.22em]">Operational question</span>
                    </div>
                    <p className="text-sm leading-6 text-on-surface-variant">
                      How quickly can client software, wallet flows, relays, and API products expose new account models
                      without fragmenting user safety or developer ergonomics?
                    </p>
                  </div>
                  <div>
                    <div className="mb-3 flex items-center gap-3 text-primary">
                      <Icon name="server" className="h-5 w-5" />
                      <span className="font-label text-[10px] uppercase tracking-[0.22em]">System takeaway</span>
                    </div>
                    <p className="text-sm leading-6 text-on-surface-variant">
                      The service layer is not the cryptographic root of the problem, but it is the multiplier that will
                      decide whether a future migration feels coordinated or chaotic to the ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </article>

          <aside className="col-span-12 lg:col-span-3">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="border border-outline-variant/25 bg-surface-container-lowest p-6">
                <div className="mb-5 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">From the journal</div>
                <div className="space-y-4">
                  {futureArticles.map((item) => (
                    <div key={item.title} className="border border-outline-variant/20 bg-surface-container-low p-5">
                      <div className="mb-2 font-label text-[10px] uppercase tracking-[0.22em] text-primary">{item.state}</div>
                      <div className="font-headline text-[1.15rem] font-semibold leading-6 tracking-[-0.04em] text-on-surface">
                        {item.title}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-outline-variant/25 bg-surface-container-lowest p-6">
                <div className="mb-5 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">Coverage shape</div>
                <div className="space-y-3">
                  {["Protocol accounts", "Consensus cryptography", "Rollup settlement", "Smart-account stacks", "Infrastructure services"].map(
                    (item) => (
                      <div
                        key={item}
                        className="border border-outline-variant/15 bg-surface-container-low px-4 py-3 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="border border-outline-variant/25 bg-surface-container-lowest p-6">
                <div className="mb-3 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">Editorial note</div>
                <p className="text-sm leading-6 text-on-surface-variant">
                  This route can now scale into a broader article archive without changing its visual language. The
                  flagship brief leads; the next research pieces remain visible beside it.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <section className="relative mt-20 overflow-hidden border border-primary/20 bg-primary px-6 py-12 text-white sm:px-10 sm:py-16">
          <div className="absolute inset-0 opacity-10">
            <img alt="" aria-hidden="true" className="h-full w-full object-cover" src={ctaTexture} />
          </div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="mb-4 font-label text-[10px] uppercase tracking-[0.24em] text-white/80">Research continuation</div>
              <h2 className="max-w-3xl font-headline text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                Use the registry as the working ledger behind every future brief.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/82">
                The article system frames the narrative. The registry keeps the entity-level evidence live, comparable,
                and ready to extend as new research pieces enter the archive.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/registry"
                className="inline-flex items-center justify-between gap-3 border border-white/20 bg-white/10 px-5 py-4 font-label text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/14"
              >
                Open the registry
                <Icon name="arrow-up-right" className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-between gap-3 border border-white/20 bg-transparent px-5 py-4 font-label text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
              >
                Return to overview
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant/25 bg-surface-container-high/55 px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-screen-2xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="mb-4 font-headline text-2xl font-black tracking-[-0.08em] text-on-surface">PQBEAT Journal</div>
            <p className="max-w-md text-sm leading-6 text-on-surface-variant">
              A continuing editorial record of Ethereum&apos;s post-quantum transition, spanning flagship briefs,
              entity-level registry evidence, and the next research tracks already entering review.
            </p>
          </div>

          {archiveColumns.map((column) => (
            <div key={column.heading}>
              <div className="mb-4 font-label text-[10px] uppercase tracking-[0.24em] text-primary">{column.heading}</div>
              <div className="space-y-3">
                {column.links.map((link) =>
                  link.href.startsWith("#") ? (
                    <a key={link.label} href={link.href} className="block text-sm text-on-surface-variant transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-on-surface-variant transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
