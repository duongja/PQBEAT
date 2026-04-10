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
            One clear brief on where quantum risk shows up in Ethereum.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
            We&apos;re keeping the blog narrow for now. This first piece explains the model behind PQBEAT and the parts
            of the Ethereum stack we track in the registry.
          </p>
        </header>

        <section className="mt-10 max-w-3xl">
          <BlogNewsletterSignup
            title="Receive PQBEAT’s weekly blog updates."
            description="Get a short weekly email when we publish a new brief or make a meaningful update to the registry."
          />
        </section>

        {featuredPost ? (
          <section className="mt-12">
            <BlogPostCard post={featuredPost} featured />
          </section>
        ) : null}

        <section className="mt-16 max-w-3xl border-t border-outline-variant/25 pt-8">
          <div className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">Why one article</div>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant sm:text-base">
            We&apos;re not trying to fill a blog roll yet. One careful piece that explains the framework is more useful
            than a handful of posts repeating the same ideas with different wording.
          </p>
        </section>
      </main>
    </div>
  );
}
