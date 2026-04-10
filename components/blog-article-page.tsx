/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import Link from "next/link";
import { SiteNavbar } from "@/components/site-navbar";
import { BlogNewsletterSignup } from "@/components/blog-newsletter-signup";
import { BlogPostCard } from "@/components/blog-post-card";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

type BlogArticlePageProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
  children: ReactNode;
};

export function BlogArticlePage({ post, relatedPosts, children }: BlogArticlePageProps) {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(https://lh3.googleusercontent.com/aida-public/AB6AXuCMuE71Y3O1zquCb2smbAJWk1oG13ARayvLuCd2fEDf1pw6d7jMtL9QV7UN2BZFMir59QjTSRvLwTPiaZjLzuoIwtENBa2cjiS3Yr47kedpQoVhcrvK2hBT7Z3LDvCzyW2auiSqMbjYopifUBuhPa3bT8jtU_ntnXYUaoLjKfUCXfdPostD5ZW8KyeR1eONzCXGd8zmw1TGYiRN5V4i-gtWkdkr4Wwpjh42Nfp1M2bMzQR9TuoXiFl6V32Qarkkfg6q8dC71gJasC0)",
        }}
      />

      <SiteNavbar />

      <main className="relative z-10 mx-auto max-w-screen-xl px-6 pb-24 pt-28 sm:px-8">
        <header className="mx-auto max-w-4xl text-center">
          <Link
            href="/blog"
            className="font-label text-[10px] uppercase tracking-[0.28em] text-primary transition-colors hover:text-primary/80"
          >
            PQBEAT Blog / {post.category}
          </Link>

          <h1 className="mt-5 font-headline text-5xl font-bold leading-[0.94] tracking-[-0.08em] text-on-surface sm:text-6xl">
            {post.title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-on-surface-variant">{post.excerpt}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
            <span>{post.author}</span>
            <span className="text-outline/70">/</span>
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            <span className="text-outline/70">/</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <figure className="mx-auto mt-10 max-w-5xl overflow-hidden bg-surface-container-low">
          <img src={post.coverImage} alt={post.coverAlt} className="h-full w-full object-cover" />
        </figure>

        {post.highlights?.length ? (
          <section className="mx-auto mt-10 max-w-3xl bg-surface-container-low px-6 py-6 sm:px-8">
            <div className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">Key takeaways</div>
            <ul className="mt-5 space-y-3">
              {post.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-on-surface-variant">
                  <span className="mt-2 h-1.5 w-1.5 bg-secondary" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <article className="mx-auto mt-12 max-w-3xl space-y-8">{children}</article>

        <section className="mx-auto mt-16 max-w-3xl space-y-10">
          {post.sources?.length ? (
            <div className="bg-surface-container-low px-6 py-6 sm:px-8">
              <div className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">Sources</div>
              <div className="mt-5 space-y-3">
                {post.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm leading-6 text-on-surface-variant underline decoration-outline-variant underline-offset-4 transition-colors hover:text-primary"
                  >
                    {source.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <BlogNewsletterSignup
            compact
            title="Get the weekly PQBEAT note."
            description="A short weekly email when we publish a new brief or materially update registry coverage."
          />
        </section>

        {relatedPosts.length ? (
          <section className="mt-24">
            <div className="mb-8 font-label text-[10px] uppercase tracking-[0.24em] text-primary">Related research</div>
            <div className="grid gap-6 lg:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <footer className="border-t border-outline-variant/25 bg-surface-container-high/55 px-6 py-14 sm:px-8">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-headline text-2xl font-black tracking-[-0.08em] text-on-surface">PQBEAT Blog</div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
              Notes from PQBEAT on Ethereum readiness, migration work, and the evidence behind the registry.
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
