export interface ProjectType {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  content: string;
  pdfUrl?: string;
  hasPreview?: boolean;
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
      "https://img.ctykit.com/cdn/wa-bellevue/images/tr:w-900/8_16_17_member_the_boeing_company.jpg",
    tags: ["Financial Analysis", "Equity Valuation", "Industry Research"],
    pdfUrl: "https://drive.google.com/file/d/1mAMPFzCaC-Oc5XHnGcFW7ubHwlyfmpQ4/view?usp=drive_link", 
    hasPreview: true,
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
        <li>• Free Cash Flow Valuation</li>
        <li>• Scenario Analysis (Bull, Base, Bear cases)</li>
      </ul>
      
      <h3 class="text-xl font-medium mb-3 mt-8">Report Preview</h3>
      <div class="mb-6 preview-placeholder bg-muted p-4 rounded-md flex items-center justify-center h-96">
        <p class="text-muted-foreground">Please contact me if this preview is not avaliable</p>
      </div>
      
      <div class="flex justify-end gap-4">
        <button class="px-4 py-2 bg-secondary text-secondary-foreground font-medium rounded hover:bg-secondary/80 transition-colors duration-300 view-preview-btn">
          View in Browser
        </button>
        <a href="#" download class="px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/80 transition-colors duration-300">
          Download PDF
        </a>
      </div>
    `,
  },
  {
    id: "mandelbrot-excel",
    title: "Mandelbrot Set in Excel -- Work in Progress",
    description:
      "A mathematical and visual exploration of fractal geometry using only Microsoft Excel, showcasing the computational power hidden in spreadsheets.",
    image:
      "https://drive.google.com/file/d/1UJnI-WSsydpFUuogEREPEFHP6oup4zVF/view?usp=drive_link",
    tags: ["Fractals", "Excel", "Complex Numbers", "Visualization"],
    content: `
      <p class="mb-4">This project demonstrates the generation of the Mandelbrot set—a complex fractal pattern—entirely within Microsoft Excel. Built during my free time as an experimental dive into visual mathematics, it blends the iterative formula Z = Z² + C with Excel’s conditional formatting and complex number logic.</p>
  
      <h3 class="text-xl font-medium mb-3">Technical Breakdown</h3>
      <p class="mb-4">The spreadsheet uses Excel's complex number functions to iterate over a grid of complex values. Each cell represents a point on the complex plane and determines escape time (number of iterations until divergence), which is then visualized using conditional formatting.</p>
      <ul class="mb-6 space-y-2">
        <li>• Utilized <code>IMPRODUCT</code>, <code>IMSUM</code>, and <code>IMABS</code> for core logic</li>
        <li>• Escaping iterations capped at 50 for performance</li>
        <li>• Dynamic color gradient based on divergence speed</li>
        <li>• Custom zoom settings for deeper fractal layers</li>
      </ul>
  
      <h3 class="text-xl font-medium mb-3">What I Learned</h3>
      <ul class="mb-6 space-y-2">
        <li>• Iterative math in a non-programmatic environment</li>
        <li>• Creative problem-solving under Excel’s formula constraints</li>
        <li>• How fractals reveal patterns within infinite complexity</li>
      </ul>
  
      <h3 class="text-xl font-medium mb-3">Why It Matters</h3>
      <p class="mb-4">This project proves that advanced mathematical concepts and visualizations can be implemented with tools outside traditional programming. It pushed Excel to its limits and turned a purely mathematical pattern into a fully functional spreadsheet visualization.</p>
  
      <div class="flex justify-end">
        <a href="#" class="px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/80 transition-colors duration-300">Download Excel File</a>
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
    title: "A Deep Dive into the Human Psychology of Finance",
    date: "Arpil 7, 2025",
    preview:
      "A reflective look at how emotion, perception, and cognitive bias drive financial behavior — revealing that markets are as much psychological landscapes as they are numerical systems.",
  },
  {
    title: "Rethinking Modern Portfolio Theory",
    date: "April 3, 2023",
    preview:
      "A critical examination of MPT's assumptions in today's market environment. How can investors adapt traditional portfolio construction techniques to account for changing correlations and non-normal return distributions?",
  },
  {
    title: "How Video Game Markets Produce Safe Assets",
    date: "March 10, 2025",
    preview:
      "Lorum Ipsum",
  },
  {
    title: "How The Ikon Pass Could Lead to the Destruction of Skiing",
    date: "Arpil 28, 2025",
    preview:
      "Lorum Ipsum",
  },
];
