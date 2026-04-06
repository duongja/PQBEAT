import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { layerBriefs, primarySources, reviewDate } from "@/lib/data";
import { rubricRows } from "@/lib/scoring";

const sections = [
  {
    title: "The real threat model",
    body:
      "Ethereum does not have one quantum-readiness problem. It has several: secp256k1 execution accounts, BLS validator keys, rollups that inherit L1 settlement, wallets trying to improve signer flexibility, and infrastructure that has to carry whatever new transaction model shows up next.",
  },
  {
    title: "Execution accounts are still the biggest systemic exposure",
    body:
      "Ethereum's dominant user account path is still the externally owned account. That keeps the ecosystem simple and compatible, but it also means the largest installed base still depends on classical signatures and public-key exposure after spending. EIP-7702 is a meaningful evolution in account behavior, not a post-quantum migration.",
  },
  {
    title: "Consensus validators are a separate migration surface",
    body:
      "Proof-of-stake validators already use BLS rather than ECDSA, which matters for aggregation and validator operations. That is a useful precedent because it proves Ethereum can support different cryptographic roles, but BLS is still not post-quantum and validator-key migration would have to happen at the protocol and client level.",
  },
  {
    title: "Rollups can move faster, but they still inherit Ethereum",
    body:
      "Arbitrum, OP Mainnet, Base, Scroll, and zkSync can all evolve faster than Ethereum L1 in some respects. What they cannot do is escape the fact that settlement, exits, data posting, and ecosystem compatibility still depend heavily on Ethereum. A rollup can be ahead on account abstraction and still remain downstream of L1 cryptography.",
  },
  {
    title: "Smart accounts are the clearest readiness signal today",
    body:
      "Safe, Base Account, and the broader ERC-4337 ecosystem show what practical readiness looks like in 2026: more programmable signing policy, contract-mediated validation, and better room to change authentication over time. That does not make these systems post-quantum, but it does make them more adaptable than a plain EOA world.",
  },
  {
    title: "Infrastructure decides how fast the ecosystem can actually move",
    body:
      "RPC providers, bundlers, paymasters, and wallet infrastructure will not solve the root cryptography problem on their own. They will, however, determine how quickly new transaction formats, smart-wallet flows, and migration tooling can reach developers and users once the protocol path becomes clearer.",
  },
];

const readinessSignals = [
  "Ethereum already supports multiple signature roles across execution and consensus, which is a useful precedent even though none are post-quantum.",
  "Smart-account systems give the ecosystem a place to change signer policy without waiting for every workflow to remain EOA-native.",
  "Rollups add operational flexibility, but their hard finality and bridge safety still keep Ethereum at the center of the risk picture.",
  "Infrastructure layers are comparatively low direct risk and high strategic importance because they can accelerate adoption of new account models.",
];

export const metadata = {
  title: "Quantum Readiness Across Ethereum",
};

export default function QuantumRiskExplainerPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 lg:px-10 lg:py-14">
      <SectionHeading
        eyebrow="Research deep dive"
        title="Quantum readiness across Ethereum, layer by layer"
        description="This explainer synthesizes Ethereum docs, EIPs, and major ecosystem product materials into a single PQBEAT view of execution, consensus, rollups, smart accounts, and infra."
      />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[36px] border border-line bg-surface p-8 shadow-[0_20px_60px_rgba(22,24,29,0.05)]">
          <p className="text-lg leading-8 text-muted">
            The strongest reason to study post-quantum readiness now is not that Ethereum is already broken.
            It is that every important layer of the stack has a different migration burden, and those burdens
            interact. The result is a coordination problem, not just a cryptography problem.
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-line pt-8 first:border-t-0 first:pt-0">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">{section.title}</h2>
                <p className="mt-4 text-base leading-8 text-muted">{section.body}</p>
              </section>
            ))}
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-line bg-panel p-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Research basis</p>
            <div className="mt-5 rounded-[24px] border border-line bg-paper p-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Last reviewed</p>
              <p className="mt-2 font-mono text-sm text-foreground">{reviewDate}</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                PQBEAT scores are our interpretation of public materials. They are not official project declarations of post-quantum readiness.
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {primarySources.slice(0, 6).map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-[22px] border border-line bg-paper px-4 py-4 text-sm text-foreground transition hover:border-accent hover:text-accent"
                >
                  <span>{source.label}</span>
                  <span className="font-mono text-xs text-muted">Open</span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-line bg-panel p-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Scoring pillars</p>
            <div className="mt-6 space-y-4">
              {rubricRows.map((row) => (
                <div key={row.label} className="rounded-[24px] border border-line bg-paper p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-foreground">{row.label}</span>
                    <span className="font-mono text-sm text-muted">{row.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Layer synthesis"
          title="How the stack breaks down today"
          description="The entries below compress the current picture into the five operating layers PQBEAT tracks."
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

      <section className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
        <div className="rounded-[36px] border border-line bg-panel p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">What improves readiness</p>
          <div className="mt-6 space-y-3">
            {readinessSignals.map((point) => (
              <div key={point} className="rounded-[24px] border border-line bg-paper p-4 text-sm leading-7 text-muted">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[36px] border border-line bg-panel p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Bottom line</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Ethereum is not quantum-ready yet, but parts of the stack are more adaptable than others</h2>
          <p className="mt-4 text-base leading-8 text-muted">
            The healthiest current signal is not a live PQ deployment. It is the spread of smart-account
            architectures and wallet infrastructure that can eventually carry new signer models. The least
            adaptable surface is still the base EOA and validator-key layer, where protocol coordination is unavoidable.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/registry"
              className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-medium text-paper shadow-[0_12px_30px_rgba(139,112,65,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(139,112,65,0.24)]"
            >
              Explore the registry
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-line bg-paper px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              Return to overview
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
