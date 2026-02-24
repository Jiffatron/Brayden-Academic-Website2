export interface ProjectType {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  content: string;
  pdfUrl?: string;
  hasPreview?: boolean;
  position: number; // For ordering projects in displays
  blurb?: string; // Short header blurb for flagship pages
}

// SEO-friendly slug redirects (301 redirects for old URLs)
export const PROJECT_REDIRECTS: Record<string, string> = {
  "BondTracker": "bond-dashboard",
  "RiskModelingEngine": "risk-engine",
  "MarketMicrostructureModel": "market-microstructure",
  "ComplexSystemsVisualizationExcel": "mandelbrot-excel"
};

export interface InterestType {
  title: string;
  description: string;
  icon: string;
}

export interface BlogPostType {
  slug: string;
  title: string;
  date: string;
  preview: string;
  content: string;
}

// Project data
export const projects: ProjectType[] = [
  {
    id: "boeing",
    title: "Equity Research: Boeing",
    description:
      "Comprehensive analysis of Boeing's financial position, market strategy, and outlook in the aerospace industry. Includes a free cash flow valuation model, peer comparisons, and scenario-based projections.",
    image:
      "https://img.ctykit.com/cdn/wa-bellevue/images/tr:w-900/8_16_17_member_the_boeing_company.jpg",
    tags: ["Financial Analysis", "Equity Valuation", "Industry Research"],
    pdfUrl: "/Boeing_Equity_Research_Report.pdf",
    hasPreview: true,
    position: 4,
content: `
      <p class="mb-4">
        This equity research project examines Boeing's financial position and strategic direction following recent challenges, including the 737 MAX grounding and pandemic-related impacts on global aviation. The report assesses the company’s recovery prospects, operational performance, and competitive position in the aerospace sector.
      </p>
      
      <h3 class="text-xl font-medium mb-3">Key Findings</h3>
      <ul class="mb-6 space-y-2">
        <li>• Long-term growth potential supported by strong order backlog despite near-term volatility</li>
        <li>• Defense division providing stability during commercial aviation downturns</li>
        <li>• Free cash flow projections improving for the 2023–2025 period</li>
        <li>• Supply chain recovery expected to increase production capacity</li>
      </ul>
      
      <h3 class="text-xl font-medium mb-3">Valuation Summary</h3>
      <p class="mb-4">
        Using a discounted cash flow model with a weighted average cost of capital of 8.7% and a terminal growth rate of 2.5%, my analysis estimated a fair value of $73 per share. At the time of the report, this indicated the stock was overvalued by approximately 257.74%.
      </p>
      
      <h3 class="text-xl font-medium mb-3">Methodologies</h3>
      <ul class="mb-6 space-y-2">
        <li>• Comparable Company Analysis</li>
        <li>• Free Cash Flow Valuation</li>
        <li>• Scenario Analysis for bull, base, and bear cases</li>
      </ul>
      
      <h3 class="text-xl font-medium mb-3 mt-8">Report Preview</h3>
      <div class="mb-6 rounded-md overflow-hidden shadow-lg w-full">
        <iframe
          src="/Boeing_Equity_Research_Report.pdf"
          className="w-full h-[400px] md:h-[500px] lg:h-[600px] border border-primary/20 rounded-lg"
          title="Boeing Equity Research Report Preview"
          style="width: 100%; min-height: 400px; aspect-ratio: 16/10;">
          <p class="text-muted-foreground p-4">
            Your browser does not support PDF preview. Please use the download button below to view the full report.
          </p>
        </iframe>
      </div>
    `,


  },
  {
    id: "mandelbrot-excel",
    title: "Mandelbrot set visualization in Excel to explore iterative complexity.",
    description:
      "Built entirely in Excel, this project visualizes the Mandelbrot set and its infinite fractal patterns. While primarily a math-and-visualization exercise, it informed my approach to rendering heatmaps and distributions in financial contexts, particularly within the Risk Modeling Engine. It also showcases my ability to push familiar tools beyond conventional use cases.",
    image:
      "https://i.imgur.com/kLamLkF.png",
    tags: ["Fractals", "Excel", "Complex Numbers", "Visualization"],
    position: 5,
content: `
      <p class="mb-4">This project demonstrates the generation of the Mandelbrot set, a complex fractal pattern, entirely within Microsoft Excel. Built as part of my <strong>Finance Lab</strong> ecosystem, it began as a personal exploration into visual mathematics but evolved into a foundation for how I render probability heatmaps and distribution visualizations in my <em>Risk Modeling Engine</em>.</p>
  
      <h3 class="text-xl font-medium mb-3">Technical Breakdown</h3>
      <p class="mb-4">The spreadsheet uses Excel's complex number functions to iterate over a grid of complex values. Each cell represents a point on the complex plane and determines escape time, measured as the number of iterations until divergence. This is visualized using conditional formatting. The process mirrors iterative behaviors in finance, such as compounding and risk projection.</p>
      <ul class="mb-6 space-y-2">
        <li>• Utilized <code>IMPRODUCT</code>, <code>IMSUM</code>, and <code>IMABS</code> for iterative logic</li>
        <li>• Escape iterations capped at 50 for performance optimization</li>
        <li>• Dynamic color gradient based on divergence speed</li>
        <li>• Custom zoom and scaling for maximum visual clarity</li>
      </ul>
  
      <h3 class="text-xl font-medium mb-3">What I Learned</h3>
      <ul class="mb-6 space-y-2">
        <li>• How to model iterative math in a non-programming environment</li>
        <li>• Creative problem-solving within Excel’s formula constraints</li>
        <li>• Practical parallels between fractal complexity and financial market modeling</li>
      </ul>
  
      <h3 class="text-xl font-medium mb-3">Why It Matters</h3>
      <p class="mb-4">This project shows that advanced mathematical concepts can be expressed in unconventional tools. By linking it to my financial risk work, it turns what might be a niche visualization into a transferable skill, using familiar software to communicate complex ideas effectively.</p>
  
      <div class="flex justify-end">
        <a href="https://imgur.com/a/W87udOf" class="px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/80 transition-colors duration-300">MVP Available</a>
      </div>
    `,
  },
  {
    id: "bond-dashboard",
    title: "Public Market Dashboard",
    description:
      "Visualizing municipal bond data to make financial disclosures clearer for investors and local constituents. Designed to centralize complex public finance information into an accessible and transparent format.",
    image: "https://i.imgur.com/eW2Mn3S.png",
    tags: ["Public Finance", "AI Integration", "Financial Data Automation"],
    pdfUrl: "",
    hasPreview: false,
    position: 3,
content: `
      <p class="mb-4">
        This ongoing project was inspired by my internship at the Municipal Advisory Council of Texas, where I worked directly with investor-facing data from school district bond issuances. The goal is to centralize and simplify complex financial disclosures that both investors and municipalities rely on, making it easier for the public to understand how county and district-level finances affect them.
      </p>

      <h3 class="text-xl font-medium mb-3">Planned Features</h3>
      <ul class="mb-6 space-y-2">
        <li>• Parsing a combination of automated and manually reviewed financial statements</li>
        <li>• Extraction of key metrics including assessed property values, top taxpayers, and total fund balances</li>
        <li>• Integration with Notion for update logging and source statement documentation</li>
        <li>• Interactive dashboard for visualizing municipal bond metrics over time</li>
        <li>• Potential use of AI for statement summarization and classification where parsing constraints exist</li>
      </ul>

      <h3 class="text-xl font-medium mb-3">Current Status</h3>
      <p class="mb-4">
        The initial site framework was quickly built using AI-assisted tools to accelerate development. While it is not yet public-ready, an MVP is available for preview. I am currently refining the data parsing logic, improving the UI, and building connections to other projects in my portfolio such as my Risk Modeling Engine.
      </p>

      <div class="mb-6">
        <h4 class="text-lg font-medium mb-3">Live MVP Demo</h4>
        <p class="mb-4">
          Experience the current version of the Texas Municipal Bond Tracker with early-stage data parsing and visualization features.
        </p>
        <div class="flex gap-4">
          <a href="https://jiffatron.github.io/TexasBondTracker/" target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/80 transition-colors duration-300 inline-flex items-center gap-2">
            <i class="fas fa-external-link-alt"></i>
            View Live MVP
          </a>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-border">
        <h3 class="text-xl font-medium mb-3">How this connects</h3>
        <p class="text-muted-foreground">
          The risk tile uses my <a href="/projects/risk-engine" class="text-primary hover:underline">Risk Modeling Engine</a> and the alert text is shaped by findings from my <a href="/projects/market-microstructure" class="text-primary hover:underline">Market Microstructure work</a>.
        </p>
      </div>
    `,

  },
  {
    id: "risk-engine",
    title: "Risk Modeling Engine",
    description:
      "A lightweight simulation engine that runs probabilistic models to estimate outcome ranges under varying inputs, including interest rate changes, revenue fluctuations, and liquidity constraints. Designed to be modular so it can integrate directly into other projects such as the Public Market Dashboard for scenario-based insights. The visualization approach is influenced by earlier work in complex systems mapping.",
    image: "/images/projects/Basic Simulation (50 paths).png",
    tags: ["Python", "Monte Carlo Simulation", "Financial Modeling", "Statistical Analysis"],
    pdfUrl: "",
    hasPreview: false,
    position: 2,
  content: `
    <h3 id="abstract" class="text-xl font-medium mb-4">Part 1: Foundation & Abstract</h3>

    <div class="mb-6 grid md:grid-cols-2 gap-4 monte-carlo-images">
      <div class="scroll-reveal-image" data-direction="left" data-delay="0">
        <div class="expandable-image" data-src="/images/projects/Basic Simulation (50 paths).png" data-alt="Monte Carlo Simulation - 50 Paths"></div>
      </div>
      <div class="scroll-reveal-image" data-direction="right" data-delay="0.1">
        <div class="expandable-image" data-src="/images/projects/Basic Simulation (100 paths).png" data-alt="Monte Carlo Simulation - 100 Paths"></div>
      </div>
    </div>

    <div class="text-center mb-6">
      <button onclick="document.getElementById('python-part1').scrollIntoView({ behavior: 'smooth' })" class="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
        View Python Code for Part 1
      </button>
    </div>

    <h4 id="methodology" class="text-lg font-medium mb-3">Abstract</h4>
    <p class="mb-4">
      The goal of this simulation is to demonstrate the expected return and volatility of a given stock with set parameters. Using the function numpy, which is a random number generator, we can model a normal distribution using Geometric Brownian motion. The current model aims to show the distribution of prices over a given time horizon and how much they can deviate from the mean.
    </p>

    <p class="mb-4">
      This model assumes a constant return over the time horizon, and constant annual volatility. This model lacks the true random deviation of stock prices as it is a uniform analysis of Geometric Brownian Motion.
    </p>

    <p class="mb-6">
      Each time a simulation is run, even with the same number of simulations, stock prices can change significantly, most notably on the outliers. For the most part, much of the mean stays in line every simulation as again this is a normal distribution. By adding some statistical functions, we can measure the output of each given scenario.
    </p>
    <h3 id="simulation" class="text-xl font-medium mb-4 mt-8">Part 2: Statistical Significance Through Repetition</h3>

    <div class="mb-6 grid md:grid-cols-2 gap-4 monte-carlo-images">
      <div class="scroll-reveal-image" data-direction="scale" data-delay="0">
        <div class="expandable-image" data-src="/images/projects/Basic Simulation (50 paths - Stats).png" data-alt="Monte Carlo Simulation - 50 Paths Statistics"></div>
      </div>
      <div class="scroll-reveal-image" data-direction="scale" data-delay="0.15">
        <div class="expandable-image" data-src="/images/projects/Basic Simulation (100 paths-stats).png" data-alt="Monte Carlo Simulation - 100 Paths Statistics"></div>
      </div>
    </div>

    <div class="text-center mb-6">
      <button onclick="document.getElementById('python-part2').scrollIntoView({ behavior: 'smooth' })" class="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
        View Python Code for Part 2
      </button>
    </div>

    <p class="mb-4">
      Adding statistical metrics allows us to further expand on the basic simulation by repeating this operation using what is effectively a loop over n times before the data appears. In this case 50 or 100 simulations were run to find some realistic expectations of the outcomes.
    </p>

    <p class="mb-4">
      We could instead just increase the number of simulations, however by doing so much of the data is lost in translation and has nothing to compare itself to rendering it statistically insignificant. By running the simulation over n times, we can effectively rid some of the major outliers present in larger data sets and the algorithms inherent bias towards fixed randomness.
    </p>

    <p class="mb-6">
      This gives the data some truth and more accurately reflects the uncertainty and volatility over a given stock price. In every simulation ran, all data sets eventually converge into a normal distribution.
    </p>
    <h3 id="results" class="text-xl font-medium mb-4 mt-8">Part 3: Rationale & Methodology</h3>

    <div class="mb-6 grid md:grid-cols-2 gap-4 monte-carlo-images">
      <div class="scroll-reveal-image" data-direction="up" data-delay="0">
        <div class="expandable-image" data-src="/images/projects/Basic Simulation (50x100 paths-stats).png" data-alt="Monte Carlo Simulation - 50x100 Paths Statistics"></div>
      </div>
      <div class="scroll-reveal-image" data-direction="up" data-delay="0.2">
        <div class="expandable-image" data-src="/images/projects/Basic Simulation (100x100 paths-stats).png" data-alt="Monte Carlo Simulation - 100x100 Paths Statistics"></div>
      </div>
    </div>

    <div class="text-center mb-6">
      <button onclick="document.getElementById('python-part3').scrollIntoView({ behavior: 'smooth' })" class="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
        View Python Code for Part 3
      </button>
    </div>

    <h4 class="text-lg font-medium mb-3">Rationale</h4>
    <p class="mb-4">
      Instead of blindly running 10,000 paths in a single iteration, I structured the randomness by repeating narrower simulations (50 and 100 paths) across 100 independent runs. This approach better reflects how uncertainty plays out across time and scenarios, making the results more generalizable and statistically sound.
    </p>

    <p class="mb-4">
      It also emphasizes how much variation can exist between simulations, not just one massive data set. This approach to statistics makes these ideas easily scalable when adding more nuance to the functions. By eliminating the inherent bias of the numpy and running the simulation as its own, we get a more practical real-world approach.
    </p>

    <p class="mb-6">
      A single 10,000-path simulation provides density, but it samples only once from the random space. Running 100 separate 50- or 100-path simulations allows us to observe inter-sample variation, which is critical when studying how volatility expresses itself across time, not just within a single scenario.
    </p>
    <h3 id="conclusion" class="text-xl font-medium mb-4 mt-8">Future Implementation</h3>
    <p class="mb-4">
      Soon I plan to use a variation of this model to document the logistic nature of options arbitrage. By running simulations for a specific strike price of multiple time horizons we can see where arbitrage theory becomes a practical real-world opportunity.
    </p>

    <p class="mb-6">
      The follow-up aims to demonstrate the true power of institutional investors and algorithmic traders, who exploit arbitrage opportunities in near real-time. In doing so, I hope to highlight how these advanced statistical pricing models, when understood correctly, can also provide leverage to smaller investors seeking asymmetric advantages.
    </p>
    <h3 class="text-xl font-medium mb-4 mt-8">Python Code Implementation</h3>

    <p class="mb-6 text-muted-foreground">
      The complete Python implementations for all three parts are provided below. Each section corresponds to the visualizations shown above and demonstrates different aspects of Monte Carlo simulation.
    </p>

    <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <h4 class="text-lg font-medium mb-2 text-blue-800 dark:text-blue-200">Prerequisites</h4>
      <p class="text-blue-700 dark:text-blue-300 mb-2">
        <strong>Required:</strong> NumPy and Matplotlib must be installed. Install using:
      </p>
      <ul class="text-blue-700 dark:text-blue-300 text-sm">
        <li>• <strong>Windows:</strong> <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">pip install numpy matplotlib</code></li>
        <li>• <strong>Linux/Mac:</strong> <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">pip3 install numpy matplotlib</code></li>
      </ul>
    </div>

    <div class="text-center mb-8">
      <button onclick="document.getElementById('top').scrollIntoView({ behavior: 'smooth' })" class="inline-flex items-center px-4 py-2 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <polyline points="18,15 12,9 6,15"></polyline>
        </svg>
        Back to Top
      </button>
    </div>

    <!-- Part 1 Python Code -->
    <div id="python-part1" class="mb-8">
      <h4 class="text-lg font-medium mb-3 text-blue-800 dark:text-blue-200">Part 1: Basic Monte Carlo Simulation</h4>
      <p class="mb-4 text-sm text-muted-foreground italic">
        *Copy and paste this code into your Python environment and run*
      </p>
      <div class="mb-4">
        <a href="/code/monte-carlo-basic.py" download class="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Python File
        </a>
      </div>
      <div class="python-code-block mb-6 relative">
        <button onclick="copyToClipboard('python-code-1')" class="absolute top-3 right-3 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors z-10">
          <i class="fas fa-copy mr-1"></i>Copy
        </button>
        <pre id="python-code-1"><code><span class="comment"># Demonstrating the capabilities of Python on Monte Carlo Simulations for Market Returns and Arbitrage Options Trading</span>
<span class="comment"># The Parameters serve as the inputs, simply input a stock price of your chosen stock and the expected return and volatility and the number of simulations you want to run</span>
<span class="comment"># These simulations are based on Geometric Brownian Motion and are not meant to be used for actual trading, but rather for educational purposes</span>

<span class="keyword">import</span> numpy <span class="keyword">as</span> np                <span class="comment"># NumPy is imported as np to handle the numerical operations and random number generation</span>
<span class="keyword">import</span> matplotlib.pyplot <span class="keyword">as</span> plt   <span class="comment"># Imported as a plt to plot the results</span>

<span class="comment"># Parameters (Inputs)</span>
initial_price = <span class="number">150</span>               <span class="comment"># Starting stock price</span>
mu = <span class="number">0.08</span>                         <span class="comment"># Expected annual return (Decimal)</span>
sigma = <span class="number">0.2</span>                       <span class="comment"># Annual volatility (Decimal)</span>
T = <span class="number">1</span>                             <span class="comment"># Time in years (Divide if you want to run for a shorter period)</span>
steps = <span class="number">252</span>                       <span class="comment"># Number of trading days in a year</span>
n_simulations = <span class="number">100</span>               <span class="comment"># Number of Monte Carlo paths to simulate (Visual results are best at lower numbers)</span>

dt = T / steps                    <span class="comment"># Time step</span>

<span class="comment"># Simulations</span>
price_paths = np.<span class="function">zeros</span>((steps, n_simulations))           <span class="comment"># Creates a 2D array filled with zeros</span>
price_paths[<span class="number">0</span>] = initial_price                           <span class="comment"># First row of each simulation is set to the initial price</span>

<span class="keyword">for</span> i <span class="keyword">in</span> <span class="function">range</span>(<span class="number">1</span>, steps):                                <span class="comment"># Sets up a basic loop that calculates the next days stock price based on Geometric Brownian Motion</span>
    rand = np.random.<span class="function">standard_normal</span>(n_simulations)      <span class="comment"># Creates n_simulations random numbers from a standard normal distribution (mean = 0, std = 1)</span>
    price_paths[i] = price_paths[i - <span class="number">1</span>] * np.<span class="function">exp</span>((mu - <span class="number">0.5</span> * sigma ** <span class="number">2</span>) * dt + sigma * np.<span class="function">sqrt</span>(dt) * rand)     <span class="comment">#Takes the previous days price and multiplies it by the expected return and volatility to get the next days price</span>

<span class="comment"># Plotting</span>
plt.<span class="function">figure</span>(figsize=(<span class="number">12</span>, <span class="number">6</span>))                                          <span class="comment"># Sets the size of the plot (Window)</span>
plt.<span class="function">plot</span>(price_paths, linewidth=<span class="number">1</span>)                                   <span class="comment"># Plots the price paths</span>
plt.<span class="function">title</span>(<span class="string">"Monte Carlo Simulation of stock price (100 Paths)"</span>)       <span class="comment"># Sets the title of the plot</span>
plt.<span class="function">xlabel</span>(<span class="string">"Time Step (Days)"</span>)                                       <span class="comment"># Sets the x-axis label</span>
plt.<span class="function">ylabel</span>(<span class="string">"Price"</span>)                                                  <span class="comment"># Sets the y-axis label</span>
plt.<span class="function">grid</span>(<span class="boolean">True</span>)                                                       <span class="comment"># Adds a grid to the plot</span>
plt.<span class="function">show</span>()                                                           <span class="comment"># Shows the plot</span>
        </code></pre>
      </div>
    </div>

    <!-- Part 2 Python Code -->
    <div id="python-part2" class="mb-8">
      <h4 class="text-lg font-medium mb-3 text-blue-800 dark:text-blue-200">Part 2: Statistical Analysis with Repeated Simulations</h4>
      <p class="mb-4 text-sm text-muted-foreground italic">
        *This code runs multiple simulations and provides statistical analysis*
      </p>
      <div class="mb-4">
        <a href="/code/monte-carlo-stats.py" download class="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Python File
        </a>
      </div>
      <div class="python-code-block mb-6 relative">
        <button onclick="copyToClipboard('python-code-2')" class="absolute top-3 right-3 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors z-10">
          <i class="fas fa-copy mr-1"></i>Copy
        </button>
        <pre id="python-code-2"><code><span class="comment"># Demonstrating the capabilities of Python on Monte Carlo Simulations for Market Returns and Arbitrage Options Trading</span>
<span class="comment"># The Parameters serve as the inputs, simply input a stock price of your chosen stock and the expected return and volatility and the number of simulations you want to run</span>
<span class="comment"># These simulations are based on Geometric Brownian Motion and are not meant to be used for actual trading, but rather for educational purposes</span>

<span class="keyword">import</span> numpy <span class="keyword">as</span> np                <span class="comment"># NumPy is imported as np to handle the numerical operations and random number generation</span>
<span class="keyword">import</span> matplotlib.pyplot <span class="keyword">as</span> plt   <span class="comment"># Imported as a plt to plot the results</span>

<span class="comment"># Parameters (Inputs)</span>
initial_price = <span class="number">150</span>               <span class="comment"># Starting stock price</span>
mu = <span class="number">0.08</span>                         <span class="comment"># Expected annual return (Decimal)</span>
sigma = <span class="number">0.2</span>                       <span class="comment"># Annual volatility (Decimal)</span>
T = <span class="number">1</span>                             <span class="comment"># Time in years (Divide if you want to run for a shorter period)</span>
steps = <span class="number">252</span>                       <span class="comment"># Number of trading days in a year</span>
n_simulations = <span class="number">100</span>               <span class="comment"># Number of Monte Carlo paths to simulate (Visual results are best at lower numbers)</span>

dt = T / steps                    <span class="comment"># Time step</span>

<span class="comment"># Simulations</span>
price_paths = np.<span class="function">zeros</span>((steps, n_simulations))           <span class="comment"># Creates a 2D array filled with zeros</span>
price_paths[<span class="number">0</span>] = initial_price                           <span class="comment"># First row of each simulation is set to the initial price</span>

<span class="keyword">for</span> i <span class="keyword">in</span> <span class="function">range</span>(<span class="number">1</span>, steps):                                <span class="comment"># Sets up a basic loop that calculates the next days stock price based on Geometric Brownian Motion</span>
    rand = np.random.<span class="function">standard_normal</span>(n_simulations)      <span class="comment"># Creates n_simulations random numbers from a standard normal distribution (mean = 0, std = 1)</span>
    price_paths[i] = price_paths[i - <span class="number">1</span>] * np.<span class="function">exp</span>((mu - <span class="number">0.5</span> * sigma ** <span class="number">2</span>) * dt + sigma * np.<span class="function">sqrt</span>(dt) * rand)     <span class="comment">#Takes the previous days price and multiplies it by the expected return and volatility to get the next days price</span>

<span class="comment"># Calculate statistics for final prices</span>
final_prices = price_paths[-<span class="number">1</span>]                   <span class="comment"># Extract the last row (final day prices) from all simulation paths</span>
mean_price = np.<span class="function">mean</span>(final_prices)               <span class="comment"># Calculate the arithmetic average of all final prices</span>
median_price = np.<span class="function">median</span>(final_prices)           <span class="comment"># Find the middle value when final prices are sorted</span>
min_price = np.<span class="function">min</span>(final_prices)                 <span class="comment"># Find the lowest final price across all simulations</span>
max_price = np.<span class="function">max</span>(final_prices)                 <span class="comment"># Find the highest final price across all simulations</span>
std_price = np.<span class="function">std</span>(final_prices)                 <span class="comment"># Calculate standard deviation (measure of price spread/volatility)</span>

<span class="comment"># Calculate all percentiles (values below which a certain percentage of data falls)</span>
percentile_5 = np.<span class="function">percentile</span>(final_prices, <span class="number">5</span>)    <span class="comment"># 5% of final prices are below this value</span>
percentile_10 = np.<span class="function">percentile</span>(final_prices, <span class="number">10</span>)  <span class="comment"># 10% of final prices are below this value</span>
percentile_25 = np.<span class="function">percentile</span>(final_prices, <span class="number">25</span>)  <span class="comment"># 25% of final prices are below this value (1st quartile)</span>
percentile_50 = np.<span class="function">percentile</span>(final_prices, <span class="number">50</span>)  <span class="comment"># 50% of final prices are below this value (median/2nd quartile)</span>
percentile_75 = np.<span class="function">percentile</span>(final_prices, <span class="number">75</span>)  <span class="comment"># 75% of final prices are below this value (3rd quartile)</span>
percentile_90 = np.<span class="function">percentile</span>(final_prices, <span class="number">90</span>)  <span class="comment"># 90% of final prices are below this value</span>
percentile_95 = np.<span class="function">percentile</span>(final_prices, <span class="number">95</span>)  <span class="comment"># 95% of final prices are below this value</span>

<span class="comment"># Plotting section - Create and customize the graph</span>
plt.<span class="function">figure</span>(figsize=(<span class="number">12</span>, <span class="number">8</span>))                                          <span class="comment"># Create a new figure window with width=12 inches, height=8 inches</span>
plt.<span class="function">plot</span>(price_paths, linewidth=<span class="number">1</span>)                                   <span class="comment"># Plot all price paths as lines with thickness of 1 pixel</span>
plt.<span class="function">title</span>(<span class="string">"Monte Carlo Simulation of Stock Price (100 Paths)"</span>)        <span class="comment"># Adds a title at the top of the graph</span>
plt.<span class="function">xlabel</span>(<span class="string">"Time Step (Days)"</span>)                                       <span class="comment"># Label the horizontal axis as trading days</span>
plt.<span class="function">ylabel</span>(<span class="string">"Price"</span>)                                                  <span class="comment"># Label the vertical axis as stock price</span>
plt.<span class="function">grid</span>(<span class="boolean">True</span>)                                                       <span class="comment"># Add a grid overlay to make reading values easier</span>

<span class="comment"># Create formatted text string containing all statistical information</span>
stats_text = <span class="string">f"""Statistical Summary of Final Prices:
Mean: $\{mean_price:.2f}    Median: $\{median_price:.2f}    Std Dev: $\{std_price:.2f}
Min: $\{min_price:.2f}    Max: $\{max_price:.2f}    Range: $\{max_price - min_price:.2f}

Percentile Distribution:
5th: $\{percentile_5:.2f}    10th: $\{percentile_10:.2f}    25th: $\{percentile_25:.2f}    50th: $\{percentile_50:.2f}
75th: $\{percentile_75:.2f}    90th: $\{percentile_90:.2f}    95th: $\{percentile_95:.2f}

Initial Price: $\{initial_price:.2f}    Expected Return: \{mu*100:.1f}%    Volatility: \{sigma*100:.1f}%"""</span>  <span class="comment"># Format all statistics into a multi-line string with 2 decimal places</span>

<span class="comment"># Position the statistics text at the bottom center of the figure</span>
plt.<span class="function">figtext</span>(<span class="number">0.5</span>, <span class="number">0.02</span>, stats_text, fontsize=<span class="number">10</span>, family=<span class="string">'monospace'</span>, ha=<span class="string">'center'</span>,    <span class="comment"># Place text at x=0.5 (center), y=0.02 (bottom), center-aligned</span>
            bbox=<span class="function">dict</span>(boxstyle=<span class="string">"round,pad=0.5"</span>, facecolor=<span class="string">"lightgray"</span>, alpha=<span class="number">0.8</span>))  <span class="comment"># Adds rounded rectangle background, light gray, 80% opacity</span>

plt.<span class="function">tight_layout</span>()                                                   <span class="comment"># Automatically adjust subplot parameters to fit the figure area</span>
plt.<span class="function">subplots_adjust</span>(bottom=<span class="number">0.27</span>)                                     <span class="comment"># Reserve 27% of figure height at bottom for statistics text</span>
plt.<span class="function">show</span>()                                                           <span class="comment"># Display the completed graph with statistics on screen</span>
        </code></pre>
      </div>
    </div>

    <!-- Part 3 Python Code -->
    <div id="python-part3" class="mb-8">
      <h4 class="text-lg font-medium mb-3 text-blue-800 dark:text-blue-200">Part 3: Advanced Methodology Comparison</h4>
      <p class="mb-4 text-sm text-muted-foreground italic">
        *Advanced comparison of different simulation approaches*
      </p>
      <div class="mb-4">
        <a href="/code/monte-carlo-advanced.py" download class="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Python File
        </a>
      </div>
      <div class="python-code-block mb-6 relative">
        <button onclick="copyToClipboard('python-code-3')" class="absolute top-3 right-3 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors z-10">
          <i class="fas fa-copy mr-1"></i>Copy
        </button>
        <pre id="python-code-3"><code><span class="comment"># Demonstrating the capabilities of Python on Monte Carlo Simulations for Market Returns and Arbitrage Options Trading</span>
<span class="comment"># The Parameters serve as the inputs, simply input a stock price of your chosen stock and the expected return and volatility and the number of simulations you want to run</span>
<span class="comment"># These simulations are based on Geometric Brownian Motion and are not meant to be used for actual trading, but rather for educational purposes</span>

<span class="keyword">import</span> numpy <span class="keyword">as</span> np                <span class="comment"># Numpy is imported as np to handle the numerical operations and random number generation</span>
<span class="keyword">import</span> matplotlib.pyplot <span class="keyword">as</span> plt   <span class="comment"># Imported as a plt to plot the results</span>

<span class="comment"># Parameters (Inputs)</span>
initial_price = <span class="number">100</span>               <span class="comment"># Starting stock price</span>
mu = <span class="number">0.08</span>                         <span class="comment"># Expected annual return (Decimal)</span>
sigma = <span class="number">0.2</span>                       <span class="comment"># Annual volatility (Decimal)</span>
T = <span class="number">1</span>                             <span class="comment"># Time in years (Divide if you want to run for a shorter period)</span>
steps = <span class="number">252</span>                       <span class="comment"># Number of trading days in a year</span>
n_simulations = <span class="number">50</span>              <span class="comment"># Number of Monte Carlo paths to simulate (Visual results are best at lower numbers)</span>

dt = T / steps                    <span class="comment"># Time step</span>

<span class="comment"># TOGGLE: Set to True to run 100 iterations of the entire simulation, False for single simulation</span>
run_multiple_iterations = <span class="boolean">True</span>   <span class="comment"># Change this to False to disable the 100-iteration function</span>

<span class="keyword">def</span> <span class="function">run_single_gbm_simulation</span>():
    <span class="string">"""
    Function to run a single GBM simulation with the current parameters
    Returns the price paths array for one complete simulation
    """</span>
    <span class="comment"># Create price paths array for this simulation</span>
    paths = np.<span class="function">zeros</span>((steps, n_simulations))           <span class="comment"># Creates a 2D array filled with zeros</span>
    paths[<span class="number">0</span>] = initial_price                           <span class="comment"># First row of each simulation is set to the initial price</span>

    <span class="comment"># Run the GBM simulation</span>
    <span class="keyword">for</span> i <span class="keyword">in</span> <span class="function">range</span>(<span class="number">1</span>, steps):                          <span class="comment"># Sets up a basic loop that calculates the next days stock price based on Geometric Brownian Motion</span>
        rand = np.random.<span class="function">standard_normal</span>(n_simulations) <span class="comment"># Creates n_simulations random numbers from a standard normal distribution (mean = 0, std = 1)</span>
        paths[i] = paths[i - <span class="number">1</span>] * np.<span class="function">exp</span>((mu - <span class="number">0.5</span> * sigma ** <span class="number">2</span>) * dt + sigma * np.<span class="function">sqrt</span>(dt) * rand) <span class="comment"># Takes the previous days price and multiplies it by the expected return and volatility to get the next days price</span>

    <span class="keyword">return</span> paths

<span class="comment"># Simulations - Choose between single simulation or 100 iterations</span>
<span class="keyword">if</span> run_multiple_iterations:
    <span class="comment"># Run 100 iterations of the entire GBM simulation</span>
    <span class="function">print</span>(<span class="string">"Running 100 iterations of GBM simulation..."</span>)
    iterations = <span class="number">100</span>                                     <span class="comment"># Number of complete simulation iterations to run</span>
    all_iterations = []                                  <span class="comment"># List to store all iteration results</span>
    all_final_prices = []                               <span class="comment"># List to store all final prices from all iterations</span>

    <span class="keyword">for</span> iteration <span class="keyword">in</span> <span class="function">range</span>(iterations):                  <span class="comment"># Loop through 100 complete simulations</span>
        iteration_paths = <span class="function">run_single_gbm_simulation</span>()    <span class="comment"># Run one complete GBM simulation</span>
        all_iterations.<span class="function">append</span>(iteration_paths)           <span class="comment"># Store the complete price paths</span>
        all_final_prices.<span class="function">extend</span>(iteration_paths[-<span class="number">1</span>])    <span class="comment"># Add final prices to our master list</span>

        <span class="comment"># Progress indicator</span>
        <span class="keyword">if</span> (iteration + <span class="number">1</span>) % <span class="number">20</span> == <span class="number">0</span>:                   <span class="comment"># Print progress every 20 iterations</span>
            <span class="function">print</span>(<span class="string">f"Completed \{iteration + 1}/100 iterations"</span>)

    <span class="comment"># Convert to numpy array for easier handling</span>
    all_final_prices = np.<span class="function">array</span>(all_final_prices)       <span class="comment"># Convert list to numpy array for statistical calculations</span>
    <span class="function">print</span>(<span class="string">f"Total simulations completed: \{iterations} iterations × \{n_simulations} paths = \{len(all_final_prices)} total paths"</span>)

<span class="keyword">else</span>:
    <span class="comment"># Original single simulation</span>
    price_paths = np.<span class="function">zeros</span>((steps, n_simulations))           <span class="comment"># Creates a 2D array filled with zeros</span>
    price_paths[<span class="number">0</span>] = initial_price                           <span class="comment"># First row of each simulation is set to the initial price</span>

    <span class="keyword">for</span> i <span class="keyword">in</span> <span class="function">range</span>(<span class="number">1</span>, steps):                                <span class="comment"># Sets up a basic loop that calculates the next days stock price based on Geometric Brownian Motion</span>
        rand = np.random.<span class="function">standard_normal</span>(n_simulations)      <span class="comment"># Creates n_simulations random numbers from a standard normal distribution (mean = 0, std = 1)</span>
        price_paths[i] = price_paths[i - <span class="number">1</span>] * np.<span class="function">exp</span>((mu - <span class="number">0.5</span> * sigma ** <span class="number">2</span>) * dt + sigma * np.<span class="function">sqrt</span>(dt) * rand)     <span class="comment">#Takes the previous days price and multiplies it by the expected return and volatility to get the next days price</span>

<span class="comment"># Calculate statistics for final prices (handles both single and multiple iterations)</span>
<span class="keyword">if</span> run_multiple_iterations:
    <span class="comment"># Use all final prices from all 100 iterations</span>
    final_prices = all_final_prices                 <span class="comment"># Use the combined final prices from all iterations</span>
    total_paths = <span class="function">len</span>(all_final_prices)             <span class="comment"># Total number of price paths across all iterations</span>
<span class="keyword">else</span>:
    <span class="comment"># Use final prices from single simulation</span>
    final_prices = price_paths[-<span class="number">1</span>]                  <span class="comment"># Extract the last row (final day prices) from all simulation paths</span>
    total_paths = n_simulations                     <span class="comment"># Total paths is just the number of simulations</span>

<span class="comment"># Calculate basic statistics</span>
mean_price = np.<span class="function">mean</span>(final_prices)               <span class="comment"># Calculate the arithmetic average of all final prices</span>
median_price = np.<span class="function">median</span>(final_prices)           <span class="comment"># Find the middle value when final prices are sorted</span>
min_price = np.<span class="function">min</span>(final_prices)                 <span class="comment"># Find the lowest final price across all simulations</span>
max_price = np.<span class="function">max</span>(final_prices)                 <span class="comment"># Find the highest final price across all simulations</span>
std_price = np.<span class="function">std</span>(final_prices)                 <span class="comment"># Calculate standard deviation (measure of price spread/volatility)</span>

<span class="comment"># Calculate all percentiles (values below which a certain percentage of data falls)</span>
percentile_5 = np.<span class="function">percentile</span>(final_prices, <span class="number">5</span>)    <span class="comment"># 5% of final prices are below this value</span>
percentile_10 = np.<span class="function">percentile</span>(final_prices, <span class="number">10</span>)  <span class="comment"># 10% of final prices are below this value</span>
percentile_25 = np.<span class="function">percentile</span>(final_prices, <span class="number">25</span>)  <span class="comment"># 25% of final prices are below this value (1st quartile)</span>
percentile_50 = np.<span class="function">percentile</span>(final_prices, <span class="number">50</span>)  <span class="comment"># 50% of final prices are below this value (median/2nd quartile)</span>
percentile_75 = np.<span class="function">percentile</span>(final_prices, <span class="number">75</span>)  <span class="comment"># 75% of final prices are below this value (3rd quartile)</span>
percentile_90 = np.<span class="function">percentile</span>(final_prices, <span class="number">90</span>)  <span class="comment"># 90% of final prices are below this value</span>
percentile_95 = np.<span class="function">percentile</span>(final_prices, <span class="number">95</span>)  <span class="comment"># 95% of final prices are below this value</span>

<span class="comment"># Plotting section - Create and customize the graph (handles both single and multiple iterations)</span>
<span class="keyword">if</span> run_multiple_iterations:
    <span class="comment"># Create large figure for 100 iterations</span>
    plt.<span class="function">figure</span>(figsize=(<span class="number">16</span>, <span class="number">10</span>))                                     <span class="comment"># Create extra large figure window for multiple iterations</span>

    <span class="comment"># Plot all iterations with different colors like the original single simulation</span>
    <span class="keyword">for</span> iteration_idx, iteration_paths <span class="keyword">in</span> <span class="function">enumerate</span>(all_iterations): <span class="comment"># Loop through each of the 100 iterations</span>
        plt.<span class="function">plot</span>(iteration_paths, linewidth=<span class="number">0.5</span>, alpha=<span class="number">0.3</span>)         <span class="comment"># Plot each iteration with automatic color cycling and moderate transparency</span>

    plt.<span class="function">title</span>(<span class="string">f"Monte Carlo Simulation: 100 Iterations × \{n_simulations} Paths = \{total_paths} Total Paths"</span>, fontsize=<span class="number">14</span>, fontweight=<span class="string">'bold'</span>) <span class="comment"># Title showing total scope</span>

<span class="keyword">else</span>:
    <span class="comment"># Original single simulation plotting</span>
    plt.<span class="function">figure</span>(figsize=(<span class="number">12</span>, <span class="number">8</span>))                                     <span class="comment"># Create a new figure window with width=12 inches, height=8 inches</span>
    plt.<span class="function">plot</span>(price_paths, linewidth=<span class="number">1</span>)                              <span class="comment"># Plot all price paths as lines with thickness of 1 pixel</span>
    plt.<span class="function">title</span>(<span class="string">f"Monte Carlo Simulation of Stock Price (\{n_simulations} Paths)"</span>, fontsize=<span class="number">14</span>, fontweight=<span class="string">'bold'</span>) <span class="comment"># Title for single simulation</span>
<span class="comment"># Common plotting elements for both modes</span>
plt.<span class="function">xlabel</span>(<span class="string">"Time Step (Days)"</span>, fontsize=<span class="number">12</span>)                         <span class="comment"># Label the horizontal axis as trading days</span>
plt.<span class="function">ylabel</span>(<span class="string">"Price ($)"</span>, fontsize=<span class="number">12</span>)                                <span class="comment"># Label the vertical axis as stock price</span>
plt.<span class="function">grid</span>(<span class="boolean">True</span>, alpha=<span class="number">0.3</span>)                                           <span class="comment"># Add a grid overlay to make reading values easier</span>

<span class="comment"># Create formatted text string containing all statistical information</span>
<span class="keyword">if</span> run_multiple_iterations:
    <span class="comment"># Statistics text for multiple iterations</span>
    stats_text = <span class="string">f"""Statistical Summary of Final Prices (100 Iterations):
Mean: $\{mean_price:.2f}    Median: $\{median_price:.2f}    Std Dev: $\{std_price:.2f}
Min: $\{min_price:.2f}    Max: $\{max_price:.2f}    Range: $\{max_price - min_price:.2f}

Percentile Distribution:
5th: $\{percentile_5:.2f}    10th: $\{percentile_10:.2f}    25th: $\{percentile_25:.2f}    50th: $\{percentile_50:.2f}
75th: $\{percentile_75:.2f}    90th: $\{percentile_90:.2f}    95th: $\{percentile_95:.2f}

Total Paths: \{total_paths} (\{100} iterations × \{n_simulations} paths each)
Initial Price: $\{initial_price:.2f}    Expected Return: \{mu*100:.1f}%    Volatility: \{sigma*100:.1f}%"""</span>  <span class="comment"># Format statistics for multiple iterations</span>

<span class="keyword">else</span>:
    <span class="comment"># Statistics text for single simulation</span>
    stats_text = <span class="string">f"""Statistical Summary of Final Prices:
Mean: $\{mean_price:.2f}    Median: $\{median_price:.2f}    Std Dev: $\{std_price:.2f}
Min: $\{min_price:.2f}    Max: $\{max_price:.2f}    Range: $\{max_price - min_price:.2f}

Percentile Distribution:
5th: $\{percentile_5:.2f}    10th: $\{percentile_10:.2f}    25th: $\{percentile_25:.2f}    50th: $\{percentile_50:.2f}
75th: $\{percentile_75:.2f}    90th: $\{percentile_90:.2f}    95th: $\{percentile_95:.2f}

Initial Price: $\{initial_price:.2f}    Expected Return: \{mu*100:.1f}%    Volatility: \{sigma*100:.1f}%"""</span>  <span class="comment"># Format statistics for single simulation</span>

<span class="comment"># Position the statistics text at the bottom center of the figure</span>
plt.<span class="function">figtext</span>(<span class="number">0.5</span>, <span class="number">0.02</span>, stats_text, fontsize=<span class="number">10</span>, family=<span class="string">'monospace'</span>, ha=<span class="string">'center'</span>,    <span class="comment"># Place text at x=0.5 (center), y=0.02 (bottom), center-aligned</span>
            bbox=<span class="function">dict</span>(boxstyle=<span class="string">"round,pad=0.5"</span>, facecolor=<span class="string">"lightgray"</span>, alpha=<span class="number">0.8</span>))  <span class="comment"># Adds rounded rectangle background, light gray, 80% opacity</span>

plt.<span class="function">tight_layout</span>()                                                   <span class="comment"># Automatically adjust subplot parameters to fit the figure area</span>
plt.<span class="function">subplots_adjust</span>(bottom=<span class="number">0.27</span>)                                     <span class="comment"># Reserve 27% of figure height at bottom for statistics text</span>
plt.<span class="function">show</span>()                                                           <span class="comment"># Display the completed graph with statistics on screen</span>
        </code></pre>
      </div>
    </div>

    <!-- GISCUS_COMMENTS_PLACEHOLDER -->

    <div class="mt-12 pt-8 border-t border-border">
      <h3 class="text-xl font-medium mb-3">How this connects</h3>
      <p class="text-muted-foreground">
        The zero to one hundred score appears as a tile inside the <a href="/projects/bond-dashboard" class="text-primary hover:underline">Public Market Dashboard</a> and is tuned with microstructure findings.
      </p>
    </div>
  `
  },
  {
    id: "market-microstructure",
    title: "Market Microstructure Model",
    description:
      "Originally a SOL arbitrage prototype, this project evolved into a sandbox for studying how latency, depth, and routing decisions impact trade profitability. While the primary focus is on crypto DEXs, the principles apply to any fragmented market. Execution guardrails and alert thresholds developed here now inform the risk and alert logic in my Public Market Dashboard.",
    image: "/images/Solana-1260x787.png",
    tags: ["Crypto", "Arbitrage", "Risk Management"],
    pdfUrl: "",
    hasPreview: true,
    position: 1,
content: `
      <p class="mb-4">
        This automated trading bot was designed to identify and act on price discrepancies between exchanges and trading pairs. It operates based on a series of predefined risk controls and execution parameters. Beyond the crypto-specific context, it serves as a market microstructure research tool, providing lessons on latency management and execution reliability that extend to traditional finance systems.
      </p>
      
      <h3 class="text-xl font-medium mb-3">Key Features</h3>
      <ul class="mb-6 space-y-2">
        <li>• Trades primarily in SOL/USDC, ETH/USDC, and RAY/SOL markets</li>
        <li>• Dynamically adjusts trading strategies based on real-time market conditions and wallet activity</li>
        <li>• Detailed trade and performance logging to JSON for later analysis in Excel or other tools</li>
        <li>• Risk controls include slippage limits, liquidity threshold filters, execution delay timers, simulated preliminary execution, and rate-limit awareness</li>
        <li>• Certain proprietary functions and parameters are intentionally withheld to maintain bot integrity</li>
      </ul>

      <h3 class="text-xl font-medium mb-3">Why It Matters</h3>
      <p class="mb-4">
        The latency and execution insights from this project now inform the alert logic in my Public Market Dashboard. This creates a link between high-speed trading environments and investor-facing transparency tools, showing that lessons learned in one market type can strengthen another.
      </p>

      <p class="mb-6" align="center">
        <i>*This project is in active development. Future updates will include performance data and expanded risk analysis.*</i>
      </p>

      <div class="mt-12 pt-8 border-t border-border">
        <h3 class="text-xl font-medium mb-3">How this connects</h3>
        <p class="text-muted-foreground">
          Latency rules and liquidity checks from this work shape the alert thresholds in my <a href="/projects/bond-dashboard" class="text-primary hover:underline">Public Market Dashboard</a>.
        </p>
      </div>
    `,

  },

{
  id: "interpolation-calculator",
  title: "Interpolated Yield Curve Calculator",
  description: "A tool that calculates intermediate yields between known maturities on a yield curve using linear interpolation, allowing investors and analysts to estimate yields for any term structure point.",
  image: "https://via.placeholder.com/400x200/2563EB/FFFFFF?text=Yield+Curve+Interpolation",
  tags: ["Finance", "Yield Curve", "Interpolation", "Excel"],
  pdfUrl: "",
  hasPreview: false,
  position: 6,
  content: `
    <p class="mb-4">The Interpolated Yield Curve Calculator estimates yields for maturities not directly quoted on the Treasury curve. 
    It uses linear interpolation between two known maturity points to derive the missing yield, an essential step in bond valuation and duration analysis.</p>

    <h3 class="text-xl font-medium mb-3">Key Features</h3>
    <ul class="mb-6 space-y-2">
      <li>• Supports manual or automatic data entry for known maturities (e.g., 1Y, 2Y, 5Y, 10Y, 30Y)</li>
      <li>• Performs linear interpolation using the formula:<br><code>y = y1 + (y2 - y1) × (x - x1) / (x2 - x1)</code></li>
      <li>• Outputs the interpolated yield with 4-decimal precision</li>
      <li>• Includes a visual representation of the full yield curve and the interpolated point</li>
      <li>• Compatible with Excel and JavaScript numerical methods</li>
    </ul>

    <h3 class="text-xl font-medium mb-3">Example Calculation</h3>
    <p class="mb-4">If the 2-Year yield is 4.20% and the 5-Year yield is 4.65%, the 3-Year interpolated yield is:</p>
    <pre class="bg-gray-100 p-3 rounded-md text-sm mb-4">
    y = 4.20 + (4.65 - 4.20) × (3 - 2) / (5 - 2)
    y = 4.35%
    </pre>

    <h3 class="text-xl font-medium mb-3">Applications</h3>
    <ul class="space-y-2">
      <li>• Estimating zero-coupon yield curves for bond pricing</li>
      <li>• Deriving discount factors for fixed-income valuation</li>
      <li>• Filling missing yield data in incomplete Treasury datasets</li>
      <li>• Enhancing accuracy in duration and convexity models</li>
    </ul>
  `
},


  //{
    //id: "test4",
    //title: "Test Project 4",
    //description: "Final test project completing the set of 8 total projects, ensuring the slider handles maximum capacity effectively.",
    //image: "https://via.placeholder.com/400x200/EF4444/FFFFFF?text=Test+Project+4",
    //tags: ["Final", "Complete", "Testing"],
    //pdfUrl: "",
    //hasPreview: false,
    //position: 6,
    //content: `
      //<p class="mb-4">This is Test Project 4 - the final test project in our slider demonstration.</p>
      
     // <h3 class="text-xl font-medium mb-3">Completion Features</h3>
      //<ul class="mb-6 space-y-2">
        //<li>• Full slider capacity testing</li>
        //<li>• Edge case handling</li>
        //<li>• Performance optimization</li>
      //</ul>
    //`
  //}

];

