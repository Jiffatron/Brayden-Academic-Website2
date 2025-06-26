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
<p class="text-left italic mt-8 mb-2 text-base sm:text-lg text-muted-foreground">
  Estimated reading time:
  <span class="not-italic text-primary font-medium text-base sm:text-lg">17–24 minutes</span>
  <p></p>
</p>
 <h1 class="text-2xl font-semibold mb-10">Introduction: The Psychological Foundations of Markets</h1>
<p>
  Financial markets govern the very reality we live in today. In this piece I will seek to explore the intricacies of the human psyche and how it innately manufactures markets into what we see on screen. For most of my collegiate career, I understood the overall dynamics between supply and demand. They are inversely proportional, and naturally they find equilibrium based on the two variables. While this is objectively true, I have further pulled back the curtain to really find what lies beneath. In this piece we will tackle micro factors like markets, banks, and investors, and frame that into the laws and fundamental properties that govern our very universe. This aims at outlying the properties of our markets, such that even novice investors or regular people can draw the same connection.
</p>

<h1 class="text-2xl font-semibold mb-10">Einstein’s Simplicity and the Beauty of Complexity</h1>
<p>
  While we do dive into some complex ideas, they will be artificially simpler so much to draw the connection. One might ask how something as insignificant as market dynamics, and the origin, function, and scale of our universe correlate whatsoever. Measuring such correlation, using normal at-scale thinking only gives you a visualization of the data. It is not until you peel back the framework to which you find some unbelievably simple and intuitive connections from seemingly ever-complex ideas. My research can be derived from simple logic coined by Albert Einstein, and I quote “Everything should be simple as possible, but not simpler”. Oddly so mundane, at scale it makes perfect sense.
</p>
<p>
  Einstein came to this conclusion based on the universe’s natural ability to be elegant and to find chaos from order (Chaos Theory). By instead framing the nuances of our theories of our reality we are missing the grander scheme orchestrating what we see. Einstein effectively developed special relativity, bypassing centuries of confusion around time, motion, and space into the realization that time and space are relative, and the speed of light is invariant. Something so simple in terms of complexity, given mathematics at the time, has become one of if not the most revolutionary theories of all physics.
</p>
<p>
  It is the very idea that what we view is a mere interpretation of itself inside the system, the only way to truly draw the connections outlined, is to operate in the bounds outside of the traditional system or reality as we know it. Einstein’s all-encompassing quote further reinforces this idea “The supreme goal of all theory is to make the irreducible basic elements as simple and as few as possible, without having to surrender the adequate representation of a single datum of experience.” Lies here are the very idea of balance, in that if your explanation is too complex, most would not understand or care to. Conversely if it is too simple you are lying to yourself by omission. This grander theme of simplifying ideas becomes even more understandable as this piece goes on.
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
  Let’s draw our attention to something more tangible. We as humans living today, and everything we do, are a mere reflection of ourselves (Markets, Advertising, Expression). Innately, the universe follows the same principles, everything is a function of what it once was and is now (Quantum Mechanics). While the surface level connection appears to be word-jargon, there are some fundamental truths and connections to uncover.
</p>
<p>
  Again, the same principle can be applied to the stock market. Imagine instead of the exorbitant amount of complex math that governs the market, as a reflection of humans themselves. Imagine that every event, interaction, price change, and sensitivity is merely a reaction of the human psyche and not some mystical force that magically updates every nano-second. This way of thinking lays out the fundamental framework of our perceived reality.
</p>

<h1 class="text-2xl font-semibold mb-10">Entropy and Chaos: The True Engine of Efficiency</h1>
<p>
  Now, with this new-found knowledge, we have essentially broken down the market into its roots – us. To best frame this cohesiveness, its best to understand what entropy as it relates to non-thermal order or informational entropy, coined “lack of order or predictability; gradual decline into disorder.” This encapsulates markets perfectly. The overall efficiency of the market increases with entropy because more chaos means more variables explored, better than encompassing the true scope.
