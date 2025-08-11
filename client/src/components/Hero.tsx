import { motion } from "framer-motion";
import { useAdaptiveIntersection } from "@/hooks/useAdaptiveIntersection";
import { useRef } from "react";
import ParallaxContainer from "./ParallaxContainer";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isIntersecting: isVisible, animationDuration } = useAdaptiveIntersection(sectionRef, { threshold: 0.1 });

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
        staggerChildren: animationDuration * 0.3, // Adaptive stagger timing
        delayChildren: animationDuration * 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: animationDuration, // Use adaptive duration
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for premium feel
      },
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex items-center pt-24 pb-20 mobile-container md:px-16 lg:px-24"
    >
      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="order-2 md:order-1"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6"
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
            Exploring the ideas, systems, and patterns that drive markets and guide financial decisions
          </motion.p>

          <motion.div className="flex space-x-6" variants={itemVariants}>
            <button
              onClick={() => scrollToSection("projects")}
              className="px-6 py-3 border-2 border-primary text-primary rounded-md hover:bg-primary hover:bg-opacity-10 transition-all duration-300 backdrop-blur-sm"
            >
              View Projects
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
          <ParallaxContainer speed={0.3} className="order-1 md:order-2 flex justify-start">
            <motion.div
              className="relative max-w-[360px] sm:max-w-[440px] depth-effect"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/Photo2edit.jpg"
                  alt="Brayden Swavey headshot"
                  className="w-full h-auto object-contain rounded-lg hero-image natural-shadow transition-all duration-300"
                  style={{
                    aspectRatio: 'auto',
                    maxHeight: '440x'
                  }}
                />
                {/* Subtle overlay for depth without glossy effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none"></div>
              </div>
            </motion.div>
          </ParallaxContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
