import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

const Resume = () => {
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
      id="resume"
      ref={sectionRef}
      className="py-24 px-6 md:px-16 lg:px-24 navy-dark-section"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold relative inline-block">
            Resume
            <span className="absolute -bottom-2 left-0 w-1/2 h-px bg-primary"></span>
          </h2>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <a
              href="https://drive.google.com/file/d/1Gk2Wzzja44Y-cep4V7VrF0CeJ75Y0d_h/view"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-primary text-primary rounded flex items-center hover:bg-primary hover:bg-opacity-10 transition-all duration-300"
            >
              <i className="fas fa-eye mr-2"></i>
              <span>View PDF</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1Gk2Wzzja44Y-cep4V7VrF0CeJ75Y0d_h/view"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground rounded flex items-center hover:bg-primary/80 transition-all duration-300"
            >
              <i className="fas fa-download mr-2"></i>
              <span>Download PDF</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-lg shadow-md p-8"
          variants={itemVariants}
        >
          {/* Education Section */}
          <div className="mb-12 cv-section pl-8">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">
              Education
            </h3>
            <div className="timeline-item mb-8 pl-4">
              <h4 className="text-xl font-medium">Texas Tech University</h4>
              <p className="text-primary text-sm mb-2">
                Bachelor of Business Administration in Finance | Expected May 2025
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Dean's List Spring 2022, Spring 2024, Fall 2024</li>
                <li>• Major GPA: 3.53</li>
              </ul>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-12 cv-section pl-8">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">
              Experience
            </h3>
            <div className="timeline-item mb-8 pl-4">
              <h4 className="text-xl font-medium">Municipal Advisory Council of Texas</h4>
              <p className="text-primary text-sm mb-2">
                Financial Analyst Intern | May 2024 - August 2024
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Maintained accurate financial data for school districts for investor analysis</li>
                <li>• Verified school audit information and financial statements</li>
                <li>• Surpassed production goals by 102% with high accuracy</li>
              </ul>
            </div>

            <div className="timeline-item mb-8 pl-4">
              <h4 className="text-xl font-medium">Amazon Seller</h4>
              <p className="text-primary text-sm mb-2">
                Independent Contractor | Dec 2020 - Present
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Negotiated with wholesalers and retailers for optimal deals</li>
                <li>• Collaborated with other merchants to grow profitability</li>
                <li>• Scaled business by 500% in first year via strategic planning</li>
              </ul>
            </div>

            <div className="timeline-item pl-4">
              <h4 className="text-xl font-medium">Mint Moving LLC</h4>
              <p className="text-primary text-sm mb-2">
                General Manager | Aug 2023 - Dec 2024
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Supervised staff and daily operations on and off-site</li>
                <li>• Attracted new clients and retained existing ones</li>
                <li>• Provided financial advising to optimize growth</li>
              </ul>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-12 cv-section pl-8">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">
              Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pl-4">
              <div>
                <h4 className="font-medium mb-3">Soft Skills</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Communication</li>
                  <li>• Leadership</li>
                  <li>• Work Ethic</li>
                  <li>• Adaptability</li>
                  <li>• Collaboration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Hard Skills</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Financial Analysis</li>
                  <li>• Market Assessment</li>
                  <li>• PowerPoint</li>
                  <li>• Excel</li>
                  <li>• Word</li>
                  <li>• Foxit PDF</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="cv-section pl-8">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">
              Certifications & Coursework
            </h3>
            <div className="pl-4">
              <div className="mt-4 text-sm text-muted-foreground">
                <p>• Financial Accounting & Intermediate Accounting I & II</p>
                <p>• Markets and Institutions</p>
                <p>• Corporate Finance</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resume;