</p>
<p>
  Conversely, chaos theory states the theory that in whole or in part, when seemingly random events with no relevant correlation, manifests into something beautiful, elegant and cohesive in nature. This same concept becomes prevalent when understanding market dynamics as in part and in whole. It is the very order (market prices) that are derived from the chaos of novice and institutional investors. This can generally be referred to as semi-strong form efficiency, stating all available knowledge is already priced into security.
</p>

<h1 class="text-2xl font-semibold mb-10">The Human Psyche as Market Catalyst</h1>
<p>
  The connection between these two seemingly uncoordinated properties is starting to make sense in terms of definition. In-fact most people would stop at this broad yet unspecified connection. However, I believe there is a much starker connection that can be made here.
</p>

        <h1 class="text-2xl font-semibold mb-10">The Human Psyche as Market Catalyst</h1>

<p>Imagine again the stock market reflects human condition rather than numbers on your screen. Now, by understanding the fundamental order from chaos theory, we can further explore the nuances. Markets are said to be reactive at any moment's notice, often misaligned with the true intrinsic value of a company. One might ask how that is possible even if institutions hold well more than half of the market’s capital. One might also add, if an institutional investor holds all knowledge of market dynamics like Warren Buffet, and algorithmic trading, how do they not produce one true and objective intrinsic valuation of a company?</p>

<h2 class="text-2xl font-semibold mt-10">Chaos, Institutions, and Market Inefficiencies</h2>
<p>Short answer is because it’s not possible—there is no such thing as perfect foresight, even with all the available data at hand. Along with institutional investors come novice and inexperienced investors, who do not have the necessary market knowledge to come to a true and objective intrinsic value. In fact, this duality in and of itself is the literal definition of chaos theory. Markets are not efficient because of rational institutional investors; markets are efficient because of irrational investors coupled together. Markets are heavily situational and can have very different risk profiles between institutions. So even as an institutional investor, there still is not one true objective answer at hand.</p>

<p>This discrepancy is exactly what makes our market. It reflects all the wrong, right, and everything in between that makes markets appear. It is in part this inefficiency that becomes the order that inevitably comes to fruition. This seemingly simple formula—albeit too good to be true—is what we see on our screens. This chaos, including all the right answers, wrong answers, and everything in between, is what gives the markets the necessary uncertainty and certainty that creates the profit and loss we see every day. The market at any given moment is everything all at once: knowledge, emotions, financial statements, ideocracy. It is this very principle that governs our global markets. Every possible outcome, variable, intuition is explored and thereby displayed in the price of a security.</p>

<h2 class="text-2xl font-semibold mt-10">Axiom of Choice and Infinite Outcomes</h2>
<p>While the stock market is composed of a finite number of participants and shares at any given moment, its behavior often reflects a much broader set of possible outcomes. Conceptually, this aligns with the Axiom of Choice in set theory, which permits selection from infinitely many possibilities without a defined rule. In this sense, each market state can be viewed as a weighted average of potential paths—not because there are literally infinite shares, but because the system evolves from an effectively infinite set of investor behaviors, expectations, and information states. Whether or not one assumes the Axiom of Choice, the randomness inherent in market dynamics implies that even arbitrary starting points can produce seemingly infinite variability in price movement, especially in the macro context.</p>

<h2 class="text-2xl font-semibold mt-10">Viewing Markets as Living Ecosystems</h2>
<p>Now instead of imagining one specific security, we can apply the same logic to the broader market. For this, it’s easier to imagine the market being a living organism. Both have producers (market makers), consumers, predators (day-traders), and decomposers (failed positions). When shocks hit the market (like rate hikes, global events, recessions), they behave eerily like natural disasters where only the strongest survive (natural selection). Because of these dynamics we initiate a fight or flight response. To survive, diversification becomes a form of genetic variation and adaptation—where over time portfolios evolve and shift as the environment changes. It’s clear in this living ecosystem that no single organism determines the narrow pathway of survival—it’s the interdependence of many. The same is true for markets: long-term investors, overly speculative day traders, and institutional bankers all make a piece of the same puzzle.</p>

