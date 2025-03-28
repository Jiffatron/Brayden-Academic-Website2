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
            href="#"
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
                Bachelor of Science in Finance | 2020 - 2024
              </p>
              <p className="text-muted-foreground mb-3">Minor in Economics</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• GPA: 3.92/4.0</li>
                <li>• Dean's List: 8 consecutive semesters</li>
                <li>
                  • Honors Thesis: "Quantitative Analysis of Market Efficiency in
                  Post-Pandemic Recovery"
                </li>
                <li>
                  • Relevant Coursework: Financial Modeling, Investment Analysis,
                  Advanced Corporate Finance, Econometrics
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
              <h4 className="text-xl font-medium">Municipal Advisory Council</h4>
              <p className="text-primary text-sm mb-2">
                Financial Analysis Intern | Summer 2023
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • Conducted comprehensive financial statement analysis for 15+
                  municipal entities
                </li>
                <li>
                  • Developed spreadsheet models to assess debt service coverage
                  and financial stability
                </li>
                <li>
                  • Assisted in drafting advisory reports for municipal clients
                  regarding capital structure optimization
                </li>
                <li>
                  • Presented findings to senior advisors and contributed to
                  client presentations
                </li>
              </ul>
            </div>

            <div className="timeline-item mb-8 pl-4">
              <h4 className="text-xl font-medium">University Investment Club</h4>
              <p className="text-primary text-sm mb-2">
                Research Analyst | 2021 - Present
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • Lead a team of 5 student analysts in researching equity
                  investment opportunities
                </li>
                <li>
                  • Developed and presented investment theses for potential
                  portfolio additions
                </li>
                <li>
                  • Created financial models to value companies across multiple
                  sectors
                </li>
                <li>
                  • Contributed to club portfolio performance of +15% in 2022,
                  outperforming benchmark by 3%
                </li>
              </ul>
            </div>

            <div className="timeline-item pl-4">
              <h4 className="text-xl font-medium">Data Analytics Lab</h4>
              <p className="text-primary text-sm mb-2">
                Research Assistant | 2022 - 2023
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • Assisted faculty with research on algorithmic trading
                  strategies and market microstructure
                </li>
                <li>
                  • Processed and cleaned financial datasets using Python and R
                </li>
                <li>
                  • Conducted statistical analysis to identify patterns in market
                  behavior
                </li>
                <li>
                  • Co-authored a paper on high-frequency trading impacts on
                  market liquidity
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
                  <li>• Financial Modeling & Valuation</li>
                  <li>• Data Analysis & Visualization</li>
                  <li>• Financial Statement Analysis</li>
                  <li>• Risk Assessment</li>
                  <li>• Market Research</li>
                  <li>• Economic Forecasting</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">Software & Tools</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Excel/VBA (Advanced)</li>
                  <li>• Bloomberg Terminal</li>
                  <li>• Python (Pandas, NumPy)</li>
                  <li>• R (Statistical Analysis)</li>
                  <li>• Tableau</li>
                  <li>• SQL (Basic)</li>
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
                    Financial Modeling & Valuation Analyst (FMVA)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Corporate Finance Institute | 2022
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <i className="fas fa-certificate text-primary mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium">Bloomberg Market Concepts</h4>
                  <p className="text-sm text-muted-foreground">
                    Bloomberg LP | 2021
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <i className="fas fa-certificate text-primary mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium">Python for Finance</h4>
                  <p className="text-sm text-muted-foreground">
                    DataCamp | 2022
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <i className="fas fa-certificate text-primary mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium">Investment Foundations</h4>
                  <p className="text-sm text-muted-foreground">
                    CFA Institute | 2021
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
