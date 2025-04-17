import { blogPosts } from "@/lib/data";
import { Link } from "react-router-dom";

const BlogLanding = () => {
  return (
    <main className="py-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-10">All Blog Posts</h1>
      <div className="grid gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="blog-card border-b pb-4">
            <p className="text-primary text-sm">{post.date}</p>
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-muted-foreground mb-3">{post.preview}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="text-primary text-sm hover:text-primary/80"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BlogLanding;
