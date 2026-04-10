import { BlogArticlePage } from "@/components/blog-article-page";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";

const post = (() => {
  const article = getPostBySlug("post-quantum-readiness-ethereum");

  if (!article) {
    throw new Error("Missing required blog post: post-quantum-readiness-ethereum");
  }

  return article;
})();

const PostComponent = post.Component;

export const metadata = {
  title: `${post.title} | PQBEAT`,
  description: post.excerpt,
};

export default function QuantumRiskExplainerPage() {
  return (
    <BlogArticlePage post={post} relatedPosts={getRelatedPosts(post.slug)}>
      <PostComponent />
    </BlogArticlePage>
  );
}
