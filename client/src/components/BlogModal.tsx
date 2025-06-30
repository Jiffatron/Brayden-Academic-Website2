// BlogModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface BlogModalProps {
  post: {
    title: string;
    date: string;
    content: string;
    slug: string;
  };
  onClose: () => void;
}

const BlogModal = ({ post, onClose }: BlogModalProps) => {
  const navigate = useNavigate();

  const handleReadFullArticle = () => {
    onClose(); // Close the modal first
    navigate(`/blog/${post.slug}`); // Navigate to full article
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 dark:bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          className="bg-background rounded-lg max-w-3xl w-full p-6 shadow-xl relative overflow-y-auto max-h-[90vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
        >
          {/* Header with buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold font-serif mb-2 pr-4">{post.title}</h2>
              <p className="text-sm text-muted-foreground">{post.date}</p>
            </div>

            <div className="flex items-center gap-3 sm:ml-4 flex-shrink-0">
              {/* Read Full Article Button */}
              <motion.button
                onClick={handleReadFullArticle}
                className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium shadow-md"
                title="Open full article in dedicated page"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 sm:mr-2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                <span className="hidden sm:inline">Read Full Article</span>
                <span className="sm:hidden">Full Article</span>
              </motion.button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-secondary transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BlogModal;
