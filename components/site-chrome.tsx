import Link from "next/link";
import { PqbeatWordmark } from "@/components/pqbeat-wordmark";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/registry", label: "Registry" },
  { href: "/learn/quantum-risk-in-ethereum", label: "Deep Dive" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link href="/" className="flex flex-col gap-1">
          <PqbeatWordmark />
          <div className="text-sm font-semibold tracking-[0.06em] text-muted">
            Quantum readiness for the Ethereum stack
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-line bg-panel/80 p-1 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-muted transition hover:bg-paper hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80 bg-paper">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted lg:px-10 md:flex-row md:items-center md:justify-between">
        <p>
          PQBEAT tracks quantum readiness across Ethereum with source-backed assessments, transparent scoring,
          and review-date stamped methodology.
        </p>
        <p className="font-mono text-xs tracking-[0.18em] uppercase">Public registry • Static data release</p>
      </div>
    </footer>
  );
}
