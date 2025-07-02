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

  const imageUrl = "https://www.depts.ttu.edu/parentrelations/images/TTUSeal.jpg"; // Image Link https://www.ttu.edu/traditions/images/SEAL.jpg 

  return ( 
    <section
      id="about"
      ref={sectionRef}
      className="mobile-section mobile-container md:px-16 lg:px-24 navy-dark-section relative"
    >
      <div className="absolute left-0 top-0 w-full h-20 bg-gradient-to-b from-background to-secondary/30 dark:to-[hsl(var(--navy-dark))]"></div>
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
          About Me
        </motion.h2>

        {/* Desktop About Layout - Original */}
        <div className="hidden md:grid md:grid-cols-5 gap-12 items-start">
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <p className="section-text mb-6">
              My name is Brayden Swavey, a recent Finance graduate from Texas Tech University.
               I specialize in analyzing financial data across both public and private sectors,
               with a strong interest in the long-term macroeconomic effects of capital allocation.
               I am passionate about understanding how money moves through systems,
               from municipal budgets to corporate strategy, and how those decisions shape broader economic outcomes.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Core Interests</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                <li className="flex items-center">
                  <i className="fas fa-chart-line text-primary mr-2"></i>
                  <span>Data-Driven Financial Modeling</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-landmark text-primary mr-2"></i>
                  <span>Private & Alternative Investment Analysis</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-brain text-primary mr-2"></i>
                  <span>Behavioral & Strategic Market Psychology</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-balance-scale text-primary mr-2"></i>
                  <span>Capital Flow & Risk Structuring</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-university text-primary mr-2"></i>
                  <span>Parsing & Automation of Financial Data</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-code text-primary mr-2"></i>
                  <span>Applied AI in Finance & Decision Systems</span>
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-full h-full border-2 border-primary z-0"></div>
              <img
                src={imageUrl}
                alt="Portrait of Brayden Swavey"
                className="relative z-10 rounded shadow-lg w-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile About Layout - Streamlined */}
        <div className="md:hidden grid grid-cols-1 gap-8 items-center">
          <motion.div className="order-1" variants={itemVariants}>
            <div className="relative max-w-xs mx-auto">
              <img
                src={imageUrl}
                alt="Portrait of Brayden Swavey"
                className="rounded-2xl shadow-xl w-full object-cover aspect-square"
              />
            </div>
          </motion.div>
          <motion.div className="order-2" variants={itemVariants}>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-center">
              Finance graduate specializing in financial data analysis and capital allocation.
            </p>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;