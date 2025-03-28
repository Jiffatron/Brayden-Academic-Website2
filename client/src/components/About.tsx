import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 md:px-16 lg:px-24 navy-dark-section relative"
    >
      <div className="absolute left-0 top-0 w-full h-20 bg-gradient-to-b from-background to-[hsl(var(--navy-dark))]"></div>
      <motion.div
        className="w-full max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-bold mb-12 relative inline-block"
          variants={itemVariants}
        >
          About Me
          <span className="absolute -bottom-2 left-0 w-1/2 h-px bg-primary"></span>
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <p className="text-lg leading-relaxed mb-6">
              I'm a senior undergraduate student in finance at Texas Tech University. My interests include financial modeling, public and private sector investment analysis, and the intersection of AI and market behavior.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              My academic journey has been focused on understanding how quantitative methods can improve investment decision-making and market efficiency. I'm particularly fascinated by the ways in which emerging technologies are reshaping traditional financial paradigms.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Outside of my academic pursuits, I enjoy analyzing market trends, exploring data visualization techniques, and staying current with financial technology developments.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Core Interests</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                <li className="flex items-center">
                  <i className="fas fa-chart-line text-primary mr-2"></i>
                  <span>Financial Modeling</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-landmark text-primary mr-2"></i>
                  <span>Public Finance</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-brain text-primary mr-2"></i>
                  <span>AI in Finance</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-balance-scale text-primary mr-2"></i>
                  <span>Investment Analysis</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-university text-primary mr-2"></i>
                  <span>Market Efficiency</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-dollar-sign text-primary mr-2"></i>
                  <span>Economic Theory</span>
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-full h-full border-2 border-primary z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Portrait of Brayden Judge" 
                className="relative z-10 rounded shadow-lg w-full"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