<h2 class="text-2xl font-semibold mt-10">Feedback Loops and Market Psychology</h2>
<p>Feedback loops that are prevalent in nature can be attributed to market performance. A good example is when markets rise, confidence grows, inviting more capital, further reinforcing any momentum. Conversely, when panic spreads, selling accelerates, creating a self-fulfilling prophecy. In ecosystems, this is called homeostatic or runaway feedback loops. This self-fulfilling prophecy is mere echoes of feedback loops happening all the time. This property is a function of the human body (homeostasis) as signals continue building on themselves until the nervous system amplifies a sensation of pain.</p>

<h2 class="text-2xl font-semibold mt-10">Stepping Back From Noise</h2>
<p>Intra-day trading can create an overabundance of noise. Following the principles laid out in this paper, it is not until you step back and pierce the veil that order arises from the chaos. Over years or even centuries we can see clear indications of past market trends that can now be coined in contingency to a certain event, i.e., the 2008 financial crisis, dot-com bubble. While in the perspective of intra-day trading the noise should in theory be a mix of all variables all at once. Through these seemingly uncorrelated events, market corrections, bubbles, and recoveries are all akin to biological adaptation. Painful, exciting, scarcity, and uncertainty emerge to find their equilibrium.</p>

<h2 class="text-2xl font-semibold mt-10">Markets and the Universe: Systems Within Systems</h2>
<p>So how does this relate to the laws that govern our universe? In the same way that markets seem to follow natural order, so too does the universe, finding coherence through chaos and stability through constant motion. Humans, like markets, are homeostatic systems: we self-regulate, react to external factors, and adapt with what we see best fit. The breakthrough for me was that everything—no matter the method of input, angle of incidence, percentage price change, feedback loop, biological tendencies—are all a function of itself. It’s the natural effect of self-preservation reflected from the human psyche unto markets—it all comes from within the system it affects. The same laws that govern gravity, energy, and space are the very laws that insured us. Every strand of DNA, every neural pathway, every cell in our body is coordinated not by external design (outside of the system), but within the bounds of the system’s intrinsic structure. The universe builds from within, and so does the market.</p>

<h2 class="text-2xl font-semibold mt-10">Hedging and Duality</h2>
<p>The final connection to be made is that this concept has been in front of us all along. Hedging, at its core, is a technique used to exploit the imbalance of risk between two or more positions, often in a mirror-like fashion. While it’s easy to view hedging as just a mechanical strategy, it is far more than that. It’s a philosophical act—one that acknowledges the duality between possible futures. Hedging operates on the principle that divergence itself can be predicted, offset, or even manipulated. And in this way, it doesn't merely protect, it participates in the probabilistic structure of markets. That realization is what compelled me to write this piece. It reframed hedging not as a narrow financial tactic, but as a universal model of balance between opposing forces.</p>

<h2 class="text-2xl font-semibold mt-10">Personal Reflection</h2>
<p>What started as a journey into finance has evolved into something much more personal. I no longer see the market as a distant mystical machine of prices and numbers. I see it as a mirror, reflecting the full scale of human nature: our logic, our emotions, our mistakes, and our brilliance. Like the universe itself, it is chaotic but still governed. Seemingly unpredictable yet bound by a set of rules.</p>

<h2 class="text-2xl font-semibold mt-10">Conclusion: The Mirror Within</h2>
<p>Perhaps I haven’t uncovered answers so much as I have uncovered a lens. One that reveals the systems we build are just the very reflections of the systems within us. The deeper into finance I get, the more it becomes abundantly clear: to understand markets, we first must understand ourselves. And like all meaningful understandings, this one does not end. It evolves. It adapts. Just like the universe. Just like the market. Just like us.</p>

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
<p>Opportunity Zones (OZs) are federally designated census tracts, typically low-income or economically distressed areas—where investors can receive substantial tax benefits by reinvesting capital gains. Established under the Tax Cuts and Jobs Act of 2017, the program aims to spur long-term private investment in underserved communities through Qualified Opportunity Funds (QOFs). A QOF is an investment vehicle organized as a corporation or partnership that holds at least 90% of its assets in qualified OZ property. The longer the investment is held, the greater the tax advantage gets—culminating in completely tax-free appreciation after 10 years.</p>

