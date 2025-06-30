import { useParams, Link } from "react-router-dom";
import { projects } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import ViewCount from "@/components/ViewCount";
import LastUpdated from "@/components/LastUpdated";
import TableOfContents from "@/components/TableOfContents";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxContainer from "@/components/ParallaxContainer";
import GiscusComments from "@/components/GiscusComments";
import { useSessionTracking, useDownloadTracking, useCodeTracking } from "@/hooks/useFirebaseTracking";

const ProjectPage = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Firebase tracking hooks
  useSessionTracking(project?.id);
  const { trackDownloadClick } = useDownloadTracking(project?.id);
  const { trackCopyClick } = useCodeTracking(project?.id);

  // Define table of contents sections for each project
  const tocSections = {
    'monte-carlo': [
      { id: 'abstract', title: 'Foundation & Abstract', level: 1 },
      { id: 'methodology', title: 'Abstract Details', level: 2 },
      { id: 'simulation', title: 'Statistical Significance', level: 1 },
      { id: 'results', title: 'Rationale & Methodology', level: 1 },
      { id: 'conclusion', title: 'Future Implementation', level: 1 },
      { id: 'python-part1', title: 'Python Code: Part 1', level: 1 },
      { id: 'python-part2', title: 'Python Code: Part 2', level: 1 },
      { id: 'python-part3', title: 'Python Code: Part 3', level: 1 }
    ],
    'BondTracker': [
      { id: 'overview', title: 'Overview', level: 1 },
      { id: 'features', title: 'Features', level: 1 },
      { id: 'implementation', title: 'Implementation', level: 1 },
      { id: 'results', title: 'Results', level: 1 }
    ]
  };

  const currentTocSections = tocSections[id as keyof typeof tocSections] || [];

  // Function to process content and replace expandable image placeholders
  const processContent = (content: string) => {
    return content.replace(
      /<div class="expandable-image" data-src="([^"]*)" data-alt="([^"]*)"><\/div>/g,
      (_, src, alt) => {
        return `<div class="expandable-image-placeholder" data-src="${src}" data-alt="${alt}"></div>`;
      }
    );
  };

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

  // Add copy to clipboard functionality and scroll reveal animations
  useEffect(() => {
    // Add global copy function
    (window as any).copyToClipboard = (elementId: string) => {
      const element = document.getElementById(elementId);
      if (element) {
        const text = element.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          // Track copy event
          trackCopyClick(elementId);

          // Show success feedback
          const button = element.parentElement?.querySelector('button');
          if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check mr-1"></i>Copied!';
            button.classList.add('bg-green-600');
            setTimeout(() => {
              button.innerHTML = originalText;
              button.classList.remove('bg-green-600');
            }, 2000);
          }
        }).catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        });
      }
    };

    // Initialize scroll reveal animations for Monte Carlo images
    const initializeScrollRevealAnimations = () => {
      const scrollRevealImages = document.querySelectorAll('.scroll-reveal-image');

      scrollRevealImages.forEach((element, index) => {
        const direction = element.getAttribute('data-direction') || 'up';
        const delay = parseFloat(element.getAttribute('data-delay') || '0');

        // Add CSS classes for smooth animations
        element.classList.add('scroll-reveal-element');

        // Set initial state with slower, more refined animations
        (element as HTMLElement).style.opacity = '0';
        (element as HTMLElement).style.transform = getInitialTransform(direction);
        (element as HTMLElement).style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        (element as HTMLElement).style.transitionDelay = `${delay + 0.2}s`; // Add base delay for more staggered effect
      });
    };

    // Helper function to get initial transform based on direction
    const getInitialTransform = (direction: string) => {
      switch (direction) {
        case 'left': return 'translateX(-30px)';
        case 'right': return 'translateX(30px)';
        case 'up': return 'translateY(30px)';
        case 'down': return 'translateY(-30px)';
        case 'scale': return 'scale(0.9)';
        default: return 'translateY(30px)';
      }
    };

    // Initialize animations after content loads
    const timer = setTimeout(() => {
      initializeScrollRevealAnimations();

      // Set up intersection observer for scroll reveal
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) translateY(0) scale(1)';
            observer.unobserve(element); // Only animate once
          }
        });
      }, {
        threshold: 0.2, // Higher threshold for more deliberate timing
        rootMargin: '100px' // Larger margin for earlier animation start
      });

      // Observe all scroll reveal elements
      document.querySelectorAll('.scroll-reveal-element').forEach(el => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 100);

    return () => {
      delete (window as any).copyToClipboard;
      clearTimeout(timer);
    };
  }, [project]);







  // Handle expandable images after content is rendered
  useEffect(() => {
    if (contentRef.current) {
      const placeholders = contentRef.current.querySelectorAll('.expandable-image-placeholder');
      placeholders.forEach((placeholder) => {
        const src = placeholder.getAttribute('data-src');
        const alt = placeholder.getAttribute('data-alt');
        if (src && alt) {
          // Create expandable image element
          const imageContainer = document.createElement('div');
          imageContainer.className = 'expandable-image-container';
          imageContainer.innerHTML = `
            <div class="relative rounded-lg overflow-hidden shadow-md cursor-pointer group transition-transform duration-200 hover:scale-105">
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-black/90 rounded-full p-3 shadow-lg transition-opacity duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-800 dark:text-gray-200">
                    <polyline points="15,3 21,3 21,9" />
                    <polyline points="9,21 3,21 3,15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </div>
              </div>

              <img src="${src}" alt="${alt}" class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
          `;

          // Add click handler for modal
          imageContainer.addEventListener('click', () => {
            openImageModal(src, alt);
          });

          placeholder.replaceWith(imageContainer);
        }
      });
    }
  }, [project]);

  const openImageModal = (src: string, alt: string) => {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm';
    modal.innerHTML = `
      <div class="relative max-w-[95vw] max-h-[95vh] bg-card rounded-lg shadow-2xl overflow-hidden">
        <button class="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors" onclick="this.closest('.fixed').remove(); document.body.style.overflow = 'auto';">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <img src="${src}" alt="${alt}" class="w-full h-full object-contain" style="max-width: 95vw; max-height: 95vh;" />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p class="text-white text-sm font-medium">${alt}</p>
        </div>
      </div>
    `;

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
      }
    });

    // Close on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    document.body.style.overflow = 'hidden';
    document.body.appendChild(modal);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!project) {
    return (
      <div className="py-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Link
          to="/projects"
          className="inline-block mt-4 text-primary text-md border border-transparent hover:border-primary px-4 py-2 rounded transition"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <>
      <ScrollProgress />
      <TableOfContents sections={currentTocSections} />
      <motion.main
        id="top"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-20 px-6 max-w-7xl mx-auto relative"
      >
        {/* Navigation */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start">
          <Link
            to="/projects"
            className="inline-block text-primary text-md border border-transparent hover:border-primary px-4 py-2 rounded transition"
          >
            ← Back to Projects
          </Link>
          <Link
            to="/"
            className="inline-block text-primary text-md border border-transparent hover:border-primary px-4 py-2 rounded transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 text-center">
            {project.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <ViewCount projectId={project.id} recordView={true} />
            <LastUpdated />
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-6 flex-wrap justify-center">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-secondary rounded-full text-sm text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project Image */}
          <div className="relative overflow-hidden rounded-lg mb-8 shadow-lg max-w-4xl mx-auto">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-dark))] to-transparent opacity-40" />
          </div>

          {/* Description */}
          <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Content */}
        <div
          ref={contentRef}
          className="prose dark:prose-invert max-w-none text-[1.20rem] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processContent(project.content) }}
        />

        {/* PDF Actions */}
        {project.pdfUrl && (
          <div className="mt-12 p-6 bg-card rounded-lg border border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-xl font-medium mb-4 text-center">Project Resources</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={project.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary/10 border border-primary/30 rounded-md text-primary hover:bg-primary/20 transition-colors shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                View PDF
              </a>
              <a
                href={project.pdfUrl}
                download
                onClick={() => trackDownloadClick(project.pdfUrl?.split('/').pop() || 'project.pdf')}
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary border border-primary/30 rounded-md text-primary hover:bg-secondary/80 transition-colors shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="max-w-4xl mx-auto">
          <GiscusComments
            repo="Jiffatron/Brayden-Academic-Website2"
            repoId="R_kgDOOQeojA"
            category="General"
            categoryId="DIC_kwDOOQeojM4CsRa9"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme="preferred_color_scheme"
            lang="en"
          />
        </div>
      </motion.main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"/>
              <polyline points="5,12 12,5 19,12"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectPage;
