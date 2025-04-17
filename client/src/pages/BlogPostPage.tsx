import { useParams } from "react-router-dom";
import { blogPosts } from "@/lib/data";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="p-12 text-center">Post not found.</div>;
  }

  return (
    <main className="py-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground mb-6 text-sm">{post.date}</p>
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
};

export default BlogPostPage;
