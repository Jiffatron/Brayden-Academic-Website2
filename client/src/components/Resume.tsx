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
      className="mobile-section mobile-container md:px-16 lg:px-24 navy-dark-section"
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
          <h2 className="section-title">
            Resume
          </h2>
          <div className="mt-4 md:mt-0 flex flex-col gap-3 sm:flex-row sm:space-x-3 sm:gap-0">
            <a
              href="https://drive.google.com/file/d/1RW-EmDIzh__aCEmPE1dBn5wmtjFxOx7b/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 min-h-[56px] border-2 border-primary text-primary rounded-lg flex items-center justify-center hover:bg-primary hover:bg-opacity-10 transition-all duration-300 text-lg font-medium"
            >
              <i className="fas fa-eye mr-3 text-lg"></i>
              <span>View PDF</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1RW-EmDIzh__aCEmPE1dBn5wmtjFxOx7b/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 min-h-[56px] bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:bg-primary/80 transition-all duration-300 text-lg font-medium"
            >
              <i className="fas fa-download mr-3 text-lg"></i>
              <span>Download PDF</span>
            </a>
          </div>
        </motion.div>

        {/* Desktop Resume Layout - Original */}
        <motion.div
          className="hidden md:block bg-card rounded-lg shadow-md p-8"
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
                Bachelor of Business Administration in Finance | Graduated May 2025
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Dean's List Spring 2022, Spring 2024, Fall 2024</li>
                <li>• Major GPA: 3.53 – Focused coursework in corporate finance, markets, and accounting</li>
              </ul>
            </div>
          </div>

          {/* Desktop Experience Section */}
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
                <li>• Extracted and curated investor-relevant data from 50+ Texas ISD audits and municipal reports, supporting the Texas Municipal Report used by underwriters and investors</li>
                <li>• Districts included San Antonio ISD, Houston ISD, Highland Park ISD, Katy ISD</li>
                <li>• Ensured audit consistency by verifying and aligning key metrics like ADA and taxpayer disclosures with reported financials</li>
                <li>• Played a direct role in bond data analysis estimated to impact $10M–$100M in potential investment decisions</li>
                <li>• Surpassed analyst production goals by 102% while maintaining high data integrity and accuracy</li>
                <li>• Contributed to debt reconciliation by aligning principal/interest schedules with audited statements</li>
                <li>• Communicated with district officials to verify data anomalies and promote audit transparency</li>
                <li>• Strengthened skills in Foxit PDF, public finance analysis, and interpretation of DSCR and capital expenditure data</li>
              </ul>
            </div>

            <div className="timeline-item mb-8 pl-4">
              <h4 className="text-xl font-medium">Amazon Seller</h4>
              <p className="text-primary text-sm mb-2">
                eCommerce Financial Operator | Dec 2020 - Present
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Built Excel-based pricing and inventory models to forecast profit margins for high-turnover seasonal goods</li>
                <li>• Managed $2K–$10K in rolling inventory, leveraging fast turnover from items like Legos, pools, and patio heaters</li>
                <li>• Negotiated directly with suppliers and developed a sourcing strategy based on seasonal demand shifts</li>
                <li>• Dynamically adjusted pricing based on third-party market data and volatility trends</li>
                <li>• Scaled business revenues by 500%+ in the first year through strategic reinvestment, forecasting, and timing</li>
              </ul>
            </div>

            <div className="timeline-item pl-4">
              <h4 className="text-xl font-medium">Mint Moving LLC</h4>
              <p className="text-primary text-sm mb-2">
                General Manager | Aug 2023 - Dec 2024
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Oversaw day-to-day logistics and led teams on 20+ residential and 5+ commercial relocations</li>
                <li>• Managed crew operations across jobs and ensured client satisfaction with each move</li>
                <li>• Contributed to strategic planning and pricing structure optimization to maintain project margins</li>
                <li>• Acted as the primary point of contact for client communication, logistics coordination, and financial planning support</li>
              </ul>
            </div>
          </div>

          {/* Desktop Skills Section */}
          <div className="mb-12 cv-section pl-8">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">
              Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pl-4">
              <div>
                <h4 className="font-medium mb-3">Soft Skills</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear written and verbal communication (client outreach + audit clarification)</li>
                  <li>• Small-team leadership (Mint Moving + inventory strategy)</li>
                  <li>• Initiative-driven — launched and scaled solo business operations</li>
                  <li>• Adaptable across industries (public finance, eCommerce, logistics)</li>
                  <li>• Problem-solving under pressure (reconciliation, sourcing volatility, ops)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Hard Skills</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Financial Statement Analysis (ISDs, CAFRs, bond disclosures)</li>
                  <li>• Excel Modeling (pricing models, amortization schedules, scenario tools)</li>
                  <li>• Data Extraction & Audit Verification (Foxit PDF, reconciliation)</li>
                  <li>• VBA Automation & Solver Optimization (used in financial modeling coursework)</li>
                  <li>• Market Research & Product Forecasting (via Amazon Seller platform)</li>
                  <li>• Basic Web Development (HTML, CSS, React – used in personal site creation)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop Certifications Section */}
          <div className="cv-section pl-8">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">
              Certifications & Coursework
            </h3>
            <div className="pl-4">
              <div className="mt-4 text-sm text-muted-foreground">
                <p>• Financial Modeling — Built capital budgeting and option pricing models in Excel using pro formas, amortization schedules, and VBA</p>
                <p>• Corporate Finance — Applied DCF, WACC, and IRR techniques for investment decision-making and capital structure optimization</p>
                <p>• Investments — Analyzed asset classes, market efficiency, and risk/return tradeoffs using CAPM and portfolio theory</p>
                <p>• Financial & Intermediate Accounting I & II — Gained fluency in balance sheets, income statements, and cash flow reconciliation</p>
                <p>• Public Finance Application (MAC) — Hands-on experience with CAFRs, bond data, DSCR, and taxpayer disclosures across Texas ISDs</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Resume Layout - Card-Based, Touch-Friendly */}
        <motion.div
          className="md:hidden space-y-6 pb-32"
          variants={itemVariants}
        >
          {/* Mobile Education Card */}
          <motion.div
            className="bg-card rounded-2xl mx-4 overflow-hidden shadow-lg border border-border/10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-4 border-b border-border/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-primary text-lg"></i>
                </div>
                <h3 className="text-lg font-semibold text-primary">Education</h3>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2 text-foreground">Texas Tech University</h4>
              <p className="text-primary font-medium mb-3">
                Bachelor of Business Administration in Finance
              </p>
              <p className="text-muted-foreground text-sm mb-4">Graduated May 2025</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Dean's List: Spring 2022, Spring 2024, Fall 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Major GPA: 3.53</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Experience Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-briefcase text-primary text-lg"></i>
                </div>
                <h3 className="text-lg font-semibold text-primary">Experience</h3>
              </div>
            </div>

            {/* Municipal Advisory Council Card */}
            <motion.div
              className="bg-card rounded-2xl mx-4 overflow-hidden shadow-lg border border-border/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/10 px-6 py-4 border-b border-border/10">
                <h4 className="text-lg font-semibold text-foreground">Municipal Advisory Council of Texas</h4>
                <p className="text-primary font-medium text-sm">Financial Analyst Intern</p>
                <p className="text-muted-foreground text-xs">May 2024 - August 2024</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Analyzed 50+ Texas ISD audits supporting $10M–$100M investment decisions
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Exceeded production goals by 102% while maintaining data integrity
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Specialized in bond data analysis and debt reconciliation
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Amazon Seller Card */}
            <motion.div
              className="bg-card rounded-2xl mx-4 overflow-hidden shadow-lg border border-border/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-r from-orange-500/5 to-orange-600/10 px-6 py-4 border-b border-border/10">
                <h4 className="text-lg font-semibold text-foreground">Amazon Seller</h4>
                <p className="text-primary font-medium text-sm">eCommerce Financial Operator</p>
                <p className="text-muted-foreground text-xs">Dec 2020 - Present</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Built Excel pricing models for high-turnover seasonal goods
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Scaled revenues 500%+ through strategic forecasting
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Managed $2K-$10K rolling inventory with dynamic pricing
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mint Moving Card */}
            <motion.div
              className="bg-card rounded-2xl mx-4 overflow-hidden shadow-lg border border-border/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-r from-green-500/5 to-green-600/10 px-6 py-4 border-b border-border/10">
                <h4 className="text-lg font-semibold text-foreground">Mint Moving LLC</h4>
                <p className="text-primary font-medium text-sm">General Manager</p>
                <p className="text-muted-foreground text-xs">Aug 2023 - Dec 2024</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Led teams on 25+ relocations (residential & commercial)
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Optimized pricing structure and maintained project margins
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Primary client contact for logistics and financial planning
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Skills Section */}
          <motion.div
            className="bg-card rounded-2xl mx-4 overflow-hidden shadow-lg border border-border/10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gradient-to-r from-purple-500/5 to-purple-600/10 px-6 py-4 border-b border-border/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-tools text-primary text-lg"></i>
                </div>
                <h3 className="text-lg font-semibold text-primary">Core Skills</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Technical</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Excel Modeling</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Financial Analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">VBA Automation</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Leadership</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Team Management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Client Relations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Problem Solving</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resume;