<p>
  <!-- Your text content continues here -->
  This tool shows current federally certified Opportunity Zones...
</p>

<h2>Why Did Other Programs with the Same Goal Fail?</h2>
<p>Consider the Historical Underutilized Business Zone (HUBZones), a program run by the U.S. Small Business Administration (SBA). The goal was to stimulate economic development and employment growth in distressed areas by giving small businesses preferential access to federal contracts. To qualify, businesses had to meet several requirements:</p>
<ul>
  <li>Qualify as a small business under SBA standards</li>
  <li>Be at least 51% owned and controlled by U.S. citizens or a designated group</li>
  <li>Have a principal office located in a HUBZone</li>
  <li>Have at least 35% of employees living in a HUBZone</li>
</ul>
<p>The 35% employee residency rule was difficult to maintain, due to remote work and high employee turnover in underserved labor markets. Many HUBZone areas were based on outdated census tracts, making it hard to maintain eligibility. Even small statistical changes could disqualify a business, creating uncertainty. Arguably the most limiting factor was the lack of a true tax incentive. All benefits came as set-aside and price-preference contracting advantages—no tax incentive. For companies without federal contracting experience, this was a substantial barrier to entry. This certification process was slow and bureaucratic, often leading companies to invest in more profitable areas.</p>
<p>HUBZones aimed to promote growth through government allocation mechanisms, while Opportunity Zones promoted growth through a free market incentive. HUBZones’ rigid requirements and misaligned incentives created a cumbersome, bureaucratic model for economic growth. Opportunity Zones addressed the shortcomings of these programs, giving investors a real reason to support underserved communities.</p>

<h2>The Birth of Opportunity Zones</h2>
<p>The idea for Opportunity Zones was first formalized in a 2015 paper titled “Unlocking Private Capital to Facilitate Economic Growth in Distressed Areas”, co-authored by two bipartisan economists, Kevin Hassett and Jared Bernstein. This paper laid the foundation for the concept of using tax incentives to encourage private investment in struggling areas. It proposed using tax incentives to target the trillions of dollars in unrealized capital gains held by U.S. investors that could be channeled to underserved areas.</p>
<p>The Investing in Opportunity Act (IIOA) formed the basis for the current Opportunity Zone policy. This bill garnered support from Kevin Brady, a Republican representative from Texas. The bill was later sponsored by Senators Tim Scott (R-SC) and Cory Booker (D-NJ), as well as Representatives Ron Kind (D-WI) and Pat Tiberi (R-OH).</p>
<p>The Investing in Opportunity Act laid the foundation for what became the Opportunity Zone policy, enacted as part of the Tax Cuts and Jobs Act of 2017.</p>

<h2>How Opportunity Zones Work</h2>
<p>An Opportunity Zone is defined by the IRS under 26 section 1400Z-1 as “A census tract that is a low-income community that is designated as a qualified opportunity zone”. For a low-income community to be defined as a Qualified Opportunity Zone, two requirements must be met: (1) the state’s governor nominates the tract in writing, and (2) Treasury certifies it by 12/31/2026. This means states have the sole authority to designate Opportunity Zones, provided they meet the deadline outlined in the Tax Cuts and Jobs Act of 2017. Each state had a 90-day window from the start date of TCJA deemed the “determination period”. A 30-day extension noted as the “consideration period” could be filled by the Secretary of State, under subsection (b)(1)(A)(ii). All U.S. states and territories qualify for this program; in Puerto Rico, ~94% of the island (863 tracts) were designated.</p>
<p>In other words, opportunity zones are a free-market, capitalistic incentive to redirect capital gains into designated Opportunity Zones. Zone designations effectively identify underserved communities, often in rural areas. New plans are underway to expand and refine the number of current opportunity zones in the U.S. with a greater focus on rural areas and military bases with tighter regulations.</p>

