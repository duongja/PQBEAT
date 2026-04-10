import React from "react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    href: string;
  }) => React.createElement("a", { href, ...props }, children),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/content/blog/post-quantum-readiness-ethereum.mdx", () => ({
  metadata: {
    title: "Where Quantum Risk Actually Shows Up in Ethereum",
    excerpt: "A working map of the Ethereum surfaces PQBEAT tracks first.",
    date: "2026-04-10",
    author: "PQBEAT Research",
    readTime: "12 min read",
    category: "Core Brief",
    coverImage: "/blog-covers/ethereum-transition.jpg",
    coverAlt: "Ethereum transition cover",
    highlights: ["EOAs are still the obvious weak spot."],
    sources: [{ label: "Ethereum accounts", url: "https://ethereum.org/en/developers/docs/accounts/" }],
  },
  default: () =>
    React.createElement(
      React.Fragment,
      null,
      React.createElement("h2", null, "EOAs Are Still the Obvious Weak Spot"),
      React.createElement("p", null, "Ethereum still depends on classical signature systems."),
    ),
}));
