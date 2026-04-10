"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  aliases?: readonly string[];
};

const navItems: readonly NavItem[] = [
  { href: "/", label: "Overview" },
  { href: "/registry", label: "Registry" },
  { href: "/blog", label: "Blog", aliases: ["/blog", "/learn"] },
];

function isActive(pathname: string, href: string, aliases?: readonly string[]) {
  if (aliases?.some((alias) => pathname.startsWith(alias))) {
    return true;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function SiteNavbar() {
  const pathname = usePathname();
  const activeItem = navItems.find((item) => isActive(pathname, item.href, item.aliases)) ?? navItems[0];

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[#faf9f5]/92 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link href="/" className="font-headline text-3xl font-extrabold tracking-[-0.09em] text-[#1b1c1a]">
          PQBEAT
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`pb-1 font-label text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 ${
                isActive(pathname, item.href, item.aliases)
                  ? "border-b-2 border-primary text-primary"
                  : "text-[#1b1c1a]/68 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <span className="border border-outline-variant/70 bg-surface/80 px-3 py-2 font-label text-[10px] font-bold uppercase tracking-[0.22em] text-foreground">
            {activeItem.label}
          </span>
        </div>
      </nav>
    </header>
  );
}
