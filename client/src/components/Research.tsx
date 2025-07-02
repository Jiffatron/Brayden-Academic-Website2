import { motion } from "framer-motion";
import { useAdaptiveIntersection } from "@/hooks/useAdaptiveIntersection";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { projects, interests, ProjectType } from "@/lib/data";
import {
  containerVariants,
  itemVariants,
  cardHoverVariants
} from "@/lib/animations";


interface ResearchProps {
  onProjectClick: (project: ProjectType) => void;
}

const Research = ({ onProjectClick }: ResearchProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isIntersecting: isVisible, animationDuration } = useAdaptiveIntersection(sectionRef, { threshold: 0.1 });
  const navigate = useNavigate();

  // Using centralized animation variants for consistency

  return (
    <section
      ref={sectionRef}
      className="mobile-section mobile-container md:px-16 lg:px-24"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2
          className="section-title"
          variants={itemVariants}
        >
          Projects
        </motion.h2>

        {/* Desktop Description */}
        <motion.p
          className="hidden md:block section-description"
          variants={itemVariants}
        >
         A showcase of my research and applied projects focused on building systems that make financial data clearer, faster, and more actionable.
         These efforts blend financial analysis, parsing automation, and macro-strategic thinking — drawing from both public-sector
         datasets and private-market frameworks. Each project is an attempt to reduce complexity and enhance decision-making at the
         intersection of markets, technology, and capital.
        </motion.p>

        {/* Mobile Description */}
        <motion.p
          className="md:hidden text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
         Building systems that make financial data clearer and more actionable.
        </motion.p>

        {/* Desktop Project Cards - Original Style */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
        >
          {projects
            .sort((a, b) => a.position - b.position)
            .slice(0, 4)
            .map((project) => (
            <motion.div
              key={project.id}
              className="bg-card rounded-lg overflow-hidden shadow-md project-card animate-gpu"
              variants={itemVariants}
              whileHover={cardHoverVariants.hover}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    className="text-primary flex items-center text-sm hover:text-primary/80 transition-colors"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <span>View Project</span>
                    <i className="fas fa-external-link-alt ml-2"></i>
                  </button>
                  <button
                    className="text-primary flex items-center text-sm hover:text-primary/80 transition-colors"
                    onClick={() => onProjectClick(project)}
                  >
                    <span>Quick View</span>
                    <i className="fas fa-eye ml-2"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Project Cards - Visual Style */}
        <motion.div
          className="md:hidden grid grid-cols-1 gap-6 mb-12"
          variants={containerVariants}
        >
          {projects
            .sort((a, b) => a.position - b.position)
            .slice(0, 4)
            .map((project) => (
            <motion.div
              key={project.id}
              className="bg-card rounded-2xl overflow-hidden shadow-lg project-card animate-gpu cursor-pointer"
              variants={itemVariants}
              whileHover={cardHoverVariants.hover}
              onClick={() => onProjectClick(project)}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/90 text-sm line-clamp-2">
                    {project.description.split('.')[0]}.
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {project.tags[0]}
                  </span>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mb-16 text-center" variants={itemVariants}>
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded hover:bg-primary hover:bg-opacity-10 transition-all duration-300"
          >
            <span>View All Projects</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </motion.div>

        <motion.h2
          className="section-title"
          variants={itemVariants}
        >
          Academic Interests
        </motion.h2>

        <motion.p
          className="section-text mb-8 max-w-3xl"
          variants={itemVariants}
        >
          My work explores the intersection of market psychology, data systems, and capital strategy — blending foundational 
          theory with applied modeling. While rooted in academic finance, my focus has shifted toward building tools and frameworks 
          that enhance investment decisions across both public disclosures and private-market reporting.
          I aim to bridge conceptual models with real-world execution — turning financial insights into actionable, scalable systems.
        </motion.p>

        {/* Desktop Interests - All 6 */}
        <motion.div
          className="hidden md:grid md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              className="bg-card p-6 rounded-lg shadow-md project-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-primary text-3xl mb-4">
                <i className={interest.icon}></i>
              </div>
              <h4 className="text-lg font-medium mb-2">{interest.title}</h4>
              <p className="text-muted-foreground text-sm">
                {interest.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Interests - Only 3, Compact Design */}
        <motion.div
          className="md:hidden grid grid-cols-1 gap-4 max-w-sm mx-auto"
          variants={containerVariants}
        >
          {interests.slice(0, 3).map((interest, index) => (
            <motion.div
              key={index}
              className="bg-card p-4 rounded-lg shadow-md flex items-center space-x-4"
              variants={itemVariants}
              whileHover={{ y: -2 }}
            >
              <div className="text-primary text-2xl flex-shrink-0">
                <i className={interest.icon}></i>
              </div>
              <h4 className="text-base font-medium">{interest.title}</h4>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Research;
