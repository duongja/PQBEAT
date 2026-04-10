/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useDeferredValue, useId, useState } from "react";
import { Icon } from "@/components/icon";
import type { KnowledgeBaseResource } from "@/lib/knowledge-base";
import { knowledgeBaseCategories, knowledgeBaseContributionUrl } from "@/lib/knowledge-base";

type KnowledgeBaseIndexProps = {
  resources: readonly KnowledgeBaseResource[];
};

type ActiveFilter = (typeof knowledgeBaseCategories)[number];

const pageTexture =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCMuE71Y3O1zquCb2smbAJWk1oG13ARayvLuCd2fEDf1pw6d7jMtL9QV7UN2BZFMir59QjTSRvLwTPiaZjLzuoIwtENBa2cjiS3Yr47kedpQoVhcrvK2hBT7Z3LDvCzyW2auiSqMbjYopifUBuhPa3bT8jtU_ntnXYUaoLjKfUCXfdPostD5ZW8KyeR1eONzCXGd8zmw1TGYiRN5V4i-gtWkdkr4Wwpjh42Nfp1M2bMzQR9TuoXiFl6V32Qarkkfg6q8dC71gJasC0";
const contributionImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCEOq-V5btAwvEL_2jfdbsnLE_sA3lh4MOrYsDt-Yjv7-FRbZ3kLkQ3KDTralm7rH_6ikNuiv1o7nzr1Gxiwy7PnSxK-mWrBwvDJwUzJc9qgyEC6rlJw5CEjuHX-_4iOfnG-xrvG7c1mDs9d3TbUmZiMjTO7rxgnRGKquu_oevc0wamlz8yV40XRDvrYxrpRK-Y7rE39YCetxcK7hOHMZ3flyEB5Yo_4FuRNXjKCWpCqBMzbJC6OZsoIVHT2n4Zae0q6dDSpSuUS6Y";

export function KnowledgeBaseIndex({ resources }: KnowledgeBaseIndexProps) {
  const searchFieldId = useId();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("All");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const visibleResources = resources.filter((resource) => {
    if (activeFilter !== "All" && resource.category !== activeFilter) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchable = [
      resource.title,
      resource.summary,
      resource.kind,
      resource.source,
      resource.category,
      ...resource.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.015]"
        style={{
          backgroundImage: `url(${pageTexture})`,
        }}
      />

      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-32 sm:px-8">
        <section className="mb-20 text-center">
          <div className="font-label text-[10px] uppercase tracking-[0.28em] text-primary">Knowledge Base</div>
          <h1 className="mt-5 font-headline text-5xl font-light tracking-[-0.08em] text-on-surface sm:text-6xl lg:text-7xl">
            Knowledge Base
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
            A working shelf of research threads and external notes we want close while tracking post-quantum Ethereum work.
          </p>
        </section>

        <section className="mb-14">
          <div className="relative mx-auto max-w-2xl">
            <label htmlFor={searchFieldId} className="sr-only">
              Search the knowledge base
            </label>
            <Icon
              name="search"
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-outline"
            />
            <input
              id={searchFieldId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search threads and notes..."
              className="min-h-16 w-full border border-outline-variant/35 bg-surface-container-high pl-14 pr-6 text-xl tracking-[-0.03em] text-on-surface outline-none transition-colors placeholder:text-outline/60 focus:border-primary"
            />
          </div>
        </section>

        <section className="mb-10 border-b border-on-surface/5 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {knowledgeBaseCategories.map((category) => {
              const isActive = category === activeFilter;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={`border-b-2 pb-2 font-label text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-on-surface/40 hover:text-on-surface"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section aria-label="Knowledge base resources" className="space-y-0">
          {visibleResources.length ? (
            visibleResources.map((resource) => (
              <article
                key={resource.slug}
                className="group -mx-4 flex flex-col justify-between gap-8 px-4 py-10 transition-colors hover:bg-surface-container-low/60 md:flex-row md:items-baseline"
              >
                <div className="max-w-2xl">
                  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">{resource.kind}</span>
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">{resource.source}</span>
                  </div>

                  <h2 className="font-headline text-3xl font-normal leading-tight tracking-[-0.04em] text-on-surface transition-colors group-hover:text-primary sm:text-[2.1rem]">
                    {resource.title}
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant sm:text-[0.95rem] sm:leading-7">
                    {resource.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-label text-[10px] uppercase tracking-[0.18em] text-on-surface/42">
                    {resource.dateLabel ? <span>{resource.dateLabel}</span> : null}
                    {resource.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="md:pl-8">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.18em] text-on-surface transition-colors hover:text-secondary"
                  >
                    Open <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="font-headline text-3xl italic text-on-surface">No matches found</div>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-on-surface-variant">
                Try a broader search or switch back to all resources.
              </p>
            </div>
          )}
        </section>

        <section className="mt-20">
          <a
            href={knowledgeBaseContributionUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden bg-secondary p-10 text-white sm:p-14"
          >
            <div className="relative z-10 max-w-2xl [text-shadow:0_2px_14px_rgba(0,0,0,0.72)]">
              <span className="mb-4 block font-label text-xs font-bold uppercase tracking-[0.22em] text-[#fff6ea] opacity-95">
                Community Collaboration
              </span>
              <h2 className="mb-5 font-headline text-4xl font-semibold text-[#fffdf8] sm:text-[2.6rem]">
                Contribute Research
              </h2>
              <p className="max-w-xl text-sm leading-7 text-[#fff6ea] sm:text-base">
                Add a thread, paper, or public note we should keep in view as the post-quantum picture develops.
              </p>
              <div className="mt-8 flex w-fit items-center border-b border-white/90 pb-1 font-label text-sm font-bold uppercase tracking-[0.22em] text-white">
                Submit Research on GitHub <Icon name="arrow-up-right" className="ml-2 h-3.5 w-3.5" />
              </div>
            </div>

            <div className="absolute inset-0">
              <img
                alt=""
                aria-hidden="true"
                src={contributionImage}
                className="h-full w-full object-cover grayscale opacity-20 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.62)_44%,rgba(0,0,0,0.44)_100%)]" />
            </div>
          </a>
        </section>
      </main>

      <footer className="border-t border-outline-variant/25 bg-surface-container-high/45 px-6 py-12 sm:px-8">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-headline text-2xl font-black tracking-[-0.08em] text-on-surface">Knowledge Base</div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
                Research threads and outside references we keep on hand as the picture gets clearer.
              </p>
            </div>

          <div className="flex flex-wrap gap-5 font-label text-[10px] uppercase tracking-[0.22em] text-outline">
            <Link href="/">Overview</Link>
            <Link href="/registry">Registry</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
