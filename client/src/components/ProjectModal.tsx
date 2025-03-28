import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectType } from "@/lib/data";

interface ProjectModalProps {
  project: ProjectType;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  
  // Close modal when escape key is pressed
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleViewInBrowser = () => {
    if (project.pdfUrl) {
      setShowPdfPreview(true);
    }
  };

  const handleDownloadPdf = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!project.pdfUrl) {
      e.preventDefault();
      alert("PDF is not available at this moment. Please check back later.");
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
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="p-6 md:p-8">
            {showPdfPreview && project.pdfUrl ? (
              <div className="pdf-viewer">
                <h2 className="text-2xl font-serif font-bold mb-4">{project.title}</h2>
                <div className="mb-4 flex justify-between items-center">
                  <button 
                    onClick={() => setShowPdfPreview(false)}
                    className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Details
                  </button>
                  <a 
                    href={project.pdfUrl} 
                    download
                    className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                    onClick={handleDownloadPdf}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download PDF
                  </a>
                </div>
                <iframe
                  src={project.pdfUrl}
                  className="w-full h-[70vh] border border-border rounded"
                  title={`${project.title} PDF`}
                ></iframe>
              </div>
            ) : (
              <>
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
                
                {project.hasPreview && project.pdfUrl && (
                  <div 
                    className="view-preview-btn-container" 
                    onClick={handleViewInBrowser}
                  >
                    {/* The view-preview-btn class is used to attach event listeners for preview */}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
