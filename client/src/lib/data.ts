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
    "Comprehensive analysis of Boeing's financial position, market strategy, and future prospects in the aerospace industry. Includes DCF valuation model and competitive positioning assessment.",
  image:
    "https://img.ctykit.com/cdn/wa-bellevue/images/tr:w-900/8_16_17_member_the_boeing_company.jpg",
  tags: ["Financial Analysis", "Equity Valuation", "Industry Research"],
  pdfUrl: "/Boeing_Equity_Research_Report.pdf",
  hasPreview: true,
  content: `
    <p class="mb-4">This comprehensive equity research project examines Boeing's financial position following recent industry challenges, including the 737 MAX issues and pandemic impacts on the aviation sector.</p>
    
    <h3 class="text-xl font-medium mb-3">Key Findings</h3>
    <ul class="mb-6 space-y-2">
      <li>• Strong long-term growth potential despite short-term volatility</li>
      <li>• Defense division providing stability amid commercial aviation fluctuations</li>
      <li>• Improving free cash flow projection for 2023–2025</li>
      <li>• Supply chain improvements leading to increased production capacity</li>
    </ul>
    
    <h3 class="text-xl font-medium mb-3">Valuation Summary</h3>
    <p class="mb-4">Utilizing a DCF model with a WACC of 8.7% and terminal growth rate of 2.5%, the analysis established a fair value range of $215–$240 per share, suggesting the stock was undervalued by approximately 15% at the time of analysis.</p>
    
    <h3 class="text-xl font-medium mb-3">Methodologies</h3>
    <ul class="mb-6 space-y-2">
      <li>• Discounted Cash Flow (DCF) Analysis</li>
      <li>• Comparable Company Analysis</li>
      <li>• Free Cash Flow Valuation</li>
      <li>• Scenario Analysis (Bull, Base, Bear cases)</li>
    </ul>
    
    <h3 class="text-xl font-medium mb-3 mt-8">Report Preview</h3>
    <div class="mb-6 preview-placeholder bg-muted p-4 rounded-md flex items-center justify-center h-96">
      <p class="text-muted-foreground">
        Use the buttons below to view or download the full PDF report.
      </p>
    </div>
  `

  },
  {
    id: "mandelbrot-excel",
    title: "Mandelbrot Set in Excel (VBA Done)",
    description:
      "A mathematical and visual exploration of fractal geometry using only Microsoft Excel, showcasing the computational power hidden in spreadsheets.",
    image:
      "https://i.imgur.com/kLamLkF.png",
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
        <a href="https://imgur.com/a/W87udOf" class="px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/80 transition-colors duration-300">MVP Available</a>
      </div>
    `,
  },
  {
  id: "BondTracker",
  title: "Texas Municipal Bond Tracker (In Progress)",
  description:
    "A self-initiated financial data tool A modular parsing tool for school district disclosures, currently built on public financials but intended to scale to private-sector documents such as 10-Ks and fund reports. Focused on automation, clarity, and repeatable investor workflows.",
  image: "https://i.imgur.com/eW2Mn3S.png", 
  tags: ["Public Finance", "AI Integration", "Financial Data Automation"],
  pdfUrl: "",
  hasPreview: false,
  content: `
    <p class="mb-4">
      This ongoing project was inspired by my internship at the Municipal Advisory Council of Texas, where I worked directly with investor-facing data from school district bond issuances. The goal of this tracker is to centralize and simplify complex financial disclosures that investors and municipalities rely on.
    </p>

    <h3 class="text-xl font-medium mb-3">Planned Features</h3>
    <ul class="mb-6 space-y-2">
      <li>• Parsing both automated and manually reviewed financial statements</li>
      <li>• Extraction of critical data points like assessed values, top taxpayers, and fund balances</li>
      <li>• Integration with Notion for update logging and statement documentation</li>
      <li>• Interactive dashboard for visualizing school district bond metrics</li>
      <li>• Potential use of AI for statement summarization and classification</li>
    </ul>

    <h3 class="text-xl font-medium mb-3">Current Status</h3>
    <p class="mb-4">
      The site framework was rapidly built using AI-assisted tools to accelerate development. While it is not yet ready for public use, a preview is available on my main portfolio site in the projects section. A working MVP is expected in the near future as I continue developing parsing logic and refining the UI.
    </p>
  `
}

  
];

// Academic interests data
export const interests: InterestType[] = [
  {
    title: "Parsing Financial Complexity",
    description:
      "Building tools that simplify dense financial disclosures by identifying key investor insights—across public bond filings and private-market documents like 10-Ks and investor reports.",
    icon: "fas fa-file-alt",
  },
  {
    title: "Interest Rate Strategy & Capital Flow",
    description:
      "Exploring how macro rate trends affect both municipal and private capital structures, and how firms adapt risk strategy and portfolio construction in volatile cycles.",
    icon: "fas fa-chart-area",
  },
  {
    title: "Applied AI in Financial Systems",
    description:
      "Leveraging language models and automation frameworks to extract, structure, and deliver investor-relevant insights faster — bridging traditional analysis with modern tooling.",
    icon: "fas fa-brain",
  },
];

// Blog post data
export const blogPosts: BlogPostType[] = [
  {
    slug: "human-psychology-of-finance",
    title: "A Deep Dive into the Human Psychology of Finance",
    date: "April 7, 2025",
    preview:
      "A reflective look at how emotion, perception, and cognitive bias drive financial behavior — revealing that markets are as much psychological landscapes as they are numerical systems.",
    content: `
      <p>
Financial markets govern the very reality we live in today. In this piece I will seek to explore the intricacies of the human psyche and how it innately manufactures markets into what we see on screen. For most of my collegiate career, I understood the overall dynamics between supply and demand. They are inversely proportional, and naturally they find equilibrium based on the two variables. While this is objectively true, I have further pulled back the curtain to really find what lies beneath. In this piece we will tackle micro factors like markets, banks, and investors, and frame that into the laws and fundamental properties that govern our very universe. This aims at outlying the properties of our markets, such that even novice investors or regular people can draw the same connection.<br /><br />

 While we do dive into some complex ideas, they will be artificially simpler so much to draw the connection.
One might ask how something as insignificant as market dynamics, and the origin, function, and scale of our universe correlate whatsoever. Measuring such correlation, using normal at-scale thinking only gives you a visualization of the data. It is not until you peel back the framework to which you find some unbelievably simple and intuitive connections from seemingly ever-complex ideas. My research can be derived from simple logic coined by Albert Einstein, and I quote “Everything should be simple as possible, but not simpler”. Oddly so mundane, at scale it makes perfect sense. Einstein came to this conclusion based on the universe’s natural ability to be elegant and to find chaos from order (Chaos Theory). By instead framing the nuances of our theories of our reality we are missing the grander scheme orchestrating what we see. Einstein effectively developed special relativity, bypassing centuries of confusion around time, motion, and space into the realization that time and space are relative, and the speed of light is invariant. Something so simple in terms of complexity, given mathematics at the time, has become one of if not the most revolutionary theories of all physics. It is the very idea that what we view is a mere interpretation of itself inside the system, the only way to truly draw the connections outlined, is to operate in the bounds outside of the traditional system or reality as we know it. Einstein’s all-encompassing quote further reinforces this idea “The supreme goal of all theory is to make the irreducible basic elements as simple and as few as possible, without having to surrender the adequate representation of a single datum of experience.” Lies here are the very idea of balance, in that if your explanation is too complex, most would not understand or care to. Conversely if it is too simple you are lying to yourself by omission. This grander theme of simplifying ideas becomes even more understandable as this piece goes on.<br /><br />

	To help understand the background of what has been compiled into this piece, I will give a short excerpt on how I ended up on this path to begin with. Starting from a young age I was mostly a nerd towards the fundamental understanding of how the universe functions both in whole and in part. In 5th grade I deeply understood the surface level ideology of how the Big Bang came to fruition. In awe by seemingly nothing called Planck Epoch from zero to approximately 10^-43 seconds (1 Planck Time). This being the closest we could physically get to the exact onset of events that took place. The Big Bang is still currently understood to be the beginning of space and time as we know it. Yet following this logic, the statistical chances of said event happening are as close to nil as it could possibly get. Theorists have attempted to fine-tune the probability of such an event where seemingly all the universes governing properties were once one infinitely small point in nothingness. Because, as with our current knowledge, there was nothing that came before, statistically there was not before to have chances in. This magical force, so to speak, defying all possible odds as we understand today, sparked my interest in exploring our very reality.<br /><br />

	This early onset of knowledge had slowed as I began to grow older, and reality started to set face. It was not until I began exploring my own major field of Finance that once again, I fell in love with science, math and finance, so-much-so I can draw deep and seemingly non-existent connections between them.<br /><br />

Let’s draw our attention to something more tangible. We as humans living today, and everything we do, are a mere reflection of ourselves (Markets, Advertising, Expression). Innately, the universe follows the same principles, everything is a function of what it once was and is now (Quantum Mechanics). While the surface level connection appears to be word-jargon, there are some fundamental truths and connections to uncover. Again, the same principle can be applied to the stock market. Imagine instead of the exorbitant amount of complex math that governs the market, as a reflection of humans themselves. Imagine that every event, interaction, price change, and sensitivity is merely a reaction of the human psyche and not some mystical force that magically updates every nano-second. This way of thinking lays out the fundamental framework of our perceived reality.<br /><br />

	Now, with this new-found knowledge, we have essentially broken down the market into its roots – us. To best frame this cohesiveness, its best to understand what entropy as it relates to non-thermal order or informational entropy, coined “lack of order or predictability; gradual decline into disorder.” This encapsulates markets perfectly. The overall efficiency of the market increases with entropy because more chaos means more variables explored, better than encompassing the true scope. Conversely, chaos theory states the theory that in whole or in part, when seemingly random events with no relevant correlation, manifests into something beautiful, elegant and cohesive in nature. This same concept becomes prevalent when understanding market dynamics as in part and in whole. It is the very order (market prices) that are derived from the chaos of novice and institutional investors. This can generally be referred to as semi-strong form efficiency, stating all available knowledge is already priced into security.<br /><br />

	The connection between these two seemingly uncoordinated properties is starting to make sense in terms of definition. In-fact most people would stop at this broad yet unspecified connection.  However, I believe there is a much starker connection that can be made here.<br /><br />

	Imagine again the stock market reflects human condition rather than numbers on your screen. Now, by understanding the fundamental order from chaos theory, we can further explore the nuances. Markets are said to be reactive at any moments notice, often misaligned with the true intrinsic value of the company. One might ask how that is possible even if institutions hold well more than half of the market’s capital. One might also add, if an institutional investor holds all knowledge of market dynamics like Warren Buffet, and algorithmic trading, how do they not produce one true and objective intrinsic valuation of a company. Short answer is because it’s not possible, there is no such thing as perfect foresight, even with all the available data at hand. Along with institutional investors, comes novice and inexperienced investors, who do not have the necessary market knowledge to come to a true and objective intrinsic value. In-fact this duality in and of itself is the literal definition of chaos theory. Markets are not efficient because of rational institutional investors; markets are efficient because of irrational investors coupled together. Markets are heavily situational and can have very different risks profiles between institutions. So even as an institutional investor there still is not one true objective answer at-hand. This discrepancy is exactly what makes our market. It reflects all the wrong, right, and everything in between that makes markets appear. It is in part this inefficiency becomes the order that inevitably comes to fruition. This seemingly simple formula seems, albeit too good to be true, is what we see on our screens. This chaos, including all the right answers, wrong answers and everything in between, is what gives the markets the necessary uncertainty and certainty that creates the profit / loss we see every day. The market at any given moment is everything all at once knowledge, emotions, financial statements, ideocracy. It is this very principle that governs our global markets. Every possible outcome, variable, intuition is explored and thereby displayed in the price of security.<br /><br />

	While the stock market is composed of a finite number of participants and shares at any given moment, its behavior often reflects a much broader set of possible outcomes. Conceptually, this aligns with the Axiom of Choice in set theory, which permits selection from infinitely many possibilities without a defined rule. In this sense, each market state can be viewed as a weighted average of potential paths—not because there are literally infinite shares, but because the system evolves from an effectively infinite set of investor behaviors, expectations, and information states. Whether or not one assumes the Axiom of Choice, the randomness inherent in market dynamics implies that even arbitrary starting points can produce seemingly infinite variability in price movement, especially in the macro context.<br /><br />

	Now instead of imagining one specific security, we can instead apply the same logic over the grander scheme of the market. For this, it’s easier to imagine the market being a living organism. Both have producers (market makers), consumers, predators (day-traders), and decomposers (failed positions). When shocks hit the market (like rate hikes, global events, recessions) they behave eerily like natural disasters where only the strongest survive (natural selection). Because of these dynamics we initiate a fight or flight response. To survive, diversification becomes a form of genetic variation and adaptation – where overtime portfolios evolve and shift as the environment changes. Its clear in this living ecosystem, no single organism determines the narrow pathway of survival – it’s the interdependence of many. The same is true for markets, like long-term investors, the overly speculative day traders, and the institutional bankers all make a piece of the same puzzle.<br /><br />

	Feedback loops that are prevalent in nature can be attributed to market performance. A good example is when markets rise, confidence grows, inviting more capital further reinforcing any momentum. Conversely, when panic spreads, selling accelerates, creating a self-fulfilling prophecy. In eco-systems this is called homeostatic or runaway feedback loops. This self-fulfilling prophecy is mere echoes of feedback loops happening all the time. This property is a function of the human body (homeostasis) as signals continue building on themselves until the nervous system amplifies a sensation of pain.<br /><br />

	Intra-day trading can create an overabundance of noise. Following the principles laid out in this paper, it is not until you step back and pierce the vail that order arises from the chaos. Over years or even centuries we can see clear indications of past market trends that can now be coined in contingency to a certain event, i.e. the 2008 financial crisis, dot-com bubble. While in the perspective of intra-day trading the noise should in theory be a mix of all variables all at once. Through these seemingly uncorrelated events, market corrections, bubbles and recoveries are all akin to biological adaptation. Painful, exciting, scarcity, uncertainty emerge to find its equilibrium.<br /><br />

So how does this relate to the laws that govern our universe? In the same way that markets seem to follow natural order, so too does the universe, finding coherence through chaos and stability through constant motion. Humans, like markets, are homeostatic systems: we self-regulate, react to external factors, and adapt with what we see best fit. The breakthrough for me was that everything no matter the method of input, angle of incidence, percentage price change, feedback loop, biological tendencies, are all a function of itself. It’s the natural effect of self-preservation reflected from the human psyche unto markets – it all comes from the within the system it affects. The same laws that govern gravity, energy, and space are the very laws that insured us. Every strand of D.N.A, every neural pathway, every cell in our body is coordinated not by external design (outside of the system), but within the bounds of the system’s intrinsic structure. The universe builds from within, and so does the market.<br /><br />

The final connection to be made is that this concept has been in front of us all along. Hedging, at its core, is a technique used to exploit the imbalance of risk between two or more positions, often in a mirror-like fashion. While it’s easy to view hedging as just a mechanical strategy, it is far more than that. It’s a philosophical act—one that acknowledges the duality between possible futures. Hedging operates on the principle that divergence itself can be predicted, offset, or even manipulated. And in this way, it doesn't merely protect, it participates in the probabilistic structure of markets. That realization is what compelled me to write this piece. It reframed hedging not as a narrow financial tactic, but as a universal model of balance between opposing forces.<br /><br />

What started as a journey into finance has evolved into something much more personal. I no longer see the market as a distant mystical machine or prices and numbers. I see it as a mirror, reflecting the full scale of human nature: our logic, our emotions, our mistakes, and our brilliance. Like the universe itself, it is chaotic but still governed. Seemingly unpredictable yet bound by a set of rules.<br /><br />

	Perhaps I haven’t uncovered answers so much as I have uncovered a lens. One that reveals the systems we build are just the very reflections of the systems within us. The deeper into finance I get, the more it becomes abundantly clear: to understand markets, we first must understand ourselves. And like all meaningful understandings, this one does not end. It evolves. It adapts. Just like the universe. Just like the market. Just like us.
</p>
    `,
  },
    {
    slug: "how-opportunity-zones-are-so-successful",
    title: "How Opportunity Zones are so Successful",
    date: "June 20, 2025",
    preview: "In Progress -- An unbiased view on how opportunity zones successfully leverage free-market incentives, and leave little to no room for fraud and abuse",
    content: `
      <h1>Opportunity Zones: Investment Incentives, Risk, and Reform</h1>
<h2><em>Working Draft – Final Conclusion Coming Soon</em></h2>

<p>
The Opportunity Zone (OZ) program, created by the Tax Cuts and Jobs Act of 2017, was designed to encourage long-term investments in economically distressed communities. By offering tax incentives on capital gains, the program incentivizes investors to redirect wealth into underdeveloped areas — ideally stimulating job creation, infrastructure growth, and economic uplift.
</p>

<p>
Despite its promising structure, the program has received mixed reviews. Supporters point to billions in capital redirected to underserved areas, while critics highlight a lack of oversight, gentrification risks, and the possibility that many of the developments would have happened regardless of OZ status.
</p>

<p>
To fully understand the effectiveness of Opportunity Zones, we must evaluate both the legislative intent and how that intent has played out through real-world investment activity.
</p>

<!-- Repeat this structure for all your existing article content -->

<h2>CapZone Analytics and Measurement</h2>

<p>
One of the more advanced data providers in the space, CapZone Analytics, has developed proprietary tools to track Opportunity Zone investments and measure impact — not just by dollars invested, but by the actual socioeconomic improvement in each designated zone.
</p>

<p>
Their work is helping to bring greater transparency and accountability to a program that, until recently, lacked standardized performance metrics. This effort is crucial for determining which OZ projects are truly aligned with public benefit versus those that simply exploit the tax structure.
</p>

<h2><em>[Full conclusion and updates to be added soon.]</em></h2>

    `,
  },
  {
    slug: "rethinking-modern-portfolio-theory",
    title: "Rethinking Modern Portfolio Theory",
    date: "TBD",
    preview:
      "A critical examination of MPT's assumptions in today's market environment. How can investors adapt traditional portfolio construction techniques to account for changing correlations and non-normal return distributions?",
    content: `
      <p>Not Yet Available</p>
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

