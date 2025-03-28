import { motion, AnimatePresence } from "framer-motion";
import { ProjectType } from "@/lib/data";

interface ProjectModalProps {
  project: ProjectType;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  // Close modal when escape key is pressed
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <motion.div
          className="absolute inset-0 bg-[hsl(var(--navy-dark))] bg-opacity-90 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        />
        
        <motion.div
          className="relative bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30
          }}
        >
          <button
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          
          <div className="p-6 md:p-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded mb-6"
            />
            <h2 className="text-2xl font-serif font-bold mb-4">{project.title}</h2>
            <div
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
