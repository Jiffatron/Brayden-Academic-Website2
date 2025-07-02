import { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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
        title: "Blog - Brayden Swavey | Financial Analysis & Programming Insights",
        description: "Insights on financial analysis, programming, and market research. Read about Monte Carlo simulations, investment strategies, technical analysis, and Python development.",
        url: "https://braydenswavey.com/blog",
        type: "website" as const,
        keywords: "financial blog, Monte Carlo simulation, investment analysis, Python programming, market research, technical analysis"
      };
    } else if (hash.startsWith('#/projects') || path.startsWith('/projects')) {
      return {
        title: "Projects Portfolio - Brayden Swavey | Financial Analysis & Development",
        description: "Explore my portfolio of financial analysis projects including Monte Carlo simulations, bond tracking systems, equity research, and Excel modeling tools. Python, VBA, and financial modeling expertise.",
        url: "https://braydenswavey.com/#/projects",
        type: "website" as const,
        keywords: "financial projects, Monte Carlo simulation, bond tracking, equity research, Excel modeling, Python projects, VBA development"
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
      return {
        title: `${projectId?.replace(/([A-Z])/g, ' $1').trim()} - Project Details | Brayden Swavey`,
        description: "Detailed breakdown of financial analysis project including methodology, implementation, and results. Explore the technical approach and insights gained.",
        url: `https://braydenswavey.com${hash || path}`,
        type: "article" as const,
        section: "Projects",
        publishedTime: new Date().toISOString()
      };
    }

    // Default homepage
    return {
      title: "Brayden Swavey - Financial Analyst & Developer Portfolio",
      description: "Financial analyst and developer specializing in Monte Carlo simulations, bond tracking, equity research, and data-driven investment tools. Explore my projects in Python, Excel modeling, and financial analysis.",
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

                  <section id="about" className="scroll-mt-24">
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
            <Route
              path="/projects/:id"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProjectPage />
                </Suspense>
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
