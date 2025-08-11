import { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import Resume from "@/components/Resume";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ProjectType } from "@/lib/data";
import SEOHead from "@/components/SEOHead";
import SEOTester from "@/components/SEOTester";
import ViewCountAdmin from "@/components/ViewCountAdmin";
import HomepageTableOfContents from "@/components/HomepageTableOfContents";
import MobileBottomNav from "@/components/MobileBottomNav";
import { FEATURES } from "@/config/features";

// Lazy load heavy components for better performance
const ProjectModal = lazy(() => import("@/components/ProjectModal"));
const BlogLanding = lazy(() => import("@/pages/BlogLanding"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const ProjectsLanding = lazy(() => import("@/pages/ProjectsLanding"));
const ProjectPage = lazy(() => import("@/pages/ProjectPage"));

// Loading component for Suspense fallbacks
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Separate component to manage route animations and modal integration
function AnimatedRoutes({
  darkMode,
  toggleDarkMode,
  isModalOpen,
  selectedProject,
  handleCloseModal,
  handleProjectClick,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isModalOpen: boolean;
  selectedProject: ProjectType | null;
  handleCloseModal: () => void;
  handleProjectClick: (project: ProjectType) => void;
}) {
  const location = useLocation();

  // Dynamic SEO based on current route
  const getSEOProps = () => {
    const path = location.pathname;
    const hash = location.hash;

    // Handle clean URLs
    if (hash === '#/blog' || path === '/blog') {
      return {
        title: "Blog - Brayden Swavey | Financial Analysis & Market Insights",
        description: "Deep dives into financial analysis, market research, and quantitative modeling. Explore Monte Carlo methods, investment strategies, and data-driven insights.",
        url: "https://braydenswavey.com/blog",
        type: "website" as const,
        keywords: "financial blog, Monte Carlo simulation, investment analysis, Python programming, market research, technical analysis",
        breadcrumbs: [
          { name: "Home", url: "https://braydenswavey.com/" },
          { name: "Blog", url: "https://braydenswavey.com/blog" }
        ]
      };
    } else if (hash === '#/projects' || path === '/projects') {
      return {
        title: "Projects - Brayden Swavey | Financial Modeling & Analysis Tools",
        description: "Portfolio of financial analysis projects: Monte Carlo simulations, bond tracking systems, equity research, and market microstructure models.",
        url: "https://braydenswavey.com/projects",
        type: "website" as const,
        keywords: "financial projects, Monte Carlo simulation, bond tracking, equity research, Excel modeling, Python projects, VBA development",
        breadcrumbs: [
          { name: "Home", url: "https://braydenswavey.com/" },
          { name: "Projects", url: "https://braydenswavey.com/projects" }
        ]
      };
    } else if (hash === '#/resume' || path === '/resume') {
      return {
        title: "Resume - Brayden Swavey | Finance Professional & Developer",
        description: "Professional background in finance and development. Experience in quantitative analysis, financial modeling, and data-driven investment tools.",
        url: "https://braydenswavey.com/resume",
        type: "website" as const,
        keywords: "resume, finance professional, quantitative analysis, financial modeling, developer, investment tools",
        breadcrumbs: [
          { name: "Home", url: "https://braydenswavey.com/" },
          { name: "Resume", url: "https://braydenswavey.com/resume" }
        ]
      };
    } else if (hash === '#/contact' || path === '/contact') {
      return {
        title: "Contact - Brayden Swavey | Get In Touch",
        description: "Connect with me for opportunities in finance, quantitative analysis, or development projects. Let's discuss financial modeling and market analysis.",
        url: "https://braydenswavey.com/contact",
        type: "website" as const,
        keywords: "contact, finance opportunities, quantitative analysis, financial modeling, collaboration",
        breadcrumbs: [
          { name: "Home", url: "https://braydenswavey.com/" },
          { name: "Contact", url: "https://braydenswavey.com/contact" }
        ]
      };
    } else if (hash === '#/contact' || path === '/contact') {
      return {
        title: "Contact - Brayden Swavey | Financial Analyst & Developer",
        description: "Get in touch with Brayden Swavey for financial analysis projects, consulting, or collaboration opportunities. Specializing in quantitative analysis and financial modeling.",
        url: "https://braydenswavey.com/#/contact",
        type: "website" as const,
        keywords: "contact Brayden Swavey, financial analyst contact, consulting, collaboration, quantitative analysis"
      };
    } else if (hash.startsWith('#/blog/') || path.startsWith('/blog/')) {
      // Individual blog post
      const slug = (hash || path).split('/').pop();
      return {
        title: `${slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Brayden Swavey Blog`,
        description: "In-depth analysis and insights on financial markets, programming, and quantitative research methodologies.",
        url: `https://braydenswavey.com${hash || path}`,
        type: "article" as const,
        section: "Financial Analysis",
        publishedTime: new Date().toISOString()
      };
    } else if (hash.startsWith('#/projects/') || path.startsWith('/projects/')) {
      // Individual project page
      const projectId = (hash || path).split('/').pop();

      // Flagship SEO mapping
      const SEO_MAP: Record<string, { title: string; description: string }> = {
        "bond-dashboard": {
          title: "Public Market Dashboard | issuer data and a simple risk tile",
          description: "Issuer data with a clear view and a simple risk tile.",
        },
        "market-microstructure": {
          title: "Market Microstructure Model | latency, depth, routing",
          description: "A sandbox that measures how latency, depth, and routing affect execution.",
        },
        "risk-engine": {
          title: "Risk Modeling Engine | scenario scoring",
          description: "A small library that turns scenarios into a single score.",
        },
      };

      const fallbackTitle = `${projectId?.replace(/([A-Z])/g, ' $1').trim()} - Project Details | Brayden Swavey`;
      const fallbackDescription = "Detailed breakdown of financial analysis project including methodology, implementation, and results. Explore the technical approach and insights gained.";
      const seo = (projectId && SEO_MAP[projectId]) || { title: fallbackTitle, description: fallbackDescription };

      return {
        title: seo.title,
        description: seo.description,
        url: `https://braydenswavey.com${hash || path}`,
        type: "article" as const,
        section: "Projects",
        publishedTime: new Date().toISOString()
      };
    }

    // Default homepage
    return {
      title: "Brayden Swavey – Finance, Markets & Modeling",
      description: "Exploring markets through data. From Monte Carlo simulations to bond trackers and equity research, I design tools that turn financial complexity into clear insights.",
      url: "https://braydenswavey.com/",
      type: "website" as const,
      keywords: "Brayden Swavey, financial analyst, developer, Monte Carlo simulation, bond tracking, equity research, Python, financial modeling, portfolio"
    };
  };

  return (
    <>
      <SEOHead {...getSEOProps()} />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-[1920px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <>
                  <HomepageTableOfContents enabled={FEATURES.homepageTableOfContents} />
                  <section id="hero">
                    <Hero />
                  </section>

                  <section id="about" className="scroll-mt-24 mb-32">
                    <About />
                  </section>

                  <section id="projects" className="scroll-mt-24">
                    <Research onProjectClick={handleProjectClick} />
                  </section>

                  <section id="resume" className="scroll-mt-24">
                    <Resume />
                  </section>

                  <section id="blog" className="scroll-mt-24">
                    <Blog />
                  </section>

                  <section id="contact" className="scroll-mt-24">
                    <Contact />
                  </section>
                </>
              }
            />
            <Route
              path="/blog"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <BlogLanding />
                </Suspense>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <BlogPostPage />
                </Suspense>
              }
            />
            <Route
              path="/projects"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProjectsLanding />
                </Suspense>
              }
            />
            {/* 301 Redirects for old project URLs */}
            <Route path="/projects/BondTracker" element={<Navigate to="/projects/bond-dashboard" replace />} />
            <Route path="/projects/RiskModelingEngine" element={<Navigate to="/projects/risk-engine" replace />} />
            <Route path="/projects/MarketMicrostructureModel" element={<Navigate to="/projects/market-microstructure" replace />} />
            <Route path="/projects/ComplexSystemsVisualizationExcel" element={<Navigate to="/projects/mandelbrot-excel" replace />} />
            <Route path="/projects/human-psychology-of-finance" element={<Navigate to="/blog/human-psychology-of-finance" replace />} />
            <Route
              path="/projects/:id"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProjectPage />
                </Suspense>
              }
            />
            <Route
              path="/resume"
              element={
                <motion.main
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="py-20 px-6 max-w-6xl mx-auto"
                >
                  <Resume />
                </motion.main>
              }
            />
            <Route
              path="/contact"
              element={
                <motion.main
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="py-20 px-6 max-w-6xl mx-auto"
                >
                  <Contact />
                </motion.main>
              }
            />
          </Routes>
        </AnimatePresence>

        <Footer />

        {isModalOpen && selectedProject && (
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectModal project={selectedProject} onClose={handleCloseModal} />
          </Suspense>
        )}
      </main>

      <MobileBottomNav />
      <Toaster />
      {FEATURES.seoTester && <SEOTester />}
      {FEATURES.adminPortal && <ViewCountAdmin />}
    </>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  const handleProjectClick = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Router>
        <AnimatedRoutes
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isModalOpen={isModalOpen}
          selectedProject={selectedProject}
          handleCloseModal={handleCloseModal}
          handleProjectClick={handleProjectClick}
        />
      </Router>
    </div>
  );
}

export default App;
