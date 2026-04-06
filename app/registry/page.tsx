import { RegistryClient } from "@/components/registry-client";
import { SectionHeading } from "@/components/section-heading";
import { scoredEntities } from "@/lib/data";

export const metadata = {
  title: "Registry",
};

export default function RegistryPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 lg:px-10 lg:py-14">
      <SectionHeading
        eyebrow="Ecosystem registry"
        title="A curated map of Ethereum quantum readiness"
        description="Each entry uses the same transparent rubric so visitors can compare cryptographic exposure, migration flexibility, and Ethereum dependency across execution, consensus, rollups, wallets, and infra."
      />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[32px] border border-line bg-panel p-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">How to read it</p>
          <p className="mt-4 text-base leading-8 text-muted">
            Risk is directional, not definitive. A high score usually means the current signature path is still
            non-PQ and the upgrade path would require broad coordination across users, clients, rollups, or
            Ethereum itself.
          </p>
        </div>
        <div className="rounded-[32px] border border-line bg-panel p-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Coverage now</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-foreground">{scoredEntities.length}</p>
          <p className="mt-3 text-base leading-8 text-muted">
            Systems spanning L1 execution, consensus validators, major rollups, smart-account products, and the infrastructure that would help ship any future migration.
          </p>
        </div>
      </div>

      <RegistryClient entities={scoredEntities} />
    </div>
  );
}
