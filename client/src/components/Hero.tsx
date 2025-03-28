import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
      id="hero"
      ref={sectionRef}
      className={`min-h-screen flex items-center pt-24 pb-12 px-6 md:px-16 lg:px-24`}
    >
      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="order-2 md:order-1"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-4"
            variants={itemVariants}
          >
            Brayden<br /><span className="text-primary">Swavey</span>
          </motion.h1>
          
          <motion.h2
            className="text-xl text-muted-foreground font-light mb-6"
            variants={itemVariants}
          >
            Finance Professional | Texas Tech University
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-xl"
            variants={itemVariants}
          >
            Exploring the quantitative backbone of markets and financial decision-making.
          </motion.p>
          
          <motion.div
            className="flex space-x-6"
            variants={itemVariants}
          >
            <a
              href="#research"
              className="px-6 py-3 border-2 border-primary text-primary rounded hover:bg-primary hover:bg-opacity-10 transition-all duration-300"
            >
              View Research
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/80 transition-colors duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 md:order-2 flex justify-center md:justify-end"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="headshot-container w-64 h-64 md:w-80 md:h-80"
            variants={itemVariants}
          >
            <img
              src="https://images.unsplash.com/photo-1571512599661-302b13ab1bfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Brayden Swavey headshot"
              className="object-cover w-full h-full rounded shadow-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
