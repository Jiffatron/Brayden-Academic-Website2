export interface ProjectType {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  content: string;
}

export interface InterestType {
  title: string;
  description: string;
  icon: string;
}

export interface BlogPostType {
  title: string;
  date: string;
  preview: string;
}

// Project data
export const projects: ProjectType[] = [
  {
    id: "boeing",
    title: "Equity Research: Boeing",
    description:
      "Comprehensive analysis of Boeing's financial position, market strategy, and future prospects in the aerospace industry. Includes DCF valuation model and competitive positioning assessment.",
    image:
      "https://images.unsplash.com/photo-1494607275613-3f679549aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Financial Analysis", "Equity Valuation", "Industry Research"],
    content: `
      <p class="mb-4">This comprehensive equity research project examines Boeing's financial position following recent industry challenges, including the 737 MAX issues and pandemic impacts on the aviation sector.</p>
      
      <h3 class="text-xl font-medium mb-3">Key Findings</h3>
      <ul class="mb-6 space-y-2">
        <li>• Strong long-term growth potential despite short-term volatility</li>
        <li>• Defense division providing stability amid commercial aviation fluctuations</li>
        <li>• Improving free cash flow projection for 2023-2025</li>
        <li>• Supply chain improvements leading to increased production capacity</li>
      </ul>
      
      <h3 class="text-xl font-medium mb-3">Valuation Summary</h3>
      <p class="mb-4">Utilizing a DCF model with a WACC of 8.7% and terminal growth rate of 2.5%, the analysis established a fair value range of $215-$240 per share, suggesting the stock was undervalued by approximately 15% at the time of analysis.</p>
      
      <h3 class="text-xl font-medium mb-3">Methodologies</h3>
      <ul class="mb-6 space-y-2">
        <li>• Discounted Cash Flow (DCF) Analysis</li>
        <li>• Comparable Company Analysis</li>
        <li>• Sum-of-Parts Valuation</li>
        <li>• Scenario Analysis (Bull, Base, Bear cases)</li>
      </ul>
      
      <div class="flex justify-end">
        <a href="#" class="px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/80 transition-colors duration-300">Download Full Report</a>
      </div>
    `,
  },
  {
    id: "financial-statement",
    title: "Financial Statement Analysis",
    description:
      "In-depth analysis conducted during my internship at the Municipal Advisory Council, focusing on ratio analysis, cash flow assessment, and trend identification for public sector entities.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Financial Statements", "Public Finance", "Ratio Analysis"],
    content: `
      <p class="mb-4">During my internship at the Municipal Advisory Council, I conducted in-depth financial statement analyses for various public sector entities to assess their fiscal health and debt service capabilities.</p>
      
      <h3 class="text-xl font-medium mb-3">Project Scope</h3>
      <p class="mb-4">The analysis covered 15 municipal entities across Texas, ranging from small rural utilities to mid-sized cities, focusing on:</p>
      <ul class="mb-6 space-y-2">
        <li>• Debt service coverage analysis</li>
        <li>• Liquidity and cash flow assessment</li>
        <li>• Revenue stability evaluation</li>
        <li>• Long-term liability management</li>
        <li>• Capital planning effectiveness</li>
      </ul>
      
      <h3 class="text-xl font-medium mb-3">Key Metrics Analyzed</h3>
      <ul class="mb-6 space-y-2">
        <li>• Debt Service Coverage Ratio (DSCR)</li>
        <li>• Days Cash on Hand</li>
        <li>• Operating Ratio</li>
        <li>• Debt to Asset Ratio</li>
        <li>• Revenue Growth Rate vs. Expenditure Growth Rate</li>
      </ul>
      
      <h3 class="text-xl font-medium mb-3">Impact</h3>
      <p class="mb-4">The analysis identified potential financial risks in three entities, leading to proactive advisory services that helped restructure approaching debt obligations and improve fiscal planning. For two municipalities, our analysis supported successful bond rating improvements.</p>
      
      <div class="flex justify-end">
        <a href="#" class="px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/80 transition-colors duration-300">View Methodology</a>
      </div>
    `,
  },
];

// Academic interests data
export const interests: InterestType[] = [
  {
    title: "Efficient Market Hypothesis",
    description:
      "Exploring the validity of EMH in modern markets, with particular focus on information asymmetry and behavioral factors that contribute to market inefficiencies.",
    icon: "fas fa-balance-scale-right",
  },
  {
    title: "Interest Rate Risk",
    description:
      "Analyzing how fluctuations in interest rates affect various financial instruments and developing strategies to mitigate risk exposure in institutional portfolios.",
    icon: "fas fa-chart-line",
  },
  {
    title: "Public Finance",
    description:
      "Investigating the mechanisms of municipal bond markets, fiscal policy impacts, and optimizing public sector capital allocation for maximum social benefit.",
    icon: "fas fa-landmark",
  },
];

// Blog post data
export const blogPosts: BlogPostType[] = [
  {
    title: "The Impact of AI on Financial Markets",
    date: "May 15, 2023",
    preview:
      "Exploring how artificial intelligence and machine learning algorithms are transforming trading strategies, risk management, and market efficiency. Are we heading toward a more efficient market, or is AI creating new forms of information asymmetry?",
  },
  {
    title: "Rethinking Modern Portfolio Theory",
    date: "April 3, 2023",
    preview:
      "A critical examination of MPT's assumptions in today's market environment. How can investors adapt traditional portfolio construction techniques to account for changing correlations and non-normal return distributions?",
  },
  {
    title: "Public Finance in the Post-Pandemic Era",
    date: "March 12, 2023",
    preview:
      "Analyzing how municipal and state governments are adapting their financing strategies following the fiscal challenges of the pandemic. What innovations in public finance are emerging, and how might they reshape government funding models?",
  },
  {
    title: "Quantitative Easing: Long-term Implications",
    date: "February 28, 2023",
    preview:
      "Examining the lasting effects of expansionary monetary policy on asset prices, inflation expectations, and market dynamics. How have traditional valuation models been affected by prolonged low interest rates?",
  },
];