<h2>What is the Incentive to Invest in an Opportunity Zone</h2>
<p>Since the initial enactment of the TCJA of 2017, there have been many lucrative investment opportunities that can see tax-free appreciation. The first is a “step-up basis,” which allowed investors to exclude 10% of the deferred capital gain assuming the investment was held for 5 years and exclude 15% of the deferred capital gain if the investment was held for 7 years. This “step-up basis” is no longer available (it phased out after 2021).</p>
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
<p>Opportunity Zones are successful because they hinge on something we know already works. In the capitalistic market of the United States, incentive comes from one’s self-initiative. That is in most cases to make a return on investment. OZs are not attempting to create something entirely new but instead focus on using the resources already available. Trillions of dollars of wealth remain stagnant in many sectors of the economy, untouched for good reasons. Most are still garnering a return greater than any average investment, so the investors’ incentive to sell is mostly nonexistent.</p>
<p>Aligning these core capitalistic values with a non-bureaucratic and holistic approach creates this incentive. Gone are the days of relying solely on top-down investment strategies. Instead of hinging on the hope these high-capital firms will come to us, instead we will bring the opportunity to them. This approach in many cases can seem too good to be true. Firms with extensive amounts of tied up capital can garner a complete tax-free return for the next 17 years as of current legislation. While returns are limited in the short run, firms with true intrinsic value and long-term goals make such an investment too good to pass up.</p>
<p>As of 2023, over $48 billion in capital had been deployed across more than 8,000 projects nationwide, with early signs of positive impact in job creation and commercial activity in cities like Erie, PA and Stockton, CA.</p>
<p>Despite successes, some critics argue OZs have primarily benefited wealthy investors or spurred development in already-gentrifying areas. OZ 2.0 legislation attempts to address these concerns by tightening eligibility and focusing more on rural and deeply underserved regions.</p>

<h2>Case Study: Lubbock, Texas</h2>
<p>Lubbock, Texas currently has around 9 different designated opportunity zones (IRS GIS), spanning mostly the eastern part of Lubbock and north into the rest of Lubbock County. Once considered the Hub City of Texas, it is now seemingly an afterthought of development. One major factor was the EF5 tornado (6th in Texas History) on May 11th, 1970, which devastated downtown Lubbock’s infrastructure. While the buildings downtown remained standing, the underlying infrastructure and people did not. Injuring 500 people and taking the lives of 26, Lubbock became the origination of the Fujita Scale created by Dr. Tetsuya Theodore and positioned Texas Tech as a national leader in wind science. This new scale went on to save many lives after this tragic event.</p>
<p>Due to the unprepared nature of Lubbock infrastructure, the town became barren for the better part of 50 years. Lubbock’s downtown district still embodies the feeling of a ghost town, with only a few private companies and municipalities. Many anecdotal historical accounts suggest much of Lubbock’s once booming downtown was completely lost, and many businesses were abandoned. With the application of Opportunity Zones, there has been a sharp uptick in high-dollar investment in student housing, businesses, and recreational amenities.</p>
<p>While many zones in Lubbock were not impacted by this devastating tornado, much of the town suffered from low investment and low amounts of skilled labor. Many students earned degrees in Lubbock but left to pursue careers in more developed cities. Much of Lubbock’s progress will be slow, as many areas are already filled with low-income housing. Having lived in Lubbock for 4 years, this revitalization of the downtown and other seemingly forgotten areas are beginning to come back to life.</p>

