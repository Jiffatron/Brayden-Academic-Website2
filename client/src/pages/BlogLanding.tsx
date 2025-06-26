import { blogPosts } from "@/lib/data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogLanding = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-20 px-6 max-w-6xl mx-auto"
    >
      <h1 className="text-3xl font-serif font-bold mb-2">All Blog Posts</h1>

      <Link
        to="/"
        className="inline-block mb-10 text-primary text-md border border-transparent hover:border-primary px-4 py-2 rounded transition"
      >
        ← Back to Home
      </Link>

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
    </motion.main>
  );
};

export default BlogLanding;
