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
                Bachelor of Business Administration in Finance | 2020 - 2024
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• GPA: 3.8/4.0</li>
                <li>• Relevant Coursework: Security Analysis & Portfolio Management, Intermediate Corporate Finance, Management Information Systems, Financial Statement Analysis</li>
                <li>• Phi Beta Kappa Honor Society</li>
                <li>• Presidential Scholarship Recipient</li>
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
                Financial Analysis Intern | Summer 2023
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • Analyzed comprehensive financial statements and debt obligations for municipal entities in Texas
                </li>
                <li>
                  • Assisted in creating and maintaining databases tracking bond issuances and local government finances
                </li>
                <li>
                  • Contributed to client reports on municipal market conditions and debt issuance strategies
                </li>
                <li>
                  • Developed forecasting models for revenue streams and debt service coverage ratios
                </li>
              </ul>
            </div>

            <div className="timeline-item mb-8 pl-4">
              <h4 className="text-xl font-medium">Texas Tech Student Managed Investment Fund</h4>
              <p className="text-primary text-sm mb-2">
                Student Analyst | 2022 - Present
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • Conduct fundamental analysis of potential investments across various sectors using discounted cash flow models
                </li>
                <li>
                  • Present detailed investment recommendations to the investment committee based on thorough research
                </li>
                <li>
                  • Collaborate with team members to manage a $3M+ equity portfolio with focus on long-term growth
                </li>
                <li>
                  • Monitor macroeconomic trends and company-specific developments to optimize portfolio allocation
                </li>
              </ul>
            </div>

            <div className="timeline-item pl-4">
              <h4 className="text-xl font-medium">Rawls College of Business</h4>
              <p className="text-primary text-sm mb-2">
                Finance Research Assistant | 2021 - 2022
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • Supported faculty research on corporate governance structures and their impact on firm performance
                </li>
                <li>
                  • Compiled and analyzed datasets from financial databases including CRSP and Compustat
                </li>
                <li>
                  • Applied statistical methods to identify correlations between governance metrics and stock performance
                </li>
                <li>
                  • Helped prepare research findings for academic publication and presentation
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
                <h4 className="font-medium mb-3">Financial Skills</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Discounted Cash Flow Analysis</li>
                  <li>• Comparable Company Analysis</li>
                  <li>• Equity Research & Valuation</li>
                  <li>• Financial Statement Analysis</li>
                  <li>• Portfolio Construction</li>
                  <li>• Fixed Income Analysis</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">Technical Skills</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Microsoft Excel (Advanced)</li>
                  <li>• Bloomberg Terminal</li>
                  <li>• Capital IQ</li>
                  <li>• Python (NumPy, Pandas)</li>
                  <li>• Power BI</li>
                  <li>• SQL</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="cv-section pl-8">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">
              Certifications & Licenses
            </h3>

            <div className="pl-4">
              <p className="text-muted-foreground italic">
                Currently pursuing certifications in finance and investment management. This section will be updated as credentials are obtained.
              </p>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>• Preparing for CFA Level I</p>
                <p>• Bloomberg Market Concepts (In Progress)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resume;
