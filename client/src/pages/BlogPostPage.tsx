import { useParams } from "react-router-dom";
import { blogPosts } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Show button when user is 75% or more down the page
      setShowScrollTop(scrollY + windowHeight >= scrollHeight * 0.75);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!post) {
    return (
      <div className="py-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-20 px-6 max-w-7xl mx-auto relative"
      >
        <p className="text-primary text-lg mb-4 text-center">{post.date}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-10 text-center">
          {post.title}
        </h1>
        <div
          className="prose dark:prose-invert max-w-none text-[1.20rem] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            className="fixed bottom-20 right-40 bg-primary text-white px-8 py-3 rounded-lg shadow-lg hover:bg-primary/80 transition"
          >
            ↑ Back to Top
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogPostPage;
