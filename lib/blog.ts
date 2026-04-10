import type { ComponentType } from "react";
import EthereumTransition, { metadata as ethereumTransitionMetadata } from "@/content/blog/post-quantum-readiness-ethereum.mdx";

export type BlogSource = {
  label: string;
  url: string;
};

export type BlogPostMetadata = {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  coverImage: string;
  coverAlt: string;
  highlights?: string[];
  sources?: BlogSource[];
};

export type BlogPost = BlogPostMetadata & {
  slug: string;
  Component: ComponentType<Record<string, unknown>>;
};

const posts: BlogPost[] = [
  {
    slug: "post-quantum-readiness-ethereum",
    Component: EthereumTransition,
    ...(ethereumTransitionMetadata as BlogPostMetadata),
  },
];

export function getAllPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2) {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}
