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
              href="https://drive.google.com/file/d/1VyKnSfzYuImX7orM9bomS3M8CDqLrFC1/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-primary text-primary rounded flex items-center hover:bg-primary hover:bg-opacity-10 transition-all duration-300"
            >
              <i className="fas fa-eye mr-2"></i>
              <span>View PDF</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1VyKnSfzYuImX7orM9bomS3M8CDqLrFC1/view?usp=drive_link"
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
                <li>• Major GPA: 3.53 – Focused coursework in corporate finance, markets, and accounting</li>
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
                <li>• Extracted and curated investor-relevant data from school district audits and municipal reports across Texas of all sizes</li>
                <li>• Districts included San Antonio ISD, Houston ISD, Highland Park ISD, Katy ISD</li>
                <li>• Ensured audit consistency by verifying and aligning key metrics with reported financials such as verifying average daily attendance</li>
                <li>• Played a direct role in the backend compilation of the Texas Municipal Report, a vital reference for underwriters</li>
                <li>• Surpassed Financial Analyst production targets by 102% while maintaining high data integrity and low error rates</li>
                <li>• Contributed to complex debt reconciliation procedures, aligning outstanding principal and interest schedules with audited statements</li>
                <li>• Contacted several school districts to verify validity and inacuracies to ensure financial transparency  </li>
                <li>• Strengthened skills in Foxit PDF, PDF extraction, and working knowledge of public finance metrics like DSCR and capital expenditures</li>
              </ul>
            </div>

            <div className="timeline-item mb-8 pl-4">
              <h4 className="text-xl font-medium">Amazon Seller</h4>
              <p className="text-primary text-sm mb-2">
                Independent Contractor | Dec 2020 - Present
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Launched and scaled an online resale operation focused on retail arbitrage and wholesale sourcing</li>
                <li>• Built key supplier relationships and negotiated pricing terms to maximize margin</li>
                <li>• Leveraged market trends and seasonal data to dynamically adjust product strategy</li>
                <li>• Leveraged third-party applications to track relevant supply and demand volatility to better time markets</li>
                <li>• Successfully scaled business by 500% in its first year through strategic pricing, demand forecasting, and reinvestment</li>
              </ul>
            </div>

            <div className="timeline-item pl-4">
              <h4 className="text-xl font-medium">Mint Moving LLC</h4>
              <p className="text-primary text-sm mb-2">
                General Manager | Aug 2023 - Dec 2024
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Oversaw operations for a local service business including scheduling, logistics, and financial management</li>
                <li>• Led and trained a small team, ensuring smooth execution of client moves and maintaining customer satisfaction</li>
                <li>• Provided strategic planning advice, helped establish pricing structure, and optimized margins</li>
                <li>• Served as the primary point of contact for client outreach, reviews, and follow-ups</li>
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
                  <li>• Strong verbal and written communication</li>
                  <li>• Confident leadership in small team environments</li>
                  <li>• High self-motivation and problem solving under pressure</li>
                  <li>• Fast learner with adaptability across industries</li>
                  <li>• Works well independently and in collaborative projects</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Hard Skills</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Financial Statement Interpretation</li>
                  <li>• Excel modeling and data parsing and VBA</li>
                  <li>• Market & sector analysis</li>
                  <li>• Presentation building (PowerPoint)</li>
                  <li>• Document handling (Foxit PDF, Word)</li>
                  <li>• Basic HTML, CSS, and React familiarity</li>
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
                <p>• Financial Accounting & Intermediate Accounting I & II – Foundation for interpreting income statements, balance sheets, and cash flow statements</p>
                <p>• Markets and Institutions – Focus on the structure, function, and regulatory environment of financial markets</p>
                <p>• Corporate Finance – Concepts in capital structure, WACC, investment decisions, and valuation modeling</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resume;