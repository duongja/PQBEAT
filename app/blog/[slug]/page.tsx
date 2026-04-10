import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog-article-page";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | PQBEAT Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const PostComponent = post.Component;

  return (
    <BlogArticlePage post={post} relatedPosts={getRelatedPosts(slug)}>
      <PostComponent />
    </BlogArticlePage>
  );
}