// Academic interests data
export const interests = [
  {
    icon: "fas fa-chart-line",
    title: "Financial Risk and Modeling",
    description: "Building models that turn complex risk factors into clear, actionable insights for multiple asset classes."
  },
  {
    icon: "fas fa-calculator",
    title: "Quantitative Analysis",
    description: "Using statistical methods and data-driven models to uncover patterns in markets and test investment ideas."
  },
  {
    icon: "fas fa-coins",
    title: "Options Pricing and Derivatives",
    description: "Exploring the mechanics of derivatives and refining pricing models to improve decision making."
  },
  {
    icon: "fas fa-brain",
    title: "Machine Learning in Finance",
    description: "Applying AI techniques to spot trends, forecast outcomes, and strengthen investment strategies."
  },
  {
    icon: "fas fa-robot",
    title: "Algorithmic Trading Strategies",
    description: "Designing automated systems that execute trades based on tested quantitative research."
  },
  {
    icon: "fas fa-dice",
    title: "Monte Carlo Simulations",
    description: "Using probabilistic simulations to explore scenarios, test assumptions, and measure potential outcomes."
  }
];


// Blog posts data
export const blogPosts = [
  {
    slug: "human-psychology-of-finance",
    title: "A Deep Dive into the Human Psychology of Finance",
    date: "April 7, 2025",
    preview: "A look at how emotion, perception, and cognitive bias drive financial behavior, revealing that markets are as much psychological landscapes as they are numerical systems.",
    content: `
<p class="text-left italic mt-8 mb-2 text-base sm:text-lg text-muted-foreground">
  Estimated reading time:
  <span class="not-italic text-primary font-medium text-base sm:text-lg">17–24 minutes</span>
  <p></p>
</p>
 <h1 class="text-2xl font-semibold mb-10">Introduction: The Psychological Foundations of Markets</h1>
<p>
  Financial markets govern the very reality we live in today. In this piece I will seek to explore the intricacies of the human psyche and how it innately manufactures markets into what we see on screen. For most of my collegiate career, I understood the overall dynamics between supply and demand. They are inversely proportional, and naturally they find equilibrium based on the two variables. While this is objectively true, I have further pulled back the curtain to really find what lies beneath. In this piece we will tackle micro factors like markets, banks, and investors, and frame that into the laws and fundamental properties that govern our very universe. This aims at outlying the properties of our markets, such that even novice investors or regular people can draw the same connection.
</p>

<h1 class="text-2xl font-semibold mb-10">Einstein's Simplicity and the Beauty of Complexity</h1>
<p>
  While we do dive into some complex ideas, they will be artificially simpler so much to draw the connection. One might ask how something as insignificant as market dynamics, and the origin, function, and scale of our universe correlate whatsoever. Measuring such correlation, using normal at-scale thinking only gives you a visualization of the data. It is not until you peel back the framework to which you find some unbelievably simple and intuitive connections from seemingly ever-complex ideas. My research can be derived from simple logic coined by Albert Einstein, and I quote "Everything should be simple as possible, but not simpler". Oddly so mundane, at scale it makes perfect sense.
</p>
<p>
  Einstein came to this conclusion based on the universe's natural ability to be elegant and to find chaos from order (Chaos Theory). By instead framing the nuances of our theories of our reality we are missing the grander scheme orchestrating what we see. Einstein effectively developed special relativity, bypassing centuries of confusion around time, motion, and space into the realization that time and space are relative, and the speed of light is invariant. Something so simple in terms of complexity, given mathematics at the time, has become one of if not the most revolutionary theories of all physics.
</p>
<p>
  It is the very idea that what we view is a mere interpretation of itself inside the system, the only way to truly draw the connections outlined, is to operate in the bounds outside of the traditional system or reality as we know it. Einstein's all-encompassing quote further reinforces this idea "The supreme goal of all theory is to make the irreducible basic elements as simple and as few as possible, without having to surrender the adequate representation of a single datum of experience." Lies here are the very idea of balance, in that if your explanation is too complex, most would not understand or care to. Conversely if it is too simple you are lying to yourself by omission. This grander theme of simplifying ideas becomes even more understandable as this piece goes on.
</p>

<h1 class="text-2xl font-semibold mb-10">My Intellectual Roots and the Big Bang</h1>
<p>
  To help understand the background of what has been compiled into this piece, I will give a short excerpt on how I ended up on this path to begin with. Starting from a young age I was mostly a nerd towards the fundamental understanding of how the universe functions both in whole and in part. In 5th grade I deeply understood the surface level ideology of how the Big Bang came to fruition. In awe by seemingly nothing called Planck Epoch from zero to approximately 10^-43 seconds (1 Planck Time). This being the closest we could physically get to the exact onset of events that took place.
</p>
<p>
  The Big Bang is still currently understood to be the beginning of space and time as we know it. Yet following this logic, the statistical chances of said event happening are as close to nil as it could possibly get. Theorists have attempted to fine-tune the probability of such an event where seemingly all the universes governing properties were once one infinitely small point in nothingness. Because, as with our current knowledge, there was nothing that came before, statistically there was not before to have chances in. This magical force, so to speak, defying all possible odds as we understand today, sparked my interest in exploring our very reality.
</p>

<h1 class="text-2xl font-semibold mb-10">From Science to Finance: A Full Circle</h1>
<p>
  This early onset of knowledge had slowed as I began to grow older, and reality started to set face. It was not until I began exploring my own major field of Finance that once again, I fell in love with science, math and finance, so-much-so I can draw deep and seemingly non-existent connections between them.
</p>

<h1 class="text-2xl font-semibold mb-10">Markets as a Mirror of Human Behavior</h1>
<p>
  Let's draw our attention to something more tangible. We as humans living today, and everything we do, are a mere reflection of ourselves (Markets, Advertising, Expression). Innately, the universe follows the same principles, everything is a function of what it once was and is now (Quantum Mechanics). While the surface level connection appears to be word-jargon, there are some fundamental truths and connections to uncover.
</p>
<p>
  Again, the same principle can be applied to the stock market. Imagine instead of the exorbitant amount of complex math that governs the market, as a reflection of humans themselves. Imagine that every event, interaction, price change, and sensitivity is merely a reaction of the human psyche and not some mystical force that magically updates every nano-second. This way of thinking lays out the fundamental framework of our perceived reality.
</p>

<h1 class="text-2xl font-semibold mb-10">Entropy and Chaos: The True Engine of Efficiency</h1>
<p>
  Now, with this new-found knowledge, we have essentially broken down the market into its roots – us. To best frame this cohesiveness, its best to understand what entropy as it relates to non-thermal order or informational entropy, coined "lack of order or predictability; gradual decline into disorder." This encapsulates markets perfectly. The overall efficiency of the market increases with entropy because more chaos means more variables explored, better than encompassing the true scope.
</p>
<p>
  Conversely, chaos theory states the theory that in whole or in part, when seemingly random events with no relevant correlation, manifests into something beautiful, elegant and cohesive in nature. This same concept becomes prevalent when understanding market dynamics as in part and in whole. It is the very order (market prices) that are derived from the chaos of novice and institutional investors. This can generally be referred to as semi-strong form efficiency, stating all available knowledge is already priced into security.
</p>

<h1 class="text-2xl font-semibold mb-10">The Human Psyche as Market Catalyst</h1>
<p>
  The connection between these two seemingly uncoordinated properties is starting to make sense in terms of definition. In-fact most people would stop at this broad yet unspecified connection. However, I believe there is a much starker connection that can be made here.
</p>

        <h1 class="text-2xl font-semibold mb-10">The Human Psyche as Market Catalyst</h1>

<p>Imagine again the stock market reflects human condition rather than numbers on your screen. Now, by understanding the fundamental order from chaos theory, we can further explore the nuances. Markets are said to be reactive at any moment's notice, often misaligned with the true intrinsic value of a company. One might ask how that is possible even if institutions hold well more than half of the market's capital. One might also add, if an institutional investor holds all knowledge of market dynamics like Warren Buffet, and algorithmic trading, how do they not produce one true and objective intrinsic valuation of a company?</p>

<h2 class="text-2xl font-semibold mt-10">Chaos, Institutions, and Market Inefficiencies</h2>
<p>Short answer is because it's not possible—there is no such thing as perfect foresight, even with all the available data at hand. Along with institutional investors come novice and inexperienced investors, who do not have the necessary market knowledge to come to a true and objective intrinsic value. In fact, this duality in and of itself is the literal definition of chaos theory. Markets are not efficient because of rational institutional investors; markets are efficient because of irrational investors coupled together. Markets are heavily situational and can have very different risk profiles between institutions. So even as an institutional investor, there still is not one true objective answer at hand.</p>

<p>This discrepancy is exactly what makes our market. It reflects all the wrong, right, and everything in between that makes markets appear. It is in part this inefficiency that becomes the order that inevitably comes to fruition. This seemingly simple formula—albeit too good to be true—is what we see on our screens. This chaos, including all the right answers, wrong answers, and everything in between, is what gives the markets the necessary uncertainty and certainty that creates the profit and loss we see every day. The market at any given moment is everything all at once: knowledge, emotions, financial statements, ideocracy. It is this very principle that governs our global markets. Every possible outcome, variable, intuition is explored and thereby displayed in the price of a security.</p>

<h2 class="text-2xl font-semibold mt-10">Axiom of Choice and Infinite Outcomes</h2>
<p>While the stock market is composed of a finite number of participants and shares at any given moment, its behavior often reflects a much broader set of possible outcomes. Conceptually, this aligns with the Axiom of Choice in set theory, which permits selection from infinitely many possibilities without a defined rule. In this sense, each market state can be viewed as a weighted average of potential paths—not because there are literally infinite shares, but because the system evolves from an effectively infinite set of investor behaviors, expectations, and information states. Whether or not one assumes the Axiom of Choice, the randomness inherent in market dynamics implies that even arbitrary starting points can produce seemingly infinite variability in price movement, especially in the macro context.</p>

<h2 class="text-2xl font-semibold mt-10">Viewing Markets as Living Ecosystems</h2>
<p>Now instead of imagining one specific security, we can apply the same logic to the broader market. For this, it's easier to imagine the market being a living organism. Both have producers (market makers), consumers, predators (day-traders), and decomposers (failed positions). When shocks hit the market (like rate hikes, global events, recessions), they behave eerily like natural disasters where only the strongest survive (natural selection). Because of these dynamics we initiate a fight or flight response. To survive, diversification becomes a form of genetic variation and adaptation—where over time portfolios evolve and shift as the environment changes. It's clear in this living ecosystem that no single organism determines the narrow pathway of survival—it's the interdependence of many. The same is true for markets: long-term investors, overly speculative day traders, and institutional bankers all make a piece of the same puzzle.</p>

<h2 class="text-2xl font-semibold mt-10">Feedback Loops and Market Psychology</h2>
<p>Feedback loops that are prevalent in nature can be attributed to market performance. A good example is when markets rise, confidence grows, inviting more capital, further reinforcing any momentum. Conversely, when panic spreads, selling accelerates, creating a self-fulfilling prophecy. In ecosystems, this is called homeostatic or runaway feedback loops. This self-fulfilling prophecy is mere echoes of feedback loops happening all the time. This property is a function of the human body (homeostasis) as signals continue building on themselves until the nervous system amplifies a sensation of pain.</p>

<h2 class="text-2xl font-semibold mt-10">Stepping Back From Noise</h2>
<p>Intra-day trading can create an overabundance of noise. Following the principles laid out in this paper, it is not until you step back and pierce the veil that order arises from the chaos. Over years or even centuries we can see clear indications of past market trends that can now be coined in contingency to a certain event, i.e., the 2008 financial crisis, dot-com bubble. While in the perspective of intra-day trading the noise should in theory be a mix of all variables all at once. Through these seemingly uncorrelated events, market corrections, bubbles, and recoveries are all akin to biological adaptation. Painful, exciting, scarcity, and uncertainty emerge to find their equilibrium.</p>

<h2 class="text-2xl font-semibold mt-10">Markets and the Universe: Systems Within Systems</h2>
<p>So how does this relate to the laws that govern our universe? In the same way that markets seem to follow natural order, so too does the universe, finding coherence through chaos and stability through constant motion. Humans, like markets, are homeostatic systems: we self-regulate, react to external factors, and adapt with what we see best fit. The breakthrough for me was that everything—no matter the method of input, angle of incidence, percentage price change, feedback loop, biological tendencies—are all a function of itself. It's the natural effect of self-preservation reflected from the human psyche unto markets—it all comes from within the system it affects. The same laws that govern gravity, energy, and space are the very laws that insured us. Every strand of DNA, every neural pathway, every cell in our body is coordinated not by external design (outside of the system), but within the bounds of the system's intrinsic structure. The universe builds from within, and so does the market.</p>

<h2 class="text-2xl font-semibold mt-10">Hedging and Duality</h2>
<p>The final connection to be made is that this concept has been in front of us all along. Hedging, at its core, is a technique used to exploit the imbalance of risk between two or more positions, often in a mirror-like fashion. While it's easy to view hedging as just a mechanical strategy, it is far more than that. It's a philosophical act—one that acknowledges the duality between possible futures. Hedging operates on the principle that divergence itself can be predicted, offset, or even manipulated. And in this way, it doesn't merely protect, it participates in the probabilistic structure of markets. That realization is what compelled me to write this piece. It reframed hedging not as a narrow financial tactic, but as a universal model of balance between opposing forces.</p>

<h2 class="text-2xl font-semibold mt-10">Personal Reflection</h2>
<p>What started as a journey into finance has evolved into something much more personal. I no longer see the market as a distant mystical machine of prices and numbers. I see it as a mirror, reflecting the full scale of human nature: our logic, our emotions, our mistakes, and our brilliance. Like the universe itself, it is chaotic but still governed. Seemingly unpredictable yet bound by a set of rules.</p>

<h2 class="text-2xl font-semibold mt-10">Conclusion: The Mirror Within</h2>
<p>Perhaps I haven't uncovered answers so much as I have uncovered a lens. One that reveals the systems we build are just the very reflections of the systems within us. The deeper into finance I get, the more it becomes abundantly clear: to understand markets, we first must understand ourselves. And like all meaningful understandings, this one does not end. It evolves. It adapts. Just like the universe. Just like the market. Just like us.</p>

        `
  },
  {
    slug: "opportunity-zone-success",
    title: "Why Opportunity Zones Succeed: Where Other Programs Failed",
    date: "June 20, 2025",
    preview: "An unbiased view on how Opportunity Zones leverage free-market incentives and minimize fraud and abuse",
    content: `
        <!-- ───────────  OPPORTUNITY ZONES ARTICLE  ─────────── -->
<!-- ─────────  OPPORTUNITY ZONES ARTICLE (FULL TEXT)  ───────── -->
<p class="text-center text-gray-250 italic mt-4 text-xlg">
  <em>An unbiased view on how Opportunity Zones leverage free-market incentives and minimize fraud and abuse</em>
</p>


<!-- Opportunity Zones interactive map embed -->
<iframe
  title="Opportunity Zones Map"
  width="100%"
  height="600"
  style="min-height:600px;"
  src="https://cloud.cartovista.com/opportunitydb/maps/63ecc/Opportunity-Zones-Map?embed">
</iframe>
<p class="text-center text-gray-400 italic mt-4 text-sm"><em> *Map may take a few seconds to load*</em></p>
<p class="text-center">
  <a href="https://opportunityzones.com/tools/map/">
    Opportunity Zones Map
  </a> created by
  <a href="https://opportunityzones.com/">OpportunityZones.com</a>
</p>

<p class="text-left italic mt-8 mb-2 text-base sm:text-lg text-muted-foreground">
  Estimated reading time:
  <span class="not-italic text-primary font-medium text-base sm:text-lg">10–13 minutes</span>
</p>

<h2>What Are Opportunity Zones?</h2>
<p>Opportunity Zones (OZs) are federally designated census tracts, typically low-income or economically distressed areas, where investors can receive substantial
tax benefits by reinvesting capital gains. Established under the Tax Cuts and Jobs Act of 2017, the program aims to spur long-term private investment in
underserved communities through Qualified Opportunity Funds (QOFs). A QOF is an investment vehicle organized as a corporation or partnership that holds at
least 90% of its assets in qualified OZ property. The longer the investment is held, the greater the tax advantage gets, culminating in completely tax-free
appreciation after 10 years.</p>



<h2>Why Did Other Programs with the Same Goal Fail?</h2>
<p>Consider the Historical Underutilized Business Zone (HUBZones), a program run by the U.S. Small Business Administration (SBA). The goal was to stimulate economic development and employment growth in distressed areas by giving small businesses preferential access to federal contracts. To qualify, businesses had to meet several requirements:</p>
<ul>
  <li>Qualify as a small business under SBA standards</li>
  <li>Be at least 51% owned and controlled by U.S. citizens or a designated group</li>
  <li>Have a principal office located in a HUBZone</li>
  <li>Have at least 35% of employees living in a HUBZone</li>
</ul>
<p>The 35% employee residency rule was difficult to maintain, due to remote work and high employee turnover in underserved labor markets. Many HUBZone areas were based on outdated census tracts, making it hard to maintain eligibility. Even small statistical changes could disqualify a business, creating uncertainty. Arguably the most limiting factor was the lack of a true tax incentive. All benefits came as set-aside and price-preference contracting advantages—no tax incentive. For companies without federal contracting experience, this was a substantial barrier to entry. This certification process was slow and bureaucratic, often leading companies to invest in more profitable areas.</p>
<p>HUBZones aimed to promote growth through government allocation mechanisms, while Opportunity Zones promoted growth through a free market incentive. HUBZones' rigid requirements and misaligned incentives created a cumbersome, bureaucratic model for economic growth. Opportunity Zones addressed the shortcomings of these programs, giving investors a real reason to support underserved communities.</p>

<h2>The Birth of Opportunity Zones</h2>
<p>The idea for Opportunity Zones was first formalized in a 2015 paper titled "Unlocking Private Capital to Facilitate Economic Growth in Distressed Areas", co-authored by two bipartisan economists, Kevin Hassett and Jared Bernstein. This paper laid the foundation for the concept of using tax incentives to encourage private investment in struggling areas. It proposed using tax incentives to target the trillions of dollars in unrealized capital gains held by U.S. investors that could be channeled to underserved areas.</p>
<p>The Investing in Opportunity Act (IIOA) formed the basis for the current Opportunity Zone policy. This bill garnered support from Kevin Brady, a Republican representative from Texas. The bill was later sponsored by Senators Tim Scott (R-SC) and Cory Booker (D-NJ), as well as Representatives Ron Kind (D-WI) and Pat Tiberi (R-OH).</p>
<p>The Investing in Opportunity Act laid the foundation for what became the Opportunity Zone policy, enacted as part of the Tax Cuts and Jobs Act of 2017.</p>

<h2>How Opportunity Zones Work</h2>
<p>An Opportunity Zone is defined by the IRS under 26 section 1400Z-1 as "A census tract that is a low-income community that is designated as a qualified opportunity zone". For a low-income community to be defined as a Qualified Opportunity Zone, two requirements must be met: (1) the state's governor nominates the tract in writing, and (2) Treasury certifies it by 12/31/2026. This means states have the sole authority to designate Opportunity Zones, provided they meet the deadline outlined in the Tax Cuts and Jobs Act of 2017. Each state had a 90-day window from the start date of TCJA deemed the "determination period". A 30-day extension noted as the "consideration period" could be filled by the Secretary of State, under subsection (b)(1)(A)(ii). All U.S. states and territories qualify for this program; in Puerto Rico, ~94% of the island (863 tracts) were designated.</p>
<p>In other words, opportunity zones are a free-market, capitalistic incentive to redirect capital gains into designated Opportunity Zones. Zone designations effectively identify underserved communities, often in rural areas. New plans are underway to expand and refine the number of current opportunity zones in the U.S. with a greater focus on rural areas and military bases with tighter regulations.</p>

<h2>What is the Incentive to Invest in an Opportunity Zone</h2>
<p>Since the initial enactment of the TCJA of 2017, there have been many lucrative investment opportunities that can see tax-free appreciation. The first is a "step-up basis," which allowed investors to exclude 10% of the deferred capital gain assuming the investment was held for 5 years and exclude 15% of the deferred capital gain if the investment was held for 7 years. This "step-up basis" is no longer available (it phased out after 2021).</p>
<p>The most compelling incentive is this: If an investor holds their capital in a Qualified Opportunity Fund for 10+ years, all appreciation within said fund is completely tax-free. To take advantage of this benefit, you need to invest said capital into a Qualified Opportunity Zone by 12/31/2026. Once the capital is in an Opportunity Zone, investors have until 2048 to pull out their tax-free investment. Investors can defer the gain from the sale of an asset until 12/31/2026. It is important to distinguish between deferral of a prior capital gain (you pay taxes later) and the exclusion of future appreciation (you never pay taxes on gains earned within the QOF after 10 years).</p>

<h2>How Can a Business Become an Opportunity Zone Qualified Business</h2>
<p>For a business to be designated as an opportunity zone qualified business, a few requirements must be met. Below are the general requirements:</p>
<ul>
  <li>50% of all income produced by the Qualified Opportunity Zone Business must be generated from within the opportunity zones.</li>
  <li>70% of tangible business property must be located within the zone.</li>
</ul>
<p>While there are other special rules that follow, small businesses will have no issue taking advantage of this tax break, and the same is true for larger private equity funds.</p>

<h2>The 2020 Expansion and Regulation Shift</h2>
<p>Much of the success from Opportunity Zones comes from the post-2020 era. While the original provision had a great deal of success in mind, that came with much ambiguity and uncertainty. The original outlines for the requirements lacked specific detail and contained a significant risk of future auditing by the IRS. Opportunity Zones were placed within the confines of the Internal Revenue Service, which was uncommon for projects like these. With that being said, the Internal Revenue Service takes compliance seriously. For that reason, many of the projects that could have started were never even considered, as the risk of noncompliance could result in severe financial consequences or business failure.</p>
<p>By December 19, 2019, these previously unregulated provisions were expanded to include the fine-tuning of specific gray areas and key details. These new rules spanned 544 total pages of detail. While much of the 544 pages were focused on explaining in greater detail, many new provisions followed suit: working-capital safe harbor, investment of gross gains, and even allowed full reinvestment of net section 1231 gains.</p>

<h2>Why Opportunity Zones Succeeded</h2>
<p>Opportunity Zones are successful because they hinge on something we know already works. In the capitalistic market of the United States, incentive comes from one's self-initiative. That is in most cases to make a return on investment. OZs are not attempting to create something entirely new but instead focus on using the resources already available. Trillions of dollars of wealth remain stagnant in many sectors of the economy, untouched for good reasons. Most are still garnering a return greater than any average investment, so the investors' incentive to sell is mostly nonexistent.</p>
<p>Aligning these core capitalistic values with a non-bureaucratic and holistic approach creates this incentive. Gone are the days of relying solely on top-down investment strategies. Instead of hinging on the hope these high-capital firms will come to us, instead we will bring the opportunity to them. This approach in many cases can seem too good to be true. Firms with extensive amounts of tied up capital can garner a complete tax-free return for the next 17 years as of current legislation. While returns are limited in the short run, firms with true intrinsic value and long-term goals make such an investment too good to pass up.</p>
<p>As of 2023, over $48 billion in capital had been deployed across more than 8,000 projects nationwide, with early signs of positive impact in job creation and commercial activity in cities like Erie, PA and Stockton, CA.</p>
<p>Despite successes, some critics argue OZs have primarily benefited wealthy investors or spurred development in already-gentrifying areas. OZ 2.0 legislation attempts to address these concerns by tightening eligibility and focusing more on rural and deeply underserved regions.</p>

<h2>Case Study: Lubbock, Texas</h2>
<p>Lubbock, Texas currently has around 9 different designated opportunity zones (IRS GIS), spanning mostly the eastern part of Lubbock and north into the rest of Lubbock County. Once considered the Hub City of Texas, it is now seemingly an afterthought of development. One major factor was the EF5 tornado (6th in Texas History) on May 11th, 1970, which devastated downtown Lubbock's infrastructure. While the buildings downtown remained standing, the underlying infrastructure and people did not. Injuring 500 people and taking the lives of 26, Lubbock became the origination of the Fujita Scale created by Dr. Tetsuya Theodore and positioned Texas Tech as a national leader in wind science. This new scale went on to save many lives after this tragic event.</p>
<p>Due to the unprepared nature of Lubbock infrastructure, the town became barren for the better part of 50 years. Lubbock's downtown district still embodies the feeling of a ghost town, with only a few private companies and municipalities. Many anecdotal historical accounts suggest much of Lubbock's once booming downtown was completely lost, and many businesses were abandoned. With the application of Opportunity Zones, there has been a sharp uptick in high-dollar investment in student housing, businesses, and recreational amenities.</p>
<p>While many zones in Lubbock were not impacted by this devastating tornado, much of the town suffered from low investment and low amounts of skilled labor. Many students earned degrees in Lubbock but left to pursue careers in more developed cities. Much of Lubbock's progress will be slow, as many areas are already filled with low-income housing. Having lived in Lubbock for 4 years, this revitalization of the downtown and other seemingly forgotten areas are beginning to come back to life.</p>

<h2>CapZone Analytics as a Market Pioneer</h2>
<p>CapZone Analytics was the first major intermediary to help investors navigate these complex regulations. While the OZ program offered powerful tax incentives, many institutional and private equity firms hesitated due to unclear guidance and compliance concerns. CapZone filled this gap by providing data-driven compliance monitoring, risk assessment, and reporting tools tailored specifically to OZ investments.</p>
<p>Founded in May 2018 by Al Puchala, a Yale graduate with a diverse background spanning finance and federal policy compliance, CapZone quickly positioned itself as a trusted bridge between capital and community. The firm built its credibility by working with both seasoned investors and first-time fund managers, helping structure investments that were not only compliant, but impactful.</p>
<p>Despite having fewer than 50 employees, CapZone has become a leading force in the Opportunity Zone space. It has pioneered real-time compliance solutions, including automated alerts for Qualified Opportunity Fund (QOF) managers, zone-level impact tracking, and audit readiness tools. As new legislation moves towards expansion and tighter oversight of OZs, CapZone is uniquely positioned to scale further. This early-mover advantage, combined with a strong technical infrastructure, makes it a foundational piece in ensuring Opportunity Zones achieve their intended economic and social outcomes.</p>

<h2>The Future of OZs</h2>
<p>Opportunity Zones 2.0 is approaching. Congress is currently reshaping the Opportunity Zone program with two key legislative efforts:</p>
<ul>
  <li>The "One Big Beautiful Bill" (OBBB) – Passed by the House in May 2025</li>
  <li>The Senate Finance Committee Draft – Currently in markup but much more ambitious</li>
</ul>
<p>Both bills aim to replace the original 2017 Opportunity Zone program (TCJA-based) with a refined, modernized version starting January 1, 2027. This updated version is informally dubbed "OZ 2.0."</p>
<p><strong>Core features of OZ 2.0 include:</strong></p>
<ul>
  <li>New Zone Map (Starting 2027)</li>
  <li>Capital Gains Deferral Extended</li>
  <li>A 10% Step-Up After a Six-Year Hold</li>
  <li>Enhanced Rural Focus</li>
  <li>IRS Reporting and Enforcement</li>
</ul>
<p>The new zone map requires tracts to meet a 70% state/metro Median Family Income (MFI) threshold, cutting around ~22% of current zones (Estimation, not law). Capital gains realized after 2026 can be deferred until Dec 31, 2033, or indefinitely if the Senate version passes. It offers a 10% step-up after a six-year period (plus up to 20% extra for rural projects). Rural tracts gain special benefits like lower rehab thresholds and larger basis boosts. OZ 2.0 introduces mandatory compliance reporting, funding for enforcement, and penalties for QOFs that do not comply.</p>
<p>The "One Big Beautiful Bill" (OBBB) and the Senate Finance Committee draft are largely the same provision but with slightly different wordings and timelines. The OBBB targets the same timeframe as the OZ 1.0, lengthening the program in the short term but lacking long-term structure with a focus on 30% rural zones. The Senate Finance Committee draft focuses on creating a permanent OZ program (rolling 10-year maps and deferral dates). This bill is much more ambitious and is like the current OZ 1.0 regulation.</p>
<p>OZ 2.0 marks a reboot of the original program, not a repeal, but a refinement. The same powerful tax incentives remain in place. But this time with stronger rules, more focus on equity, and greater accountability. It is likely we will have a guaranteed answer within the next 6 months. The broader Tax Cuts and Jobs Act of 2017 is set to sunset in 2026, which includes several individual tax provisions, making this an urgent moment for Opportunity Zone reform.</p>

<h2>Conclusion</h2>
<p>Opportunity Zones began as a bold experiment to reshape how America approaches community revitalization—one that put free-market forces at the center of policy. Unlike failed programs of the past, OZs gave investors a reason to bet on forgotten communities, and it worked.</p>
<p>Now with OZ 2.0 on the way, Congress is set to improve what has already succeeded. Whether through a permanent Senate plan or the House's extension, the future of OZs is clearer, stronger, and more focused, especially on rural areas.</p>
<p>This is not a new idea; it is a sharper, more refined evolution of the original. And this time, the groundwork is already in place.</p>

<h2>References</h2>
<ul>
  <li>Tax Cuts and Jobs Act of 2017, H.R.1, 115th Cong. (2017). <a href="https://www.congress.gov/bill/115th-congress/house-bill/1" target="_blank">Link</a></li>
  <li>Bernstein, J., &amp; Hassett, K. A. (2015). Unlocking Private Capital to Facilitate Economic Growth in Distressed Areas. Economic Innovation Group. <a href="https://eig.org/opportunityzones/" target="_blank">Link</a></li>
  <li>Internal Revenue Service (IRS). (n.d.). Opportunity Zones Frequently Asked Questions. <a href="https://www.irs.gov/newsroom/opportunity-zones-frequently-asked-questions" target="_blank">Link</a></li>
  <li>Economic Innovation Group. (2023). Opportunity Zones Program Tracker. <a href="https://eig.org/opportunity-zones/" target="_blank">Link</a></li>
  <li>U.S. Small Business Administration (SBA). (n.d.). HUBZone Program. <a href="https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program" target="_blank">Link</a></li>
  <li>CapZone Analytics. (2024). Opportunity Zone Compliance &amp; Monitoring Services. <a href="https://www.capzoneanalytics.com/" target="_blank">Link</a></li>
  <li>U.S. Congress – Senate Finance Committee. (2025). Opportunity Zones Expansion and Reform Draft Legislation (Markup Summary). [Exact markup not publicly released yet – referenced from legislative summaries and testimony excerpts.]</li>
  <li>U.S. House of Representatives. (2025). "One Big Beautiful Bill" (Opportunity Zones Extension Act of 2025). [Bill text not publicly assigned a number at time of writing – sourced from committee updates and media briefings.]</li>
  <li>Urban Institute. (2023). Evaluating Opportunity Zones: Early Impacts on Local Investment. <a href="https://www.urban.org/research/publication/evaluating-opportunity-zones" target="_blank">Link</a></li>
  <li>U.S. Department of the Treasury. (n.d.). Qualified Opportunity Zones Map. <a href="https://www.cdfifund.gov/opportunity-zones" target="_blank">Link</a></li>
</ul>
<!-- ───── END OF ARTICLE ───── -->
    `,
  },
  {
    slug: "rethinking-modern-portfolio-theory",
    title: "The Buy Now Pay Later Epidemic",
    date: "August 10, 2025",
    preview:
      "BNPL now covers non-essentials like Botox and concerts, hiding loopholes and risks that could hit far more than the people using it.",
    content: `
        <!-- ───────────  BUY NOW PAY LATER ARTICLE  ─────────── -->
<p class="text-center text-gray-250 italic mt-4 text-xlg">
  <em>How BNPL is reshaping consumer debt and risk</em>
</p>

<p class="text-left italic mt-8 mb-2 text-base sm:text-lg text-muted-foreground">
  Estimated reading time:
  <span class="not-italic text-primary font-medium text-base sm:text-lg">2–4 minutes</span>
</p>

<article>
  <h2>
  BNPL: Cheap Payments, Expensive Risks</h1>
  </h2>
  <p>You can now split the cost of Botox and concert tickets into ‘4 easy payments’. While on the surface this may feel harmless, the bigger risk lies underneath.</p>

  <h2>The Rise of BNPL</h2>
  <p>The term BNPL (Buy Now, Pay Later) has made headlines recently as borrowers continue to lower their financing thresholds. Splitting non-essential purchases
   like concert tickets into a few payments at 0% APR seems like a killer deal. Beneath the surface, lenders are manufacturing this bad deal to appeal to audiences
    already struggling with income.</p>

  <p>To name a few Klarna, Affirm, and Afterpay hold the largest market share and all practice these predatory payment schemes. They thrive on two main things: 
  no universal credit reporting, and understated default consequences.</p>

  <h2>The Micro Risk</h2>
  <p>For starters, these big-name lenders abuse a loophole where they are bypassing traditional credit lending. Instead, they require access to a checking account
   through your bank, or an online account like PayPal or Cashapp, bypassing credit checks. They are literally scanning your bank account to make sure you have 
   a positive balance. So much so, they can instantly pull funds the moment your paycheck hits. This also underscores stacking loans across multiple different apps, 
   meaning a borrower can take these small loans across unregulated industries and spread themselves thin, all without the lender knowing.</p>

  <h2>The Macro Risk</h2>
  <p>This is subprime lending in disguise. The “0% interest” is normally funded by merchant fees and are sometimes upsold to longer-term loans, sustainable only
   in high-spending, low-default environments. While defaults remain manageable for now, very quickly a jump in defaults and/or higher funding costs can lead to 
   a balance sheet problem overnight. Not only are borrowers at risk, but the lenders are at risk as well. Although these firms have been relatively sustainable 
   since the post-covid era, this is due to funding costs, lack of reporting, and their unsecured nature. Borrowers stretching themselves thin, and lenders capitalizing
    off ambiguity that is almost certain to backfire.</p>

  <h2>The Lesser of 2008</h2>
  <p>It’s the subprime mortgage crisis of 2008 on a lesser scale: the same growth-at-all-costs model, the same ignorance of risk, the same eventual reckoning. If BNPL 
  continues to permeate the market for non-essential goods, eventually the bubble pops, taking even uninvolved parties along with it.</p>

  <h2>The Regulatory Loophole</h2>
  <p>The BNPL epidemic stems from a loophole in current regulations. Often these BNPL’s do not exceed 4 months, which bypasses the Truth in Lending Act (TILA) disclosure
   requirements. They are marketed as “0% interest”, which is technically true, as the merchants typically cover fee that acts as a pseudo safety net that disappears 
   when defaults rise. For longer plans, an APR in excess of 36% is common. Lastly, Most are classified as instalment agreements, which are legally different from traditional revolving credit, avoiding reporting, fees, and rules.</p>

  <h2>The Path to Reform</h2>
  <p>The only safety net is regulation, and it’s coming slowly, with legislation lagging. To name a few: full inclusion under TILA (Truth in Lending Act), mandatory
   credit bureau reporting (Some is already taking place), standardized affordability checks, late fee and penalty caps, clear separation of marketing and lending.</p>

  <p>In large part these would not kill the BNPL that is plaguing low-income individuals, but it would shift away from this grow at all costs subprime lending, to a more 
  traditional credit line.</p>

  <h2>The High-Wire Act</h2>
  <p>BNPL is not just a payment option, it’s a high-wire act with absolutely no net. Right now, the music is still playing. The question becomes who is left standing when it stops.</p>
</article>
    `,
  },
  {
    slug: "video-game-markets-safe-assets",
    title: "How Video Game Markets Produce Safe Assets",
    date: "TBD",
    preview: "In Progress",
    content: `
<p>Not Yet Available</p>
    `,
  }
];
