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
          <a
            href="https://drive.google.com/file/d/1Gk2Wzzja44Y-cep4V7VrF0CeJ75Y0d_h/view"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 px-5 py-2 border-2 border-primary text-primary rounded flex items-center hover:bg-primary hover:bg-opacity-10 transition-all duration-300"
          >
            <i className="fas fa-download mr-2"></i>
            <span>Download PDF</span>
          </a>
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
                Bachelor of Science in Industrial Engineering | 2019 - 2023
              </p>
              <p className="text-muted-foreground mb-3">Minor in Business Administration</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• GPA: 3.2/4.0</li>
                <li>• Alpha Pi Mu (Industrial Engineering Honor Society)</li>
                <li>
                  • Senior Design Project: "Optimization of Manufacturing Process Flow and Quality Assurance"
                </li>
                <li>
                  • Relevant Coursework: Quality Assurance & Engineering Statistics, 
                  Operations Research, Production/Inventory Control, Manufacturing Engineering
                </li>
              </ul>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-12 cv-section pl-8">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">
              Experience
            </h3>

            <div className="timeline-item mb-8 pl-4">
              <h4 className="text-xl font-medium">ASML</h4>
              <p className="text-primary text-sm mb-2">
                Quality Engineer | 2023 - Present
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • Implement and maintain quality assurance systems for semiconductor manufacturing equipment
                </li>
                <li>
                  • Analyze quality data to identify trends and recommend improvements to manufacturing processes
                </li>
                <li>
                  • Collaborate with cross-functional teams to resolve quality issues and implement corrective actions
                </li>
                <li>
                  • Conduct quality inspections and audits to ensure compliance with standards and specifications
                </li>
              </ul>
            </div>

            <div className="timeline-item mb-8 pl-4">
              <h4 className="text-xl font-medium">Texas Instruments</h4>
              <p className="text-primary text-sm mb-2">
                Manufacturing Engineering Intern | Summer 2022
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • Assisted in developing process improvement initiatives that reduced manufacturing cycle time by 15%
                </li>
                <li>
                  • Conducted statistical analysis of production data to identify bottlenecks and inefficiencies
                </li>
                <li>
                  • Participated in lean manufacturing projects that increased overall equipment effectiveness
                </li>
                <li>
                  • Created documentation for standard operating procedures and work instructions
                </li>
              </ul>
            </div>

            <div className="timeline-item pl-4">
              <h4 className="text-xl font-medium">University Industrial Engineering Lab</h4>
              <p className="text-primary text-sm mb-2">
                Research Assistant | 2021 - 2023
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • Supported faculty research on optimizing manufacturing processes and quality control systems
                </li>
                <li>
                  • Collected and analyzed data using statistical tools and software
                </li>
                <li>
                  • Assisted in designing experiments to test process improvements
                </li>
                <li>
                  • Contributed to research papers on manufacturing efficiency and quality management
                </li>
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
                <h4 className="font-medium mb-3">Technical Skills</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Quality Control & Assurance</li>
                  <li>• Process Improvement</li>
                  <li>• Statistical Process Control</li>
                  <li>• Root Cause Analysis</li>
                  <li>• Lean Manufacturing</li>
                  <li>• Six Sigma Methodologies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">Software & Tools</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Excel (Advanced)</li>
                  <li>• Minitab</li>
                  <li>• Python (Data Analysis)</li>
                  <li>• CAD Software</li>
                  <li>• Manufacturing Execution Systems</li>
                  <li>• Quality Management Systems</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="cv-section pl-8">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">
              Certifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 pl-4">
              <div className="flex items-start">
                <i className="fas fa-certificate text-primary mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium">
                    Lean Six Sigma Green Belt
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    American Society for Quality | 2022
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <i className="fas fa-certificate text-primary mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium">Quality Engineering Fundamentals</h4>
                  <p className="text-sm text-muted-foreground">
                    Texas Tech University | 2022
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <i className="fas fa-certificate text-primary mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium">Python for Data Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    DataCamp | 2022
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <i className="fas fa-certificate text-primary mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium">Statistical Process Control</h4>
                  <p className="text-sm text-muted-foreground">
                    Manufacturing Institute | 2021
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resume;
