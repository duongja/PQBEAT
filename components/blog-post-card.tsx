/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

type BlogPostCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex h-full flex-col overflow-hidden bg-surface-container-lowest transition-transform duration-200 hover:-translate-y-0.5 ${
        featured ? "lg:grid lg:grid-cols-[1.15fr_0.85fr]" : ""
      }`}
    >
      <div className={`overflow-hidden bg-surface-container-low ${featured ? "order-2 lg:order-1" : ""}`}>
        <img
          src={post.coverImage}
          alt={post.coverAlt}
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01] ${
            featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[100%]" : "aspect-[16/9]"
          }`}
        />
      </div>

      <div className={`flex flex-1 flex-col justify-between p-6 sm:p-7 ${featured ? "order-1 lg:order-2" : ""}`}>
        <div>
          <div className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">{post.category}</div>
          <h2
            className={`mt-3 font-headline font-semibold leading-tight tracking-[-0.05em] text-on-surface ${
              featured ? "text-4xl sm:text-5xl" : "text-2xl"
            }`}
          >
            {post.title}
          </h2>
          <p className={`mt-4 text-on-surface-variant ${featured ? "max-w-xl text-lg leading-8" : "text-sm leading-6"}`}>
            {post.excerpt}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
          <span>{post.author}</span>
          <span className="text-outline/70">/</span>
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
          <span className="text-outline/70">/</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
