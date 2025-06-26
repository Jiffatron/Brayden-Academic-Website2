import { useState, useEffect } from "react";
import {
  HashRouter as Router,
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

import BlogLanding from "@/pages/BlogLanding";
import BlogPostPage from "@/pages/BlogPostPage";
import ProjectModal from "@/components/ProjectModal";
import { Toaster } from "@/components/ui/toaster";
import { ProjectType } from "@/lib/data";

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

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-[1920px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <>
                  <section id="hero">
                    <Hero />
                  </section>

                  <section id="about" className="scroll-mt-24">
                    <About />
                  </section>

                  <section id="research" className="scroll-mt-24">
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
            <Route path="/blog" element={<BlogLanding />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </AnimatePresence>

        <Footer />

        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </main>

      <Toaster />
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
