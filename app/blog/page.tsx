import Link from "next/link";
import { SiteNavbar } from "@/components/site-navbar";
import { BlogNewsletterSignup } from "@/components/blog-newsletter-signup";
import { BlogPostCard } from "@/components/blog-post-card";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "PQBEAT Blog",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featuredPost] = posts;

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
        <header className="max-w-3xl">
          <div className="font-label text-[10px] uppercase tracking-[0.28em] text-primary">PQBEAT Blog</div>
          <h1 className="mt-5 font-headline text-5xl font-bold leading-[0.94] tracking-[-0.08em] text-on-surface sm:text-6xl">
            Weekly research notes on Ethereum quantum risk.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
            Short updates from PQBEAT on Ethereum readiness, migration work, and the evidence behind the registry.
          </p>
        </header>

        {featuredPost ? (
          <section className="mt-12">
            <BlogPostCard post={featuredPost} featured />
          </section>
        ) : null}
      </main>

      <footer className="border-t border-outline-variant/25 bg-surface-container-high/55 px-6 py-14 sm:px-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="max-w-3xl">
            <BlogNewsletterSignup
              compact
              title="Get the weekly PQBEAT note."
              description="A short weekly email when we publish a new brief or materially update registry coverage."
            />
          </div>

          <div className="mt-12 flex flex-col gap-6 border-t border-outline-variant/25 pt-10 sm:flex-row sm:items-end sm:justify-between">
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
        </div>
      </footer>
    </div>
  );
}