<h2>CapZone Analytics as a Market Pioneer</h2>
<p>CapZone Analytics was the first major intermediary to help investors navigate these complex regulations. With much of the OZ regulations being ambiguous, Cap Zone filled this intermediary role in assisting large and small private equity firms to bring capital to these areas. CapZone was founded in May 2018 by Al Puchala, a Yale graduate with a diverse background spanning finance and federal policy compliance. CapZone has been the leading model in market opportunity and action. CapZone, a small company with less than 50 employees, has seen a significant surge in the opportunity zone business as legislation is soon to be introduced on expansion.</p>

<h2>The Future of OZs</h2>
<p>Opportunity Zones 2.0 is approaching. Congress is currently reshaping the Opportunity Zone program with two key legislative efforts:</p>
<ul>
  <li>The “One Big Beautiful Bill” (OBBB) – Passed by the House in May 2025</li>
  <li>The Senate Finance Committee Draft – Currently in markup but much more ambitious</li>
</ul>
<p>Both bills aim to replace the original 2017 Opportunity Zone program (TCJA-based) with a refined, modernized version starting January 1, 2027. This updated version is informally dubbed “OZ 2.0.”</p>
<p><strong>Core features of OZ 2.0 include:</strong></p>
<ul>
  <li>New Zone Map (Starting 2027)</li>
  <li>Capital Gains Deferral Extended</li>
  <li>A 10% Step-Up After a Six-Year Hold</li>
  <li>Enhanced Rural Focus</li>
  <li>IRS Reporting and Enforcement</li>
</ul>
<p>The new zone map requires tracts to meet a 70% state/metro Median Family Income (MFI) threshold, cutting around ~22% of current zones (Estimation, not law). Capital gains realized after 2026 can be deferred until Dec 31, 2033, or indefinitely if the Senate version passes. It offers a 10% step-up after a six-year period (plus up to 20% extra for rural projects). Rural tracts gain special benefits like lower rehab thresholds and larger basis boosts. OZ 2.0 introduces mandatory compliance reporting, funding for enforcement, and penalties for QOFs that do not comply.</p>
<p>The “One Big Beautiful Bill” (OBBB) and the Senate Finance Committee draft are largely the same provision but with slightly different wordings and timelines. The OBBB targets the same timeframe as the OZ 1.0, lengthening the program in the short term but lacking long-term structure with a focus on 30% rural zones. The Senate Finance Committee draft focuses on creating a permanent OZ program (rolling 10-year maps and deferral dates). This bill is much more ambitious and is like the current OZ 1.0 regulation.</p>
<p>OZ 2.0 marks a reboot of the original program, not a repeal, but a refinement. The same powerful tax incentives remain in place. But this time with stronger rules, more focus on equity, and greater accountability. It is likely we will have a guaranteed answer within the next 6 months. The broader Tax Cuts and Jobs Act of 2017 is set to sunset in 2026, which includes several individual tax provisions, making this an urgent moment for Opportunity Zone reform.</p>

<h2>Conclusion</h2>
<p>Opportunity Zones began as a bold experiment to reshape how America approaches community revitalization—one that put free-market forces at the center of policy. Unlike failed programs of the past, OZs gave investors a reason to bet on forgotten communities, and it worked.</p>
<p>Now with OZ 2.0 on the way, Congress is set to improve what has already succeeded. Whether through a permanent Senate plan or the House’s extension, the future of OZs is clearer, stronger, and more focused, especially on rural areas.</p>
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
  <li>U.S. House of Representatives. (2025). “One Big Beautiful Bill” (Opportunity Zones Extension Act of 2025). [Bill text not publicly assigned a number at time of writing – sourced from committee updates and media briefings.]</li>
  <li>Urban Institute. (2023). Evaluating Opportunity Zones: Early Impacts on Local Investment. <a href="https://www.urban.org/research/publication/evaluating-opportunity-zones" target="_blank">Link</a></li>
  <li>U.S. Department of the Treasury. (n.d.). Qualified Opportunity Zones Map. <a href="https://www.cdfifund.gov/opportunity-zones" target="_blank">Link</a></li>
</ul>
<!-- ───── END OF ARTICLE ───── -->
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

