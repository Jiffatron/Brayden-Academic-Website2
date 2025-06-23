import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";
import { projects, interests, ProjectType } from "@/lib/data";

interface ResearchProps {
  onProjectClick: (project: ProjectType) => void;
}

const Research = ({ onProjectClick }: ResearchProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="research"
      ref={sectionRef}
      className="py-24 px-6 md:px-16 lg:px-24"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-bold mb-6 relative inline-block"
          variants={itemVariants}
        >
          Research & Projects
          <span className="absolute -bottom-2 left-0 w-1/2 h-px bg-primary"></span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-base mb-12 max-w-3xl"
          variants={itemVariants}
        >
         A showcase of my research and applied projects focused on building systems that make financial data clearer, faster, and more actionable.
         These efforts blend financial analysis, parsing automation, and macro-strategic thinking — drawing from both public-sector 
         datasets and private-market frameworks. Each project is an attempt to reduce complexity and enhance decision-making at the 
         intersection of markets, technology, and capital.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-card rounded-lg overflow-hidden shadow-md project-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
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
                <button
                  className="text-primary flex items-center text-sm hover:text-primary/80 transition-colors"
                  onClick={() => onProjectClick(project)}
                >
                  <span>View Details</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.h3
          className="text-2xl font-serif font-semibold mb-6"
          variants={itemVariants}
        >
          Academic Interests
        </motion.h3>

        <motion.p
          className="text-muted-foreground text-base mb-8 max-w-3xl"
          variants={itemVariants}
        >
          My work explores the intersection of market psychology, data systems, and capital strategy — blending foundational 
          theory with applied modeling. While rooted in academic finance, my focus has shifted toward building tools and frameworks 
          that enhance investment decisions across both public disclosures and private-market reporting.
          I aim to bridge conceptual models with real-world execution — turning financial insights into actionable, scalable systems.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
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
      </motion.div>
    </section>
  );
};

export default Research;
