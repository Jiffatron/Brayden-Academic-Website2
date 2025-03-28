import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import ProjectModal from "@/components/ProjectModal";
import Resume from "@/components/Resume";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ProjectType } from "@/lib/data";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  // Handle opening project modal
  const handleProjectClick = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Handle closing project modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply theme class to body
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  // Add event listeners to preview buttons when modal is opened
  useEffect(() => {
    if (isModalOpen && selectedProject?.hasPreview) {
      const previewBtn = document.querySelector('.view-preview-btn');
      if (previewBtn) {
        previewBtn.addEventListener('click', () => {
          const container = document.querySelector('.view-preview-btn-container');
          if (container) {
            container.dispatchEvent(new Event('click'));
          }
        });
      }
    }
  }, [isModalOpen, selectedProject]);

  return (
    <div className={`${darkMode ? 'dark' : 'light'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Research onProjectClick={handleProjectClick} />
        <Resume />
        <Blog />
        <Contact />
      </main>
      <Footer />
      {isModalOpen && selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={handleCloseModal} 
        />
      )}
      <Toaster />
    </div>
  );
}

export default App;
