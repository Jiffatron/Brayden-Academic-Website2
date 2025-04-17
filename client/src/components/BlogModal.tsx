// BlogModal.tsx
import { motion, AnimatePresence } from "framer-motion";

interface BlogModalProps {
  post: {
    title: string;
    date: string;
    content: string;
  };
  onClose: () => void;
}

const BlogModal = ({ post, onClose }: BlogModalProps) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
        <motion.div
          className="bg-background rounded-lg max-w-3xl w-full p-6 shadow-xl relative overflow-y-auto max-h-[90vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold font-serif mb-2">{post.title}</h2>
          <p className="text-sm text-muted-foreground mb-6">{post.date}</p>

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
