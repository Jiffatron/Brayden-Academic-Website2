import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { blogPosts } from "@/lib/data";
import BlogModal from "./BlogModal";
import type { BlogPostType } from "@/lib/data";

const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [activePost, setActivePost] = useState<BlogPostType | null>(null);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="pt-0 pb-12 md:pt-16 md:pb-16 mobile-container md:px-16 lg:px-24"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2
          className="section-title"
          variants={itemVariants}
        >
          Blog
        </motion.h2>

        {/* Desktop Blog Layout - Original */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="group blog-card"
              variants={itemVariants}
              whileHover={{ x: 8 }}
            >
              <div className="text-primary text-sm font-medium mb-2">
                {post.date}
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4">{post.preview}</p>
              <button
                onClick={() => setActivePost(post)}
                className="text-primary flex items-center text-sm hover:text-primary/80 transition-colors"
              >
                <span>Read More</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Blog Layout - Visual Cards */}
        <motion.div
          className="md:hidden grid grid-cols-1 gap-6"
          variants={containerVariants}
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              onClick={() => setActivePost(post)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-primary text-xs font-medium bg-primary/10 px-2 py-1 rounded-full">
                  {post.date}
                </span>
                <i className="fas fa-arrow-right text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3">{post.preview}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-12 text-center" variants={itemVariants}>
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded hover:bg-primary hover:bg-opacity-10 transition-all duration-300"
          >
            <span>View All Posts</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </motion.div>

        {activePost && (
          <BlogModal post={activePost} onClose={() => setActivePost(null)} />
        )}
      </motion.div>
    </section>
  );
};

export default Blog;
