"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/registry", label: "Registry" },
  { href: "/learn/quantum-risk-in-ethereum", label: "Deep Dive" },
];

function navLinkClass(active: boolean) {
  return active
    ? "border-b-2 border-accent pb-1 text-accent"
    : "pb-1 text-foreground/60 transition-colors hover:text-accent";
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="font-headline text-3xl font-extrabold tracking-[-0.08em] text-foreground">
          PQBEAT
        </Link>

        <div className="hidden items-center gap-8 font-headline text-base tracking-tight md:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href} className={navLinkClass(active)}>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <span className="font-label text-[10px] uppercase tracking-[0.24em] text-accent">Research index</span>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#1b1c1a] text-stone-400">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between lg:px-8">
        <div>
          <div className="font-headline text-2xl font-semibold tracking-[-0.06em] text-[#faf9f5]">PQBEAT</div>
          <p className="mt-3 max-w-sm text-sm leading-7 text-stone-500">
            Independent research on quantum-readiness across Ethereum, with source-backed assessments and dated
            methodology snapshots.
          </p>
        </div>

        <div className="grid gap-8 text-xs md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-label text-[10px] uppercase tracking-[0.24em] text-stone-300">Framework</p>
            <p>Methodology</p>
            <p>Registry</p>
            <p>Peer Review</p>
          </div>
          <div className="space-y-3">
            <p className="font-label text-[10px] uppercase tracking-[0.24em] text-stone-300">Research</p>
            <p>Ethereum</p>
            <p>Rollups</p>
            <p>Wallets</p>
          </div>
          <div className="space-y-3">
            <p className="font-label text-[10px] uppercase tracking-[0.24em] text-stone-300">Network Status</p>
            <p className="flex items-center gap-2 text-[#faf9f5]">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Operational
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
