import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import ProjectModal from "@/components/ProjectModal";
import Resume from "@/components/Resume";
import Blog from "@/components/Blog";
import BlogPostPage from "@/pages/BlogPostPage";
import BlogLanding from "@/pages/BlogLanding";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ProjectType } from "@/lib/data";

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
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (isModalOpen && selectedProject?.hasPreview) {
      const previewBtn = document.querySelector(".view-preview-btn");
      if (previewBtn) {
        previewBtn.addEventListener("click", () => {
          const container = document.querySelector(".view-preview-btn-container");
          if (container) {
            container.dispatchEvent(new Event("click"));
          }
        });
      }
    }
  }, [isModalOpen, selectedProject]);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Router>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Research onProjectClick={handleProjectClick} />
                <Resume />
                <Blog />
                <Contact />
              </>
            }
          />
          <Route path="/blog" element={<BlogLanding />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>

        <Footer />

        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}

        <Toaster />
      </Router>
    </div>
  );
}

export default App;
