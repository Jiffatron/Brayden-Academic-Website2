import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-16 lg:px-24"
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
            Finance Graduate | Texas Tech University
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8 max-w-xl"
            variants={itemVariants}
          >
            Delving into the quantitative frameworks that drive markets and shape strategic financial decisions
          </motion.p>

          <motion.div className="flex space-x-6" variants={itemVariants}>
            <button
              onClick={() => scrollToSection("research")}
              className="px-6 py-3 border-2 border-primary text-primary rounded-md hover:bg-primary hover:bg-opacity-10 transition-all duration-300 backdrop-blur-sm"
            >
              View Research
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md shadow-lg hover:bg-primary/80 transition-colors duration-300 hover:shadow-primary/25 hover:shadow-xl"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 md:order-2 flex justify-center md:justify-end"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] depth-effect relative"
            variants={itemVariants}
          >
            <img
              src="https://i.imgur.com/VHIvMD5.jpeg"
              alt="Brayden Swavey headshot"
              className="object-cover w-full h-full rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay rounded-lg"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
