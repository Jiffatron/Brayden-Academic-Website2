import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectType, projects } from "@/lib/data"

interface ProjectModalProps {
  project: ProjectType
  onClose: () => void
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose()
    }
  }

  const handleViewInBrowser = () => {
    if (project.pdfUrl) {
      setShowPdfPreview(true)
    }
  }

  const handleDownloadPdf = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!project.pdfUrl) {
      e.preventDefault()
      alert("PDF is not available at this moment. Please check back later.")
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <motion.div
          className="absolute inset-0 bg-[hsl(var(--navy-dark))] bg-opacity-75 backdrop-blur-md"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        />

        <motion.div
          className="relative glass-card rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4 border border-primary/20"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <button
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="p-6 md:p-8 max-h-[calc(90vh-3rem)] overflow-y-auto">
            {showPdfPreview && project.pdfUrl ? (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">{project.title}</h2>
                <button
                  onClick={() => setShowPdfPreview(false)}
                  className="mb-4 px-4 py-2 bg-primary/10 border border-primary/30 rounded-md text-primary hover:bg-primary/20 transition-colors flex items-center gap-2 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back to Details
                </button>
                <iframe
                  src={project.pdfUrl}
                  className="w-full h-[70vh] border border-primary/20 rounded-lg shadow-lg"
                  title={`${project.title} PDF`}
                />
              </div>
            ) : (
              <>
                <div className="relative overflow-hidden rounded-lg mb-6 shadow-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-dark))] to-transparent opacity-40" />
                </div>

                <h2 className="text-2xl font-serif font-bold mb-4">{project.title}</h2>

                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />

                {project.hasPreview && project.pdfUrl && (
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      onClick={handleViewInBrowser}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors flex items-center gap-2 shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      View in Browser
                    </button>
                    <a
                      href={project.pdfUrl}
                      download
                      className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-md text-primary hover:bg-primary/20 transition-colors flex items-center gap-2 shadow-md"
                      onClick={handleDownloadPdf}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                )}

                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4">Other Projects</h3>
                  <div className="overflow-x-auto">
                    <div className="inline-flex gap-4 px-1 py-2 min-w-full">
                      {projects.filter((p) => p.id !== project.id).map((p, i) => (
                        <div
                          key={i}
                          className="w-[300px] flex-shrink-0 bg-background border border-border rounded-lg shadow-md overflow-hidden"
                        >
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {p.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ProjectModal
