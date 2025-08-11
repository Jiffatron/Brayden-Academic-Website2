import { motion, AnimatePresence } from "framer-motion";
import { useAdaptiveIntersection } from "@/hooks/useAdaptiveIntersection";
import { useSliderAnimation } from "@/hooks/useSliderAnimation";
import { useRef, useState } from "react";
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
  const { isIntersecting: isVisible } = useAdaptiveIntersection(sectionRef, { threshold: 0.1 });
  const { sliderVariants, cardVariants, startAnimation, endAnimation, isAnimating } = useSliderAnimation();
  const navigate = useNavigate();

  // Simple slider state - just 0 or 1
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hardcode the two sets of projects
  const allProjects = projects.sort((a, b) => a.position - b.position);
  const firstFourProjects = allProjects.slice(0, 4); // positions 1,2,3,4
  const lastFourProjects = allProjects.slice(4, 8);  // positions 5,6,7,8

  // Get current projects based on slide
  const getCurrentProjects = () => {
    return currentSlide === 0 ? firstFourProjects : lastFourProjects;
  };

  const nextSlide = () => {
    if (isAnimating) return; // Prevent rapid clicking during animation
    startAnimation();
    setCurrentSlide(currentSlide === 0 ? 1 : 0);
  };

  const prevSlide = () => {
    if (isAnimating) return; // Prevent rapid clicking during animation
    startAnimation();
    setCurrentSlide(currentSlide === 0 ? 1 : 0);
  };

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
         A collection of my research and applied projects focused on building systems
          that make financial data clear, fast, and useful. These efforts combine 
          financial analysis, automation, and strategic thinking, drawing from both 
          public sector and private market datasets. Each project is my way of taking 
          something complex and turning it into a tool or insight that can create real market value.
        </motion.p>

        {/* Mobile Description */}
        <motion.p
          className="md:hidden text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
         Building systems that make financial data clearer and more actionable.
        </motion.p>

        {/* Desktop Project Slider */}
        <motion.div
          className="hidden md:block mb-16"
          variants={containerVariants}
        >
          {/* Slider Navigation */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                {currentSlide + 1} of 2
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentSlide(0)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === 0
                      ? 'bg-primary scale-110'
                      : 'bg-primary/30 hover:bg-primary/60'
                  }`}
                />
                <button
                  onClick={() => setCurrentSlide(1)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === 1
                      ? 'bg-primary scale-110'
                      : 'bg-primary/30 hover:bg-primary/60'
                  }`}
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Slider Content */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                className="grid grid-cols-2 gap-8"
                key={currentSlide}
                variants={sliderVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                onAnimationComplete={endAnimation}
              >
                {getCurrentProjects().map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="bg-card rounded-lg overflow-hidden shadow-md project-card-slider"
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1]
                    }}
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
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile Project Cards - Visual Style (Show All 8) */}
        <motion.div
          className="md:hidden grid grid-cols-1 gap-6 mb-12"
          variants={containerVariants}
        >
          {projects
            .sort((a, b) => a.position - b.position)
            .map((project) => (
            <motion.div
              key={project.id}
              className="bg-card rounded-2xl overflow-hidden shadow-lg project-card mobile-project-card animate-gpu relative cursor-pointer"
              variants={itemVariants}
              whileHover={cardHoverVariants.hover}
              onClick={() => {
                console.log('Mobile card clicked:', project.id);
                navigate(`/projects/${project.id}`);
              }}
            >

              <div className="relative">
                <div className="w-full h-56 bg-muted-foreground/10 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-opacity duration-300"
                    style={{
                      minHeight: '224px',
                      maxHeight: '224px'
                    }}
                    loading="lazy"
                  />
                </div>
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
                  <div className="text-muted-foreground">
                    <i className="fas fa-arrow-right"></i>
                  </div>
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
          I’m interested in where market psychology meets capital strategy, 
          nd I like finding ways to bring theory into something you can 
          actually use. I started with an academic foundation in finance,
           but lately I’ve been more focused on building tools and frameworks 
           that make me better at making investment decisions in both public 
           and private markets. For me, the real challenge is taking an idea or 
           model and pushing it far enough that it works in practice and creates real value.
        </motion.p>

        {/* Desktop Interests - All 6 */}
        <motion.div
          className="hidden md:grid md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
        >
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              className="bg-card p-5 rounded-lg shadow-md project-card"
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
