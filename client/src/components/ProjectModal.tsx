import { useEffect, useRef, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectType, projects } from "@/lib/data"

interface ProjectModalProps {
  project: ProjectType
  onClose: () => void
}

const PAGE_SIZE = 4                     // 4 cards per “page”

const fadeSlide = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [showPdf, setShowPdf] = useState(false)
  const [page, setPage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Break all *other* projects into pages of four
  const otherProjects = useMemo(
    () => projects.filter(p => p.id !== project.id),
    [project.id]
  )
  const pages = useMemo(
    () => Array.from({ length: Math.ceil(otherProjects.length / PAGE_SIZE) },
      (_, i) => otherProjects.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE)),
    [otherProjects]
  )
  const current = pages[page] ?? []

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  /* ---------- handlers ---------- */
  const closeOnEsc = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose()
  }

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!project.pdfUrl) {
      e.preventDefault()
      alert("PDF is not available at this moment. Please check back later.")
    }
  }

  /* ---------- render ---------- */
  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        tabIndex={-1}
        onKeyDown={closeOnEsc}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* overlay */}
        <motion.div
          className="absolute inset-0 bg-background/80 dark:bg-[hsl(var(--navy-dark))] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />

        {/* modal */}
        <motion.div
          className="relative glass-card rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4 border border-primary/20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        >
          {/* close button */}
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* body */}
          <div className="p-6 md:p-8">
            {/* PDF preview */}
            {showPdf && project.pdfUrl ? (
              <>
                <h2 className="text-2xl font-serif font-bold mb-4">{project.title}</h2>
                <button
                  onClick={() => setShowPdf(false)}
                  className="mb-4 px-4 py-2 bg-primary/10 border border-primary/30 rounded-md text-primary hover:bg-primary/20 transition-colors flex items-center gap-2"
                >
                  ← Back to Details
                </button>
                <iframe
                  src={project.pdfUrl}
                  title={`${project.title} PDF`}
                  className="w-full h-[70vh] border border-primary/20 rounded-lg shadow-lg"
                />
              </>
            ) : (
              <>
                {/* hero */}
                <div className="relative rounded-lg mb-6 shadow-lg overflow-hidden">
                  <img src={project.image} alt={project.title}
                       className="w-full h-48 object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-dark))] to-transparent opacity-40" />
                </div>

                <h2 className="text-2xl font-serif font-bold mb-4">{project.title}</h2>

                <div
                  dangerouslySetInnerHTML={{ __html: project.content }}
                  className="prose prose-sm max-w-none dark:prose-invert"
                />

                {project.hasPreview && project.pdfUrl && (
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      onClick={() => setShowPdf(true)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors flex items-center gap-2 shadow-md"
                    >
                      👁 View in Browser
                    </button>
                    <a
                      href={project.pdfUrl}
                      download
                      onClick={handleDownload}
                      className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-md text-primary hover:bg-primary/20 transition-colors flex items-center gap-2 shadow-md"
                    >
                      ⇣ Download PDF
                    </a>
                  </div>
                )}

                {/* other projects */}
                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4">Other Projects</h3>

                  {/* nav */}
                  <div className="flex justify-between mb-2">
                    <button
                      disabled={page === 0}
                      onClick={() => setPage(p => p - 1)}
                      className="px-3 py-1 rounded disabled:opacity-30 border"
                    >
                      ← Prev
                    </button>
                    <button
                      disabled={page >= pages.length - 1}
                      onClick={() => setPage(p => p + 1)}
                      className="px-3 py-1 rounded disabled:opacity-30 border"
                    >
                      Next →
                    </button>
                  </div>

                  {/* animated page of cards */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={page}               // forces re‑mount on page change
                      variants={fadeSlide}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.25 }}
                      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                      {current.map(p => (
                        <div
                          key={p.id}
                          className="bg-background border border-border rounded-lg shadow-md overflow-hidden"
                        >
                          <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
                          <div className="p-4">
                            <h4 className="text-lg font-semibold mb-1">{p.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {p.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
