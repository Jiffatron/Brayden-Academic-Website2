import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef, useState, useEffect } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  // Carousel configuration - easily customizable
  const carouselConfig = {
    images: [
      "/WebsitePicture2.jpeg",
      "/WebsitePicture3.jpeg",
      "/WebsitePicture4.jpeg",
      // Add more images here - just copy and paste the format above:
      // "/WebsitePicture5.jpeg",
      // "/WebsitePicture6.jpeg",
      // "/WebsitePicture7.jpeg",
      // "/AnotherImage.jpeg",
      // "/YetAnotherImage.jpeg",
    ],
    autoRotateInterval: 8000, // milliseconds - how long each image shows
    transitionDuration: 1200, // milliseconds - how smooth the transitions are
    desktop: {
      containerWidth: 400, // px
      containerHeight: 500, // px
      centerImageWidth: 320, // px
      sideImageWidth: 240, // px
      sideImageOffset: 60 // px from center
    },
    mobile: {
      containerWidth: 300, // px
      containerHeight: 400, // px
      centerImageWidth: 260, // px
      sideImageWidth: 180, // px
      sideImageOffset: 40 // px from center
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselConfig.images.length);
    }, carouselConfig.autoRotateInterval);
    return () => clearInterval(interval);
  }, [carouselConfig.images.length, carouselConfig.autoRotateInterval]);



  // Native image carousel - responsive
  const CardCarousel = () => {
    // Indices for left, center, right images
    const leftIdx = (currentImageIndex - 1 + carouselConfig.images.length) % carouselConfig.images.length;
    const centerIdx = currentImageIndex;
    const rightIdx = (currentImageIndex + 1) % carouselConfig.images.length;

    return (
      <>
        {/* Desktop carousel */}
        <div
          className="hidden md:block relative mx-auto"
          style={{
            width: `${carouselConfig.desktop.containerWidth}px`,
            height: `${carouselConfig.desktop.containerHeight}px`
          }}
        >
          {/* Left image - partially visible */}
          <img
            src={carouselConfig.images[leftIdx]}
            alt={`Portrait ${leftIdx + 1}`}
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{
              zIndex: 10,
              width: `${carouselConfig.desktop.sideImageWidth}px`,
              height: `${carouselConfig.desktop.containerHeight}px`,
              objectFit: 'contain',
              transition: `all ${carouselConfig.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              borderRadius: "32px", // More rounded corners (try 24px–40px for a softer look)
            }}
          />
          {/* Center image - fully visible */}
          <img
            src={carouselConfig.images[centerIdx]}
            alt={`Portrait ${centerIdx + 1}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              zIndex: 20,
              width: `${carouselConfig.desktop.centerImageWidth}px`,
              height: `${carouselConfig.desktop.containerHeight}px`,
              objectFit: 'contain',
              transition: `all ${carouselConfig.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              borderRadius: '8px' // Matches Hero WebsitePicture1 (rounded-lg)
            }}
          />
          {/* Right image - partially visible */}
          <img
            src={carouselConfig.images[rightIdx]}
            alt={`Portrait ${rightIdx + 1}`}
            className="absolute right-0 top-1/2 -translate-y-1/2"
            style={{
              zIndex: 10,
              width: `${carouselConfig.desktop.sideImageWidth}px`,
              height: `${carouselConfig.desktop.containerHeight}px`,
              objectFit: 'contain',
              transition: `all ${carouselConfig.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              borderRadius: '8px' // Matches Hero WebsitePicture1 (rounded-lg)
            }}
          />
        </div>

        {/* Mobile carousel */}
        <div
          className="md:hidden relative mx-auto"
          style={{
            width: `${carouselConfig.mobile.containerWidth}px`,
            height: `${carouselConfig.mobile.containerHeight}px`
          }}
        >
          {/* Left image - partially visible */}
          <img
            src={carouselConfig.images[leftIdx]}
            alt={`Portrait ${leftIdx + 1}`}
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{
              zIndex: 10,
              width: `${carouselConfig.mobile.sideImageWidth}px`,
              height: `${carouselConfig.mobile.containerHeight}px`,
              objectFit: 'contain',
              transition: `all ${carouselConfig.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              borderRadius: '8px' // Matches Hero WebsitePicture1 (rounded-lg)
            }}
          />
          {/* Center image - fully visible */}
          <img
            src={carouselConfig.images[centerIdx]}
            alt={`Portrait ${centerIdx + 1}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              zIndex: 20,
              width: `${carouselConfig.mobile.centerImageWidth}px`,
              height: `${carouselConfig.mobile.containerHeight}px`,
              objectFit: 'contain',
              transition: `all ${carouselConfig.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              borderRadius: '8px' // Matches Hero WebsitePicture1 (rounded-lg)
            }}
          />
          {/* Right image - partially visible */}
          <img
            src={carouselConfig.images[rightIdx]}
            alt={`Portrait ${rightIdx + 1}`}
            className="absolute right-0 top-1/2 -translate-y-1/2"
            style={{
              zIndex: 10,
              width: `${carouselConfig.mobile.sideImageWidth}px`,
              height: `${carouselConfig.mobile.containerHeight}px`,
              objectFit: 'contain',
              transition: `all ${carouselConfig.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              borderRadius: '8px' // Matches Hero WebsitePicture1 (rounded-lg)
            }}
          />
        </div>
      </>
    );
  };

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
              I’m Brayden Swavey, a Finance graduate from Texas Tech and a Mortgage Loan Services Analyst within Global Markets Operations. 
              I focus on how money moves through complex systems, because those movements tell stories most people never see. 
              From decisions buried in municipal budgets to the mechanics behind institutional trading and loan servicing, 
              I work to surface what actually drives outcomes. </p>

            <p className="section-text mb-6">
             This portfolio is a curated look at how I approach finance, operations, and problem solving. Each project reflects a broader effort 
             to connect market structure, risk, and execution across different financial environments. Whether I’m analyzing loan trade workflows, 
             modeling risk, or building market-focused tools, the objective is the same: reduce complexity, improve clarity, and support better decision-making. </p>

              <p className="section-text mb-6">
            I’m especially interested in the intersection of financial markets, operational discipline, and analytical rigor, where precision matters, details 
            compound, and small mistakes carry real consequences.</p>

            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Core Interests</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                <li className="flex items-center">
                  <i className="fas fa-chart-line text-primary mr-2"></i>
                  <span>Financial Modeling and Scenario Analysis</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-landmark text-primary mr-2"></i>
                  <span>Public and Private Market Strategy</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-brain text-primary mr-2"></i>
                  <span>Behavioral and Market Psychology</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-balance-scale text-primary mr-2"></i>
                  <span>Capital Allocation and Risk Management</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-university text-primary mr-2"></i>
                  <span>Data Automation for Financial Transparency</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-code text-primary mr-2"></i>
                  <span>Applied Technology and AI in Finance</span>
                </li>
              </ul>
            </div>

          </motion.div>
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <CardCarousel />
          </motion.div>
        </div>

        {/* Mobile About Layout - Streamlined */}
        <div className="md:hidden grid grid-cols-1 gap-8 items-center">
          <motion.div className="order-1" variants={itemVariants}>
            <CardCarousel />
          </motion.div>
          <motion.div className="order-2" variants={itemVariants}>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-center">
              This portfolio is a curated look at how I approach finance, operations, and problem solving. Each project reflects a broader effort
              to connect market structure, risk, and execution across different financial environments. Whether I'm analyzing loan trade workflows,
              modeling risk, or building market-focused tools, the objective is the same: reduce complexity, improve clarity, and support better decision-making.
            </p>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-center">
              I'm especially interested in the intersection of financial markets, operational discipline, and analytical rigor, where precision matters, details
              compound, and small mistakes carry real consequences.
            </p>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;